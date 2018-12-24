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
    this._model = model;
    this.gameContainerElement = getElement();
    this.header = new HeaderView(this._model.state.time, this._model.state.lives);
    this.footer = new GameFooterView(this._model.state);
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
    this._model.restart();
    this.updateGame();
  }

  stopGame() {
    Application.showStat(this._model.state, this._model.playerName);
  }

  stopTimer() {
    clearInterval(this._interval);
    clearInterval(this._blinkInterval);
    this._blinkInterval = null;
  }

  checkTimer() {
    if (this._model.state.time <= BLINK_TIME && !this._blinkInterval) {

      this._blinkInterval = setInterval(() => {
        this.header.blink();
      }, QUARTER_SECOND);
    }

    if (this._model.isEndOfTime()) {
      this.updateState();
    }
  }

  updateGame() {

    if (this._model.isEndOfGame()) {
      this.stopGame();
      return;
    }

    this.updateHeader();
    this.updateGameContent();
    this.updateFooter();

    this._interval = setInterval(() => {
      this._model.tick();
      this.updateHeader();
      this.checkTimer();
    }, ONE_SECOND);
  }

  updateState(isCorrect) {
    this.stopTimer();

    this._model.setLevelStat(isCorrect, this._model.state.time);
    this._model.changeLevel(this._model.state, this._model.state.level + 1);

    if (!isCorrect) {
      this._model.reduceNumberOfLives();
    }

    this.updateGame();
  }

  getLevelView() {
    const currentQuestion = this._model.state.questions[this._model.state.level - 1];
    const templateName = currentQuestion.type;

    switch (templateName) {
      case QuestionType.TINDER_LIKE:
        const gameOnePictureView = new GameOnePictureView(this._model.state);

        gameOnePictureView.onFormChange = (gameAnswers) => {
          const answer = getRadioInputValue(gameAnswers);

          if (answer) {
            let isCorrect = answer === currentQuestion.answers[0].type;
            this.updateState(isCorrect);
          }
        };
        return gameOnePictureView;

      case QuestionType.TWO_OF_TWO:
        const gameTwoPictureView = new GameTwoPictureView(this._model.state);

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
        return gameTwoPictureView;

      case QuestionType.ONE_OF_THREE:
        const gameThreePictureView = new GameThreePictureView(this._model.state);

        gameThreePictureView.onFormClick = (target) => {
          let isCorrect = checkOneOfThree(target.dataset.index, currentQuestion.answers);

          this.updateState(isCorrect);
        };
        return gameThreePictureView;
    }

    return -1;
  }

  updateHeader() {
    const header = new HeaderView(this._model.state.time, this._model.state.lives);
    this.gameContainerElement.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateGameContent() {
    const level = this.getLevelView();
    this.gameContainerElement.replaceChild(level.element, this.level.element);
    this.level = level;
  }

  updateFooter() {
    const footer = new GameFooterView(this._model.state);
    this.gameContainerElement.replaceChild(footer.element, this.footer.element);
    this.footer = footer;
  }
}
