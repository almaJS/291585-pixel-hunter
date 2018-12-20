import gamePoints from './game-points.js';

export default (state) => {
  const rightAnswers = state.stats.filter((statValue) => statValue.result);
  const rightCounter = rightAnswers.length;
  const fastCounter = rightAnswers.filter((statValue) => statValue.time < gamePoints.fastTime).length;
  const slowCounter = rightAnswers.filter((statValue) => statValue.time > gamePoints.slowTime).length;

  const result = {
    isWinner: state.numberOfQuestions === state.stats.length,
    right: {
      count: rightCounter,
      points: rightCounter * gamePoints.normalPoints
    },
    fast: {
      count: fastCounter,
      points: fastCounter * gamePoints.fastPoints
    },
    slow: {
      count: slowCounter,
      points: slowCounter * gamePoints.slowPoints
    },
    lives: {
      count: state.lives,
      points: state.lives * gamePoints.lifePoints
    },
  };

  result.total = result.right.points + result.fast.points + result.slow.points + result.lives.points;

  return result;
};
