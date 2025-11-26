const SCALE = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};

const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const editingImage = document.querySelector('.img-upload__preview img');

let currentScale = SCALE.DEFAULT;

const getScaleTransform = (scale) => `scale(${scale / 100})`;

const updateScale = () => {
  scaleValue.value = `${currentScale}%`;
  editingImage.style.transform = getScaleTransform(currentScale);
};

const getDecreasedScale = (scale) => Math.max(SCALE.MIN, scale - SCALE.STEP);
const getIncreasedScale = (scale) => Math.min(SCALE.MAX, scale + SCALE.STEP);

const onScaleSmallerButtonClick = () => {
  currentScale = getDecreasedScale(currentScale);
  updateScale();
};

const onScaleBiggerButtonClick = () => {
  currentScale = getIncreasedScale(currentScale);
  updateScale();
};

const cleanupScale = () => {
  currentScale = SCALE.DEFAULT;
  updateScale();
};

const initScale = () => {
  scaleSmallerButton.addEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerButtonClick);
  cleanupScale();
};

const resetScale = () => {
  scaleSmallerButton.removeEventListener('click', onScaleSmallerButtonClick);
  scaleBiggerButton.removeEventListener('click', onScaleBiggerButtonClick);
};

export { initScale, resetScale, cleanupScale };
