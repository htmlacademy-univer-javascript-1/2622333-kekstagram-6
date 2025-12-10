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
  bigPicLikes.addEventListener('click', onLikesClick);
};

const resetLikes = () => {
  isLiked = false;
  currentPictureIndex = -1;
  bigPicLikes.removeEventListener('click', onLikesClick);
};

export { initLikes, onLikesClick, resetLikes };
