export default (state) => {
  const numberOfQuestions = state.questions.length;
  let stats = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    let extraClass = `unknown`;

    if (state.stats[i]) {

      if (state.stats[i].result) {
        extraClass = `correct`;

        if (state.stats[i].time < state.fastTime) {
          extraClass = `fast`;
        } else if (state.stats[i].time > state.slowTime) {
          extraClass = `slow`;
        }
      } else {
        extraClass = `wrong`;
      }
    }

    stats.push(`<li class="stats__result stats__result--${extraClass}"></li>`);
  }

  const template = `
    <ul class="stats">
      ${stats.join(``)}
    </ul>`;

  return template;
};
