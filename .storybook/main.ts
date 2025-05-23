import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: [
    "../src/overview.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/experimental-addon-test",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  previewHead: (head) => {
    return `
      ${head}
      <link rel="preconnect" href="https://cdn.scouterna.net" crossorigin>
      <link href="https://cdn.scouterna.net/fonts/fonts.css" rel="stylesheet">
    `;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
} satisfies StorybookConfig;
export default config;
