'use strict';

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

const mainElement = document.querySelector(`#main`);

const screens = Array.from(document.querySelectorAll(`template`)).map((it) => it.content);

const showScreen = (index) => {
  const shadow = document.createElement(`div`);
  const content = screens[index].cloneNode(true);

  shadow.appendChild(content);
  mainElement.innerHTML = ``;
  mainElement.appendChild(shadow.cloneNode(true));
};

let currentScreen = 1;

const selectScreen = (index) => {
  index = index < 0 ? 0 : index;
  index = index >= screens.length ? screens.length - 1 : index;
  if (index !== currentScreen) {
    currentScreen = index;
    showScreen(index);
  }
};

document.addEventListener(`keydown`, (evt) => {
  switch (evt.keyCode) {
    case RIGHT_ARROW:
      selectScreen(currentScreen + 1);
      break;
    case LEFT_ARROW:
      selectScreen(currentScreen - 1);
      break;
  }
});

const arrowsWrap = `<div class="arrows__wrap">
  <style>
    .arrows__wrap {
      position: absolute;
      top: 95px;
      left: 50%;
      margin-left: -56px;
    }
    .arrows__btn {
      background: none;
      border: 2px solid black;
      padding: 5px 20px;
    }
  </style>
  <button class="arrows__btn"><-</button>
  <button class="arrows__btn">-></button>
  </div>`;

document.body.insertAdjacentHTML(`beforeEnd`, arrowsWrap);

const arrows = document.querySelectorAll(`.arrows__btn`);

arrows[0].addEventListener(`click`, () => {
  selectScreen(currentScreen - 1);
});

arrows[1].addEventListener(`click`, () => {
  selectScreen(currentScreen + 1);
});

showScreen(currentScreen);
