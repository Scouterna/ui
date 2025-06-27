import { Input as InputPrimitive } from "@base-ui-components/react/input";
import { cn } from "../../lib/utils.js";

export type InputProps = Omit<InputPrimitive.Props, "placeholder">;

const Input = ({ className, type = "text", ...props }: InputProps) => {
  return (
    <InputPrimitive
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
      {...props}
      // Explicitly set placeholder to empty string to prevent users from
      // ignoring the types and passing placeholder anyways.
      placeholder=""
    />
  );
};

export { Input };
