import { isEscapeKey } from './utils.js';
import { resetValidation } from './form-validation.js';

const uploadImage = document.querySelector('.img-upload__input');
const imageEditor = document.querySelector('.img-upload__overlay');
const mainWindow = document.body;
const closeEditorElement = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditor();
  }
};

function openImageEditor () {
  imageEditor.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

uploadImage.addEventListener('change', openImageEditor);

function closeImageEditor () {
  imageEditor.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  uploadImage.value = '';
  form.reset();
  resetValidation();
}

closeEditorElement.addEventListener('click', () => {
  closeImageEditor();
});
