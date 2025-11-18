import { isEscapeKey } from './utils.js';

const form = document.querySelector('.img-upload__form');
const hashtagInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');

const pristine = new Pristine(form , {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper-error',
});

const hashtagRegex = /^#[a-zа-яё0-9]{1,19}$/i;

pristine.addValidator(commentInput, (value) =>
  value.length <= 140, 'Максимальная длина комментария 140 символов');

pristine.addValidator(hashtagInput, (value) => {
  if (value.trim() === '') {
    return true;
  }

  const hashtags = value.split(' ').filter((tag) => tag !== '');
  let isValid = true;

  for (const hashtag of hashtags) {
    if (!hashtagRegex.test(hashtag)) {
      return false;
    }
  }

  if (hashtags.length > 5) {
    isValid = false;
  }

  const uniqueHashtags = new Set(hashtags.map((tag) => tag.toLowerCase()));
  if (uniqueHashtags.size !== hashtags.length) {
    isValid = false;
  }

  return isValid;
}, 'Хэш-теги не соответствует требованиям');

form.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();

  if (!isValid) {
    evt.preventDefault();
  }
});

const onFieldKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

hashtagInput.addEventListener('keydown', onFieldKeydown);
commentInput.addEventListener('keydown', onFieldKeydown);

hashtagInput.addEventListener('input', () => {
  pristine.validate(hashtagInput);
});

commentInput.addEventListener('input', () => {
  pristine.validate(commentInput);
});

const resetValidation = () => {
  pristine.reset();
};

export { resetValidation };
