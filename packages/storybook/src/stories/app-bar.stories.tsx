import { ScoutAppBar, ScoutButton } from "@scouterna/ui-react";
import ArrowLeftIcon from "@phosphor-icons/core/assets/bold/arrow-left-bold.svg?raw";
import DotsIcon from "@phosphor-icons/core/assets/bold/dots-three-bold.svg?raw";

import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/App Bar",
  component: ScoutAppBar,
  parameters: {
    layout: "fullscreen",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {
    titleText: "App Bar Title",
  },
  render: (args) => <ScoutAppBar {...args} />,
});

export const WithSlottedButtons = BasicExample.extend({
  render: (args) => (
    <ScoutAppBar {...args}>
      <ScoutButton slot="prefix" iconStart={ArrowLeftIcon} iconOnly kind="tertiary" tone="inverse">
        Back
      </ScoutButton>
      <ScoutButton slot="suffix" iconStart={DotsIcon} iconOnly kind="tertiary" tone="inverse">
        More
      </ScoutButton>
    </ScoutAppBar>
  ),
});
