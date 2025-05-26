import type { Meta, Preview } from "@storybook/react";
import { Toaster } from "sonner";
import { Button } from "../button/button.js";
import { dismiss, toast } from "./toast.js";

export default {
  title: "Components/Toast",
  component: Toaster,
  decorators: [
    (Story) => (
      <>
        <Story />
        <Button
          type="button"
          onClick={() => {
            const id = toast({
              title: "User saved",
              description: "This is a toast description.",
              action: {
                label: "Dismiss",
                onClick: () => {
                  dismiss(id);
                },
              },
            });
          }}
        >
          Show toast
        </Button>
      </>
    ),
  ],
} satisfies Meta;

export const Simple = {} satisfies Preview;
