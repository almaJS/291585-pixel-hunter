import AbstractView from "./abstract-view.js";
import Application from "../application.js";

const MAX_NUMBER_OF_LIVES = 3;

export default class HeaderView extends AbstractView {
  constructor(time = null, lives = null) {
    super();
    this.time = time;
    this.lives = lives;
  }

  get template() {
    let gameHeaderTemplate = ``;

    if (this.time !== null && this.lives !== null) {
      gameHeaderTemplate = `
        <div class="game__timer">${this.time}</div>
        <div class="game__lives">
          ${new Array(MAX_NUMBER_OF_LIVES - this.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
          ${new Array(this.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        </div>`;
    }

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
        ${gameHeaderTemplate}
      </header>`;
  }

  bind() {
    const backButton = this.element.querySelector(`.back`);

    backButton.addEventListener(`click`, () => this.onClick());
  }

  onClick() {
    Application.showModalConfirm();
  }
}
