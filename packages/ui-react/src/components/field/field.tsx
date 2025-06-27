import { Field } from "@base-ui-components/react/field";
import { cn } from "../../lib/utils.js";

export type FieldProps = React.HTMLAttributes<HTMLDivElement> & {
  asChild?: boolean;
  label: string;
  labelFor: string;
};

const Root = Field.Root;
const Control = Field.Control;
const Validity = Field.Validity;

const FieldError = ({ className, ...props }: Field.Error.Props) => {
  return (
    <Field.Error className={cn("text-sm text-red", className)} {...props} />
  );
};

const Description = ({ className, ...props }: Field.Description.Props) => {
  return (
    <Field.Description
      className={cn("text-sm text-gray-800", className)}
      {...props}
    />
  );
};

const Label = ({ className, ...props }: Field.Label.Props) => {
  return (
    <Field.Label
      className={cn("font-bold text-sm text-gray-dark", className)}
      {...props}
    />
  );
};

export {
  Root as Field,
  Control,
  Validity,
  FieldError as Error,
  Description,
  Label,
};
