import {getElement, setBackToGreetingsElement, showScreen, getRadioInputValue} from '../util.js';
import INITIAL_STATE from '../data/game-data.js';
import statsScreen from './stats-screen.js';
import {changeLevel} from '../data/change-level.js';
import {reduceNumberOfLives} from '../data/reduce-lives.js';
import setLevelStat from '../data/set-level-stat.js';
import GameHeaderView from '../view/game-header-view.js';
import GameFooterView from '../view/game-footer-view.js';
import GameOnePictureView from '../view/game-one-picture-view.js';
import GameTwoPictureView from '../view/game-two-picture-view.js';
import GameThreePictureView from '../view/game-three-picture-view.js';

const TIME = 15;

const gameContainerElement = getElement();
const headerElement = getElement();
const gameElement = getElement();
const footerElement = getElement();

gameContainerElement.appendChild(headerElement);
gameContainerElement.appendChild(gameElement);
gameContainerElement.appendChild(footerElement);

const updateGame = (state) => {
  if (state.level < 0 || state.lives <= 0) {
    statsScreen(state);
    return;
  }

  const gameHeaderView = new GameHeaderView(state.time, state.lives);
  const gameFooterView = new GameFooterView(state);

  const currentQuestion = state.questions[state.level - 1];
  const templateName = currentQuestion.template;

  gameContainerElement.innerHTML = ``;
  gameContainerElement.appendChild(gameHeaderView.element);

  switch (templateName) {
    case `onePicture`:
      const gameOnePictureView = new GameOnePictureView(state);
      gameContainerElement.appendChild(gameOnePictureView.element);

      gameOnePictureView.onFormChange = (gameAnswers) => {
        const answer = getRadioInputValue(gameAnswers);

        if (answer) {
          let isCorrect = answer === currentQuestion.answers[0];
          updateState(state, isCorrect);
        }
      };
      break;

    case `twoPicture`:
      const gameTwoPictureView = new GameTwoPictureView(state);
      gameContainerElement.appendChild(gameTwoPictureView.element);

      gameTwoPictureView.onFormChange = (q1Inputs, q2Inputs) => {
        const answer1 = getRadioInputValue(q1Inputs);
        const answer2 = getRadioInputValue(q2Inputs);

        if (answer1 && answer2) {
          let isCorrect = true;

          if (answer1 !== currentQuestion.answers[0] || answer2 !== currentQuestion.answers[1]) {
            isCorrect = false;
          }

          updateState(state, isCorrect);
        }
      };
      break;

    case `threePicture`:
      const gameThreePictureView = new GameThreePictureView(state);
      gameContainerElement.appendChild(gameThreePictureView.element);

      gameThreePictureView.onFormClick = (target) => {
        let isCorrect = target.src === currentQuestion.answers[0];

        updateState(state, isCorrect);
      };
      break;
  }

  gameContainerElement.appendChild(gameFooterView.element);

  setBackToGreetingsElement(gameHeaderView.element);
};

const startGame = () => {
  const game = JSON.parse(JSON.stringify(INITIAL_STATE));

  showScreen(gameContainerElement);
  updateGame(game);
};

const updateState = (state, isCorrect) => {
  let newState = changeLevel(state, state.level + 1);

  if (!isCorrect) {
    newState = reduceNumberOfLives(newState);
  }

  setLevelStat(state, isCorrect, TIME);
  updateGame(newState);
};

export default startGame;
