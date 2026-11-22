---
"@scouterna/ui-webc": patch
"@scouterna/ui-react": patch
---

Use classes on the host element again for button and callout state. The React wrapper now merges `className` with runtime-managed classes, so the `data-*` attribute workaround is no longer needed.