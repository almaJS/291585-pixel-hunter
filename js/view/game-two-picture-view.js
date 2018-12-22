import AbstractView from './abstract-view.js';
import {resize} from '../data/resize.js';

const FrameSizes = {WIDTH: 468, HEIGHT: 458};

export default class GameTwoPictureView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const currentQuestion = this.state.questions[this.state.level - 1];

    return `
      <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content">
        ${currentQuestion.answers.map((answer, index) => {
    const ImageSizes = resize(FrameSizes, {width: answer.image.preloadedImage.width, height: answer.image.preloadedImage.height});
    return `
      <div class="game__option">
        <img src="${answer.image.url}" alt="Option ${index + 1}" width="${ImageSizes.width}" height="${ImageSizes.height}">
        <label class="game__answer game__answer--photo">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input class="visually-hidden" name="question${index + 1}" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``)}
      </form>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const q1Inputs = this.element.querySelectorAll(`input[name="question1"]`);
    const q2Inputs = this.element.querySelectorAll(`input[name="question2"]`);

    form.addEventListener(`change`, (evt) => {
      if (evt.target.type === `radio`) {
        this.onFormChange(q1Inputs, q2Inputs);
      }
    });
  }

  onFormChange() {
  }
}
