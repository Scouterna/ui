import { Slot } from "@radix-ui/react-slot";
import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

export type FormFieldProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  label: string;
  labelFor: string;
};

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
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
FormField.displayName = "FormField";

export type FormLabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  // Make htmlFor required
  htmlFor: string;
};

const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ className, ...props }, ref) => {
    // biome-ignore lint/a11y/noLabelWithoutControl: It's there through the props
    return <label className={cn("")} ref={ref} {...props} />;
  },
);
FormLabel.displayName = "FormLabel";

export { FormField, FormLabel };
