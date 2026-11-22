import {
  Component,
  type ComponentInterface,
  Element,
  Event,
  type EventEmitter,
  h,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import focusLock from "dom-focus-lock";

import { arrowLeftBold as backIcon, xBold as exitIcon } from "../../utils/icons";

@Component({
  tag: "scout-drawer",
  styleUrl: "drawer.css",
  shadow: {
    delegatesFocus: true,
  },
})
export class ScoutDrawer implements ComponentInterface {
  @Element() rootElement!: HTMLElement;
  /**
   * Open/close state of the drawer.
   */
  @Prop() open: boolean = false;
  /**
   * Heading within the sheet.
   */
  @Prop() heading: string = "";
  /**
   * Render back button.
   */
  @Prop() showBackButton: boolean = false;
  /**
   * Back button label.
   */
  @Prop() backButtonLabel: string = "";
  /**
   * Render exit button.
   */
  @Prop() showExitButton: boolean = false;
  /**
   * Exit button label.
   */
  @Prop() exitButtonLabel: string = "";
  /**
   * Disable backdrop for the drawer.
   */
  @Prop() disableBackdrop: boolean = false;

  /**
   * Disable drawer content padding. Use only if you have specific use case and you need to use full width.
   */
  @Prop() disableContentPadding: boolean = false;

  @State() drawerState: "opening" | "closing" | "open" | "closed" = "closed";
  @State() focusedNode: Element | null = null;

  private slotRef?: HTMLSlotElement;
  // Stable reference required: dom-focus-lock's `off` removes a trap by
  // identity (`node !== domNode`), so `on`/`off` must be called with the
  // exact same array instance.
  private readonly focusTrapNodes: HTMLElement[] = [];

  componentWillLoad(): Promise<void> | void {
    this.focusedNode = document.activeElement;
  }
  componentDidLoad(): void {
    if (this.open) {
      this.setDrawerOpenState(true);
    }
  }
  /**
   * Fired when clicking backButton (<-)
   */
  @Event() backButtonClicked!: EventEmitter<void>;

  /**
   * Fired when clicking backButton (X). Also sent when clicking the backdrop.
   */
  @Event() exitButtonClicked!: EventEmitter<void>;

  onBackButtonClick() {
    this.backButtonClicked.emit();
  }
  onExitButtonClick() {
    this.exitButtonClicked.emit();
  }

  @Watch("open")
  setDrawerOpenState(open: boolean) {
    const drawer = this.rootElement.shadowRoot?.querySelector(
      ".drawer--container",
    ) as HTMLElement | null;

    if (!drawer) {
      this.drawerState = open ? "opening" : "closing";
      console.error("Drawer element is null");
      return;
    }

    if (open) {
      this.drawerState = "opening";
      this.updateFocusTrapNodes();
      focusLock.on(this.focusTrapNodes);
    } else {
      focusLock.off(this.focusTrapNodes);
      this.drawerState = "closing";
    }
  }

  /**
   * dom-focus-lock's containment check treats any node that has its own
   * shadow root as opaque: it only looks inside that node's shadow root and
   * never at its light-DOM (slotted) children. This component has both
   * shadow-internal buttons (back/exit) and arbitrary slotted content, so
   * neither `rootElement` nor the internal `.drawer--container` works as a
   * single trap target — either one makes the check blind to the other kind
   * of content, and slotted inputs never register as focused, breaking the
   * trap by yanking focus back to the exit button on every click. Handing
   * the lock the concrete focusable roots directly (the shadow buttons, plus
   * the slot's actual assigned elements) works because none of those nodes
   * have their own shadow root, so native containment resolves correctly.
   */
  private updateFocusTrapNodes() {
    const shadowButtons = Array.from(
      this.rootElement.shadowRoot?.querySelectorAll<HTMLElement>(".exit-button, .back-button") ??
        [],
    );
    const slotted = (this.slotRef?.assignedElements() ?? []) as HTMLElement[];
    this.focusTrapNodes.length = 0;
    this.focusTrapNodes.push(...shadowButtons, ...slotted);
  }

  render() {
    const shouldRenderHeader = this.heading || this.showBackButton || this.showExitButton;

    const getDrawerStateClass = (state: string) => {
      switch (state) {
        case "opening":
        case "open":
          return "open";
        case "closing":
          return "close";
      }
    };

    return (
      <div class="drawer">
        {!this.disableBackdrop && (
          <div
            onClick={() => {
              this.onExitButtonClick();
            }}
            class={`backdrop ${this.drawerState !== "closed" ? "backdrop-visible" : "backdrop-hidden"}`}
          ></div>
        )}
        <div
          class={`drawer--container ${getDrawerStateClass(this.drawerState)}`}
          onAnimationEnd={() => {
            this.drawerState = this.open ? "open" : "closed";
          }}
        >
          {shouldRenderHeader && (
            <div class="header--wrapper">
              {this.showBackButton && (
                <button type="button" class="back-button" onClick={() => this.onBackButtonClick()}>
                  <span class="icon" innerHTML={backIcon}></span>
                  <span class="visually-hidden">{this.backButtonLabel}</span>
                </button>
              )}
              {this.showExitButton && (
                <button type="button" class="exit-button" onClick={() => this.onExitButtonClick()}>
                  <span class="icon" innerHTML={exitIcon}></span>
                  <span class="visually-hidden">{this.exitButtonLabel}</span>
                </button>
              )}
              {this.heading && <h3 class="heading">{this.heading}</h3>}
            </div>
          )}
          <div
            class={`content--wrapper ${this.disableContentPadding ? "content--wrapper--no-padding" : ""}`}
          >
            <slot
              ref={(el) => {
                const slot = el as HTMLSlotElement | undefined;
                if (slot && slot !== this.slotRef) {
                  // The consumer's top-level slotted node can be swapped out
                  // entirely (e.g. a form replaced by a loading indicator)
                  // while the drawer stays open, which doesn't trigger the
                  // `open` watcher. `slotchange` fires whenever the directly
                  // assigned node(s) change, so re-sync the trap then too.
                  slot.addEventListener("slotchange", () => this.updateFocusTrapNodes());
                }
                this.slotRef = slot;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
