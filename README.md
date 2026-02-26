# Braze Custom HTML In-App Message Templates

Standalone HTML templates for Braze campaigns that match the Pikaso design system.

## Why standalone?

Braze Custom HTML In-App Messages render inside an **iframe** managed by the SDK. This means they cannot inherit CSS custom properties or Tailwind classes from the parent app. Each template inlines the resolved design token values (colors, typography, spacing, shadows) directly, ensuring visual consistency with Pikaso.

## Available Templates

| Template | File | Description |
|---|---|---|
| Default Modal | `modal-default.html` | Centered dialog with hero image, title, body text, and CTA button |
| Slideup | `slideup.html` | Bottom-anchored toast notification with frosted glass, icon, title, body text, and action button |

## How to Use in Braze Dashboard

### 1. Create a new campaign

1. Go to **Messaging > Campaigns > Create Campaign > In-App Message**
2. Select **Custom HTML** as the message type
3. Copy the entire content of the desired `.html` template file and paste it into the HTML editor

### 2. Replace translation keys

The template comes with Lokalise translations **already built-in**. You do NOT need to add the Liquid setup block -- it's embedded in the template.

Find these placeholder keys in the HTML and replace them with your actual Lokalise keys:

| Placeholder in HTML | Replace with | Example |
|---|---|---|
| `TITLE_KEY` | Your Lokalise key for the title | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Title` |
| `MESSAGE_KEY` | Your Lokalise key for the body text | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Body` |
| `CTA_KEY` | Your Lokalise key for the CTA button | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Main_CTA_v2` |

For example, change:

```html
<h2 class="braze-modal__title">{{ translations.TITLE_KEY }}</h2>
```

to:

```html
<h2 class="braze-modal__title">{{ translations.2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Title }}</h2>
```

### 3. Configure message extras

Set these values as Braze message extras (they are NOT translated via Lokalise):

| Extra | Required | Description | Example |
|---|---|---|---|
| `image_url` | Yes | Hero image URL | `https://cdn.example.com/promo.jpg` |
| `image_alt` | No | Alt text for accessibility | `New feature announcement` |
| `cta_url` | No | Destination URL when CTA is clicked | `https://pikaso.com/features` |

### 4. Preview and test

- Use Braze's **Preview** tab to see the rendered template
- Send a **Test Message** to your device to verify on both light and dark themes
- The template automatically detects the app's current theme (light/dark)
- Use `modal-default-preview.html` to preview locally in a browser (has mock data and theme toggles)

## Translation System

### How it works

Each template has the Lokalise `connected_content` block embedded at the top of `<body>`. On render, Braze:

1. Reads the user's `${language}` attribute (e.g. `es`, `fr`, `de`)
2. Maps it to a Lokalise locale (e.g. `es_ES`, `fr_FR`, `de_DE`)
3. Fetches the JSON translation file from Lokalise CDN
4. Makes all keys available as `{{ translations.YOUR_KEY }}`

### Supported languages

`en` (default), `es`, `pt`, `de`, `ko`, `fr`, `ru`, `ja`, `nl`, `pl`, `it`

### Lokalise CDN base URL

```
https://exports.live.lokalise.cloud/braze/64903509694141adaff9b6.83125809/a4597de8e0ea203a9d9cc0266d7f1fed9fa4a0c1/
```

This URL is the same for all campaigns and is already embedded in the template. Do not modify it unless the Lokalise project changes.

## Theme Support

Templates automatically detect whether Pikaso is running in dark or light mode by reading the parent document's `<html>` class. No manual configuration is needed.

- **Light mode**: White background, dark text, dark CTA button
- **Dark mode**: Dark background, light text, light CTA button

Both themes use the exact same token values as the main Pikaso application (from `@pikaso/core` and Perita Plus).

## Design Token Reference

All resolved token values are documented in `base-styles.css`. When creating new templates, copy the relevant tokens from that file.

### Key tokens

| Token | Light | Dark | Usage |
|---|---|---|---|
| `--modal-bg` | `hsl(0, 0%, 100%)` | `hsl(0, 0%, 12%)` | Modal background |
| `--modal-title-color` | `hsl(0, 0%, 5%)` | `hsl(0, 0%, 97%)` | Title text |
| `--modal-text-color` | `hsl(0, 0%, 36%)` | `hsl(0, 0%, 69%)` | Body text |
| `--modal-cta-bg` | `hsl(0, 0%, 5%)` | `hsl(0, 0%, 97%)` | CTA button (secondary) |
| `--modal-cta-color` | `hsl(0, 0%, 100%)` | `hsl(0, 0%, 5%)` | CTA button text |
| `--modal-border` | `rgba(13,13,13,0.2)` | `hsla(0,0%,100%,0.2)` | Inside border |
| `--modal-overlay` | `hsla(0, 0%, 0%, 0.5)` | same | Backdrop overlay |
| `--modal-radius` | `24px` | same | Border radius |

### Button specs (Perita Plus md + secondary)

| Property | Value | Design system class |
|---|---|---|
| Height | 40px | `h-10` |
| Padding X | 16px | `px-4` |
| Font size | 14px | `text-sm` |
| Font weight | 600 | `font-semibold` |
| Border radius | 8px | `rounded-lg` |

## Adding New Templates

1. Create a new `.html` file in this directory
2. Copy the font-face declarations and CSS variable block from `base-styles.css`
3. Copy the Lokalise Liquid block from `modal-default.html`
4. Use `var(--modal-*)` CSS variables for all styling
5. Include the dark mode detection script (see `modal-default.html`)
6. Use `appboyBridge.logClick()` for CTA tracking and `appboyBridge.closeMessage()` to close
7. Update this README with the new template entry

## Braze SDK API Reference

Inside Custom HTML templates, the `appboyBridge` object is available globally:

| Method | Description |
|---|---|
| `appboyBridge.logClick()` | Log a click event for analytics |
| `appboyBridge.logClick("button_id")` | Log a click with a specific button ID |
| `appboyBridge.closeMessage()` | Close the in-app message |

## Source Design Tokens

The tokens in these templates are extracted from:

- `frontend/code/apps/core/tailwind/tailwind.css` -- CSS custom properties (light/dark themes)
- `frontend/code/apps/pikaso/src/perita-tailwind-config/shared/tokens.ts` -- Base token values
- `frontend/code/apps/core/tailwind/tailwind.config.ts` -- Tailwind theme configuration
- `frontend/code/apps/core/src/components/Button/buttonStyles.ts` -- Button size/variant specs

If the design system tokens change, update `base-styles.css` and all template files accordingly.
