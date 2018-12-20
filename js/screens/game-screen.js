import {getElement, getRadioInputValue} from '../util.js';
import HeaderView from '../view/header-view.js';
import GameFooterView from '../view/game-footer-view.js';
import GameOnePictureView from '../view/game-one-picture-view.js';
import GameTwoPictureView from '../view/game-two-picture-view.js';
import GameThreePictureView from '../view/game-three-picture-view.js';
import Application from '../application.js';

const ONE_SECOND = 1000;
const QUARTER_SECOND = 250;
const BLINK_TIME = 5;

const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const checkOneOfThree = (id, answers) => {
  const userAnswer = answers[id].type;

  return answers.reduce((acc, answer, index) => {
    if (index !== +id) {

      if (userAnswer === answer.type) {
        return false;
      }
    }

    return acc;
  }, true);
};

export default class GameScreen {
  constructor(model) {
    this.model = model;
    this.gameContainerElement = getElement();
    this.header = new HeaderView(this.model.state.time, this.model.state.lives);
    this.footer = new GameFooterView(this.model.state);
    this.level = this.getLevelView();
    this.gameContainerElement.appendChild(this.header.element);
    this.gameContainerElement.appendChild(this.level.element);
    this.gameContainerElement.appendChild(this.footer.element);

    this._interval = null;
    this._blinkInterval = null;
  }

  get element() {
    return this.gameContainerElement;
  }

  startGame() {
    this.model.restart();
    this.updateGame();
  }

  stopGame() {
    Application.showStat(this.model.state);
  }

  stopTimer() {
    clearInterval(this._interval);
    clearInterval(this._blinkInterval);
    this._blinkInterval = null;
  }

  checkTimer() {
    if (this.model.state.time <= BLINK_TIME && !this._blinkInterval) {

      this._blinkInterval = setInterval(() => {
        this.header.blink();
      }, QUARTER_SECOND);
    }

    if (this.model.isEndOfTime()) {
      this.updateState();
    }
  }

  updateGame() {

    if (this.model.isEndOfGame()) {
      this.stopGame();
      return;
    }

    this.updateHeader();
    this.updateGameContent();
    this.updateFooter();

    this._interval = setInterval(() => {
      this.model.tick();
      this.updateHeader();
      this.checkTimer();
    }, ONE_SECOND);
  }

  updateState(isCorrect) {
    this.stopTimer();

    this.model.setLevelStat(isCorrect, this.model.state.time);
    this.model.changeLevel(this.model.state, this.model.state.level + 1);

    if (!isCorrect) {
      this.model.reduceNumberOfLives();
    }

    this.updateGame();
  }

  getLevelView() {
    const currentQuestion = this.model.state.questions[this.model.state.level - 1];
    const templateName = currentQuestion.type;
    let view;

    switch (templateName) {
      case QuestionType.TINDER_LIKE:
        const gameOnePictureView = new GameOnePictureView(this.model.state);

        gameOnePictureView.onFormChange = (gameAnswers) => {
          const answer = getRadioInputValue(gameAnswers);

          if (answer) {
            let isCorrect = answer === currentQuestion.answers[0].type;
            this.updateState(isCorrect);
          }
        };
        view = gameOnePictureView;
        break;

      case QuestionType.TWO_OF_TWO:
        const gameTwoPictureView = new GameTwoPictureView(this.model.state);

        gameTwoPictureView.onFormChange = (q1Inputs, q2Inputs) => {
          const answer1 = getRadioInputValue(q1Inputs);
          const answer2 = getRadioInputValue(q2Inputs);

          if (answer1 && answer2) {
            let isCorrect = true;

            if (answer1 !== currentQuestion.answers[0].type || answer2 !== currentQuestion.answers[1].type) {
              isCorrect = false;
            }

            this.updateState(isCorrect);
          }
        };
        view = gameTwoPictureView;
        break;

      case QuestionType.ONE_OF_THREE:
        const gameThreePictureView = new GameThreePictureView(this.model.state);

        gameThreePictureView.onFormClick = (target) => {
          let isCorrect = checkOneOfThree(target.dataset.index, currentQuestion.answers);

          this.updateState(isCorrect);
        };
        view = gameThreePictureView;
        break;
    }

    return view;
  }

  updateHeader() {
    const header = new HeaderView(this.model.state.time, this.model.state.lives);
    this.gameContainerElement.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateGameContent() {
    const level = this.getLevelView();
    this.gameContainerElement.replaceChild(level.element, this.level.element);
    this.level = level;
  }

  updateFooter() {
    const footer = new GameFooterView(this.model.state);
    this.gameContainerElement.replaceChild(footer.element, this.footer.element);
    this.footer = footer;
  }
}
