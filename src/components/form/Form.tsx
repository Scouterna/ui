import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  label: string;
  labelFor: string;
};

const Field = forwardRef<HTMLDivElement, FieldProps>(
  (
    { className, asChild = false, label, labelFor, children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp className={cn("")} ref={ref} {...props}>
        {children}
      </Comp>
    );
  },
);
Field.displayName = "Field";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  // Make htmlFor required
  htmlFor: string;
};

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      // biome-ignore lint/a11y/noLabelWithoutControl: It's there through the props
      <label
        className={cn("font-bold text-sm text-gray-dark")}
        ref={ref}
        {...props}
      />
    );
  },
);
Label.displayName = "Label";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  // Make id required
  id: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `
            flex
            h-10 w-full px-3 py-2
            rounded-lg
            border border-gray-300
            bg-gray-100
            text-base
            file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
            placeholder:text-muted-foreground
            focus-visible:outline-none
            focus-visible:border-gray-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          `,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Field, Label, Input };
