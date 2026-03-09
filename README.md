# Braze Custom HTML In-App Message Templates

Standalone HTML templates for Braze campaigns that match the Pikaso design system.

<img width="2425" height="1064" alt="Modals preview" src="https://github.com/user-attachments/assets/12cec385-49eb-4a82-8786-a8a25f460804" />

## Visual Builder

Use the **InApp Builder** to configure templates visually — no need to edit HTML manually.

**Open the builder:** [https://YOUR_ORG.github.io/inapp-templates-braze/](index.html) (or serve locally with `npx serve .`)

1. Select a template from the carousel
2. Click directly on the image, title, body text, or CTA to edit
3. Enter Lokalise keys and URLs in the popover
4. Click **Copy HTML** to get the complete Braze-ready HTML

### Local development

```bash
npx serve .
# Open http://localhost:3000
```

## Why standalone?

Braze Custom HTML In-App Messages render inside an **iframe** managed by the SDK. This means they cannot inherit CSS custom properties or Tailwind classes from the parent app. Each template inlines the resolved design token values (colors, typography, spacing, shadows) directly, ensuring visual consistency with Pikaso.

## Available Templates

| Template | File | Description |
|---|---|---|
| Modal Image Top | `html/modal-img-top.html` | Centered dialog with hero image on top, title, body text, and CTA button |
| Modal Image Right | `html/modal-img-right.html` | Horizontal layout — content left, image right (~40/60 split) |
| Modal Image 50/50 | `html/modal-img-50-50.html` | Horizontal layout — equal 50/50 split between content and image |
| Modal Onboarding | `html/modal-onboarding.html` | Multi-step carousel with thumbnails for onboarding flows |
| Modal Launch | `html/modal-launch.html` | Compact card (256×274) with background image, non-blocking overlay |
| Slideup | `html/slideup.html` | Bottom-anchored toast notification with frosted glass effect |

Preview files with hardcoded content for local testing are in `previews/`.

## How to Use in Braze Dashboard

### 1. Create a new campaign

1. Go to **Messaging > Campaigns > Create Campaign > In-App Message**
2. Select **Custom HTML** as the message type
3. Copy the entire content of the desired `.html` template file
4. Paste the **Liquid translation block** (see below) at the top of `<body>`, then paste the template HTML below it

### 2. Add the Liquid translation block

Paste this block at the top of `<body>` in the Braze HTML editor. It handles language detection and translation fetching:

```liquid
{%- assign lang = {{custom_attribute.${user_locale}}} | default: ${language} | default: 'en' -%}

{%- case lang -%}

{%- when 'es_ES' -%}
{%- assign lok_lang = 'es_ES' -%}
{%- when 'es' -%}
{%- assign lok_lang = 'es_ES' -%}

{%- when 'pt_BR' -%}
{%- assign lok_lang = 'pt_BR' -%}
{%- when 'pt' -%}
{%- assign lok_lang = 'pt_BR' -%}

{%- when 'de_DE' -%}
{%- assign lok_lang = 'de_DE' -%}
{%- when 'de' -%}
{%- assign lok_lang = 'de_DE' -%}

{%- when 'fr_FR' -%}
{%- assign lok_lang = 'fr_FR' -%}
{%- when 'fr' -%}
{%- assign lok_lang = 'fr_FR' -%}

{%- when 'it_IT' -%}
{%- assign lok_lang = 'it_IT' -%}
{%- when 'it' -%}
{%- assign lok_lang = 'it_IT' -%}

{%- when 'ru_RU' -%}
{%- assign lok_lang = 'ru_RU' -%}
{%- when 'ru' -%}
{%- assign lok_lang = 'ru_RU' -%}

{%- when 'ja_JP' -%}
{%- assign lok_lang = 'ja_JP' -%}
{%- when 'ja' -%}
{%- assign lok_lang = 'ja_JP' -%}

{%- when 'ko_KR' -%}
{%- assign lok_lang = 'ko_KR' -%}
{%- when 'ko' -%}
{%- assign lok_lang = 'ko_KR' -%}

{%- when 'nl_NL' -%}
{%- assign lok_lang = 'nl_NL' -%}
{%- when 'nl' -%}
{%- assign lok_lang = 'nl_NL' -%}

{%- when 'pl_PL' -%}
{%- assign lok_lang = 'pl_PL' -%}
{%- when 'pl' -%}
{%- assign lok_lang = 'pl_PL' -%}

{%- when 'zh_HK' -%}
{%- assign lok_lang = 'zh_HK' -%}
{%- when 'zh_CN' -%}
{%- assign lok_lang = 'zh_CN' -%}
{%- when 'zh_TW' -%}
{%- assign lok_lang = 'zh_HK' -%}
{%- when 'zh' -%}
{%- assign lok_lang = 'zh_HK' -%}

{%- when 'hi_IN' -%}
{%- assign lok_lang = 'hi_IN' -%}
{%- when 'hi' -%}
{%- assign lok_lang = 'hi_IN' -%}

{%- when 'cs_CZ' -%}
{%- assign lok_lang = 'cs_CZ' -%}
{%- when 'cs' -%}
{%- assign lok_lang = 'cs_CZ' -%}

{%- when 'da_DK' -%}
{%- assign lok_lang = 'da_DK' -%}
{%- when 'da' -%}
{%- assign lok_lang = 'da_DK' -%}

{%- when 'fi_FI' -%}
{%- assign lok_lang = 'fi_FI' -%}
{%- when 'fi' -%}
{%- assign lok_lang = 'fi_FI' -%}

{%- when 'nb_NO' -%}
{%- assign lok_lang = 'nb_NO' -%}
{%- when 'nb' -%}
{%- assign lok_lang = 'nb_NO' -%}

{%- when 'sv_SE' -%}
{%- assign lok_lang = 'sv_SE' -%}
{%- when 'sv' -%}
{%- assign lok_lang = 'sv_SE' -%}

{%- when 'tr_TR' -%}
{%- assign lok_lang = 'tr_TR' -%}
{%- when 'tr' -%}
{%- assign lok_lang = 'tr_TR' -%}

{%- when 'id_ID' -%}
{%- assign lok_lang = 'id_ID' -%}
{%- when 'id' -%}
{%- assign lok_lang = 'id_ID' -%}

{%- when 'vi_VN' -%}
{%- assign lok_lang = 'vi_VN' -%}
{%- when 'vi' -%}
{%- assign lok_lang = 'vi_VN' -%}

{%- when 'th_TH' -%}
{%- assign lok_lang = 'th_TH' -%}
{%- when 'th' -%}
{%- assign lok_lang = 'th_TH' -%}

{%- else -%}
{%- assign lok_lang = 'en' -%}

{%- endcase -%}

{%- assign base = 'https://exports.live.lokalise.cloud/braze/64903509694141adaff9b6.83125809/a4597de8e0ea203a9d9cc0266d7f1fed9fa4a0c1/' -%}

{%- connected_content {{ base }}en.json :save t_en :cache_max_age 3600 -%}

{%- if t_en == null -%}
{%- abort_message("Lokalise EN fallback failed") -%}
{%- endif -%}

{%- if lok_lang != 'en' -%}
{%- assign json_url = base | append: lok_lang | append: '.json' -%}
{%- connected_content {{ json_url }} :save t :cache_max_age 3600 -%}
{%- else -%}
{%- assign t = t_en -%}
{%- endif -%}
```

Then use translations in your HTML like:

```html
<h2>{{ t.YOUR_LOKALISE_KEY | default: t_en.YOUR_LOKALISE_KEY }}</h2>
```

### 3. Replace translation keys

Find placeholder keys in the HTML and replace them with your actual Lokalise keys:

| Placeholder | Replace with | Example |
|---|---|---|
| `TITLE_KEY` | Your Lokalise key for the title | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Title` |
| `TEXT_KEY` / `MESSAGE_KEY` | Your Lokalise key for the body text | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_Body` |
| `CTA_KEY` | Your Lokalise key for the CTA button | `2026_W06_IAM_Onboarding_Spaces_Step1_IAM_CTA` |

### 4. Preview and test

- Use Braze's **Preview** tab to see the rendered template
- Send a **Test Message** to your device to verify on both light and dark themes
- The template automatically detects the app's current theme (light/dark)
- Use files in `previews/` to preview locally in a browser (have mock data and theme toggles)

## Translation System

### How it works

1. Reads the user's `user_locale` custom attribute (full locale, e.g. `zh_CN`, `de_DE`)
2. Falls back to Braze's `${language}` (primary subtag only, e.g. `zh`, `de`) if custom attribute is not set
3. Maps the locale to a Lokalise JSON file
4. Fetches 2 JSONs max: English fallback + user's language
5. Translations are cached for 1 hour via `:cache_max_age 3600`
6. If the English fallback fails, the message is aborted via `abort_message()`

### Why `user_locale` custom attribute?

Braze truncates `setLanguage()` to the primary language subtag (e.g. `zh-CN` → `zh`). This makes it impossible to distinguish Chinese variants via `${language}`. The `user_locale` custom attribute preserves the full locale including region, enabling correct translation selection for:

- `zh_CN` → Chinese Simplified (简体中文)
- `zh_HK` → Chinese Traditional, Hong Kong (繁體中文 香港)
- `zh_TW` → Chinese Traditional, Taiwan (繁體中文 台灣) — falls back to `zh_HK` until translated

### Supported languages

`en` (default), `es_ES`, `pt_BR`, `de_DE`, `fr_FR`, `it_IT`, `ru_RU`, `ja_JP`, `ko_KR`, `nl_NL`, `pl_PL`, `zh_HK`, `zh_CN`, `zh_TW`, `hi_IN`, `cs_CZ`, `da_DK`, `fi_FI`, `nb_NO`, `sv_SE`, `tr_TR`, `id_ID`, `vi_VN`, `th_TH`

### Lokalise CDN base URL

```
https://exports.live.lokalise.cloud/braze/64903509694141adaff9b6.83125809/a4597de8e0ea203a9d9cc0266d7f1fed9fa4a0c1/
```

This URL is the same for all campaigns. Do not modify it unless the Lokalise project changes.

## Theme Support

Templates automatically detect whether Pikaso is running in dark or light mode by reading the parent document's `<html>` class. No manual configuration is needed.

- **Light mode**: White background, dark text, dark CTA button
- **Dark mode**: Dark background, light text, light CTA button

Exception: `modal-launch.html` is always dark theme (image card with gradient overlay).

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

1. Create a new `.html` file in `html/`
2. Copy the font-face declarations and CSS variable block from `base-styles.css`
3. Copy the Liquid translation block from the README above
4. Use `var(--modal-*)` CSS variables for all styling
5. Include the dark mode detection script (see existing templates)
6. Use `brazeBridge.logClick()` for CTA tracking and `brazeBridge.closeMessage()` to close
7. Create a corresponding preview file in `previews/` with hardcoded content
8. Update this README with the new template entry

## Braze SDK API Reference

Inside Custom HTML templates, the `brazeBridge` object is available globally:

| Method | Description |
|---|---|
| `brazeBridge.logClick()` | Log a click event for analytics |
| `brazeBridge.logClick("button_id")` | Log a click with a specific button ID |
| `brazeBridge.closeMessage()` | Close the in-app message |

> **Note:** `appboyBridge` is deprecated. Use `brazeBridge` in all new templates.

## Source Design Tokens

The tokens in these templates are extracted from:

- `frontend/code/apps/core/tailwind/tailwind.css` — CSS custom properties (light/dark themes)
- `frontend/code/apps/pikaso/src/perita-tailwind-config/shared/tokens.ts` — Base token values
- `frontend/code/apps/core/tailwind/tailwind.config.ts` — Tailwind theme configuration
- `frontend/code/apps/core/src/components/Button/buttonStyles.ts` — Button size/variant specs

If the design system tokens change, update `base-styles.css` and all template files accordingly.
