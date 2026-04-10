export const TEMPLATES = [
  {
    id: 'modal-img-top',
    name: 'Modal Image Top',
    description: 'Hero image on top, title, body, and CTA below',
    previewFile: 'previews/modal-img-top-preview.html',
    htmlFile: 'html/modal-img-top.html',
    fields: [
      { id: 'image_url', type: 'image', label: 'Image URL', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'image_alt', type: 'text', label: 'Image Alt Text', placeholder: 'Descriptive alt text' },
      { id: 'title_key', type: 'key', label: 'Title (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Title' },
      { id: 'text_key', type: 'key', label: 'Body Text (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Body' },
      { id: 'cta_key', type: 'key', label: 'CTA Label (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_CTA' },
      { id: 'cta_url', type: 'url', label: 'CTA Destination URL', placeholder: '/app' },
    ],
    render: (values) => renderModalStandard('img-top', values),
    replacements: standardModalReplacements,
  },
  {
    id: 'modal-img-right',
    name: 'Modal Image Right',
    description: 'Content left, image right (~40/60 split)',
    previewFile: 'previews/modal-img-right-preview.html',
    htmlFile: 'html/modal-img-right.html',
    fields: [
      { id: 'image_url', type: 'image', label: 'Image URL', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'image_alt', type: 'text', label: 'Image Alt Text', placeholder: 'Descriptive alt text' },
      { id: 'title_key', type: 'key', label: 'Title (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Title' },
      { id: 'text_key', type: 'key', label: 'Body Text (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Body' },
      { id: 'cta_key', type: 'key', label: 'CTA Label (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_CTA' },
      { id: 'cta_url', type: 'url', label: 'CTA Destination URL', placeholder: '/app' },
    ],
    render: (values) => renderModalStandard('img-right', values),
    replacements: standardModalReplacements,
  },
  {
    id: 'modal-img-50-50',
    name: 'Modal Image 50/50',
    description: 'Equal 50/50 split between content and image',
    previewFile: 'previews/modal-img-50-50-preview.html',
    htmlFile: 'html/modal-img-50-50.html',
    fields: [
      { id: 'image_url', type: 'image', label: 'Image URL', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'image_alt', type: 'text', label: 'Image Alt Text', placeholder: 'Descriptive alt text' },
      { id: 'title_key', type: 'key', label: 'Title (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Title' },
      { id: 'text_key', type: 'key', label: 'Body Text (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_Body' },
      { id: 'cta_key', type: 'key', label: 'CTA Label (Lokalise key)', placeholder: '2026_WXX_IAM_Campaign_CTA' },
      { id: 'cta_url', type: 'url', label: 'CTA Destination URL', placeholder: '/app' },
    ],
    render: (values) => renderModalStandard('img-50-50', values),
    replacements: standardModalReplacements,
  },
  {
    id: 'modal-full-image',
    name: 'Modal Full Image',
    description: 'Full image (600×500) with close button, click to navigate',
    previewFile: 'previews/modal-full-image-preview.html',
    htmlFile: 'html/modal-full-image.html',
    fields: [
      { id: 'image_url', type: 'image', label: 'Image URL (600×500)', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'image_alt', type: 'text', label: 'Image Alt Text', placeholder: 'Descriptive alt text' },
      { id: 'cta_url', type: 'url', label: 'Click Destination URL', placeholder: '/app' },
    ],
    render: renderModalFullImage,
    replacements: fullImageReplacements,
  },
  {
    id: 'modal-bottom-right',
    name: 'Modal Bottom Right',
    description: 'Compact card (256x274) with background image, bottom-right',
    previewFile: 'previews/modal-bottom-right-preview.html',
    htmlFile: 'html/modal-bottom-right.html',
    fields: [
      { id: 'image_url', type: 'image', label: 'Background Image URL', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'badge_key', type: 'key', label: 'Badge Text (Lokalise key or text)', placeholder: 'NEW' },
      { id: 'title_key', type: 'key', label: 'Title (Lokalise key)', placeholder: '2026_WXX_IAM_Launch_Title' },
      { id: 'text_key', type: 'key', label: 'Body Text (Lokalise key)', placeholder: '2026_WXX_IAM_Launch_Body' },
      { id: 'cta_key', type: 'key', label: 'CTA Label (Lokalise key)', placeholder: '2026_WXX_IAM_Launch_CTA' },
      { id: 'cta_url', type: 'url', label: 'CTA Destination URL', placeholder: '/app' },
    ],
    render: renderModalLaunch,
    replacements: launchReplacements,
  },
  {
    id: 'modal-onboarding',
    name: 'Modal Onboarding',
    description: 'Multi-step carousel with thumbnails (up to 6 steps)',
    previewFile: 'previews/modal-onboarding-preview.html',
    htmlFile: 'html/modal-onboarding.html',
    fields: buildOnboardingFields(),
    render: renderModalOnboarding,
    replacements: onboardingReplacements,
    steps: 6,
  },
  {
    id: 'slideup',
    name: 'Slideup',
    description: 'Bottom-anchored toast with frosted glass effect',
    previewFile: 'previews/slideup-preview.html',
    htmlFile: 'html/slideup.html',
    fields: [
      { id: 'icon_url', type: 'image', label: 'Icon Image URL (leave empty for default bell)', placeholder: 'https://cdn.braze.eu/appboy/communication/...' },
      { id: 'title_key', type: 'key', label: 'Title (Lokalise key)', placeholder: '2026_WXX_IAM_Toast_Title' },
      { id: 'message_key', type: 'key', label: 'Message (Lokalise key)', placeholder: '2026_WXX_IAM_Toast_Body' },
      { id: 'cta_key', type: 'key', label: 'CTA Label (Lokalise key)', placeholder: '2026_WXX_IAM_Toast_CTA' },
      { id: 'cta_url', type: 'url', label: 'CTA Destination URL', placeholder: '/app' },
    ],
    render: renderSlideup,
    replacements: slideupReplacements,
  },
];

