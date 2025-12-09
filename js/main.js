import { renderPictures } from './picture-list.js';
import './big-picture.js';
import './image-editing.js';
import './image-scale.js';
import { getData } from './api.js';
import { initFilters } from './image-filters.js';
import { showErrorMessage } from './form-validation.js';

getData()
  .then((data) => {
    renderPictures(data);
    initFilters();
  })
  .catch((error) => {
    showErrorMessage(error.message);
  });
