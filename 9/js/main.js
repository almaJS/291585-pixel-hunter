(function () {
  'use strict';

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
      Application.showGreeting();
    }
  }

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

  class GreetingScreen {
    constructor() {
      this.greetingView = new GreetingView();
      this.greetingView.onClick = () => {
        Application.showRules();
      };
    }

    get element() {
      return this.greetingView.element;
    }
  }

  class RulesView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
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
      rulesButton.addEventListener(`click`, (evt) => this.onClick(evt, rulesInput.value));
    }

    onClick() {
    }
  }

  const MAX_NUMBER_OF_LIVES = 3;

  class HeaderView extends AbstractView {
    constructor(time = null, lives = null) {
      super();
      this.time = time;
      this.lives = lives;
    }

    get template() {
      let gameHeaderTemplate = ``;

      if (this.time !== null && this.lives !== null) {
        gameHeaderTemplate = `
        <div class="game__timer">${this.time}</div>
        <div class="game__lives">
          ${new Array(MAX_NUMBER_OF_LIVES - this.lives)
          .fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
          ${new Array(this.lives)
          .fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="31" height="27">`)
          .join(``)}
        </div>`;
      }

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
        ${gameHeaderTemplate}
      </header>`;
    }

    bind() {
      if (this.time !== null && this.lives !== null) {
        this.blinkElement = this.element.querySelector(`.game__timer`);
      }

      const backButton = this.element.querySelector(`.back`);

      backButton.addEventListener(`click`, () => this.onClick());
    }

    blink() {
      if (this.blinkElement) {
        if (!this.blinkElement.style.color) {
          this.blinkElement.style.color = `red`;
        } else {
          this.blinkElement.removeAttribute(`style`);
        }
      }
    }

    onClick() {
      Application.showModalConfirm();
    }
  }

  class RulesScreen {
    constructor() {
      this.header = new HeaderView();
      this.content = new RulesView();

      this.root = document.createElement(`div`);
      this.root.appendChild(this.header.element);
      this.root.appendChild(this.content.element);

      this.content.onClick = (evt, playerName) => {
        evt.preventDefault();
        Application.showGame(playerName);
      };
    }

    get element() {
      return this.root;
    }
  }

  const getElement = (template = ``) => {
    const wrapper = document.createElement(`div`);
    wrapper.innerHTML = template.trim();
    return wrapper;
  };

  const mainElement = document.querySelector(`#main`);

  const getRadioInputValue = (elements) => {
    let radioValue = false;

    elements.forEach((element) => {
      if (element.checked) {
        radioValue = element.value;
      }
    });

    return radioValue;
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

  class GameOnePictureView extends AbstractView {
    constructor(state) {
      super();
      this.state = state;
    }

    get template() {
      const currentQuestion = this.state.questions[this.state.level - 1];

      return `
      <section class="game">
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${currentQuestion.answers[0].image.url}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
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
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${currentQuestion.answers[0].image.url}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input class="visually-hidden" name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input class="visually-hidden" name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${currentQuestion.answers[1].image.url}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input class="visually-hidden" name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input class="visually-hidden" name="question2" type="radio" value="painting">
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
      <p class="game__task">${currentQuestion.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${currentQuestion.answers[0].image.url}" data-index="0" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${currentQuestion.answers[1].image.url}" data-index="1" alt="Option 2" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${currentQuestion.answers[2].image.url}" data-index="2" alt="Option 3" width="304" height="455">
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
    let isCorrect = true;

    answers.forEach((answer, index) => {
      if (+index !== +id) {

        if (userAnswer === answer.type) {
          isCorrect = false;
        }
      }
    });

    return isCorrect;
  };

  class GameScreen {
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
    questions: [],
    stats: [],
    username: null
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

  var reduceCountdown = (state) => {
    const newState = Object.assign({}, state);

    if (state.time < 0) {
      throw new Error(`Время не может быть отрицательным`);
    } else if (state.time > 0) {
      newState.time--;
    }

    return newState;
  };

  class GameModel {
    constructor(gameData, playerName) {
      this.gameData = gameData;
      this.playerName = playerName;
      this.restart();
    }

    restart() {
      this._state = JSON.parse(JSON.stringify(INITIAL_STATE));
      this._state = Object.assign({}, this._state, {questions: this.gameData});
      this._state = Object.assign({}, this._state, {username: this.playerName});
    }

    get state() {
      return this._state;
    }

    changeLevel() {
      this._state = changeLevel(this._state, this._state.level + 1);
      this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
    }

    reduceNumberOfLives() {
      this._state = reduceNumberOfLives(this._state);
    }

    setLevelStat(result, time) {
      const answerTime = INITIAL_STATE.time - time;
      this._state = setLevelStat(this._state, result, answerTime);
    }

    tick() {
      this._state = reduceCountdown(this._state);
    }

    isEndOfGame() {
      return (this._state.level < 0 || this._state.lives <= 0 || this._state.time <= 0);
    }

    isEndOfTime() {
      return this._state.time <= 0;
    }
  }

  var getResult = (state) => {
    const rightAnswers = state.stats.filter((statValue) => statValue.result);
    const rightCounter = rightAnswers.length;
    const fastCounter = rightAnswers.filter((statValue) => statValue.time < state.fastTime).length;
    const slowCounter = rightAnswers.filter((statValue) => statValue.time > state.slowTime).length;

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
      <section class="result">
        <h2 class="result__title">${renderTitle(this.gameResult)}</h2>
          ${renderResultTable(this.state, this.gameResult)}
      </section>`;
    }
  }

  class StatScreen {
    constructor(state) {
      this.header = new HeaderView();
      this.content = new StatsView(state, getResult(state));

      this.root = document.createElement(`div`);
      this.root.appendChild(this.header.element);
      this.root.appendChild(this.content.element);
    }

    get element() {
      return this.root;
    }
  }

  class ConfirmView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `
      <section class="modal">
        <form class="modal__inner">
          <button class="modal__close" type="button">
            <span class="visually-hidden">Закрыть</span>
          </button>
          <h2 class="modal__title">Подтверждение</h2>
          <p class="modal__text">Вы уверены что хотите начать игру заново?</p>
          <div class="modal__button-wrapper">
            <button class="modal__btn  modal__btn--ok">Ок</button>
            <button class="modal__btn  modal__btn--cancel">Отмена</button>
          </div>
        </form>
      </section>`;
    }

    bind() {
      const modalClose = this.element.querySelector(`.modal__close`);
      const modalCancelButton = this.element.querySelector(`.modal__btn--cancel`);
      const modalOkButton = this.element.querySelector(`.modal__btn--ok`);

      modalClose.addEventListener(`click`, (evt) => this.onCloseClick(evt));
      modalCancelButton.addEventListener(`click`, (evt) => this.onCloseClick(evt));
      modalOkButton.addEventListener(`click`, (evt) => this.onOkClick(evt));
    }

    onCloseClick() {
    }

    onOkClick() {
    }
  }

  class ConfirmScreen {
    constructor() {
      this.confirmView = new ConfirmView();
      this.confirmView.onCloseClick = (evt) => {
        evt.preventDefault();
        this.close();
      };
      this.confirmView.onOkClick = (evt) => {
        evt.preventDefault();
        this.close();
        Application.showGreeting();
      };
    }

    get element() {
      return this.confirmView.element;
    }

    open() {
      document.body.appendChild(this.element);
    }

    close() {
      document.body.removeChild(this.element);
    }
  }

  class ErrorView extends AbstractView {
    constructor() {
      super();
    }

    get template() {
      return `<section class="modal">
      <div class="modal__inner">
        <h2 class="modal__title">Произошла ошибка!</h2>
        <p class="modal__text modal__text--error">Статус: 404. Пожалуйста, перезагрузите страницу.</p>
      </div>
    </section>`;
    }

    bind() {
    }
  }

  class ErrorScreen {
    constructor() {
      this.errorView = new ErrorView();
    }

    get element() {
      return this.errorView.element;
    }

    open() {
      document.body.appendChild(this.element);
    }
  }

  const resize = (frame, image) => {
    if (image.width <= frame.width && image.height <= frame.height) {
      return image;
    }

    const shrink = Math.max(ratio(image.width, frame.width), ratio(image.height, frame.height));

    return {width: image.width / shrink, height: image.height / shrink};
  };

  const ratio = (a, b) => {
    return a / b;
  };

  const LOAD_URL = `https://es.dump.academy/pixel-hunter/questions`;

  const mainElement$1 = document.querySelector(`#main`);

  const showScreen$1 = (element) => {
    mainElement$1.innerHTML = ``;
    mainElement$1.appendChild(element);
  };

  const checkFetchStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(`${response.status}`);
    }
  };

  const loadImage = (answer) => {
    return new Promise((onLoad, onError) => {
      const image = new Image();
      answer.image.preloadedImage = image;
      image.onload = () => onLoad(image);
      image.onerror = () => onError();
      const imageSizes = resize({width: 200, height: 300}, {width: answer.image.width, height: answer.image.height});
      image.width = imageSizes.width;
      image.height = imageSizes.height;
      image.src = answer.image.url;
    });
  };

  let gameData;

  class Application {
    static showIntro() {
      const introView = new IntroView();
      showScreen$1(introView.element);
      window.fetch(LOAD_URL)
        .then(checkFetchStatus)
        .then((response) => response.json())
        .then((data) => {
          gameData = data;
          let arrayOfImages = [];
          gameData.forEach((level) => {
            level.answers.forEach((answer) => arrayOfImages.push(loadImage(answer)));
          });
          return arrayOfImages;
        })
        .then((imagePromises) => Promise.all(imagePromises))
        .then(Application.showGreeting)
        .catch(Application.showModalError);
    }

    static showGreeting() {
      const greetingScreen = new GreetingScreen();
      showScreen$1(greetingScreen.element);
    }

    static showRules() {
      const rulesScreen = new RulesScreen();
      showScreen$1(rulesScreen.element);
    }

    static showGame(playerName) {
      const gameScreen = new GameScreen(new GameModel(gameData, playerName));
      showScreen$1(gameScreen.element);
      gameScreen.startGame();
    }

    static showStat(state) {
      const statScreen = new StatScreen(state);
      showScreen$1(statScreen.element);
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

  Application.showIntro();

}());

//# sourceMappingURL=main.js.map
