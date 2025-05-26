import type { Meta, Preview } from "@storybook/react";
import { fn } from "@storybook/test";
import * as Checkbox from "./checkbox.js";

export default {
  title: "Components/Checkbox",
  component: Checkbox.Checkbox,
  args: {
    onCheckedChange: fn(),
  },
} satisfies Meta;

export const Simple = {
  args: {
    children: "Accept terms and conditions.",
  },
} satisfies Preview;
