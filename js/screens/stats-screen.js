import {getElement, setBackToGreetingsElement} from '../util.js';
import renderResultTable from './stats-table-screen.js';
import getResult from '../data/get-result.js';

const renderTitle = (result) => {
  return result.isWinner ? `Победа!` : `Поражение`;
};

export default (state) => {
  const gameResult = getResult(state);

  const template = `
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
      <h2 class="result__title">${renderTitle(gameResult)}</h2>
        ${renderResultTable(state, gameResult)}
    </section>`;

  const statsElement = getElement(template);
  setBackToGreetingsElement(statsElement);

  return statsElement;
};
