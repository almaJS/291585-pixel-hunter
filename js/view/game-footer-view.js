import AbstractView from "./abstract-view.js";
import gamePoints from "../data/game-points.js";

const getStatsTemplate = (state) => {
  const numberOfQuestions = state.numberOfQuestions;
  let stats = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    let extraClass = `unknown`;

    if (state.stats[i]) {

      if (state.stats[i].result) {
        extraClass = `correct`;

        if (state.stats[i].time < gamePoints.fastTime) {
          extraClass = `fast`;
        } else if (state.stats[i].time > gamePoints.slowTime) {
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
      </ul>
    </section>`;

  return template;
};

export default class GameFooterView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    return getStatsTemplate(this.state);
  }
}
