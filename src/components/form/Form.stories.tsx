import type { Meta, Preview } from "@storybook/react";
import { FormField, FormLabel } from "./Form.js";

export default {
  component: FormField,
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
        <FormLabel htmlFor="input">Hello!</FormLabel>
      </>
    ),
  },
} satisfies Preview;
