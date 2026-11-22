import {
  ScoutDivider,
  ScoutListView,
  ScoutListViewItem,
  ScoutListViewSubheader,
} from "@scouterna/ui-react";
import BoxIcon from "@phosphor-icons/core/assets/fill/cube-fill.svg?raw";
import ClipboardDataIcon from "@phosphor-icons/core/assets/fill/chart-bar-fill.svg?raw";
import LogoutIcon from "@phosphor-icons/core/assets/fill/sign-out-fill.svg?raw";
import WorldIcon from "@phosphor-icons/core/assets/fill/globe-fill.svg?raw";

import preview from "#.storybook/preview";

const meta = preview.meta({
  title: "Interaction/List View",
  component: ScoutListView,
  parameters: {
    layout: "centered",
  },
});

export default meta;

export const BasicExample = meta.story({
  args: {},
  render: (args) => (
    <div style={{ maxWidth: "20rem", width: "100vw" }}>
      <ScoutListView {...args}>
        <ScoutListViewItem icon={ClipboardDataIcon} primary="SignupInfo" type="button" />
        <ScoutListViewItem
          icon={WorldIcon}
          primary="Scouterna.se"
          secondary="Opens in new tab"
          type="link"
          href="https://scouterna.se"
          target="_blank"
          rel="noopener noreferrer"
        />
      </ScoutListView>
      <ScoutDivider />
      <ScoutListView {...args}>
        <ScoutListViewItem icon={LogoutIcon} primary="Logout" type="button" />
      </ScoutListView>
    </div>
  ),
});

export const WithSections = meta.story({
  args: {},
  render: (args) => (
    <div style={{ maxWidth: "20rem", width: "100vw" }}>
      <ScoutListView {...args}>
        <ScoutListViewSubheader text="First section" />
        <ScoutListViewItem icon={BoxIcon} primary="First item" />
        <ScoutListViewItem icon={BoxIcon} primary="Second item" />
        <ScoutListViewSubheader text="Second section" />
        <ScoutListViewItem icon={BoxIcon} primary="Third item" />
        <ScoutListViewItem icon={BoxIcon} primary="Fourth item" />
        <ScoutListViewItem icon={BoxIcon} primary="Fifth item" />
        <ScoutListViewSubheader text="Third section" />
        <ScoutListViewItem icon={BoxIcon} primary="Sixth item" />
        <ScoutListViewItem icon={BoxIcon} primary="Seventh item" />
      </ScoutListView>
    </div>
  ),
});

export const WithRadioButtons = meta.story({
  args: {},
  render: (args) => (
    <div style={{ maxWidth: "20rem", width: "100vw" }}>
      <ScoutListView {...args}>
        <ScoutListViewItem
          type="radio"
          primary="First item"
          value="first"
          name="list-view-radio-group"
        />
        <ScoutListViewItem
          type="radio"
          primary="Second item"
          value="second"
          name="list-view-radio-group"
        />
        <ScoutListViewItem
          type="radio"
          primary="Third item"
          value="third"
          name="list-view-radio-group"
        />
      </ScoutListView>
    </div>
  ),
});

export const WithCheckboxes = meta.story({
  render: (args) => (
    <div style={{ maxWidth: "20rem", width: "100vw" }}>
      <ScoutListView {...args}>
        <ScoutListViewItem type="checkbox" primary="First item" />
        <ScoutListViewItem type="checkbox" primary="Second item" />
        <ScoutListViewItem type="checkbox" primary="Third item" />
      </ScoutListView>
    </div>
  ),
});
