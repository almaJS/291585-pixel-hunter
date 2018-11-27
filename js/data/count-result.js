export const NUMBER_OF_ANSWERS = 10;
const NORMAL_POINTS = 100;
const FAST_POINTS = 50;
const SLOW_POINTS = 50;
const LIFE_POINTS = 50;
const FAST_TIME = 10;
const SLOW_TIME = 20;

export const countResult = (answers, lives) => {
  if (answers.length < NUMBER_OF_ANSWERS || lives <= 0) {
    return -1;
  }

  let sumOfPoints = LIFE_POINTS * lives;

  sumOfPoints = answers.reduce((accumulator, answer) => {
    if (!answer.result) {
      return accumulator;
    }

    if (answer.time < FAST_TIME) {
      accumulator += FAST_POINTS;
    } else if (answer.time > SLOW_TIME) {
      accumulator -= SLOW_POINTS;
    }

    return accumulator + NORMAL_POINTS;
  }, sumOfPoints);

  return sumOfPoints;
};
