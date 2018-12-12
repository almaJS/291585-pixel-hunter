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

  const setBackToGreetingsElement = (element) => {
    const backButton = element.querySelector(`.back`);

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

  const render = (html) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = html.trim();
    return wrapper;
  };

  class AbstractView {
    constructor() {
      if (new.target === AbstractView) {
        throw new Error(`Can't instantiate AbstractView, only concrete one`);
      }
    }

    get template() {
      throw new Error(`Template is required`);
    }

    get element() {
      if (this._element) {
        return this._element;
      }
      this._element = this.render();
      this.bind(this._element);
      return this._element;
    }

    render() {
      return render(this.template);
    }

    bind() {
    }

    onClick() {
    }
  }

  class IntroView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="intro">
      <button class="intro__asterisk asterisk" type="button"><span class="visually-hidden">Продолжить</span>*</button>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </section>`;
    }

    bind() {
      const introAsterisk = this.element.querySelector(`.intro__asterisk`);

      introAsterisk.addEventListener(`click`, () => this.onClick());
    }

    onClick() {
    }
  }

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

  const getStatsTemplate = (state) => {
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
      </ul>
    </section>`;

    return template;
  };

  class GameFooterView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      return getStatsTemplate(this.state);
    }
  }

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

  const renderTableTemplate = (count, points, type) => {
    const TYPES_MAP = {
      fast: `Бонус за скорость`,
      slow: `Штраф за медлительность`,
      lives: `Бонус за жизни`
    };

    return `
    <tr>
      <td></td>
      <td class="result__extra">${TYPES_MAP[type]}:</td>
      <td class="result__extra">${count} <span class="stats__result stats__result--${type}"></span></td>
      <td class="result__points">× 50</td>
      <td class="result__total">${points}</td>
    </tr>`;
  };

  const renderTableStat = (result) => {
    let template = ``;

    if (result.isWinner && result.fast.count) {
      template += renderTableTemplate(result.fast.count, result.fast.points, `fast`);
    }

    if (result.isWinner && result.lives.count) {
      template += renderTableTemplate(result.lives.count, result.lives.points, `lives`);
    }

    if (result.isWinner && result.slow.count) {
      template += renderTableTemplate(result.slow.count, result.slow.points, `slow`);
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

  const renderResultTable = (state, result) => {
    const gameFooterView = new GameFooterView(state);
    const template = `
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${gameFooterView.template}
        </td>
        ${renderTableHeader(result)}

      ${renderTableStat(result)}
      ${renderTableTotal(result)}
    </table>`;

    return template;
  };

  const renderTitle = (result) => {
    return result.isWinner ? `Победа!` : `Поражение`;
  };

  class StatsView extends AbstractView {
    constructor(state, gameResult) {
      super();
      this.state = state;
      this.gameResult = gameResult;
    }

    get template() {

      return `
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
        <h2 class="result__title">${renderTitle(this.gameResult)}</h2>
          ${renderResultTable(this.state, this.gameResult)}
      </section>`;
    }
  }

  var statsScreen = (state) => {
    const statsView = new StatsView(state, getResult(state));
    showScreen(statsView.element);
    setBackToGreetingsElement(statsView.element);
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

  const MAX_NUMBER_OF_LIVES = 3;

  class GameHeaderView extends AbstractView {
    constructor(time, lives) {
      super();
      this.time = time;
      this.lives = lives;
    }

    get template() {
      return `
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
        <div class="game__timer">${this.time}</div>
        <div class="game__lives">
          ${new Array(MAX_NUMBER_OF_LIVES - this.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
          ${new Array(this.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        </div>
      </header>`;
    }
  }

  class GameOnePictureView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      const currentQuestion = this.state.questions[this.state.level - 1];

      return `
      <section class="game">
      <p class="game__task">${currentQuestion.text}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${currentQuestion.pictures[0]}" alt="Option 1" width="705" height="455">
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
    }

    bind() {
      const form = this.element.querySelector(`.game__content`);
      const gameAnswers = this.element.querySelectorAll(`input[name="question1"]`);

      form.addEventListener(`change`, (evt) => {
        if (evt.target.type === `radio`) {
          this.onFormChange(gameAnswers);
        }
      });
    }

    onFormChange() {
    }
  }

  class GameTwoPictureView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      const currentQuestion = this.state.questions[this.state.level - 1];

      return `
      <section class="game">
      <p class="game__task">${currentQuestion.text}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${currentQuestion.pictures[0]}" alt="Option 1" width="468" height="458">
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
          <img src="${currentQuestion.pictures[1]}" alt="Option 2" width="468" height="458">
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
    }

    bind() {
      const form = this.element.querySelector(`.game__content`);
      const q1Inputs = this.element.querySelectorAll(`input[name="question1"]`);
      const q2Inputs = this.element.querySelectorAll(`input[name="question2"]`);

      form.addEventListener(`change`, (evt) => {
        if (evt.target.type === `radio`) {
          this.onFormChange(q1Inputs, q2Inputs);
        }
      });
    }

    onFormChange() {
    }
  }

  class GameThreePictureView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      const currentQuestion = this.state.questions[this.state.level - 1];

      return `
      <section class="game">
      <p class="game__task">${currentQuestion.text}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${currentQuestion.pictures[0]}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${currentQuestion.pictures[1]}" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${currentQuestion.pictures[2]}" alt="Option 3" width="304" height="455">
        </div>
      </form>`;
    }

    bind() {
      const form = this.element.querySelector(`.game__content`);

      form.addEventListener(`click`, (evt) => {
        let target = evt.target;

        while (target !== form) {
          if (target.tagName === `IMG`) {
            this.onFormClick(target);
          }

          target = target.parentNode;
        }
      });
    }

    onFormClick() {
    }
  }

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

  class RulesView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
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
      </section>`;
    }

    bind() {
      const rulesInput = this.element.querySelector(`.rules__input`);
      const rulesButton = this.element.querySelector(`.rules__button`);

      rulesInput.addEventListener(`input`, () => {
        rulesButton.disabled = !rulesInput.value;
      });
      rulesButton.addEventListener(`click`, (evt) => this.onClick(evt));
    }

    onClick() {
    }
  }

  var rulesScreen = () => {
    const rulesView = new RulesView();

    setBackToGreetingsElement(rulesView.element);

    rulesView.onClick = (evt) => {
      evt.preventDefault();
      startGame();
    };

    showScreen(rulesView.element);
  };

  class GreetingView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
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
    }

    bind() {
      const greetingContinue = this.element.querySelector(`.greeting__continue`);

      greetingContinue.addEventListener(`click`, () => this.onClick());
    }

    onClick() {
    }
  }

  var greetingScreen = () => {
    const greetingView = new GreetingView();

    greetingView.onClick = () => rulesScreen();

    setGreetingElement(greetingView.element);
    showScreen(greetingView.element);
  };

  const introView = new IntroView();

  introView.onClick = () => greetingScreen();

  showScreen(introView.element);

}());

//# sourceMappingURL=main.js.map
