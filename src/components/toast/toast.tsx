import { toast as sonnerToast } from "sonner";
import { Button } from "../button/button.js";

const dismiss = sonnerToast.dismiss;

function toast(toastProps: ToastProps) {
  return sonnerToast.custom(() => <Toast {...toastProps} />);
}

interface ToastProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

function Toast(props: ToastProps) {
  const { title, description, action } = props;

  return (
    <div className="flex rounded-lg bg-gray-100 text-gray-dark shadow-lg border border-gray-200 w-full md:max-w-[364px] items-center py-3 px-4">
      <div className="flex flex-1 items-center">
        <div className="w-full">
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
      <div className="ml-5 shrink-0 rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
        {action && (
          <Button
            variant="text"
            size="small"
            onClick={() => {
              action.onClick();
            }}
          >
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}

export { toast, dismiss };
