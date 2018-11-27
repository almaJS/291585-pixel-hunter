import {NUMBER_OF_ANSWERS} from './count-result.js';

export const changeLevel = (state, level) => {
  let newLevel = level;

  if (level < 0) {
    newLevel = 0;
  } else if (level > NUMBER_OF_ANSWERS) {
    newLevel = NUMBER_OF_ANSWERS;
  }

  return Object.assign({}, state, {level: newLevel});
};
