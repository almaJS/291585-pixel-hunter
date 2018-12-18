import IntroView from "./view/intro-view.js";
import GreetingScreen from "./screens/greeting-screen.js";
import RulesScreen from "./screens/rules-screen.js";
import GameScreen from "./screens/game-screen.js";
import GameModel from "./data/game-model.js";
import StatScreen from "./screens/stat-screen.js";
import ConfirmScreen from "./modals/confirm-screen.js";
import ErrorScreen from "./modals/error-screen.js";

const LOAD_URL = `https://es.dump.academy/pixel-hunter/questions`;

const mainElement = document.querySelector(`#main`);

const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

const checkFetchStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}`);
  }
};

let gameData;

export default class Application {
  static showIntro() {
    const introView = new IntroView();
    showScreen(introView.element);
    window.fetch(LOAD_URL)
      .then(checkFetchStatus)
      .then((response) => response.json())
      .then((data) => {
        gameData = data;
      })
      .then(Application.showGreeting)
      .catch(Application.showModalError);
  }

  static showGreeting() {
    const greetingScreen = new GreetingScreen();
    showScreen(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    showScreen(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(gameData, playerName));
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStat(state) {
    const statScreen = new StatScreen(state);
    showScreen(statScreen.element);
  }

  static showModalConfirm() {
    const confirmScreen = new ConfirmScreen();
    confirmScreen.open();
  }

  static showModalError() {
    const errorScreen = new ErrorScreen();
    errorScreen.open();
  }
}
