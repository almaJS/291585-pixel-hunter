import IntroView from "./view/intro-view.js";
import GreetingView from "./view/greeting-view.js";
import RulesScreen from "./screens/rules-screen.js";
import GameScreen from "./screens/game-screen.js";
import GameModel from "./data/game-model.js";
import StatScreen from "./screens/stat-screen.js";
import ConfirmScreen from "./modal/confirm-screen.js";

const mainElement = document.querySelector(`#main`);

const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export default class Application {
  static showIntro() {
    const introView = new IntroView();
    showScreen(introView.element);
  }

  static showGreeting() {
    const greetingView = new GreetingView();
    showScreen(greetingView.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen();
    showScreen(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName));
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStat(state) {
    const statScreen = new StatScreen(state);
    showScreen(statScreen.element);
  }

  static showModalConfirm() {
    const confirmView = new ConfirmScreen();
    confirmView.open();
  }
}
