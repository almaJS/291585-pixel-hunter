import AbstractView from './abstract-view.js';

export default class GameTwoPictureView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const currentQuestion = this.state.questions[this.state.level - 1];

    return `
      <section class="game">
      <p class="game__task">${currentQuestion.text}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${currentQuestion.pictures[0]}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${currentQuestion.pictures[1]}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
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
