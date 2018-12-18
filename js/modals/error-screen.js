import ErrorView from "./error-view.js";

export default class ErrorScreen {
  constructor() {
    this.errorView = new ErrorView();
  }

  get element() {
    return this.errorView.element;
  }

  open() {
    document.body.appendChild(this.element);
  }
}
