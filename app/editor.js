import { getTemplate, isVideoUrl } from './templates.js';

let currentTemplate = null;
let currentValues = {};
let currentStep = 0;
let isDark = false;
let onValuesChange = null;

export function initEditor(previewContainer, options = {}) {
  onValuesChange = options.onValuesChange || null;
}

export function openTemplate(templateId, previewContainer) {
  const tmpl = getTemplate(templateId);
  if (!tmpl) return;

  currentTemplate = tmpl;
  currentValues = {};
  currentStep = 0;
  isDark = false;

  if (tmpl.id === 'modal-onboarding') {
    currentValues._stepCount = 6;
  }

  renderPreview(previewContainer);
  bindEditableRegions(previewContainer);
  bindOnboardingControls(previewContainer);
}

export function toggleTheme(previewContainer) {
  isDark = !isDark;
  previewContainer.classList.toggle('dark', isDark);
  return isDark;
}

export function getValues() {
  return { ...currentValues };
}

export function getCurrentTemplate() {
  return currentTemplate;
}

export function resetEditor() {
  currentTemplate = null;
  currentValues = {};
  currentStep = 0;
  isDark = false;
}

// --- Rendering ---

function renderPreview(container) {
  container.classList.toggle('dark', isDark);

  if (currentTemplate.id === 'modal-onboarding') {
    container.innerHTML = currentTemplate.render(currentValues, currentStep);
  } else {
    container.innerHTML = currentTemplate.render(currentValues);
  }
}

function refreshPreview(container) {
  renderPreview(container);
  bindEditableRegions(container);
  bindOnboardingControls(container);
}

// --- Editable Regions ---

function bindEditableRegions(container) {
  const editables = container.querySelectorAll('[data-editable]');

  editables.forEach((el) => {
    const fieldId = el.dataset.editable;
    const fieldType = el.dataset.fieldType;

    if (currentValues[fieldId] && (fieldType === 'image' || fieldType === 'url')) {
      el.classList.add('has-value');
    }

    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openPopover(el, fieldId, fieldType, container);
    });

    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openPopover(el, fieldId, fieldType, container);
      }
    });
  });
}

// --- Onboarding step controls ---

function bindOnboardingControls(container) {
  if (!currentTemplate || currentTemplate.id !== 'modal-onboarding') return;

  container.querySelectorAll('.ed-onboarding__thumb').forEach((thumb) => {
    thumb.addEventListener('click', (e) => {
      if (e.target.closest('.ed-onboarding__thumb-remove')) return;
      e.stopPropagation();
      const step = parseInt(thumb.dataset.step, 10);
      if (!isNaN(step)) {
        currentStep = step;
        refreshPreview(container);
      }
    });
  });

  container.querySelectorAll('.ed-onboarding__thumb-remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.removeStep, 10);
      removeOnboardingStep(idx, container);
    });
  });

  const addBtn = container.querySelector('.ed-onboarding__thumb-add');
  if (addBtn) {
    addBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      addOnboardingStep(container);
    });
  }
}

function removeOnboardingStep(idx, container) {
  const stepCount = currentValues._stepCount || 6;
  if (stepCount <= 1) return;

  const removedStep = idx + 1;
  const newCount = stepCount - 1;
  const newValues = { ...currentValues, _stepCount: newCount };

  for (let i = removedStep; i < stepCount; i++) {
    const next = i + 1;
    ['_image', '_title_key', '_text_key', '_cta_key'].forEach((suffix) => {
      const fromKey = `step${next}${suffix}`;
      const toKey = `step${i}${suffix}`;
      newValues[toKey] = currentValues[fromKey] || '';
      if (suffix === '_image') {
        newValues[`${toKey}__video`] = currentValues[`${fromKey}__video`] || false;
      }
    });
  }

  ['_image', '_title_key', '_text_key', '_cta_key'].forEach((suffix) => {
    delete newValues[`step${stepCount}${suffix}`];
    delete newValues[`step${stepCount}${suffix}__video`];
  });

  currentValues = newValues;
  if (currentStep >= newCount) currentStep = newCount - 1;
  refreshPreview(container);
  if (onValuesChange) onValuesChange(currentValues);
}

function addOnboardingStep(container) {
  const stepCount = currentValues._stepCount || 6;
  if (stepCount >= 6) return;

  currentValues._stepCount = stepCount + 1;
  refreshPreview(container);
  if (onValuesChange) onValuesChange(currentValues);
}

// --- Popover ---

