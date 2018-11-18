export const getElement = (template) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

let greetingElement;
export const setGreetingElement = (element) => {
  greetingElement = element;
};

const mainElement = document.querySelector(`#main`);

export const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const showGreetingsScreen = () => showScreen(greetingElement);

export const backToScreen = (currentScreen) => {
  const backButton = currentScreen.querySelector(`.back`);

  backButton.addEventListener(`click`, () => showGreetingsScreen());
};

export const getRadioInputsState = (elements) => {
  let isRadioChecked = false;

  elements.forEach((element) => {
    if (element.checked) {
      isRadioChecked = true;
    }
  });

  return isRadioChecked;
};
