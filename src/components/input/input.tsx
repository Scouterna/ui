import { forwardRef } from "react";
import { cn } from "../../lib/utils.js";

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
            placeholder:text-gray-5500
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

export { Input };
