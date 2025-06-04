import * as LabelPrimitive from "@radix-ui/react-label";
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
      <Comp className={cn("", className)} ref={ref} {...props}>
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

const Label = forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <LabelPrimitive.Root
      className={cn("font-bold text-sm text-gray-dark")}
      ref={ref}
      {...props}
    />
  );
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Field, Label };
