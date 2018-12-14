import AbstractView from './abstract-view.js';

export default class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
  }

  bind() {
    const introAsterisk = this.element.querySelector(`.intro__asterisk`);

    introAsterisk.addEventListener(`click`, () => this.onClick());
  }

  onClick() {
  }
}