/**
 * URL fields that must be filled before copying HTML to Braze.
 * @returns {Array<{ id: string, label: string }>}
 */
export function getMissingUrlFields(template, values) {
  if (!template?.fields) return [];
  return template.fields
    .filter((f) => f.type === 'url')
    .filter((f) => {
      const v = values[f.id];
      return v == null || String(v).trim() === '';
    })
    .map((f) => ({ id: f.id, label: f.label }));
}

function buildOnboardingFields() {
  const fields = [
    { id: 'step_counter_key', type: 'key', label: 'Step Counter Format (Lokalise key)', placeholder: '2026_WXX_IAM_Onboarding_StepCounter' },
  ];
  for (let i = 1; i <= 6; i++) {
    fields.push(
      { id: `step${i}_image`, type: 'image', label: `Step ${i} Image URL`, placeholder: 'https://cdn.braze.eu/...', step: i },
      { id: `step${i}_title_key`, type: 'key', label: `Step ${i} Title (Lokalise key)`, placeholder: `2026_WXX_IAM_Onboarding_Step${i}_Title`, step: i },
      { id: `step${i}_text_key`, type: 'key', label: `Step ${i} Body (Lokalise key)`, placeholder: `2026_WXX_IAM_Onboarding_Step${i}_Body`, step: i },
      { id: `step${i}_cta_key`, type: 'key', label: `Step ${i} CTA (Lokalise key)`, placeholder: `2026_WXX_IAM_Onboarding_Step${i}_CTA`, step: i },
    );
  }
  fields.push({ id: 'final_cta_url', type: 'url', label: 'Final Step CTA URL', placeholder: '/app' });
  return fields;
}

const PLACEHOLDER_IMG = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" fill="%23222"><rect width="600" height="400"/><text x="50%" y="50%" text-anchor="middle" dy=".35em" fill="%23555" font-family="Inter,sans-serif" font-size="16">Click to set image</text></svg>'
);

const CLOSE_ICON = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="4" x2="12" y2="12"/><line x1="12" y1="4" x2="4" y2="12"/></svg>';
const CHEVRON_ICON = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 3 11 8 6 13"/></svg>';
const BELL_ICON = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>';

function editableAttr(fieldId, fieldType) {
  return `data-editable="${fieldId}" data-field-type="${fieldType}" tabindex="0" role="button"`;
}

function imgSrc(values, fieldId) {
  return values[fieldId] || PLACEHOLDER_IMG;
}

function keyText(values, fieldId, fallback) {
  return values[fieldId] || fallback;
}

export function isVideoUrl(url) {
  if (!url) return false;
  return /\.(mp4|webm|mov|ogg)(\?.*)?$/i.test(url);
}

