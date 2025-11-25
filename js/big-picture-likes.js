import { pictures } from './picture-list.js';

let isLiked = false;
let currentPictureIndex = -1;

const bigPicLikes = document.querySelector('.likes-count');

const onToggleLike = () => {
  if (currentPictureIndex !== -1) {
    if (isLiked) {
      pictures[currentPictureIndex].likes--;
      isLiked = false;
    } else {
      pictures[currentPictureIndex].likes++;
      isLiked = true;
    }

    const currentThumbnails = Array.from(document.querySelectorAll('.picture'));
    bigPicLikes.textContent = pictures[currentPictureIndex].likes;
    const thumbnail = currentThumbnails[currentPictureIndex];
    if (thumbnail) {
      thumbnail.querySelector('.picture__likes').textContent = pictures[currentPictureIndex].likes;
    }
  }
};

const onLikesClick = () => {
  onToggleLike();
};

const initLikes = (pictureIndex, likesCount) => {
  currentPictureIndex = pictureIndex;
  isLiked = false;
  bigPicLikes.textContent = likesCount;
};

const resetLikes = () => {
  isLiked = false;
  currentPictureIndex = -1;
  bigPicLikes.removeEventListener('click', onLikesClick);
};

export { initLikes, onLikesClick, resetLikes };
