# Nexora image replacement guide

Nexora's website uses local WEBP assets only. The visual references are collected in
`src/config/images.ts`; components should reference that file rather than writing
image paths inline.

## Replace an image from GitHub

1. Open the matching file under `public/images/`.
2. Prepare a business-focused image with the same composition class (landscape or
   portrait) and export it as WEBP.
3. Upload the replacement to the same folder using the exact stable filename below.
4. Commit the change. No React or CSS changes are required when the filename stays
   the same.

Stable filenames:

```text
public/images/hero/hero-business.webp
public/images/services/web-development.webp
public/images/services/mobile-app.webp
public/images/services/ecommerce.webp
public/images/services/ai-automation.webp
public/images/services/business-systems.webp
public/images/about/about-team.webp
public/images/solutions/business-growth.webp
public/images/solutions/automation.webp
```

## Same-filename workflow

The simplest update is a same-filename replacement: upload a new file, replace the
old file in GitHub, and merge. The existing path remains stable across the hero,
service panels, solution visuals, About visual, and concept cards. Keep the subject
human and business-relevant, avoid logos or unlicensed client work, and preserve
the recommended dimensions and format documented in
`src/config/imageInventory.ts`.
