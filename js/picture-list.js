import { createPictures } from './picture-data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
export const pictures = createPictures();

const pictureList = document.querySelector('.pictures');
const pictureListFragment = document.createDocumentFragment();

pictures.forEach(({url, description, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const imgElement = pictureElement.querySelector('.picture__img');
  imgElement.src = url;
  imgElement.alt = description;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureListFragment.append(pictureElement);
});

pictureList.append(pictureListFragment);

