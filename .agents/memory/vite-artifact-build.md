---
name: Vite artifact build environment
description: Required environment values for building the workspace's Vite web artifacts outside their managed workflows.
---

Vite artifact configs require both PORT and BASE_PATH even for a local production build.

**Why:** The managed artifact workflow injects these values automatically, while direct build commands do not.

**How to apply:** Use the artifact's configured port and base path when running a standalone build; do not loosen the config's startup validation.