import IntroView from "./view/intro-view.js";
import GreetingScreen from "./screens/greeting-screen.js";
import RulesScreen from "./screens/rules-screen.js";
import GameScreen from "./screens/game-screen.js";
import GameModel from "./data/game-model.js";
import StatScreen from "./screens/stat-screen.js";
import ConfirmScreen from "./modals/confirm-screen.js";
import ErrorScreen from "./modals/error-screen.js";
import Loader from "./loader.js";

const mainElement = document.querySelector(`#main`);

const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

const loadImage = (answer) => {
  return new Promise((onLoad, onError) => {
    const image = new Image();
    answer.image.preloadedImage = image;
    image.onload = () => onLoad(image);
    image.onerror = () => onError();
    image.src = answer.image.url;
  });
};

let gameData;

export default class Application {
  static showIntro() {
    const introView = new IntroView();
    showScreen(introView.element);
    Loader.loadData()
      .then((data) => {
        gameData = data;
        return Promise.all(gameData.reduce((promises, level) => {
          level.answers.forEach((answer) => promises.push(loadImage(answer)));
          return promises;
        }, []));
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

  static showStat(state, playerName) {
    Loader.saveResults(state, playerName)
      .then(() => Loader.loadResults(playerName))
      .then((data) => new StatScreen(data))
      .then((statScreen) => showScreen(statScreen.element));
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
