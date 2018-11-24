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

  let sumOfPoints = 0;

  answers.forEach((answer) => {
    if (answer.result) {
      sumOfPoints += NORMAL_POINTS;

      if (answer.time < FAST_TIME) {
        sumOfPoints += FAST_POINTS;
      }

      if (answer.time > SLOW_TIME) {
        sumOfPoints -= SLOW_POINTS;
      }
    }
  });

  sumOfPoints += LIFE_POINTS * lives;

  return sumOfPoints;
};
