export const changeLevel = (state, level) => {
  let newLevel = level;

  if (level > state.questions.length) {
    newLevel = -1;
  }

  return Object.assign({}, state, {level: newLevel});
};
