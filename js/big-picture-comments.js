const COMMENTS_LOADING_SIZE = 5;
let pictureComments = [];
let commentsShown = 0;

const bigPicCommentList = document.querySelector('.social__comments');
const bigPicCommentCount = document.querySelector('.social__comment-count');
const bigPicCommentLoader = document.querySelector('.comments-loader');

const createCommentElement = (comment) => {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  commentElement.innerHTML = `
    <img
      class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
  `;

  return commentElement;
};

const renderCommentsPortion = () => {
  const commentsToShow = pictureComments.slice(commentsShown, commentsShown + COMMENTS_LOADING_SIZE);

  commentsToShow.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    bigPicCommentList.appendChild(commentElement);
  });

  commentsShown += commentsToShow.length;
  bigPicCommentCount.innerHTML = `${commentsShown} из <span class="comments-count">${pictureComments.length}</span> комментариев`;

  if (commentsShown >= pictureComments.length) {
    bigPicCommentLoader.classList.add('hidden');
  } else {
    bigPicCommentLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  renderCommentsPortion();
};

const initComments = (comments) => {
  pictureComments = comments;
  commentsShown = 0;
  bigPicCommentList.innerHTML = '';
  renderCommentsPortion();
};

const resetComments = () => {
  pictureComments = [];
  commentsShown = 0;
  bigPicCommentLoader.removeEventListener('click', onCommentsLoaderClick);
};

export { initComments, onCommentsLoaderClick, resetComments };
