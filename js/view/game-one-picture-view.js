import AbstractView from './abstract-view.js';
import {resize} from '../data/resize.js';

const FrameSizes = {WIDTH: 705, HEIGHT: 455};

export default class GameOnePictureView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const currentQuestion = this.state.questions[this.state.level - 1];
    const ImageSizes = resize(FrameSizes, {width: currentQuestion.answers[0].image.preloadedImage.width, height: currentQuestion.answers[0].image.preloadedImage.height});

    return `
      <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${currentQuestion.answers[0].image.url}" alt="Option 1" width="${ImageSizes.width}" height="${ImageSizes.height}">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const gameAnswers = this.element.querySelectorAll(`input[name="question1"]`);

    form.addEventListener(`change`, (evt) => {
      if (evt.target.type === `radio`) {
        this.onFormChange(gameAnswers);
      }
    });
  }

  onFormChange() {
  }
}
