import {getElement, setBackToGreetingsElement, showScreen} from './util.js';
import INITIAL_STATE from './data/game-data.js';
import gameHeader from './screens/game-header.js';
import gameScreen from './screens/game-screen.js';
import gameFooter from './screens/game-footer.js';
import templates from './data/game-templates.js';
import statsElement from './screens/stats-screen.js';

let game;

const startGame = () => {
  game = JSON.parse(JSON.stringify(INITIAL_STATE));

  const gameContainerElement = getElement();
  const headerElement = getElement();
  const gameElement = getElement();
  const footerElement = getElement();

  gameContainerElement.appendChild(headerElement);
  gameContainerElement.appendChild(gameElement);
  gameContainerElement.appendChild(footerElement);

  const updateGame = (state) => {
    if (state.level < 0 || state.lives <= 0) {
      showScreen(statsElement(state));
      return;
    }

    const templateName = state.questions[state.level - 1].template;

    headerElement.innerHTML = gameHeader(state.time, state.lives);
    gameElement.innerHTML = gameScreen(state);
    footerElement.innerHTML = gameFooter(state);

    setBackToGreetingsElement(headerElement);
    templates[templateName].setListener(gameElement, state, updateGame);
  };

  showScreen(gameContainerElement);
  updateGame(game);
};

export default startGame;
