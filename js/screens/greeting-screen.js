import GreetingView from '../view/greeting-view.js';

export default class GreetingScreen {
  constructor(showNextScreen) {
    this.greetingView = new GreetingView();
    this.greetingView.onClick = () => {
      showNextScreen();
    };
  }

  get element() {
    return this.greetingView.element;
  }
}
