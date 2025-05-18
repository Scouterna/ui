import type { Meta, Preview } from "@storybook/react";
import * as Form from "./Form.js";

export default {
  component: Form.Field,
  argTypes: {
    children: {
      // biome-ignore lint/suspicious/noExplicitAny: There is no proper way to hide it
      control: "hidden" as any,
    },
  },
} satisfies Meta;

export const FullExample = {
  args: {
    children: (
      <>
        <Form.Label htmlFor="my-input">Email</Form.Label>
        <Form.Input id="my-input" />
      </>
    ),
  },
} satisfies Preview;
