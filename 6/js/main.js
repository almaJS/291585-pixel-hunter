(function () {
  'use strict';

  const getElement = (template = ``) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  let greetingElement;
  const setGreetingElement = (element) => {
    greetingElement = element;
  };

  const mainElement = document.querySelector(`#main`);

  const showScreen = (element) => {
    mainElement.innerHTML = ``;
    mainElement.appendChild(element);
  };

  const showGreetingsScreen = () => showScreen(greetingElement);

  const backToScreen = (currentScreen) => {
    const backButton = currentScreen.querySelector(`.back`);

    backButton.addEventListener(`click`, () => showGreetingsScreen());
  };

  const getRadioInputValue = (elements) => {
    let radioValue = false;

    elements.forEach((element) => {
      if (element.checked) {
        radioValue = element.value;
      }
    });

    return radioValue;
  };

  const introElement = getElement(`
  <section class="intro">
    <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
    <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
  </section>`);

  const introAsterisk = introElement.querySelector(`.intro__asterisk`);

  introAsterisk.addEventListener(`click`, () => showGreetingsScreen());

  var INITIAL_STATE = {
    lives: 3,
    level: 1,
    time: 30,
    fastTime: 10,
    slowTime: 20,
    normalPoints: 100,
    fastPoints: 50,
    slowPoints: -50,
    lifePoints: 50,
    questions: [
      {template: `onePicture`, text: `Угадай, фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`]},
      {template: `threePicture`, text: `Найдите рисунок среди изображений`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `http://i.imgur.com/1KegWPz.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`http://i.imgur.com/1KegWPz.jpg`]},
      {template: `twoPicture`, text: `Угадайте для каждого изображения фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`, `photo`]},
      {template: `onePicture`, text: `Угадай, фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`], answers: [`photo`]},
      {template: `onePicture`, text: `Угадай, фото или рисунок?`, pictures: [`http://i.imgur.com/1KegWPz.jpg`], answers: [`paint`]},
      {template: `onePicture`, text: `Угадай, фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`]},
      {template: `twoPicture`, text: `Угадайте для каждого изображения фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`, `photo`]},
      {template: `twoPicture`, text: `Угадайте для каждого изображения фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`, `photo`]},
      {template: `twoPicture`, text: `Угадайте для каждого изображения фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`, `photo`]},
      {template: `twoPicture`, text: `Угадайте для каждого изображения фото или рисунок?`, pictures: [`https://k42.kn3.net/CF42609C8.jpg`, `https://k42.kn3.net/CF42609C8.jpg`], answers: [`paint`, `photo`]}
    ],
    stats: [],
  };

  const MAX_NUMBER_OF_LIVES = 3;

  var gameHeader = (time, lives) => {
    const template = `
    <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
    <div class="game__timer">${time}</div>
    <div class="game__lives">
      ${new Array(MAX_NUMBER_OF_LIVES - lives)
      .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
      ${new Array(lives)
      .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
      .join(``)}
    </div>
    </header>`;

    return template;
  };

  var gameFooter = (state) => {
    const numberOfQuestions = state.questions.length;
    let stats = [];

    for (let i = 0; i < numberOfQuestions; i++) {
      let extraClass = `unknown`;

      if (state.stats[i]) {

        if (state.stats[i].result) {
          extraClass = `correct`;

          if (state.stats[i].time < state.fastTime) {
            extraClass = `fast`;
          } else if (state.stats[i].time > state.slowTime) {
            extraClass = `slow`;
          }
        } else {
          extraClass = `wrong`;
        }
      }

      stats.push(`<li class="stats__result stats__result--${extraClass}"></li>`);
    }

    const template = `
    <ul class="stats">
      ${stats.join(``)}
    </ul>`;

    return template;
  };

  const changeLevel = (state, level) => {
    let newLevel = level;

    if (level > state.questions.length) {
      newLevel = -1;
    }

    return Object.assign({}, state, {level: newLevel});
  };

  const reduceNumberOfLives = (state) => {
    const newState = Object.assign({}, state);

    if (state.lives <= 0) {
      newState.lives = 0;
    } else {
      newState.lives--;
    }

    return newState;
  };

  var setLevelStat = (state, result, time) => {
    const newState = Object.assign({}, state);
    newState.stats.push({result, time});

    return newState;
  };

  const TIME = 15;

  const updateState = (state, isCorrect, updateFunction) => {
    let newState = changeLevel(state, state.level + 1);

    if (!isCorrect) {
      newState = reduceNumberOfLives(newState);
    }

    setLevelStat(state, isCorrect, TIME);
    updateFunction(newState);
  };

  var templates = {
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

  var gameScreen = (state) => {
    const templateName = state.questions[state.level - 1].template;

    const template = `
  <section class="game">
    <p class="game__task">${state.questions[state.level - 1].text}</p>
    ${templates[templateName].getTemplate(state.questions[state.level - 1])}
    ${gameFooter(state)}
  </section>`;

    return template;
  };

  const renderTableHeader = (result) => {
    let template;

    if (result.isWinner) {
      template = `
        <td class="result__points">× 100</td>
        <td class="result__total">${result.right.points}</td>
        </tr>`;
    } else {
      template = `
      <td class="result__points"></td>
    `;
    }

    return template;
  };

  const renderTableFast = (result) => {
    let template = ``;

    if (result.isWinner && result.fast.count) {
      template = `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${result.fast.count} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
      </tr>`;
    }

    return template;
  };

  const renderTableLife = (result) => {
    let template = ``;

    if (result.isWinner && result.lives.count) {
      template = `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${result.lives.count} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${result.lives.points}</td>
      </tr>
    `;
    }

    return template;
  };

  const renderTableSlow = (result) => {
    let template = ``;

    if (result.isWinner && result.slow.count) {
      template = `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${result.slow.count} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${result.slow.points}</td>
      </tr>
    `;
    }

    return template;
  };

  const renderTableTotal = (result) => {
    let template = ` <td class="result__total  result__total--final">fail</td>`;

    if (result.isWinner) {
      template = `
      <tr>
        <td colspan="5" class="result__total  result__total--final">${result.total}</td>
      </tr>
    `;
    }

    return template;
  };

  var renderResultTable = (state, result) => {
    const template = `
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${gameFooter(state)}
        </td>
        ${renderTableHeader(result)}

      ${renderTableFast(result)}
      ${renderTableLife(result)}
      ${renderTableSlow(result)}
      ${renderTableTotal(result)}
    </table>`;

    return template;
  };

  var getResult = (state) => {
    const rightCounter = state.stats.filter((statValue) => statValue.result).length;
    const fastCounter = state.stats.filter((statValue) => statValue.time < state.fastTime).length;
    const slowCounter = state.stats.filter((statValue) => statValue.time > state.slowTime).length;

    const result = {
      isWinner: state.questions.length === state.stats.length,
      right: {
        count: rightCounter,
        points: rightCounter * state.normalPoints
      },
      fast: {
        count: fastCounter,
        points: fastCounter * state.fastPoints
      },
      slow: {
        count: slowCounter,
        points: slowCounter * state.slowPoints
      },
      lives: {
        count: state.lives,
        points: state.lives * state.lifePoints
      },
    };

    result.total = result.right.points + result.fast.points + result.slow.points + result.lives.points;

    return result;
  };

  const renderTitle = (result) => {
    return result.isWinner ? `Победа!` : `Поражение`;
  };

  var statsElement = (state) => {
    const gameResult = getResult(state);

    const template = `
    <header class="header">
      <button class="back">
        <span class="visually-hidden">Вернуться к началу</span>
        <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
          <use xlink:href="img/sprite.svg#arrow-left"></use>
        </svg>
        <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
          <use xlink:href="img/sprite.svg#logo-small"></use>
        </svg>
      </button>
    </header>
    <section class="result">
      <h2 class="result__title">${renderTitle(gameResult)}</h2>
        ${renderResultTable(state, gameResult)}
      <table class="result__table">
        <tr>
          <td class="result__number">2.</td>
          <td>
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--wrong"></li>
            </ul>
          </td>
          <td class="result__total"></td>
          <td class="result__total  result__total--final">fail</td>
        </tr>
      </table>
      <table class="result__table">
        <tr>
          <td class="result__number">3.</td>
          <td colspan="2">
            <ul class="stats">
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--correct"></li>
              <li class="stats__result stats__result--wrong"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--slow"></li>
              <li class="stats__result stats__result--unknown"></li>
              <li class="stats__result stats__result--fast"></li>
              <li class="stats__result stats__result--unknown"></li>
            </ul>
          </td>
          <td class="result__points">× 100</td>
          <td class="result__total">900</td>
        </tr>
        <tr>
          <td></td>
          <td class="result__extra">Бонус за жизни:</td>
          <td class="result__extra">2 <span class="stats__result stats__result--alive"></span></td>
          <td class="result__points">× 50</td>
          <td class="result__total">100</td>
        </tr>
        <tr>
          <td colspan="5" class="result__total  result__total--final">950</td>
        </tr>
      </table>
    </section>`;

    const statsElement = getElement(template);
    backToScreen(statsElement);

    return statsElement;
  };

  let game;

  const startGame = () => {
    game = JSON.parse(JSON.stringify(INITIAL_STATE));

    const gameContainerElement = getElement();
    const headerElement = getElement();
    const gameElement = getElement();

    gameContainerElement.appendChild(headerElement);
    gameContainerElement.appendChild(gameElement);

    const updateGame = (state) => {
      if (state.level < 0 || state.lives <= 0) {
        showScreen(statsElement(state));
        return;
      }

      const templateName = state.questions[state.level - 1].template;

      headerElement.innerHTML = gameHeader(state.time, state.lives);
      gameElement.innerHTML = gameScreen(state);

      backToScreen(headerElement);
      templates[templateName].setListener(gameElement, state, updateGame);
    };

    showScreen(gameContainerElement);
    updateGame(game);
  };

  const rulesElement = getElement(`
  <header class="header">
    <button class="back">
      <span class="visually-hidden">Вернуться к началу</span>
      <svg class="icon" width="45" height="45" viewBox="0 0 45 45" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-left"></use>
      </svg>
      <svg class="icon" width="101" height="44" viewBox="0 0 101 44" fill="#000000">
        <use xlink:href="img/sprite.svg#logo-small"></use>
      </svg>
    </button>
  </header>
  <section class="rules">
    <h2 class="rules__title">Правила</h2>
    <ul class="rules__description">
      <li>Угадай 10 раз для каждого изображения фото
        <img class="rules__icon" src="img/icon-photo.png" width="32" height="31" alt="Фото"> или рисунок
        <img class="rules__icon" src="img/icon-paint.png" width="32" height="31" alt="Рисунок"></li>
      <li>Фотографиями или рисунками могут быть оба изображения.</li>
      <li>На каждую попытку отводится 30 секунд.</li>
      <li>Ошибиться можно не более 3 раз.</li>
    </ul>
    <p class="rules__ready">Готовы?</p>
    <form class="rules__form">
      <input class="rules__input" type="text" placeholder="Ваше Имя">
      <button class="rules__button  continue" type="submit" disabled>Go!</button>
    </form>
  </section>`);

  backToScreen(rulesElement);

  const rulesInput = rulesElement.querySelector(`.rules__input`);
  const rulesButton = rulesElement.querySelector(`.rules__button`);

  const onRulesInputChange = () => {
    rulesButton.disabled = !rulesInput.value;
  };

  const onRulesButtonClick = (evt) => {
    evt.preventDefault();
    startGame();
  };

  rulesInput.addEventListener(`input`, onRulesInputChange);
  rulesButton.addEventListener(`click`, onRulesButtonClick);

  const template = `
  <section class="greeting central--blur">
    <img class="greeting__logo" src="img/logo_ph-big.svg" width="201" height="89" alt="Pixel Hunter">
    <div class="greeting__asterisk asterisk"><span class="visually-hidden">Я просто красивая звёздочка</span>*</div>
    <div class="greeting__challenge">
      <h3 class="greeting__challenge-title">Лучшие художники-фотореалисты бросают тебе вызов!</h3>
      <p class="greeting__challenge-text">Правила игры просты:</p>
      <ul class="greeting__challenge-list">
        <li>Нужно отличить рисунок от фотографии и сделать выбор.</li>
        <li>Задача кажется тривиальной, но не думай, что все так просто.</li>
        <li>Фотореализм обманчив и коварен.</li>
        <li>Помни, главное — смотреть очень внимательно.</li>
      </ul>
    </div>
    <button class="greeting__continue" type="button">
      <span class="visually-hidden">Продолжить</span>
      <svg class="icon" width="64" height="64" viewBox="0 0 64 64" fill="#000000">
        <use xlink:href="img/sprite.svg#arrow-right"></use>
      </svg>
    </button>
  </section>`;

  const greetingElement$1 = getElement(template);

  const greetingContinue = greetingElement$1.querySelector(`.greeting__continue`);

  greetingContinue.addEventListener(`click`, () => showScreen(rulesElement));

  setGreetingElement(greetingElement$1);

  showScreen(introElement);

}());

//# sourceMappingURL=main.js.map
