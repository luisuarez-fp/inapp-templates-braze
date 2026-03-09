import { initCarousel } from './carousel.js';
import { initEditor, openTemplate, toggleTheme, getValues, getCurrentTemplate, resetEditor } from './editor.js';
import { generateHTML, generatePreviewHTML, copyToClipboard, openInNewTab } from './generator.js';

const carouselView = document.getElementById('carouselView');
const editorView = document.getElementById('editorView');
const carouselGrid = document.getElementById('carouselGrid');
const editorPreview = document.getElementById('editorPreview');
const editorName = document.getElementById('editorName');
const editorBack = document.getElementById('editorBack');
const themeToggle = document.getElementById('themeToggle');
const exportBar = document.getElementById('exportBar');
const btnCopyHtml = document.getElementById('btnCopyHtml');
const btnPreviewTab = document.getElementById('btnPreviewTab');
const toastEl = document.getElementById('toastNotification');

let toastTimer = null;

function showView(view) {
  carouselView.classList.toggle('active', view === 'carousel');
  editorView.classList.toggle('active', view === 'editor');
  exportBar.classList.toggle('active', view === 'editor');

  if (view === 'carousel') {
    window.scrollTo(0, 0);
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toastEl.textContent = message;
  toastEl.classList.add('show');
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2500);
}

function handleTemplateSelect(templateId) {
  const tmpl = getCurrentTemplate() || { id: null };
  openTemplate(templateId, editorPreview);

  const current = getCurrentTemplate();
  if (current) {
    editorName.textContent = current.name;
    themeToggle.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"/>
        <line x1="12" y1="1" x2="12" y2="3"/>
        <line x1="12" y1="21" x2="12" y2="23"/>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
        <line x1="1" y1="12" x2="3" y2="12"/>
        <line x1="21" y1="12" x2="23" y2="12"/>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
      </svg>
      Light`;
  }

  showView('editor');
}

function handleBack() {
  resetEditor();
  showView('carousel');
}

function handleThemeToggle() {
  const dark = toggleTheme(editorPreview);
  const label = dark ? 'Dark' : 'Light';
  const icon = dark
    ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

  themeToggle.innerHTML = `${icon} ${label}`;
}

async function handleCopyHtml() {
  const tmpl = getCurrentTemplate();
  if (!tmpl) return;

  try {
    const html = await generateHTML(tmpl, getValues());
    const ok = await copyToClipboard(html);
    showToast(ok ? 'HTML copied to clipboard' : 'Failed to copy');
  } catch (err) {
    console.error('Export error:', err);
    showToast('Error generating HTML');
  }
}

async function handlePreviewTab() {
  const tmpl = getCurrentTemplate();
  if (!tmpl) return;

  try {
    showToast('Fetching translations...');
    const html = await generatePreviewHTML(tmpl, getValues());
    openInNewTab(html);
  } catch (err) {
    console.error('Preview error:', err);
    showToast('Error generating preview');
  }
}

// --- Init ---

initEditor(editorPreview);
initCarousel(carouselGrid, handleTemplateSelect);

editorBack.addEventListener('click', handleBack);
themeToggle.addEventListener('click', handleThemeToggle);
btnCopyHtml.addEventListener('click', handleCopyHtml);
btnPreviewTab.addEventListener('click', handlePreviewTab);

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && editorView.classList.contains('active')) {
    const popover = document.getElementById('activePopover');
    if (!popover) handleBack();
  }
});
