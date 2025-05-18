import type { StorybookConfig } from "@storybook/react-vite";

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@storybook/addon-essentials", "@storybook/experimental-addon-test"],
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
