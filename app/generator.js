const LOKALISE_BASE = 'https://exports.live.lokalise.cloud/braze/64903509694141adaff9b6.83125809/a4597de8e0ea203a9d9cc0266d7f1fed9fa4a0c1/';
const DEFAULT_PREVIEW_IMG = 'https://cdn.braze.eu/appboy/communication/assets/image_assets/images/69945953c1627f4106e11467/original.png?1771329875';

const templateCache = new Map();
let translationsCache = null;

export async function generateHTML(template, values) {
  const raw = await fetchTemplate(template.htmlFile);
  return template.replacements(raw, values);
}

export async function generatePreviewHTML(template, values) {
  let html = await generateHTML(template, values);

  const translations = await fetchTranslations();

  html = html.replace(
    /\{\{\s*t\.([\w-]+)\s*\|\s*default:\s*t_en\.[\w-]+\s*\}\}/g,
    (_, key) => translations[key] || key
  );

  html = html.replace(/\{%-?[\s\S]*?-%\}/g, '');

  html = html.replace(/\$\{(?:image_url|step\d+_image)\}/g, DEFAULT_PREVIEW_IMG);
  html = html.replace(/\$\{[^}]+\}/g, '');

  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}

async function fetchTemplate(path) {
  if (templateCache.has(path)) return templateCache.get(path);

  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);

  const html = await res.text();
  templateCache.set(path, html);
  return html;
}

async function fetchTranslations() {
  if (translationsCache) return translationsCache;

  const sources = [
    'translations/en.json',
    `${LOKALISE_BASE}en.json`,
  ];

  for (const url of sources) {
    try {
      const res = await fetch(url);
      if (!res.ok) continue;
      translationsCache = await res.json();
      return translationsCache;
    } catch {
      continue;
    }
  }

  console.warn('Failed to fetch Lokalise translations from all sources');
  return {};
}

export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }
}

export function openInNewTab(html) {
  const blob = new Blob([html], { type: 'text/html; charset=utf-8' });
  const url = URL.createObjectURL(blob);
  window.open(url, '_blank');
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
