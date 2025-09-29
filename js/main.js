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
  'Роман'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTIONS = [
  'Прекрасный момент, запечатлённый на камеру',
  'Люблю этот вид',
  'Как я тут оказался?',
  'Ну что за красота!',
  '2 из 10',
  'Полный стрём!'
];

const POSTS_COUNT = 25;
const USED_POST_ID = [];
const USED_COMMENT_ID = [];

function getRandomInteger(a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement(elements) {
  return elements[getRandomInteger(0, elements.length-1)];
}

function getRandomNoRepeatInt(min, max, usedArray) {
  let currentValue;
  currentValue = getRandomInteger(min, max);
  while (usedArray.includes(currentValue)) {
    currentValue = getRandomInteger(min, max);
  }
  usedArray.push(currentValue);
  return currentValue;
}

const createComment = () => ({
  id: getRandomNoRepeatInt(1, 1000, USED_COMMENT_ID),
  avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
  message: getRandomArrayElement(MESSAGES),
  name: getRandomArrayElement(NAMES),
});

const createPost = () => {
  const commentsCount = getRandomInteger(0, 30);
  const postId = getRandomNoRepeatInt(1, 25, USED_POST_ID);

  return {
    id: postId,
    url: `photos/${postId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: commentsCount}, createComment),
  };
};

// eslint-disable-next-line no-unused-vars
const posts = Array.from({length: POSTS_COUNT}, createPost);