function openPopover(anchorEl, fieldId, fieldType, previewContainer) {
  closePopover();

  const field = currentTemplate.fields.find((f) => f.id === fieldId);
  if (!field) return;

  const backdrop = document.createElement('div');
  backdrop.className = 'popover-backdrop';
  backdrop.addEventListener('click', closePopover);

  const popover = document.createElement('div');
  popover.className = 'popover';
  popover.id = 'activePopover';

  let fieldsHtml = '';

  if (fieldType === 'image') {
    const curVal = currentValues[fieldId] || '';
    const isVideo = currentValues[`${fieldId}__video`] || isVideoUrl(curVal);
    fieldsHtml = `
      <div class="popover__field">
        <label class="popover__label">${field.label}</label>
        <input class="popover__input" type="url" data-field="${fieldId}"
          value="${escapeAttr(curVal)}" placeholder="${escapeAttr(field.placeholder)}" />
        <label class="popover__checkbox-label">
          <input type="checkbox" class="popover__video-toggle" data-video-field="${fieldId}__video"
            ${isVideo ? 'checked' : ''} />
          This is a video
        </label>
        <div class="popover__img-preview ${curVal && !isVideo ? 'visible' : ''}" id="popoverImgPreview">
          <img src="${curVal || ''}" alt="Preview" onerror="this.parentElement.classList.remove('visible')" />
        </div>
      </div>`;
  } else if (fieldType === 'url') {
    fieldsHtml = `
      <div class="popover__field">
        <label class="popover__label">${field.label}</label>
        <input class="popover__input" type="url" data-field="${fieldId}"
          value="${escapeAttr(currentValues[fieldId] || '')}" placeholder="${escapeAttr(field.placeholder || '')}" />
      </div>`;
  } else if (fieldType === 'cta') {
    const keyField = field;
    const urlFieldId = fieldId.replace('_key', '_url').replace('cta_key', 'cta_url');
    let urlField = currentTemplate.fields.find((f) => f.id === urlFieldId);
    const stepCount = currentValues._stepCount || 6;
    if (!urlField && currentTemplate.id === 'modal-onboarding' && currentStep === stepCount - 1) {
      urlField = currentTemplate.fields.find((f) => f.id === 'final_cta_url');
    }

    fieldsHtml = `
      <div class="popover__field">
        <label class="popover__label">${keyField.label}</label>
        <input class="popover__input" type="text" data-field="${fieldId}"
          value="${escapeAttr(currentValues[fieldId] || '')}" placeholder="${escapeAttr(keyField.placeholder)}" />
      </div>`;

    if (urlField) {
      fieldsHtml += `
        <div class="popover__field">
          <label class="popover__label">${urlField.label}</label>
          <input class="popover__input" type="url" data-field="${urlField.id}"
            value="${escapeAttr(currentValues[urlField.id] || '')}" placeholder="${escapeAttr(urlField.placeholder)}" />
        </div>`;
    }
  } else {
    fieldsHtml = `
      <div class="popover__field">
        <label class="popover__label">${field.label}</label>
        <input class="popover__input" type="text" data-field="${fieldId}"
          value="${escapeAttr(currentValues[fieldId] || '')}" placeholder="${escapeAttr(field.placeholder)}" />
      </div>`;
  }

  popover.innerHTML = `
    ${fieldsHtml}
    <div class="popover__actions">
      <button class="popover__btn popover__btn--confirm" id="popoverConfirm">Apply</button>
    </div>
  `;

  document.body.appendChild(backdrop);
  document.body.appendChild(popover);

  positionPopover(popover, anchorEl);

  const firstInput = popover.querySelector('.popover__input');
  if (firstInput) {
    requestAnimationFrame(() => firstInput.focus());
  }

  // Live image preview + auto-detect video
  const imgInput = popover.querySelector('input[type="url"][data-field$="_image"], input[type="url"][data-field="image_url"], input[type="url"][data-field="icon_url"]');
  const videoToggle = popover.querySelector('.popover__video-toggle');
  if (imgInput && fieldType === 'image') {
    imgInput.addEventListener('input', () => {
      const preview = document.getElementById('popoverImgPreview');
      if (videoToggle) {
        const detected = isVideoUrl(imgInput.value);
        videoToggle.checked = detected;
        if (preview) {
          preview.classList.toggle('visible', !!imgInput.value && !detected);
        }
      }
      if (preview && (!videoToggle || !videoToggle.checked)) {
        const img = preview.querySelector('img');
        if (imgInput.value) {
          img.src = imgInput.value;
          preview.classList.add('visible');
          img.onerror = () => preview.classList.remove('visible');
        } else {
          preview.classList.remove('visible');
        }
      }
    });
  }

  if (videoToggle) {
    videoToggle.addEventListener('change', () => {
      const preview = document.getElementById('popoverImgPreview');
      if (preview) {
        preview.classList.toggle('visible', !!imgInput?.value && !videoToggle.checked);
      }
    });
  }

  document.getElementById('popoverConfirm').addEventListener('click', () => {
    applyPopoverValues(popover, previewContainer);
  });

  popover.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      applyPopoverValues(popover, previewContainer);
    }
    if (e.key === 'Escape') {
      closePopover();
    }
  });
}

function applyPopoverValues(popover, previewContainer) {
  const inputs = popover.querySelectorAll('.popover__input');
  inputs.forEach((input) => {
    const fid = input.dataset.field;
    if (!fid) return;
    const trimmed = input.value.trim();
    if (trimmed) {
      currentValues[fid] = trimmed;
    } else {
      delete currentValues[fid];
    }
  });

  const videoToggles = popover.querySelectorAll('.popover__video-toggle');
  videoToggles.forEach((toggle) => {
    const fid = toggle.dataset.videoField;
    if (fid) {
      currentValues[fid] = toggle.checked;
    }
  });

  closePopover();
  refreshPreview(previewContainer);
  if (onValuesChange) onValuesChange(currentValues);
}

function closePopover() {
  const backdrop = document.querySelector('.popover-backdrop');
  const popover = document.getElementById('activePopover');
  if (backdrop) backdrop.remove();
  if (popover) popover.remove();
}

function positionPopover(popover, anchor) {
  const rect = anchor.getBoundingClientRect();
  const popW = 320;
  const margin = 12;

  let left = rect.left + rect.width / 2 - popW / 2;
  let top = rect.bottom + margin;

  if (left < margin) left = margin;
  if (left + popW > window.innerWidth - margin) left = window.innerWidth - popW - margin;

  if (top + 300 > window.innerHeight) {
    top = rect.top - margin - 200;
    if (top < margin) top = margin;
  }

  popover.style.left = `${left}px`;
  popover.style.top = `${top}px`;
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
