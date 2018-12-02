export default (state, result, time) => {
  const newState = Object.assign({}, state);
  newState.stats.push({result, time});

  return newState;
};
