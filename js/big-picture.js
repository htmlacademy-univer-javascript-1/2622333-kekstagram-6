import { isEscapeKey } from './utils.js';
import { pictures } from './picture-list.js';
import { initComments, onCommentsLoaderClick, resetComments } from './big-picture-comments.js';
import { initLikes, onLikesClick, resetLikes } from './big-picture-likes.js';

const openBigPicElement = document.querySelector('.pictures');
const closeBigPicElement = document.querySelector('.big-picture__cancel');
const mainWindow = document.body;

const bigPicture = document.querySelector('.big-picture');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const bigPicDescription = bigPicture.querySelector('.social__caption');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');
const bigPicLikes = document.querySelector('.likes-count');

const thumbnails = document.querySelectorAll('.picture');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const index = Array.from(thumbnails).indexOf(thumbnail);

    if (index !== -1) {
      const pictureData = pictures[index];

      bigPicImg.src = thumbnailImg.src;
      bigPicDescription.textContent = thumbnailImg.alt;
      bigPicComments.textContent = pictureData.comments.length;

      initLikes(index, pictureData.likes);
      initComments(pictureData.comments);

      openBigPic();
    }
  }
};

function closeBigPic () {
  bigPicture.classList.add('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  resetComments();
  resetLikes();
}

function openBigPic () {
  bigPicture.classList.remove('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  bigPicCommentLoader.addEventListener('click', onCommentsLoaderClick);
  bigPicLikes.addEventListener('click', onLikesClick);
}

closeBigPicElement.addEventListener('click', () => {
  closeBigPic();
});

openBigPicElement.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});
