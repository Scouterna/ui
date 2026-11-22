import { readFileSync } from "node:fs";
import { globSync } from "glob";
import StyleDictionary from "style-dictionary";
import type { TransformedToken } from "style-dictionary/types";
import { validateTokens } from "./validate-tokens.ts";

type ShadowLayer = {
  offsetX: string;
  offsetY: string;
  blur: string;
  spread: string;
  color: string;
  inset?: boolean;
};

type TypographyValue = {
  fontFamilies: string[];
  fontSizes: string;
  fontWeights: string;
  lineHeights: string;
  letterSpacing?: string;
  textCase?: string;
  textDecoration?: string;
};

const REM_BASE = 16;

const source = globSync("./tokens/**/*.json", { ignore: ["**/$*.json"] });

const setOrder: string[] = JSON.parse(
  readFileSync("./tokens/$metadata.json", "utf-8"),
).tokenSetOrder;

const varName = (path: string[]) => `--${path.join("-")}`;
const refToVar = (ref: string) => `var(${varName(ref.split("."))})`;
const isRef = (value: unknown): value is string =>
  typeof value === "string" && /^\{[^}]+\}$/.test(value);

function assertLiteral(value: unknown, name: string): string {
  const text = String(value);
  if (/[{}]|\s[+\-*/]\s|[*/]/.test(text)) {
    throw new Error(
      `Token "${name}" has a value "${text}" the build can't render. Only plain values and whole-value references are supported.`,
    );
  }
  return text;
}

function toNumber(value: unknown, name: string): number {
  const number = Number(assertLiteral(value, name));
  if (Number.isNaN(number)) {
    throw new Error(`Token "${name}" is not a number: "${value}"`);
  }
  return number;
}

const trim = (number: number) => String(+number.toFixed(4));

const rem = (value: unknown, name: string) => {
  const n = toNumber(value, name);
  return n === 0 ? "0" : `${trim(n / REM_BASE)}rem`;
};

const px = (value: unknown, name: string) => {
  const n = toNumber(value, name);
  return n === 0 ? "0" : `${trim(n)}px`;
};

/** Quote family names that contain spaces, unless they're already quoted. */
function familyName(name: string): string {
  const bare = name.replace(/^"(.*)"$/, "$1");
  return /\s/.test(bare) ? `"${bare}"` : bare;
}

function families(list: string[], { withFallback }: { withFallback: boolean }) {
  const parts = list.map((family) =>
    isRef(family) ? refToVar(family.slice(1, -1)) : familyName(family),
  );
  if (withFallback) {
    parts.push("sans-serif");
  }
  return parts.join(", ");
}

/**
 * Renders a single value. `value` is the token's original value, so references
 * become `var()` calls and the CSS keeps its cascade of custom properties.
 */
function render(type: string, value: unknown, name: string, { withFallback = false } = {}): string {
  if (isRef(value)) {
    return refToVar(value.slice(1, -1));
  }

  switch (type) {
    case "color":
      return assertLiteral(value, name);
    case "spacing":
    case "sizing":
    case "fontSizes":
      return rem(value, name);
    case "borderRadius":
    case "borderWidth":
    case "letterSpacing":
      return px(value, name);
    case "fontWeights":
    case "number":
      return assertLiteral(value, name);
    case "fontFamilies":
      return families(value as string[], { withFallback });
    case "shadow":
      return (value as ShadowLayer[])
        .map((layer) =>
          [
            layer.inset ? "inset" : null,
            px(layer.offsetX, name),
            px(layer.offsetY, name),
            px(layer.blur, name),
            px(layer.spread, name),
            render("color", layer.color, name),
          ]
            .filter(Boolean)
            .join(" "),
        )
        .join(", ");
    default:
      throw new Error(`Token "${name}" has unsupported type "${type}".`);
  }
}

/** Typography tokens become a `font` shorthand plus optional extras. */
function typography(token: TransformedToken): string[] {
  const name = token.path.join(".");
  const original = token.original.$value as TypographyValue;
  const resolved = token.$value as TypographyValue;
  const base = varName(token.path);

  const family = families(original.fontFamilies, { withFallback: false });
  const weight = render("fontWeights", original.fontWeights, name);
  const size = render("fontSizes", original.fontSizes, name);
  const lineHeight = render("number", original.lineHeights, name);

  const lines = [`${base}: ${weight} ${size}/${lineHeight} ${family};`];

  const letterSpacing = toNumber(resolved.letterSpacing ?? 0, name);
  if (letterSpacing !== 0) {
    lines.push(`${base}-letter-spacing: ${render("letterSpacing", original.letterSpacing, name)};`);
  }

  const textCase = resolved.textCase;
  if (textCase && textCase !== "none") {
    lines.push(`${base}-text-transform: ${textCase};`);
  }

  const decoration = resolved.textDecoration;
  if (decoration && decoration !== "none") {
    lines.push(`${base}-text-decoration: ${decoration};`);
  }

  return lines;
}

function declarations(token: TransformedToken): string[] {
  if (token.$type === "typography") {
    return typography(token);
  }

  const name = token.path.join(".");
  return [
    `${varName(token.path)}: ${render(token.$type ?? "", token.original.$value, name, { withFallback: true })};`,
  ];
}

const setOf = (token: TransformedToken) =>
  setOrder.find((set) => token.filePath.endsWith(`${set}.json`));

const bySetOrder = (a: TransformedToken, b: TransformedToken) => {
  const index = (token: TransformedToken) => {
    const set = setOf(token);
    return set === undefined ? setOrder.length : setOrder.indexOf(set);
  };
  return index(a) - index(b);
};

StyleDictionary.registerTransform({
  name: "scouterna/name",
  type: "name",
  transform: (token) => token.path.join("-"),
});

StyleDictionary.registerFormat({
  name: "scouterna/css",
  format: ({ dictionary }) => {
    const tokens = [...dictionary.allTokens].sort(bySetOrder);
    const out = [
      "/**",
      " * Do not edit directly, this file was auto-generated.",
      " */",
      "",
      ":root {",
    ];

    let currentSet: string | undefined;
    for (const token of tokens) {
      const set = setOf(token);
      if (set !== currentSet) {
        if (currentSet !== undefined) {
          out.push("");
        }
        out.push(`  /* ${set} */`);
        currentSet = set;
      }
      for (const line of declarations(token)) {
        out.push(`  ${line}`);
      }
    }

    out.push("}", "");
    return out.join("\n");
  },
});

StyleDictionary.registerFormat({
  name: "scouterna/js",
  format: ({ dictionary }) => {
    const tokens = Object.fromEntries(
      [...dictionary.allTokens]
        .sort(bySetOrder)
        .map((token) => [token.path.join("."), token.$value]),
    );
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\nexport default ${JSON.stringify(tokens, null, 2)};\n`;
  },
});

const sd = new StyleDictionary({
  source,
  platforms: {
    css: {
      transforms: ["scouterna/name"],
      files: [{ format: "scouterna/css", destination: "dist/tokens.css" }],
    },
    javascript: {
      transforms: ["scouterna/name"],
      files: [{ format: "scouterna/js", destination: "dist/tokens.js" }],
    },
  },
});

await sd.hasInitialized;
validateTokens(await sd.getPlatformTokens("css"));
await sd.buildAllPlatforms();
