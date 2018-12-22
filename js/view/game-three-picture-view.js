import AbstractView from './abstract-view.js';
import {resize} from '../data/resize.js';

const FrameSizes = {WIDTH: 304, HEIGHT: 455};

export default class GameThreePictureView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const currentQuestion = this.state.questions[this.state.level - 1];

    return `
      <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--triple">
        ${currentQuestion.answers.map((answer, index) => {
    const ImageSizes = resize(FrameSizes, {width: answer.image.preloadedImage.width, height: answer.image.preloadedImage.height});
    return `<div class="game__option" data-index="${index}">
            <img src="${answer.image.preloadedImage.src}" alt="Option ${index + 1}" width="${ImageSizes.width}" height="${ImageSizes.height}">
            </div>`;
  }).join(``)}
      </form>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      let target = evt.target;

      while (target !== form) {
        if (target.classList.contains(`game__option`)) {
          this.onFormClick(target);
        }

        target = target.parentNode;
      }
    });
  }

  onFormClick() {
  }
}
