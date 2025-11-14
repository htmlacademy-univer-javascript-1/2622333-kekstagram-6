import { pictures } from './picture-list';

let isLiked = false;
let currentPictureIndex = -1;

const bigPicLikes = document.querySelector('.likes-count');
const thumbnails = document.querySelectorAll('.picture');

const toggleLike = () => {
  if (currentPictureIndex !== -1) {
    if (isLiked) {
      pictures[currentPictureIndex].likes--;
      isLiked = false;
    } else {
      pictures[currentPictureIndex].likes++;
      isLiked = true;
    }

    bigPicLikes.textContent = pictures[currentPictureIndex].likes;
    const thumbnail = thumbnails[currentPictureIndex];
    if (thumbnail) {
      thumbnail.querySelector('.picture__likes').textContent = pictures[currentPictureIndex].likes;
    }
  }
};

const onLikesClick = () => {
  toggleLike();
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
