import { TEMPLATES } from './templates.js';

const BASE_IFRAME_CSS = `
  .preview-controls { display: none !important; }
  body, body.theme-dark { background: #1a1a1a !important; }
  .braze-modal-overlay {
    opacity: 1 !important;
    animation: none !important;
  }
  .braze-modal-wrapper {
    opacity: 1 !important;
    transform: scale(1) !important;
    filter: none !important;
    animation: none !important;
  }
`;

const SLIDEUP_CSS = `
  .braze-toast-anchor {
    top: 50% !important;
    bottom: auto !important;
    left: 50% !important;
    right: auto !important;
    transform: translate(-50%, -50%) !important;
    padding: 0 !important;
  }
  .braze-toast {
    opacity: 1 !important;
    transform: scale(2) !important;
    animation: none !important;
  }
`;

const LAUNCH_CSS = `
  .braze-modal-overlay {
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
  }
  .braze-modal-wrapper {
    transform: scale(1.6) !important;
  }
`;

function getExtraCSS(templateId) {
  if (templateId === 'slideup') return SLIDEUP_CSS;
  if (templateId === 'modal-launch') return LAUNCH_CSS;
  return '';
}

export function initCarousel(container, onSelect) {
  container.innerHTML = '';

  TEMPLATES.forEach((tmpl) => {
    const card = document.createElement('div');
    card.className = 'carousel__card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Select ${tmpl.name}`);

    card.innerHTML = `
      <div class="carousel__frame">
        <iframe
          src="${tmpl.previewFile}"
          loading="lazy"
          sandbox="allow-same-origin allow-scripts"
          title="${tmpl.name} preview"
        ></iframe>
      </div>
      <div class="carousel__info">
        <div class="carousel__name">${tmpl.name}</div>
        <div class="carousel__desc">${tmpl.description}</div>
      </div>
    `;

    card.addEventListener('click', () => onSelect(tmpl.id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onSelect(tmpl.id);
      }
    });

    const frame = card.querySelector('.carousel__frame');
    const iframe = card.querySelector('iframe');

    iframe.addEventListener('load', () => {
      scaleIframe(frame, iframe);
      injectPreviewStyles(iframe, tmpl.id);
    });

    container.appendChild(card);
  });

  window.addEventListener('resize', () => {
    container.querySelectorAll('.carousel__frame').forEach((frame) => {
      const iframe = frame.querySelector('iframe');
      if (iframe) scaleIframe(frame, iframe);
    });
  });
}

function scaleIframe(frame, iframe) {
  const w = frame.offsetWidth;
  const scale = w / 1200;
  iframe.style.transform = `scale(${scale})`;
}

function injectPreviewStyles(iframe, templateId) {
  try {
    const doc = iframe.contentDocument;
    if (!doc) return;

    const style = doc.createElement('style');
    style.textContent = BASE_IFRAME_CSS + getExtraCSS(templateId);
    doc.head.appendChild(style);
  } catch (e) {
    // Cross-origin fallback — ignore
  }
}
