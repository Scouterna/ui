import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

import "../../style.css";

const buttonVariants = cva(
  "flex items-center justify-center leading-none font-sans font-medium px-4 h-10 rounded-lg cursor-pointer ring-offset-2 border border-transparent disabled:opacity-40",
  {
    variants: {
      color: {
        blue: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-blue)]
          [--btn-bg:var(--color-blue)]
          [--btn-bg-hover:var(--color-blue-hover)]
          [--btn-bg-active:var(--color-blue-active)]
          
          [--btn-text-border:var(--color-blue-600)]
          [--btn-bg-text-hover:var(--color-bluegray-100)]
          [--btn-bg-text-active:var(--color-bluegray-200)]
        `,
        orange: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-orange)]
          [--btn-bg:var(--color-orange)]
          [--btn-bg-hover:var(--color-orange-hover)]
          [--btn-bg-active:var(--color-orange-active)]
          
          [--btn-text-border:var(--color-orange)]
          [--btn-bg-text-hover:var(--color-orange-100)]
          [--btn-bg-text-active:var(--color-orange-200)]
        `,
        red: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-red)]
          [--btn-bg:var(--color-red)]
          [--btn-bg-hover:var(--color-red-hover)]
          [--btn-bg-active:var(--color-red-active)]
          
          [--btn-text-border:var(--color-red)]
          [--btn-bg-text-hover:var(--color-red-100)]
          [--btn-bg-text-active:var(--color-red-200)]
        `,
        trackergreen: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-trackergreen)]
          [--btn-bg:var(--color-trackergreen)]
          [--btn-bg-hover:var(--color-trackergreen-hover)]
          [--btn-bg-active:var(--color-trackergreen-active)]
          
          [--btn-text-border:var(--color-trackergreen)]
          [--btn-bg-text-hover:var(--color-trackergreen-100)]
          [--btn-bg-text-active:var(--color-trackergreen-200)]
        `,
        discovererblue: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-discovererblue)]
          [--btn-bg:var(--color-discovererblue)]
          [--btn-bg-hover:var(--color-discovererblue-hover)]
          [--btn-bg-active:var(--color-discovererblue-active)]
          
          [--btn-text-border:var(--color-discovererblue)]
          [--btn-bg-text-hover:var(--color-discovererblue-100)]
          [--btn-bg-text-active:var(--color-discovererblue-200)]
        `,
        adventurerorange: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-adventurerorange)]
          [--btn-bg:var(--color-adventurerorange)]
          [--btn-bg-hover:var(--color-adventurerorange-hover)]
          [--btn-bg-active:var(--color-adventurerorange-active)]
          
          [--btn-text-border:var(--color-adventurerorange)]
          [--btn-bg-text-hover:var(--color-adventurerorange-100)]
          [--btn-bg-text-active:var(--color-adventurerorange-200)]
        `,
        challengerpink: `
          [--btn-text:var(--color-white)]
          [--btn-border:var(--color-challengerpink)]
          [--btn-bg:var(--color-challengerpink)]
          [--btn-bg-hover:var(--color-challengerpink-hover)]
          [--btn-bg-active:var(--color-challengerpink-active)]
          
          [--btn-text-border:var(--color-challengerpink)]
          [--btn-bg-text-hover:var(--color-challengerpink-100)]
          [--btn-bg-text-active:var(--color-challengerpink-200)]
        `,
        roveryellow: `
          [--btn-text:var(--color-gray-dark)]
          [--btn-border:var(--color-roveryellow)]
          [--btn-bg:var(--color-roveryellow)]
          [--btn-bg-hover:var(--color-roveryellow-hover)]
          [--btn-bg-active:var(--color-roveryellow-active)]
          
          [--btn-text-border:var(--color-roveryellow)]
          [--btn-bg-text-hover:var(--color-roveryellow-100)]
          [--btn-bg-text-active:var(--color-roveryellow-200)]
        `,
      },
      variant: {
        contained: `
          text-(--btn-text) bg-(--btn-bg)
          disabled:bg-(--btn-bg)
          hover:bg-(--btn-bg-hover)
          active:bg-(--btn-bg-active)
          focus-visible:bg-(--btn-bg) focus-visible:ring-2 focus-visible:ring-(--btn-border) focus-visible:outline-none
        `,
        text: `
          text-(--btn-bg) bg-transparent
          disabled:bg-transparent
          hover:bg-(--btn-bg-text-hover)
          active:bg-(--btn-bg-text-active)
          focus-visible:bg-(--btn-bg-text-hover) focus-visible:ring-2 focus-visible:ring-(--btn-text-outline) focus-visible:outline-none
        `,
        outlined: `
          text-(--btn-bg) border-(--btn-border) bg-transparent
          disabled:bg-transparent
          hover:bg-(--btn-bg-text-hover)
          active:bg-(--btn-bg-text-active)
          focus-visible:bg-(--btn-bg-text-hover) focus-visible:ring-2 focus-visible:ring-(--btn-text-outline) focus-visible:outline-none
        `,
      },
      size: {
        default: "",
      },
    },
    defaultVariants: {
      color: "blue",
      variant: "contained",
      size: "default",
    },
  },
);

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, color, variant, size, children, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ color, variant, size, className }))}
        ref={ref}
        {...props}
      >
        {/* <span> */}
        {children}
        {/* </span> */}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button };