function mediaTag(values, fieldId, alt) {
  const src = imgSrc(values, fieldId);
  if (values[`${fieldId}__video`]) {
    return `<video src="${src}" autoplay muted loop playsinline></video>`;
  }
  return `<img src="${src}" alt="${alt || ''}" />`;
}

// --- Standard modal (img-top, img-right, img-50-50) ---

function renderModalStandard(variant, values) {
  const imgBlock = `
    <div class="ed-modal__image ed-modal__image--${variant}" ${editableAttr('image_url', 'image')}>
      ${mediaTag(values, 'image_url', values.image_alt)}
    </div>`;

  const bodyBlock = `
    <div class="ed-modal__body">
      <h2 class="ed-modal__title" ${editableAttr('title_key', 'key')}>${keyText(values, 'title_key', 'TITLE_KEY')}</h2>
      <p class="ed-modal__text" ${editableAttr('text_key', 'key')}>${keyText(values, 'text_key', 'TEXT_KEY')}</p>
      <div class="ed-modal__cta-row">
        <span class="ed-modal__cta" ${editableAttr('cta_key', 'cta')}>${keyText(values, 'cta_key', 'CTA_KEY')}</span>
      </div>
    </div>`;

  const isImgFirst = variant === 'img-top';

  return `
    <div class="ed-modal ed-modal--${variant}">
      <button class="ed-modal__close" aria-label="Close">${CLOSE_ICON}</button>
      ${isImgFirst ? imgBlock + bodyBlock : bodyBlock + imgBlock}
    </div>`;
}

