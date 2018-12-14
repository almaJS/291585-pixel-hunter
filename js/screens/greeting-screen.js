import {showScreen, setGreetingElement} from '../util.js';
import rulesScreen from './rules-screen.js';
import GreetingView from '../view/greeting-view.js';

export default () => {
  const greetingView = new GreetingView();

  greetingView.onClick = () => rulesScreen();

  setGreetingElement(greetingView.element);
  showScreen(greetingView.element);
};
