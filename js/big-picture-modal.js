import { isEscapeKey } from './utils.js';
import { pictures } from './picture-list.js';

const bigPictureElement = document.querySelector('.big-picture');
const closeBigPicElement = document.querySelector('.big-picture__cancel');
const bigPicImgElement = bigPictureElement.querySelector('.big-picture__img img');
const bigPicDescriptionElement = bigPictureElement.querySelector('.social__caption');
const bigPicLikesElement = bigPictureElement.querySelector('.likes-count');
const bigPicCommentsElement = bigPictureElement.querySelector('.comments-count');
const bigPicCommentList = bigPictureElement.querySelector('.social__comments');
const openBigPicElement = document.querySelector('.pictures');
const bigPicCommentCountElement = document.querySelector('.social__comment-count');
const bigPicCommentLoaderElement = document.querySelector('.comments-loader');
const mainWindowElement = document.body;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    onCloseBigPic();
  }
};

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = comment.avatar;
  avatarImg.alt = comment.name;
  avatarImg.width = 35;
  avatarImg.height = 35;

  const textElement = document.createElement('p');
  textElement.classList.add('social__text');
  textElement.textContent = comment.message;

  commentElement.appendChild(avatarImg);
  commentElement.appendChild(textElement);

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
    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    const thumbnailImg = thumbnail.querySelector('.picture__img');
    const thumbnailLikes = thumbnail.querySelector('.picture__likes').textContent;
    const thumbnailComments = thumbnail.querySelector('.picture__comments').textContent;

    bigPicImgElement.src = thumbnailImg.src;
    bigPicDescriptionElement.textContent = thumbnailImg.alt;
    bigPicLikesElement.textContent = thumbnailLikes;
    bigPicCommentsElement.textContent = thumbnailComments;

    const index = currentThumbnails.indexOf(thumbnail);
    if (index !== -1) {
      renderAllComments(pictures[index].comments);
    }

    onOpenBigPic();
  }
};

function onCloseBigPic () {
  bigPictureElement.classList.add('hidden');
  bigPicCommentCountElement.classList.remove('hidden');
  bigPicCommentLoaderElement.classList.remove('hidden');
  mainWindowElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeBigPicElement.addEventListener('click', () => {
  onCloseBigPic();
});

function onOpenBigPic () {
  bigPictureElement.classList.remove('hidden');
  bigPicCommentCountElement.classList.add('hidden');
  bigPicCommentLoaderElement.classList.add('hidden');
  mainWindowElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
}

openBigPicElement.addEventListener('click', (evt) => {
  onThumbnailClick(evt);
});
