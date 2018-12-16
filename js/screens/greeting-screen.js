import GreetingView from '../view/greeting-view.js';
import Application from '../application.js';

export default () => {
  const greetingView = new GreetingView();

  greetingView.onClick = () => {
    Application.showRules();
  };
};
