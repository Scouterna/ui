import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckIcon,
  CircleAlertIcon,
  InfoIcon,
  type LucideIcon,
  TriangleAlertIcon,
} from "lucide-react";

import { cn } from "../../lib/utils.js";

const calloutVariants = cva(
  `
    flex gap-2
    p-4
    border
    rounded-lg
  `,
  {
    variants: {
      variant: {
        default: `
          [--callout-icon-color:var(--color-gray-dark)]
          bg-gray-light text-gray-dark
          border-gray-300
        `,
        info: `
          [--callout-icon-color:var(--color-blue-00)]
          bg-blue-100 text-blue-800
          border-blue-200
        `,
        warning: `
          [--callout-icon-color:var(--color-orange-800)]
          bg-orange-100 text-orange-800
          border-orange-200
        `,
        error: `
          [--callout-icon-color:var(--color-red-800)]
          bg-red-100 text-red-800
          border-red-200
        `,
        success: `
          [--callout-icon-color:var(--color-trackergreen-800)]
          bg-trackergreen-100 text-trackergreen-800
          border-trackergreen-200
        `,
      },
    },
  },
);

type Variants = NonNullable<VariantProps<typeof calloutVariants>["variant"]>;
const variantIcons: Record<Variants, LucideIcon> = {
  default: InfoIcon,
  info: InfoIcon,
  warning: CircleAlertIcon,
  error: TriangleAlertIcon,
  success: CheckIcon,
};

export type CalloutProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof calloutVariants> & {
    icon?: LucideIcon;
  };

const Callout = ({ className, variant, children, ...props }: CalloutProps) => {
  variant = variant || "default";
  const Icon = props.icon || variantIcons[variant];

  return (
    <div className={cn(calloutVariants({ variant, className }))} {...props}>
      <div>
        <Icon className="h-6 w-6 text-(--callout-icon-color)" />
      </div>
      {children}
    </div>
  );
};

export { Callout };
