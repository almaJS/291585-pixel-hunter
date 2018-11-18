import {getElement, showGreetingsScreen} from './util.js';

const introElement = getElement(`
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);

const introAsterisk = introElement.querySelector(`.intro__asterisk`);

introAsterisk.addEventListener(`click`, () => showGreetingsScreen());

export default introElement;
