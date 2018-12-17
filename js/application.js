import IntroView from "./view/intro-view.js";
import GreetingScreen from "./screens/greeting-screen.js";
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
    const introView = new IntroView(Application.showGreeting);
    showScreen(introView.element);
  }

  static showGreeting() {
    const greetingScreen = new GreetingScreen(Application.showRules);
    showScreen(greetingScreen.element);
  }

  static showRules() {
    const rulesScreen = new RulesScreen(Application.showGame, Application.showModalConfirm);
    showScreen(rulesScreen.element);
  }

  static showGame(playerName) {
    const gameScreen = new GameScreen(new GameModel(playerName), Application.showStat, Application.showModalConfirm);
    showScreen(gameScreen.element);
    gameScreen.startGame();
  }

  static showStat(state) {
    const statScreen = new StatScreen(state, Application.showModalConfirm);
    showScreen(statScreen.element);
  }

  static showModalConfirm() {
    const confirmView = new ConfirmScreen(Application.showGreeting);
    confirmView.open();
  }
}
