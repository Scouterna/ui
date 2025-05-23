import type { Meta, Preview } from "@storybook/react";
import * as Select from "./select.js";
import { fn } from "@storybook/test";

export default {
  title: "Components/Select",
  component: Select.Root,
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    onValueChange: fn(),
  },
  decorators: [
    (Story) => (
      <div className="p-24 max-w-lg">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export const Simple = {
  args: {
    placeholder: "Select an option",
    children: (
      <>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
      </>
    ),
  },
} satisfies Preview;

export const WithGroups = {
  args: {
    placeholder: "Select an option",
    children: (
      <>
        <Select.Group>
          <Select.Label>Symmetriska knopar</Select.Label>
          <Select.Item value="option1-1">Råbandsknop</Select.Item>
          <Select.Item value="option1-2">Dubbelt halvslag</Select.Item>
          <Select.Item value="option1-3">Trumpetstek</Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Osymmetriska knopar</Select.Label>
          <Select.Item value="option2-1">Skotstek</Select.Item>
          <Select.Item value="option2-2">Smugglarstek</Select.Item>
          <Select.Item value="option2-3">Tältlineknop</Select.Item>
        </Select.Group>
      </>
    ),
  },
} satisfies Preview;

export const WithDisabledItems = {
  args: {
    placeholder: "Select an option",
    children: (
      <>
        <Select.Item value="option1">Option 1</Select.Item>
        <Select.Item value="option2">Option 2</Select.Item>
        <Select.Item value="option3">Option 3</Select.Item>
        <Select.Item value="option4" disabled>
          Option 4
        </Select.Item>
        <Select.Item value="option5" disabled>
          Option 5
        </Select.Item>
        <Select.Item value="option6">Option 6</Select.Item>
      </>
    ),
  },
} satisfies Preview;
