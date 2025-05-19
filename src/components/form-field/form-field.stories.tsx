import type { Meta, Preview } from "@storybook/react";
import * as Input from "../input/input.js";
import * as Form from "./form-field.js";

export default {
  title: "Components/Form Field",
  component: Form.Field,
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
        <Form.Label htmlFor="my-input">Email</Form.Label>
        <Input.Input id="my-input" />
      </>
    ),
  },
} satisfies Preview;
