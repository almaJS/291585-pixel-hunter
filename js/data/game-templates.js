import {getRadioInputValue} from '../util.js';
import {changeLevel} from './change-level.js';
import {reduceNumberOfLives} from './reduce-lives.js';
import setLevelStat from './set-level-stat.js';

const TIME = 15;

const updateState = (state, isCorrect, updateFunction) => {
  let newState = changeLevel(state, state.level + 1);

  if (!isCorrect) {
    newState = reduceNumberOfLives(newState);
  }

  setLevelStat(state, isCorrect, TIME);
  updateFunction(newState);
};

export default {
  onePicture: {
    getTemplate(level) {
      return `
        <form class="game__content  game__content--wide">
          <div class="game__option">
            <img src="${level.pictures[0]}" alt="Option 1" width="705" height="455">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
        </form>`;
    },
    setListener(element, state, updateFunction) {
      const form = element.querySelector(`.game__content`);
      const gameAnswers = element.querySelectorAll(`input[name="question1"]`);

      const onFormChange = (evt) => {
        if (evt.target.type === `radio`) {
          const answer = getRadioInputValue(gameAnswers);

          if (answer) {
            const currentQuestion = state.questions[state.level - 1];
            let isCorrect = answer === currentQuestion.answers[0];

            updateState(state, isCorrect, updateFunction);
          }
        }
      };

      form.addEventListener(`change`, onFormChange);
    }
  },
  twoPicture: {
    getTemplate(level) {
      return `
        <form class="game__content">
          <div class="game__option">
            <img src="${level.pictures[0]}" alt="Option 1" width="468" height="458">
            <label class="game__answer game__answer--photo">
              <input class="visually-hidden" name="question1" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer game__answer--paint">
              <input class="visually-hidden" name="question1" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
          <div class="game__option">
            <img src="${level.pictures[1]}" alt="Option 2" width="468" height="458">
            <label class="game__answer  game__answer--photo">
              <input class="visually-hidden" name="question2" type="radio" value="photo">
              <span>Фото</span>
            </label>
            <label class="game__answer  game__answer--paint">
              <input class="visually-hidden" name="question2" type="radio" value="paint">
              <span>Рисунок</span>
            </label>
          </div>
        </form>`;
    },
    setListener(element, state, updateFunction) {
      const form = element.querySelector(`.game__content`);
      const q1Inputs = element.querySelectorAll(`input[name="question1"]`);
      const q2Inputs = element.querySelectorAll(`input[name="question2"]`);

      const onFormChange = (evt) => {
        if (evt.target.type === `radio`) {
          const answer1 = getRadioInputValue(q1Inputs);
          const answer2 = getRadioInputValue(q2Inputs);

          if (answer1 && answer2) {
            const currentQuestion = state.questions[state.level - 1];
            let isCorrect = true;

            if (answer1 !== currentQuestion.answers[0] || answer2 !== currentQuestion.answers[1]) {
              isCorrect = false;
            }

            updateState(state, isCorrect, updateFunction);
          }
        }
      };

      form.addEventListener(`change`, onFormChange);
    }
  },
  threePicture: {
    getTemplate(level) {
      return `
        <form class="game__content  game__content--triple">
          <div class="game__option">
            <img src="${level.pictures[0]}" alt="Option 1" width="304" height="455">
          </div>
          <div class="game__option  game__option--selected">
            <img src="${level.pictures[1]}" alt="Option 2" width="304" height="455">
          </div>
          <div class="game__option">
            <img src="${level.pictures[2]}" alt="Option 3" width="304" height="455">
          </div>
        </form>`;
    },
    setListener(element, state, updateFunction) {
      const form = element.querySelector(`.game__content`);

      const onFormClick = (evt) => {
        let target = evt.target;

        while (target !== form) {
          if (target.tagName === `IMG`) {
            const currentQuestion = state.questions[state.level - 1];
            let isCorrect = target.src === currentQuestion.answers[0];

            updateState(state, isCorrect, updateFunction);
          }

          target = target.parentNode;
        }
      };

      form.addEventListener(`click`, onFormClick);
    }
  }
};
