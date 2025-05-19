import type { Meta, Preview } from "@storybook/react";
import * as Select from "./select.js";

export default {
  title: "Components/Select",
  component: Select.Root,
  argTypes: {
    children: {
      control: false,
    },
  },
} satisfies Meta;

export const Simple = {
  args: {
    children: (
      <>
        <Select.Trigger>
          <Select.Value placeholder="Select an option" />
        </Select.Trigger>
        <Select.Content>
          <Select.Group>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
            <Select.Item value="option3">Option 3</Select.Item>
          </Select.Group>
        </Select.Content>
      </>
    ),
  },
} satisfies Preview;
