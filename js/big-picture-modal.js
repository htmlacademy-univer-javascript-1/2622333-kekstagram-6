import { isEscapeKey } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPicElement = document.querySelector('.big-picture__cancel');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const bigPicDescription = bigPicture.querySelector('.social__caption');
const bigPicLikes = bigPicture.querySelector('.likes-count');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicCommentList = bigPicture.querySelector('.social__comments');
const openBigPicElement = document.querySelector('.pictures');

const onDocumentKey = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
};

function closeBigPic () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKey);
}

closeBigPicElement.addEventListener('click', () => {
  closeBigPic();
});

function openBigPic () {
  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKey);
}

openBigPicElement.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes').textContent;
    const thumbnailComments = thumbnail.querySelector('.picture__comments').textContent;

    bigPicImg.src = thumbnailImg.src;
    bigPicDescription.textContent = thumbnailImg.alt;
    bigPicLikes.textContent = thumbnailLikes;
    bigPicComments.textContent = thumbnailComments;
  }

  openBigPic();
});

