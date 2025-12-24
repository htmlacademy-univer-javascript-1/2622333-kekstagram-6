import { isEscapeKey } from './utils.js';
import { resetFormValidation, initFormValidation } from './form-validation.js';
import { initEffects, resetEffects, cleanupEffect } from './image-effects.js';
import { initScale, resetScale, cleanupScale } from './image-scale.js';

const imageUploading = document.querySelector('.img-upload__input');
const imageEditor = document.querySelector('.img-upload__overlay');
const mainWindow = document.body;
const closeEditor = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const previewImage = document.querySelector('.img-upload__preview img');
const defaultImageSrc = 'img/upload-default-image.jpg';

const isTextFieldFocused = () =>
  document.activeElement === hashtagField ||
  document.activeElement === commentField;

const closeImageEditor = () => {
  form.reset();
  imageUploading.value = '';

  previewImage.src = defaultImageSrc;

  mainWindow.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetFormValidation();
  cleanupEffect();
  resetEffects();
  cleanupScale();
  resetScale();
};

const showFileTypeError = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const body = document.querySelector('body');

  const errorElement = errorTemplate.cloneNode(true);

  const titleElement = errorElement.querySelector('h2');
  if (titleElement) {
    titleElement.textContent = 'Неверный тип файла.\nВыберите изображение в формате GIF, JPEG или PNG';
    titleElement.style.whiteSpace = 'pre-line';
  }

  const closeModal = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscapeKeydown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscapeKeydown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeModal();
    }
  }

  function onOutsideClick (evt) {
    if (!evt.target.closest('.error__inner')) {
      closeModal();
    }
  }

  const closeButton = errorElement.querySelector('.error__button');
  closeButton.addEventListener('click', closeModal);
  document.addEventListener('keydown', onEscapeKeydown);
  document.addEventListener('click', onOutsideClick);

  body.appendChild(errorElement);
  imageUploading.value = '';
};

const openImageEditor = () => {
  const file = imageUploading.files[0];
  if (!file) {
    return;
  }

  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((type) => fileName.endsWith(type));

  if (matches) {
    previewImage.src = URL.createObjectURL(file);
  }

  const isImage = file.type.startsWith('image/');

  if (!isImage) {
    showFileTypeError();
    return;
  }

  imageEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  initFormValidation();
  initEffects();
  initScale();
};

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeImageEditor();
  }
}

imageUploading.addEventListener('change', openImageEditor);
closeEditor.addEventListener('click', closeImageEditor);

export { closeImageEditor, openImageEditor };
