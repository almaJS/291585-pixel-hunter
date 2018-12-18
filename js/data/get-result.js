export default (state) => {
  const rightAnswers = state.stats.filter((statValue) => statValue.result);
  const rightCounter = rightAnswers.length;
  const fastCounter = rightAnswers.filter((statValue) => statValue.time < state.fastTime).length;
  const slowCounter = rightAnswers.filter((statValue) => statValue.time > state.slowTime).length;

  const result = {
    isWinner: state.questions.length === state.stats.length,
    right: {
      count: rightCounter,
      points: rightCounter * state.normalPoints
    },
    fast: {
      count: fastCounter,
      points: fastCounter * state.fastPoints
    },
    slow: {
      count: slowCounter,
      points: slowCounter * state.slowPoints
    },
    lives: {
      count: state.lives,
      points: state.lives * state.lifePoints
    },
  };

  result.total = result.right.points + result.fast.points + result.slow.points + result.lives.points;

  return result;
};
