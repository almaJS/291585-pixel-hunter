import ConfirmView from "./confirm-view.js";

export default class ConfirmScreen {
  constructor(nextScreen) {
    this.confirmView = new ConfirmView();
    this.confirmView.onCloseClick = (evt) => {
      evt.preventDefault();
      this.close();
    };
    this.confirmView.onOkClick = (evt) => {
      evt.preventDefault();
      this.close();
      nextScreen();
    };
  }

  get element() {
    return this.confirmView.element;
  }

  open() {
    document.body.appendChild(this.element);
  }

  close() {
    document.body.removeChild(this.element);
  }
}
