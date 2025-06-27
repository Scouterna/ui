import type { Meta, Preview } from "@storybook/react";
import * as Input from "../input/input.js";
import * as Field from "./field.js";

export default {
  title: "Components/Field",
  component: Field.Field,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta;

export const WithInput = {
  args: {
    children: (
      <>
        <Field.Label>Name</Field.Label>
        <Input.Input />
      </>
    ),
  },
} satisfies Preview;

export const WithValidation = {
  args: {
    validate: () => "Please enter a valid email address.",
    children: (
      <>
        <Field.Label>Email</Field.Label>
        <Input.Input />

        <Field.Error />
        <Field.Description>
          This field will always fail validation on blur.
        </Field.Description>
      </>
    ),
  },
} satisfies Preview;
