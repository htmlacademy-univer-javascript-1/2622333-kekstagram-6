import { isEscapeKey } from './utils.js';

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
  form.reset();
  uploadImage.value = '';
  mainWindow.classList.remove('modal-open');
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeEditorElement.addEventListener('click', () => {
  closeImageEditor();
});
