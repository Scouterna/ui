import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

import "../../style.css";

const buttonVariants = cva(
  "font-sans font-medium px-4 h-10 rounded-lg cursor-pointer ring-offset-2 border border-transparent disabled:opacity-40",
  {
    variants: {
      x: {
        orange: "",
        text: "",
        outlined: "",
      },
      variant: {
        contained: "",
        text: "",
        outlined: "",
      },
      color: {
        blue: "",
        orange: "",
        text: "",
        outlined: "",
      },
      size: {
        default: "",
      },
    },
    compoundVariants: [
      {
        variant: "contained",
        color: "blue",
        className:
          "text-white bg-blue disabled:bg-blue hover:bg-blue-hover active:bg-blue-active focus-visible:bg-blue focus-visible:ring-2 focus-visible:ring-blue focus-visible:outline-none",
      },
      {
        variant: "contained",
        color: "orange",
        className:
          "text-white bg-orange disabled:bg-orange hover:bg-orange-hover active:bg-orange-active focus-visible:bg-orange focus-visible:ring-2 focus-visible:ring-orange focus-visible:outline-none",
      },
      {
        variant: "text",
        color: "blue",
        className:
          "text-blue bg-transparent disabled:bg-transparent hover:bg-bluegray-100 active:bg-bluegray-200 focus-visible:bg-bluegray-100 focus-visible:ring-2 focus-visible:ring-bluegray-300 focus-visible:outline-none",
      },
      {
        variant: "outlined",
        color: "blue",
        className:
          "text-blue border-blue-600 bg-transparent disabled:bg-transparent hover:bg-bluegray-100 active:bg-bluegray-200 focus-visible:bg-bluegray-100 focus-visible:ring-2 focus-visible:ring-bluegray-300 focus-visible:outline-none",
      },
    ],
    defaultVariants: {
      variant: "contained",
      color: "blue",
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
  ({ className, variant, color, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, color, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
