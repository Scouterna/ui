import type { Meta, Preview } from "@storybook/react";
import { TentTreeIcon } from "lucide-react";
import * as Callout from "./callout.js";

export default {
  title: "Components/Callout",
  component: Callout.Callout,
  argTypes: {
    children: {
      control: false,
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta;

export const Simple = {
  args: {
    children: "This is a callout component.",
  },
} satisfies Preview;

export const LongContent = {
  args: {
    children: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum eget
      urna in nulla finibus feugiat. Nulla facilisi. Sed varius eros at felis
      eleifend, nec venenatis risus tincidunt. Praesent ullamcorper arcu at
      ligula feugiat, in lacinia turpis consequat. Cras commodo enim sit amet
      justo ultrices, non fringilla felis dignissim. Donec pulvinar lectus non
      turpis eleifend, non lacinia magna accumsan. Nullam in elit magna. Ut ut
      urna sit amet nunc faucibus commodo.
    `,
  },
} satisfies Preview;

export const WithCustomIcon = {
  args: {
    children: "This callout has a custom icon.",
    icon: TentTreeIcon,
  },
} satisfies Preview;
