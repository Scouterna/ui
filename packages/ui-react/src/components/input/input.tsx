import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

import "../../style.css";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "placeholder"
> & {
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
            bg-gray-100 text-gray-dark
            text-base
            file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground
            focus-visible:outline-none
            focus-visible:border-gray-500
            disabled:cursor-not-allowed
            disabled:opacity-50
          `,
          className,
        )}
        ref={ref}
        {...props}
        // Explicitly set placeholder to empty string to avoid users ignoring
        // the types and passing placeholder anyways.
        placeholder=""
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
