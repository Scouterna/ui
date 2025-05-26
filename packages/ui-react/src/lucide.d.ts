// This makes the lucide-react package only export the suffixed version of the
// icons like `CheckIcon` and not also `Check` and `LucideCheck`.
declare module "lucide-react" {
  export * from "lucide-react/dist/lucide-react.suffixed.js";
}
