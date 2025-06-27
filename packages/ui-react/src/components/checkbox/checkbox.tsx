import { Checkbox as CheckboxPrimitive } from "@base-ui-components/react/checkbox";
import { CheckIcon } from "lucide-react";
import { cn } from "../../lib/utils.js";

export type CheckboxProps = CheckboxPrimitive.Root.Props;

const Checkbox = ({ className, children, ...props }: CheckboxProps) => {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: The CheckboxPrimitive.Root is the control
    <label className="flex items-center text-gray-dark">
      <CheckboxPrimitive.Root
        className={cn(
          `
            flex items-center justify-center
            size-6
            rounded-md appearance-none
            bg-gray-100 border-gray-400
            hover:bg-gray-200 border
            focus-visible:outline-none
            focus-visible:border-gray-500
            focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2
            disabled:cursor-not-allowed
            disabled:opacity-50
          `,
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="size-5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <span className="pl-2 text-sm leading-none">{children}</span>
    </label>
  );
};

export { Checkbox };
