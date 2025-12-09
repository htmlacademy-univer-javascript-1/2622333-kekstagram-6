import { renderPictures, getPictures } from './picture-list.js';

const RANDOM_PICTURES_COUNT = 10;
const RENDER_DELAY = 500;

const filtersElement = document.querySelector('.img-filters');
const filterButtons = filtersElement.querySelectorAll('.img-filters__button');

let timeoutId = null;

const showFilters = () => {
  filtersElement.classList.remove('img-filters--inactive');
};

const debounce = (callback) => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(callback, RENDER_DELAY);
};

const getRandomPictures = (pictures) => {
  const shuffled = [...pictures].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PICTURES_COUNT);
};

const getDiscussedPictures = (pictures) =>
  [...pictures].sort((a, b) => b.comments.length - a.comments.length);

const renderFilteredPictures = (filter) => {
  const pictures = getPictures();
  let filteredPictures;

  switch(filter) {
    case 'random':
      filteredPictures = getRandomPictures(pictures);
      break;
    case 'discussed':
      filteredPictures = getDiscussedPictures(pictures);
      break;
    default:
      filteredPictures = pictures;
  }

  renderPictures(filteredPictures);
};

const onFilterButtonClick = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {
    return;
  }

  const clickedButton = evt.target;
  if (clickedButton.classList.contains('img-filters__button--active')) {
    return;
  }

  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  clickedButton.classList.add('img-filters__button--active');
  const filter = clickedButton.id.replace('filter-', '');

  debounce(() => {
    renderFilteredPictures(filter);
  });
};

const initFilters = () => {
  showFilters();
  filtersElement.addEventListener('click', onFilterButtonClick);
};

export { initFilters };
