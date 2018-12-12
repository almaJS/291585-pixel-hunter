import {setBackToGreetingsElement, showScreen} from '../util.js';
import getResult from '../data/get-result.js';
import StatsView from '../view/stats-view.js';

export default (state) => {
  const statsView = new StatsView(state, getResult(state));
  showScreen(statsView.element);
  setBackToGreetingsElement(statsView.element);
};
