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
            toast({
              title: "Toast Title",
              description: "This is a toast description.",
              action: {
                label: "Click me",
                onClick: () => {
                  console.log("Button clicked");
                },
              },
            });
          }}
        >
          Toast
        </Button>
        {
          void setTimeout(() => {
            const id = toast({
              title: "Toast Title",
              description: "This is a toast description.",
              action: {
                label: "Dismiss",
                onClick: () => {
                  console.log("Button clicked");
                  dismiss(id);
                },
              },
            });
          })
        }
      </>
    ),
  ],
} satisfies Meta;

export const Simple = {} satisfies Preview;
