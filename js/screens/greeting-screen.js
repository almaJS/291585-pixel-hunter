import GreetingView from '../view/greeting-view.js';
import Application from '../application.js';

export default class GreetingScreen {
  constructor() {
    this.greetingView = new GreetingView();
    this.greetingView.onClick = () => {
      Application.showRules();
    };
  }

  get element() {
    return this.greetingView.element;
  }
}
