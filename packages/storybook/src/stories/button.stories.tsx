import { ScoutButton } from "@scouterna/ui-react";
import ArrowLeftIcon from "@tabler/icons/outline/arrow-left.svg?raw";
import ExternalLinkIcon from "@tabler/icons/outline/external-link.svg?raw";
import PencilIcon from "@tabler/icons/outline/pencil.svg?raw";
import TrashIcon from "@tabler/icons/outline/trash.svg?raw";

import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/Button",
  component: ScoutButton,
  parameters: {
    layout: "centered",
  },
  render: (args) => <ScoutButton {...args}>Knapp</ScoutButton>,
});

export default meta;

export const Primary = meta.story({
  args: { kind: "primary" },
});

export const Secondary = meta.story({
  args: { kind: "secondary" },
});

export const Tertiary = meta.story({
  args: { kind: "tertiary" },
});

export const Destructive = meta.story({
  args: { kind: "primary", tone: "destructive", iconStart: TrashIcon },
  render: (args) => <ScoutButton {...args}>Radera</ScoutButton>,
});

export const Inverse = meta.story({
  args: { kind: "primary", tone: "inverse" },
  decorators: [
    (Story) => (
      <div style={{ padding: 24, background: "var(--color-bg-inverse)" }}>
        <Story />
      </div>
    ),
  ],
});

export const Cut = meta.story({
  args: { kind: "primary", shape: "cut" },
});

export const Arrow = meta.story({
  args: { kind: "primary", shape: "arrow" },
  render: (args) => <ScoutButton {...args}>Kom igång</ScoutButton>,
});

export const SecondaryArrow = meta.story({
  args: { kind: "secondary", shape: "arrow" },
  render: (args) => <ScoutButton {...args}>Visa fler</ScoutButton>,
});

export const Sizes = meta.story({
  args: { kind: "primary" },
  render: (args) => (
    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <ScoutButton {...args} size="sm">
        Liten
      </ScoutButton>
      <ScoutButton {...args} size="md">
        Medium
      </ScoutButton>
      <ScoutButton {...args} size="lg">
        Stor
      </ScoutButton>
    </div>
  ),
});

export const WithIcons = meta.story({
  args: { kind: "primary", iconStart: PencilIcon },
  render: (args) => <ScoutButton {...args}>Redigera</ScoutButton>,
});

export const Link = meta.story({
  args: {
    type: "link",
    kind: "primary",
    iconEnd: ExternalLinkIcon,
    href: "https://www.google.com",
    target: "_blank",
    rel: "noopener noreferrer",
  },
  render: (args) => <ScoutButton {...args}>Öppna Google</ScoutButton>,
});

export const Disabled = meta.story({
  args: { kind: "primary", disabled: true },
});

export const Loading = meta.story({
  args: { kind: "primary", loading: true, iconStart: PencilIcon },
});

export const IconOnly = meta.story({
  args: { iconStart: ArrowLeftIcon, iconOnly: true },
  render: (args) => <ScoutButton {...args}>Tillbaka</ScoutButton>,
});
