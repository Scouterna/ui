import type { Meta, Preview } from "@storybook/react";
import * as Input from "./input.js";

export default {
  title: "Components/Input",
  component: Input.Input,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta;

export const Simple = {
  args: {
    placeholder: "Enter text",
  },
} satisfies Preview;
