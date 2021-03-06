import AbstractView from "../view/abstract-view.js";

export default class ConfirmView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn  modal__btn--ok">Ок</button>
            <button class="modal__btn  modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>`;
  }

  bind() {
    const modalClose = this.element.querySelector(`.modal__close`);
    const modalCancelButton = this.element.querySelector(`.modal__btn--cancel`);
    const modalOkButton = this.element.querySelector(`.modal__btn--ok`);

    modalClose.addEventListener(`click`, (evt) => this.onCloseClick(evt));
    modalCancelButton.addEventListener(`click`, (evt) => this.onCloseClick(evt));
    modalOkButton.addEventListener(`click`, (evt) => this.onOkClick(evt));
  }

  onCloseClick() {
  }

  onOkClick() {
  }
}
