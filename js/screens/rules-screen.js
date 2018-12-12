import {setBackToGreetingsElement, showScreen} from '../util.js';
import startGame from './game-screen.js';
import RulesView from '../view/rules-view.js';

export default () => {
  const rulesView = new RulesView();

  setBackToGreetingsElement(rulesView.element);

  rulesView.onClick = (evt) => {
    evt.preventDefault();
    startGame();
  };

  showScreen(rulesView.element);
};
