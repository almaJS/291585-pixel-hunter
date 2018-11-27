export const reduceNumberOfLives = (state) => {
  const newState = Object.assign({}, state);

  if (state.lives <= 0) {
    newState.lives = 0;
  } else {
    newState.lives--;
  }

  return newState;
};
