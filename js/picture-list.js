const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let pictures = [];

const pictureList = document.querySelector('.pictures');

export const getPictures = () => pictures;

export const renderPictures = (data) => {
  pictures = data;

  const existingPictures = pictureList.querySelectorAll('.picture:not(.img-upload)');
  existingPictures.forEach((picture) => picture.remove());

  const pictureListFragment = document.createDocumentFragment();

  pictures.forEach(({url, description, likes, comments}, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const imgElement = pictureElement.querySelector('.picture__img');
    imgElement.src = url;
    imgElement.alt = description;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.dataset.index = index;
    pictureListFragment.append(pictureElement);
  });

  pictureList.append(pictureListFragment);
};
