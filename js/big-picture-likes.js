import { getPictures } from './picture-list.js';

let isLiked = false;
let currentPictureIndex = -1;

const bigPicLikes = document.querySelector('.likes-count');

const onToggleLike = () => {
  if (currentPictureIndex !== -1) {
    const pictures = getPictures();
    const picture = pictures[currentPictureIndex];

    if (!picture) {
      return;
    }

    if (isLiked) {
      picture.likes--;
      isLiked = false;
    } else {
      picture.likes++;
      isLiked = true;
    }

    bigPicLikes.textContent = picture.likes;

    const thumbnail = document.querySelector(`.picture[data-index="${currentPictureIndex}"]`);
    if (thumbnail) {
      thumbnail.querySelector('.picture__likes').textContent = picture.likes;
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
  bigPicLikes.addEventListener('click', onLikesClick);
};

const resetLikes = () => {
  isLiked = false;
  currentPictureIndex = -1;
  bigPicLikes.removeEventListener('click', onLikesClick);
};

export { initLikes, onLikesClick, resetLikes };
