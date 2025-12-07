const EFFECTS = {
  none: { filter: '', min: 0, max: 0, step: 0, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' }
};

const editingImage = document.querySelector('.img-upload__preview img');
const effectsList = document.querySelectorAll('.effects__radio');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.effect-level');

effectLevelValue.value = 100;
let currentEffect = 'none';
effectLevel.classList.add('hidden');

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    }
  }
});


const updateSliderOptions = (effect) => {
  const effectData = EFFECTS[effect];
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effectData.min,
      max: effectData.max,
    },
    start: effectData.max,
    step: effectData.step
  });
};

const applyEffect = (effect, value) => {
  const effectData = EFFECTS[effect];
  editingImage.style.filter = `${effectData.filter}(${value}${effectData.unit})`;
};

const cleanupEffect = () => {
  editingImage.style.filter = 'none';
  effectLevelValue.value = '';
};

const onSliderUpdate = () => {
  const sliderValue = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = sliderValue;

  if (currentEffect !== 'none') {
    applyEffect(currentEffect, sliderValue);
  }
};

const onEffectChangeHandler = (evt) => {
  currentEffect = evt.target.value;

  if (currentEffect === 'none') {
    effectLevel.classList.add('hidden');
    cleanupEffect();
  } else {
    effectLevel.classList.remove('hidden');
    const effectData = EFFECTS[currentEffect];
    applyEffect(currentEffect, effectData.max);
    updateSliderOptions(currentEffect);
  }
};

const initEffects = () => {
  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  if (effectsList.length > 0) {
    effectsList.forEach((effectElement) => {
      effectElement.addEventListener('change', onEffectChangeHandler);
    });
  }
};

const resetEffects = () => {
  cleanupEffect();
  effectLevelSlider.noUiSlider.off('update');

  if (effectsList.length > 0) {
    effectsList.forEach((effectElement) => {
      effectElement.removeEventListener('change', onEffectChangeHandler);
    });
  }
};

export { initEffects, cleanupEffect, resetEffects };
