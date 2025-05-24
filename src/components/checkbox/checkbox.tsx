import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { forwardRef, useId } from "react";
import { cn } from "../../lib/utils.js";

import "../../style.css";

const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, id, children, ...props }, ref) => {
  const autoId = useId();
  id = id || autoId;

  return (
    <div className="flex items-center text-gray-dark">
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
        id={id}
        {...props}
      >
        <CheckboxPrimitive.Indicator>
          <CheckIcon className="size-5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label className="pl-2 text-sm leading-none" htmlFor={id}>
        {children}
      </label>
    </div>
  );
});
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
