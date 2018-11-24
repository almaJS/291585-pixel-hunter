export const reduceCountdown = (state) => {
  const newState = Object.assign({}, state);

  if (state.time < 0) {
    throw new Error(`Время не может быть отрицательным`);
  } else if (state.time > 0) {
    newState.time--;
  }

  return newState;
};
