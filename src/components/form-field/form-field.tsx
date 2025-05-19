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

export { Field, Label };
