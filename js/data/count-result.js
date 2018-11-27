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

  return answers.reduce((sumOfPoints, answer) => {
    if (!answer.result) {
      return sumOfPoints;
    }

    if (answer.time < FAST_TIME) {
      sumOfPoints += FAST_POINTS;
    } else if (answer.time > SLOW_TIME) {
      sumOfPoints -= SLOW_POINTS;
    }

    return sumOfPoints + NORMAL_POINTS;
  }, LIFE_POINTS * lives);
};
