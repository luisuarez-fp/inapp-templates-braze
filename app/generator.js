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

  const keyMap = {};
  html.replace(/\{%-?\s*assign\s+(\w+)\s*=\s*"([^"]+)"\s*-%\}/g, (_, varName, keyValue) => {
    keyMap[varName] = keyValue;
  });

  html = html.replace(
    /\{\{\s*t\[(\w+)\]\s*\|\s*default:\s*t_en\[\1\]\s*\}\}/g,
    (_, varName) => translations[keyMap[varName]] || keyMap[varName] || varName
  );

  html = html.replace(/\{%-?[\s\S]*?-%\}/g, '');

  html = html.replace(/\$\{(?:image_url|step\d+_image)\}/g, DEFAULT_PREVIEW_IMG);
  html = html.replace(/="\$\{[^}]+\}"/g, '=""');
  html = html.replace(/'\$\{[^}]+\}'/g, "''");

  html = html.replace(/\n{3,}/g, '\n\n');

  return html;
}

export function buildUrlBar(template, values) {
  const urls = (template.fields || [])
    .filter((f) => f.type === 'url')
    .map((f) => ({ label: f.label, value: values[f.id] || '' }))
    .filter((u) => u.value);

  if (!urls.length) return '';

  return urls
    .map((u) => `<span style="color:#9c9c9c">${u.label}:</span> <strong>${u.value}</strong>`)
    .join('&nbsp;&nbsp;&middot;&nbsp;&nbsp;');
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

export function openInNewTab(html, urlBar = '') {
  const templateBlob = new Blob([html], { type: 'text/html; charset=utf-8' });
  const templateUrl = URL.createObjectURL(templateBlob);

  if (!urlBar) {
    window.open(templateUrl, '_blank');
    setTimeout(() => URL.revokeObjectURL(templateUrl), 60000);
    return;
  }

  const wrapper = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>Preview</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden}
iframe{width:100%;height:100%;border:none}
.url-toast{
  position:fixed;bottom:20px;left:50%;transform:translateX(-50%);
  padding:10px 20px;
  background:rgba(30,30,30,.85);
  backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
  border:1px solid rgba(255,255,255,.08);
  border-radius:12px;
  box-shadow:0 8px 32px rgba(0,0,0,.4);
  font:600 12px/1.5 Inter,system-ui,sans-serif;
  color:rgba(255,255,255,.9);
  white-space:nowrap;
  z-index:10;
  animation:toast-in .3s ease-out;
  pointer-events:none;
}
.url-toast strong{color:#7cacff;font-weight:700}
.url-toast span{color:rgba(255,255,255,.45)}
@keyframes toast-in{from{opacity:0;transform:translateX(-50%) translateY(12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
</style></head>
<body>
<iframe src="${templateUrl}"></iframe>
<div class="url-toast">${urlBar}</div>
</body></html>`;

  const wrapperBlob = new Blob([wrapper], { type: 'text/html; charset=utf-8' });
  const wrapperUrl = URL.createObjectURL(wrapperBlob);
  window.open(wrapperUrl, '_blank');
  setTimeout(() => {
    URL.revokeObjectURL(wrapperUrl);
    URL.revokeObjectURL(templateUrl);
  }, 60000);
}
