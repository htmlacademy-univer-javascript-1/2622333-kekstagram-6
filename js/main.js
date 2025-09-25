/*
Не должны повторяться: id, url, commentsId'
Генерируется рандомно: likes, comments,
*/

const NAMES = [
  'Виктория',
  'Екатерина',
  'Евгения',
  'Кристина',
  'Василиса',
  'Георгий',
  'Сергей',
  'Иван',
  'Павел',
  'Роман',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const POSTS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length-1)];

const getRandomNoRepeatInt = (min, max) => {
  const previousValue = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    while (previousValue.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValue.push(currentValue);
    return currentValue;
  };
};

const createComment = () => ({
  id: '',
  avatar: `img/avatar-${  getRandomInteger(1, 6)  }.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => ({
  id: getRandomNoRepeatInt(1, 25),
  url: `photos/${  getRandomNoRepeatInt(1, 25)  }.jpg`,
  description: '',
  likes: getRandomInteger(15, 200),
  comments: createComment(),
});

const posts = Array.from({length: POSTS_COUNT}, createPost);
console.log(posts);
console.log(1);
