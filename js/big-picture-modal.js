import { isEscapeKey } from './utils.js';
import { pictures } from './picture-list.js';

const bigPicture = document.querySelector('.big-picture');
const closeBigPicElement = document.querySelector('.big-picture__cancel');
const bigPicImg = bigPicture.querySelector('.big-picture__img img');
const bigPicDescription = bigPicture.querySelector('.social__caption');
const bigPicLikes = bigPicture.querySelector('.likes-count');
const bigPicComments = bigPicture.querySelector('.comments-count');
const bigPicCommentList = bigPicture.querySelector('.social__comments');
const openBigPicElement = document.querySelector('.pictures');
const bigPicCommentCount = document.querySelector('.social__comment-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');
const mainWindow = document.body;

const thumbnails = document.querySelectorAll('.picture');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPic();
  }
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

const renderAllComments = (comments) => {
  bigPicCommentList.innerHTML = '';
  comments.forEach((comment) => {
    bigPicCommentList.appendChild(createCommentElement(comment));
  });
};

const onThumbnailClick = (evt) => {
  const thumbnail = evt.target.closest('.picture');

  if (thumbnail) {
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes').textContent;
    const thumbnailComments = thumbnail.querySelector('.picture__comments').textContent;

    bigPicImg.src = thumbnailImg.src;
    bigPicDescription.textContent = thumbnailImg.alt;
    bigPicLikes.textContent = thumbnailLikes;
    bigPicComments.textContent = thumbnailComments;

    const index = Array.from(thumbnails).indexOf(thumbnail);
    if (index !== -1) {
      renderAllComments(pictures[index].comments);
    }

    openBigPic();
  }
};

function closeBigPic () {
  bigPicture.classList.add('hidden');
  bigPicCommentCount.classList.remove('hidden');
  bigPicCommentLoader.classList.remove('hidden');
  mainWindow.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeBigPicElement.addEventListener('click', () => {
  closeBigPic();
});

function openBigPic () {
  bigPicture.classList.remove('hidden');
  bigPicCommentCount.classList.add('hidden');
  bigPicCommentLoader.classList.add('hidden');
  mainWindow.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

openBigPicElement.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});
