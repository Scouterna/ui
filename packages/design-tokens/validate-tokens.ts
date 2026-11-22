import type { Dictionary } from "style-dictionary/types";

/**
 * Build-time checks on the imported design tokens. Broken references are
 * already rejected by Style Dictionary, so this covers the rest. The build
 * fails if anything here is violated.
 */

// Keep in sync with the font-family names declared in
// https://cdn.scouterna.net/fonts/fonts.css (Scouterna/cdn.scouterna.net).
const KNOWN_FONT_FAMILIES = ["Inter", "Season Mix"];

const NAME_PATTERN = /^[a-z0-9]+([.-][a-z0-9]+)*$/;

// [foreground, background, minimum contrast ratio], using semantic color names
// without the leading "color.". Text needs 4.5:1, borders and focus rings 3:1.
type ContrastPair = [foreground: string, background: string, minimum: number];

const CONTRAST_PAIRS: ContrastPair[] = [
  ["text.primary", "bg.page", 4.5],
  ["text.primary", "bg.surface", 4.5],
  ["text.secondary", "bg.page", 4.5],
  ["text.secondary", "bg.surface", 4.5],
  ["text.tertiary", "bg.page", 4.5],
  ["text.tertiary", "bg.surface", 4.5],
  ["text.link", "bg.page", 4.5],
  ["text.link", "bg.surface", 4.5],
  ["text.link-hover", "bg.page", 4.5],
  ["text.inverse", "bg.inverse", 4.5],
  ["border.input", "bg.page", 3],
  ["border.input", "bg.surface", 3],
  ["border.focus", "bg.page", 3],
  ["border.focus", "bg.surface", 3],
  ["border.focus-inverse", "bg.inverse", 3],
  ...["success", "warning", "error", "info"].flatMap((kind) => [
    [`feedback.${kind}.text`, `feedback.${kind}.bg`, 4.5],
    [`feedback.${kind}.on-solid`, `feedback.${kind}.solid`, 4.5],
  ]),
  ...["default", "inverse", "destructive"].flatMap((kind) =>
    ["solid", "solid-hover", "solid-pressed"].map((state) => [
      `action.${kind}.on-solid`,
      `action.${kind}.${state}`,
      4.5,
    ]),
  ),
  ["action.default.text", "bg.page", 4.5],
  ["action.default.text", "bg.surface", 4.5],
  ["action.default.text", "action.default.subtle-hover", 4.5],
  ["action.default.text", "action.default.subtle-pressed", 4.5],
  ["action.destructive.text", "bg.surface", 4.5],
  ["action.destructive.text", "action.destructive.subtle-hover", 4.5],
  ["action.destructive.text", "action.destructive.subtle-pressed", 4.5],
  ["action.inverse.text", "bg.inverse", 4.5],
  ["action.inverse.text", "action.inverse.subtle-hover", 4.5],
  ["action.inverse.text", "action.inverse.subtle-pressed", 4.5],
];

function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4]
    .map((i) => Number.parseInt(hex.replace("#", "").slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string) {
  const [lighter, darker] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (lighter + 0.05) / (darker + 0.05);
}

export function validateTokens(dictionary: Dictionary) {
  const tokens = new Map(dictionary.allTokens.map((token) => [token.path.join("."), token]));
  const errors: string[] = [];

  for (const name of tokens.keys()) {
    if (!NAME_PATTERN.test(name)) {
      errors.push(
        `Token name "${name}" must be lowercase, dot-separated, with hyphens only inside a segment.`,
      );
    }
  }

  for (const [name, token] of tokens) {
    if (token.$type !== "fontFamilies") {
      continue;
    }
    for (const family of token.$value) {
      const bare = family.replace(/^"(.*)"$/, "$1");
      if (!KNOWN_FONT_FAMILIES.includes(bare)) {
        errors.push(
          `Token "${name}" uses font family "${bare}", which isn't declared by the CDN fonts.css (known: ${KNOWN_FONT_FAMILIES.join(", ")}).`,
        );
      }
    }
  }

  for (const [foreground, background, minimum] of CONTRAST_PAIRS) {
    const fg = tokens.get(`color.${foreground}`);
    const bg = tokens.get(`color.${background}`);
    if (!fg || !bg) {
      errors.push(
        `Contrast pair ${foreground} / ${background} refers to a token that doesn't exist.`,
      );
      continue;
    }
    const ratio = contrast(fg.$value, bg.$value);
    if (ratio < minimum) {
      errors.push(
        `${foreground} (${fg.$value}) on ${background} (${bg.$value}) has contrast ${ratio.toFixed(2)}:1, below ${minimum}:1.`,
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(`Token validation failed:\n${errors.map((e) => `  - ${e}`).join("\n")}`);
  }
}
