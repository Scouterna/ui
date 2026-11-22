import { Component, Event, type EventEmitter, Host, h, Prop } from "@stencil/core";
import Loader2Icon from "@tabler/icons/outline/loader-2.svg";

export type Kind = "primary" | "secondary" | "tertiary";
export type Tone = "default" | "inverse" | "destructive";
export type Size = "sm" | "md" | "lg";
export type Shape = "default" | "cut" | "arrow";

/**
 * A button component that can be used either as a normal button or as a link.
 * Will render a `<button>` element when the `type` is set to "button",
 * "submit", or "reset", and an `<a>` element when the `type` is set to "link".
 */
@Component({
  tag: "scout-button",
  styleUrl: "button.css",
})
export class ScoutButton {
  @Prop() type: "button" | "submit" | "reset" | "link" = "button";

  @Prop() href?: string;
  @Prop() target?: string;
  @Prop() rel?: string;

  /**
   * The emphasis of the button. Use at most one primary button per view or
   * section. Secondary is the default for most actions. Tertiary is for
   * low-emphasis actions such as "Cancel".
   */
  @Prop() kind: Kind = "secondary";

  /**
   * The tone of the button. Use `inverse` on dark surfaces and `destructive`
   * for actions that delete or remove something.
   */
  @Prop() tone: Tone = "default";

  /**
   * Size of the button: small (32px), medium (40px) or large (48px).
   */
  @Prop() size: Size = "md";

  /**
   * The shape of the button. `cut` is an expressive shape for prominent actions
   * on brand surfaces. `arrow` is for calls to action that navigate somewhere.
   * Tertiary buttons are always `default`, and destructive buttons have no
   * `arrow`. Unsupported combinations fall back to `default`.
   */
  @Prop() shape: Shape = "default";

  /**
   * An optional icon shown before the label. Must be an SVG string.
   */
  @Prop() iconStart?: string;

  /**
   * An optional icon shown after the label. Must be an SVG string.
   */
  @Prop() iconEnd?: string;

  /**
   * Show only the icon and hide the label visually. The label is still
   * available to assistive technology. Uses `iconStart`, or `iconEnd` if no
   * start icon is set.
   */
  @Prop() iconOnly: boolean = false;

  /**
   * Whether the button is disabled. Disabled buttons are not clickable and
   * excluded from tab order. Use only when absolutely necessary.
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the button is in a loading state. Shows a centered spinner and hides content.
   */
  @Prop() loading: boolean = false;

  @Event() scoutClick!: EventEmitter<void>;

  render() {
    const Tag = this.type === "link" ? "a" : "button";

    const isDisabled = this.disabled || this.loading;

    const props =
      this.type === "link"
        ? {
            href: isDisabled ? undefined : this.href,
            target: this.target,
            // This might not be our job, but better safe than sorry.
            rel: this.rel ?? (this.target === "_blank" ? "noopener noreferrer" : undefined),
            "aria-disabled": isDisabled ? "true" : undefined,
          }
        : {
            type: this.type,
            disabled: isDisabled,
          };

    const shape: Shape =
      this.kind === "tertiary" || (this.tone === "destructive" && this.shape === "arrow")
        ? "default"
        : this.shape;

    const iconStart = this.iconOnly ? (this.iconStart ?? this.iconEnd) : this.iconStart;
    const iconEnd = this.iconOnly ? undefined : this.iconEnd;

    return (
      <Host
        class={{
          "size-sm": this.size === "sm",
          "size-lg": this.size === "lg",
          "has-icon-start": !!iconStart,
          "has-icon-end": !!iconEnd,
          "icon-only": !!this.iconOnly,
          loading: !!this.loading,
        }}
      >
        <Tag
          class={`button kind-${this.kind} tone-${this.tone} shape-${shape}`}
          onClick={(e) => {
            if (isDisabled) {
              e.preventDefault();
              return;
            }
            this.scoutClick.emit();
          }}
          {...props}
        >
          {iconStart && <span class="icon" aria-hidden="true" innerHTML={iconStart} />}
          <span class="content">
            <slot />
          </span>
          {iconEnd && <span class="icon" aria-hidden="true" innerHTML={iconEnd} />}
          <span class="spinner" style={{ "--icon-url": `url(${Loader2Icon})` }} />
        </Tag>
      </Host>
    );
  }
}
