# scout-button



<!-- Auto Generated Below -->


## Overview

A button component that can be used either as a normal button or as a link.
Will render a `<button>` element when the `type` is set to "button",
"submit", or "reset", and an `<a>` element when the `type` is set to "link".

## Properties

| Property    | Attribute    | Description                                                                                                                                                                                                                                                                             | Type                                        | Default       |
| ----------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------- | ------------- |
| `disabled`  | `disabled`   | Whether the button is disabled. Disabled buttons are not clickable and excluded from tab order. Use only when absolutely necessary.                                                                                                                                                     | `boolean`                                   | `false`       |
| `href`      | `href`       |                                                                                                                                                                                                                                                                                         | `string`                                    | `undefined`   |
| `iconEnd`   | `icon-end`   | An optional icon shown after the label. Must be an SVG string.                                                                                                                                                                                                                          | `string`                                    | `undefined`   |
| `iconOnly`  | `icon-only`  | Show only the icon and hide the label visually. The label is still available to assistive technology. Uses `iconStart`, or `iconEnd` if no start icon is set.                                                                                                                           | `boolean`                                   | `false`       |
| `iconStart` | `icon-start` | An optional icon shown before the label. Must be an SVG string.                                                                                                                                                                                                                         | `string`                                    | `undefined`   |
| `kind`      | `kind`       | The emphasis of the button. Use at most one primary button per view or section. Secondary is the default for most actions. Tertiary is for low-emphasis actions such as "Cancel".                                                                                                       | `"primary" \| "secondary" \| "tertiary"`    | `"secondary"` |
| `loading`   | `loading`    | Whether the button is in a loading state. Shows a centered spinner and hides content.                                                                                                                                                                                                   | `boolean`                                   | `false`       |
| `rel`       | `rel`        |                                                                                                                                                                                                                                                                                         | `string`                                    | `undefined`   |
| `shape`     | `shape`      | The shape of the button. `cut` is an expressive shape for prominent actions on brand surfaces. `arrow` is for calls to action that navigate somewhere. Tertiary buttons are always `default`, and destructive buttons have no `arrow`. Unsupported combinations fall back to `default`. | `"arrow" \| "cut" \| "default"`             | `"default"`   |
| `size`      | `size`       | Size of the button: small (32px), medium (40px) or large (48px).                                                                                                                                                                                                                        | `"lg" \| "md" \| "sm"`                      | `"md"`        |
| `target`    | `target`     |                                                                                                                                                                                                                                                                                         | `string`                                    | `undefined`   |
| `tone`      | `tone`       | The tone of the button. Use `inverse` on dark surfaces and `destructive` for actions that delete or remove something.                                                                                                                                                                   | `"default" \| "destructive" \| "inverse"`   | `"default"`   |
| `type`      | `type`       |                                                                                                                                                                                                                                                                                         | `"button" \| "link" \| "reset" \| "submit"` | `"button"`    |


## Events

| Event        | Description | Type                |
| ------------ | ----------- | ------------------- |
| `scoutClick` |             | `CustomEvent<void>` |


## Slots

| Slot | Description      |
| ---- | ---------------- |
|      | The default slot |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