function standardModalReplacements(html, values) {
  if (values.image_url) {
    if (values.image_url__video) {
      html = html.replace(
        /(<div class="braze-modal__image-wrapper">)[\s\S]*?(<\/div>)/,
        `$1\n          <video src="${values.image_url}" autoplay muted loop playsinline></video>\n        $2`
      );
    } else {
      html = html.replace(
        /(class="braze-modal__image"[\s\S]*?src=")[^"]*(")/,
        `$1${values.image_url}$2`
      );
    }
  }
  if (values.image_alt) {
    html = html.replace(
      /(class="braze-modal__image"[\s\S]*?alt=")[^"]*(")/,
      `$1${values.image_alt}$2`
    );
  }
  if (values.title_key) html = replaceKey(html, 'TITLE_KEY', values.title_key);
  if (values.text_key) html = replaceKey(html, 'TEXT_KEY', values.text_key);
  if (values.cta_key) html = replaceKey(html, 'CTA_KEY', values.cta_key);
  if (values.cta_url) {
    html = html.replace(/(id="brazeModalCta"[\s\S]*?href=")[^"]*(")/,`$1${values.cta_url}$2`);
  }
  return html;
}

// --- Modal Full Image ---

function escapeHtmlText(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function renderModalFullImage(values) {
  const urlLine = values.cta_url
    ? escapeHtmlText(values.cta_url)
    : 'Click to set click destination URL';
  return `
    <div class="ed-modal ed-modal--full-image">
      <button class="ed-modal__close" aria-label="Close">${CLOSE_ICON}</button>
      <div class="ed-modal__image ed-modal__image--full" ${editableAttr('image_url', 'image')}>
        ${mediaTag(values, 'image_url', values.image_alt)}
      </div>
      <p class="ed-modal__url-edit" ${editableAttr('cta_url', 'url')}>${urlLine}</p>
    </div>`;
}

function fullImageReplacements(html, values) {
  if (values.image_url) {
    html = html.replace(
      /(class="braze-modal__image"[\s\S]*?src=")[^"]*(")/,
      `$1${values.image_url}$2`
    );
  }
  if (values.image_alt) {
    html = html.replace(
      /(class="braze-modal__image"[\s\S]*?alt=")[^"]*(")/,
      `$1${values.image_alt}$2`
    );
  }
  if (values.cta_url) {
    html = html.replace(
      /(id="brazeModalImage"[\s\S]*?data-href=")[^"]*(")/,
      `$1${values.cta_url}$2`
    );
  }
  return html;
}

// --- Modal Launch ---

function renderModalLaunch(values) {
  return `
    <div class="ed-launch">
      <div class="ed-launch__bg" ${editableAttr('image_url', 'image')}>
        ${mediaTag(values, 'image_url')}
      </div>
      <span class="ed-launch__badge" ${editableAttr('badge_key', 'key')}>${keyText(values, 'badge_key', 'NEW')}</span>
      <button class="ed-launch__close" aria-label="Close">${CLOSE_ICON}</button>
      <div class="ed-launch__content">
        <div class="ed-launch__text-group">
          <h2 class="ed-launch__title" ${editableAttr('title_key', 'key')}>${keyText(values, 'title_key', 'TITLE_KEY')}</h2>
          <p class="ed-launch__text" ${editableAttr('text_key', 'key')}>${keyText(values, 'text_key', 'TEXT_KEY')}</p>
        </div>
        <span class="ed-launch__cta" ${editableAttr('cta_key', 'cta')}>${keyText(values, 'cta_key', 'CTA_KEY')} ${CHEVRON_ICON}</span>
      </div>
    </div>`;
}

function launchReplacements(html, values) {
  if (values.image_url) {
    if (values.image_url__video) {
      html = html.replace(
        /(class="braze-modal__media"[\s\S]*?)<img[^>]*\/?>(\s*<!--[^>]*-->)?/,
        `$1<video src="${values.image_url}" autoplay muted loop playsinline></video>`
      );
    } else {
      html = html.replace(
        /(class="braze-modal__media"[\s\S]*?<img src=")[^"]*(")/,
        `$1${values.image_url}$2`
      );
    }
  }
  if (values.badge_key) {
    const badgeAssign = `{%- assign k_badge = "${values.badge_key}" -%}\n`;
    html = html.replace(
      /(class="braze-modal__badge">)[^<]*/,
      `$1{{ t[k_badge] | default: t_en[k_badge] }}`
    );
    html = html.replace(/({%- endif -%}\n)/, `$1${badgeAssign}`);
  }
  if (values.title_key) html = replaceKey(html, 'TITLE_KEY', values.title_key);
  if (values.text_key) html = replaceKey(html, 'TEXT_KEY', values.text_key);
  if (values.cta_key) html = replaceKey(html, 'CTA_KEY', values.cta_key);
  if (values.cta_url) {
    html = html.replace(
      /(id="brazeModalCard"[\s\S]*?data-href=")[^"]*(")/,
      `$1${values.cta_url}$2`
    );
  }
  return html;
}

// --- Modal Onboarding ---

function renderModalOnboarding(values, currentStep = 0) {
  const stepCount = values._stepCount || 6;
  const safeStep = Math.min(currentStep, stepCount - 1);
  const step = safeStep + 1;
  const isLastStep = safeStep === stepCount - 1;

  const thumbs = Array.from({ length: stepCount }, (_, i) => {
    const active = i === safeStep ? ' active' : '';
    const src = imgSrc(values, `step${i + 1}_image`);
    const removeBtn = stepCount > 1
      ? `<span class="ed-onboarding__thumb-remove" data-remove-step="${i}" title="Remove step">${CLOSE_ICON}</span>`
      : '';
    return `<button class="ed-onboarding__thumb${active}" data-step="${i}" tabindex="0">
      ${mediaTag(values, `step${i + 1}_image`, `Step ${i + 1}`)}
      ${removeBtn}
    </button>`;
  }).join('');

  const addBtn = stepCount < 6
    ? `<button class="ed-onboarding__thumb-add" data-add-step title="Add step">+</button>`
    : '';

  const counterText = values.step_counter_key || `Step ${step} of ${stepCount}`;

  return `
    <div class="ed-onboarding">
      <button class="ed-onboarding__close" aria-label="Close">${CLOSE_ICON}</button>
      <div class="ed-onboarding__body">
        <span class="ed-onboarding__counter" ${editableAttr('step_counter_key', 'key')}>${counterText}</span>
        <h2 class="ed-onboarding__title" ${editableAttr(`step${step}_title_key`, 'key')}>${keyText(values, `step${step}_title_key`, `STEP${step}_TITLE_KEY`)}</h2>
        <p class="ed-onboarding__text" ${editableAttr(`step${step}_text_key`, 'key')}>${keyText(values, `step${step}_text_key`, `STEP${step}_TEXT_KEY`)}</p>
        <div class="ed-onboarding__cta-row">
          <span class="ed-onboarding__cta" ${editableAttr(`step${step}_cta_key`, isLastStep ? 'cta' : 'key')}>${keyText(values, `step${step}_cta_key`, `STEP${step}_CTA_KEY`)}</span>
        </div>
      </div>
      <div class="ed-onboarding__carousel">
        <div class="ed-onboarding__main" ${editableAttr(`step${step}_image`, 'image')}>
          ${mediaTag(values, `step${step}_image`, `Step ${step}`)}
        </div>
        <div class="ed-onboarding__thumbs">${thumbs}${addBtn}</div>
      </div>
    </div>`;
}

function onboardingReplacements(html, values) {
  const stepCount = values._stepCount || 6;

  for (let i = 1; i <= 6; i++) {
    const imgKey = `step${i}_image`;
    if (values[`${imgKey}__video`]) {
      html = html.replace(
        new RegExp(`(media:\\s*'\\$\\{step${i}_image\\}',\\s*\\n\\s*mediaType:\\s*')image(')`),
        `$1video$2`
      );
    }
    if (values[imgKey]) {
      html = html.replace(`\${step${i}_image}`, values[imgKey]);
    }
    const titleKey = `step${i}_title_key`;
    if (values[titleKey]) html = replaceKey(html, `STEP${i}_TITLE_KEY`, values[titleKey]);
    const textKey = `step${i}_text_key`;
    if (values[textKey]) html = replaceKey(html, `STEP${i}_TEXT_KEY`, values[textKey]);
    const ctaKey = `step${i}_cta_key`;
    if (values[ctaKey]) html = replaceKey(html, `STEP${i}_CTA_KEY`, values[ctaKey]);
  }

  if (stepCount < 6) {
    html = html.replace(
      /(var STEPS = \[[\s\S]*?\];)/,
      `$1\n      STEPS = STEPS.slice(0, ${stepCount});\n      STEPS[STEPS.length - 1].url = '\${final_cta_url}';`
    );
  }

  if (values.final_cta_url) {
    html = html.replace(/\$\{final_cta_url\}/g, values.final_cta_url);
  }

  if (values.step_counter_key) {
    const counterAssign = `{%- assign k_counter = "${values.step_counter_key}" -%}\n`;
    html = html.replace(/({%- endif -%}\n)/, `$1${counterAssign}`);
    html = html.replace(
      /document\.getElementById\('brazeStepCounter'\)\.textContent = 'Step ' \+ \(index \+ 1\) \+ ' of ' \+ STEPS\.length;/,
      `var _cf = '{{ t[k_counter] | default: t_en[k_counter] }}';\n        document.getElementById('brazeStepCounter').textContent = _cf.replace('%1$s', (index + 1)).replace('%2$s', STEPS.length);`
    );
  }

  return html;
}

// --- Slideup ---

function renderSlideup(values) {
  const iconContent = values.icon_url
    ? `<img src="${values.icon_url}" alt="" />`
    : BELL_ICON;

  return `
    <div class="ed-toast">
      <div class="ed-toast__header">
        <span class="ed-toast__icon" ${editableAttr('icon_url', 'image')}>${iconContent}</span>
        <h2 class="ed-toast__title" ${editableAttr('title_key', 'key')}>${keyText(values, 'title_key', 'TITLE_KEY')}</h2>
        <button class="ed-toast__close" aria-label="Close">${CLOSE_ICON}</button>
      </div>
      <p class="ed-toast__text" ${editableAttr('message_key', 'key')}>${keyText(values, 'message_key', 'MESSAGE_KEY')}</p>
      <span class="ed-toast__action" ${editableAttr('cta_key', 'cta')}>${keyText(values, 'cta_key', 'CTA_KEY')}</span>
    </div>`;
}

function slideupReplacements(html, values) {
  if (values.icon_url) {
    html = html.replace(
      /(<span class="braze-toast__icon"[^>]*>)[\s\S]*?(<\/span>)/,
      `$1\n          <img src="${values.icon_url}" alt="" style="width:100%;height:100%;object-fit:contain;" />\n        $2`
    );
  }
  if (values.title_key) html = replaceKey(html, 'TITLE_KEY', values.title_key);
  if (values.message_key) html = replaceKey(html, 'MESSAGE_KEY', values.message_key);
  if (values.cta_key) html = replaceKey(html, 'CTA_KEY', values.cta_key);
  if (values.cta_url) {
    html = html.replace(
      /(id="brazeToastAction"[\s\S]*?href=")[^"]*(")/,
      `$1${values.cta_url}$2`
    );
  }
  return html;
}

// --- Helpers ---

function replaceKey(html, placeholder, actualKey) {
  return html.replace(new RegExp(`"${placeholder}"`, 'g'), `"${actualKey}"`);
}

export function getTemplate(id) {
  return TEMPLATES.find(t => t.id === id);
}
