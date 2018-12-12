import AbstractView from './abstract-view.js';

export default class GameThreePictureView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const currentQuestion = this.state.questions[this.state.level - 1];

    return `
      <section class="game">
      <p class="game__task">${currentQuestion.text}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${currentQuestion.pictures[0]}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${currentQuestion.pictures[1]}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${currentQuestion.pictures[2]}" alt="Option 3" width="304" height="455">
        </div>
      </form>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      let target = evt.target;

      while (target !== form) {
        if (target.tagName === `IMG`) {
          this.onFormClick(target);
        }

        target = target.parentNode;
      }
    });
  }

  onFormClick() {
  }
}
