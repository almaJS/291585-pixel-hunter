import {NUMBER_OF_ANSWERS} from './count-result.js';

export const changeLevel = (state, level) => {
  const newState = Object.assign({}, state);

  if (level < 0) {
    newState.level = 0;
  } else if (level > NUMBER_OF_ANSWERS) {
    newState.level = NUMBER_OF_ANSWERS;
  } else {
    newState.level = level;
  }

  return newState;
};
