import ConfirmView from "./confirm-view.js";
import Application from "../application.js";

export default class ConfirmScreen {
  constructor() {
    this.confirmView = new ConfirmView();
    this.confirmView.onCloseClick = (evt) => {
      evt.preventDefault();
      this.close();
    };
    this.confirmView.onOkClick = (evt) => {
      evt.preventDefault();
      this.close();
      Application.showGreeting();
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
