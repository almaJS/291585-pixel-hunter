import AbstractView from "./abstract-view.js";
import GameFooterView from '../view/game-footer-view.js';

const renderTableHeader = (result) => {
  let template;

  if (result.isWinner) {
    template = `
        <td class="result__points">× 100</td>
        <td class="result__total">${result.right.points}</td>
        </tr>`;
  } else {
    template = `
      <td class="result__points"></td>
    `;
  }

  return template;
};

const renderTableTemplate = (count, points, type) => {
  const TYPES_MAP = {
    fast: `Бонус за скорость`,
    slow: `Штраф за медлительность`,
    lives: `Бонус за жизни`
  };

  return `
    <tr>
      <td></td>
      <td class="result__extra">${TYPES_MAP[type]}:</td>
      <td class="result__extra">${count} <span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${points}</td>
    </tr>`;
};

const renderTableStat = (result) => {
  let template = ``;

  if (result.isWinner && result.fast.count) {
    template += renderTableTemplate(result.fast.count, result.fast.points, `fast`);
  }

  if (result.isWinner && result.lives.count) {
    template += renderTableTemplate(result.lives.count, result.lives.points, `lives`);
  }

  if (result.isWinner && result.slow.count) {
    template += renderTableTemplate(result.slow.count, result.slow.points, `slow`);
  }

  return template;
};

const renderTableTotal = (result) => {
  let template = ` <td class="result__total  result__total--final">fail</td>`;

  if (result.isWinner) {
    template = `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${result.total}</td>
      </tr>
    `;
  }

  return template;
};

const renderResultTable = (state, result) => {
  const gameFooterView = new GameFooterView(state);
  const template = `
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${gameFooterView.template}
        </td>
        ${renderTableHeader(result)}

      ${renderTableStat(result)}
      ${renderTableTotal(result)}
    </table>`;

  return template;
};

const renderTitle = (result) => {
  return result.isWinner ? `Победа!` : `Поражение`;
};

export default class StatsView extends AbstractView {
  constructor(state, gameResult) {
    super();
    this.state = state;
    this.gameResult = gameResult;
  }

  get template() {

    return `
      <header class="header">
        <button class="back">
          <span class="visually-hidden">Вернуться к началу</span>
          <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
            <use xlink:href="img/sprite.svg#arrow-left"></use>
          </svg>
          <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
            <use xlink:href="img/sprite.svg#logo-small"></use>
          </svg>
        </button>
      </header>
      <section class="result">
        <h2 class="result__title">${renderTitle(this.gameResult)}</h2>
          ${renderResultTable(this.state, this.gameResult)}
      </section>`;
  }
}
