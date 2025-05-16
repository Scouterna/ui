import type { Meta } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "./Button.js";

export default {
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Click me",
    onClick: fn(),
  },
  argTypes: {
    disabled: {
      type: "boolean",
    },
  },
} satisfies Meta;

export const Contained = {
  args: {
    variant: "contained",
  },
};

export const Text = {
  args: {
    variant: "text",
  },
};

export const Outlined = {
  args: {
    variant: "outlined",
  },
};
