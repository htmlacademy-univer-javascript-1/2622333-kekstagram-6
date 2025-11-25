import { isEscapeKey } from './utils.js';
import { pictures } from './picture-list.js';
import { initComments, onCommentsLoaderClick, resetComments } from './big-picture-comments.js';
import { initLikes, onLikesClick, resetLikes } from './big-picture-likes.js';

const openBigPicElement = document.querySelector('.pictures');
const closeBigPicElement = document.querySelector('.big-picture__cancel');
const mainWindow = document.body;

const bigPictureElement = document.querySelector('.big-picture');
const bigPicImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPicDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPicCommentsElement = bigPictureElement.querySelector('.comments-count');
const bigPicCommentLoaderElement = document.querySelector('.comments-loader');
const bigPicLikesElement = document.querySelector('.likes-count');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPic();
  }
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const index = currentThumbnails.indexOf(thumbnail);

    if (index !== -1) {
      const pictureData = pictures[index];

      bigPicImgElement.src = thumbnailImg.src;
      bigPicDescriptionElement.textContent = thumbnailImg.alt;
      bigPicCommentsElement.textContent = pictureData.comments.length;

      initLikes(index, pictureData.likes);
      initComments(pictureData.comments);

      onOpenBigPic();
    }
  }
};

function onCloseBigPic () {
  bigPictureElement.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  resetComments();
  resetLikes();
}

function onOpenBigPic () {
  bigPictureElement.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicCommentLoaderElement.addEventListener('click', onCommentsLoaderClick);
  bigPicLikesElement.addEventListener('click', onLikesClick);
}

closeBigPicElement.addEventListener('click', () => {
  onCloseBigPic();
});

openBigPicElement.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});
