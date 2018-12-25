export const getElement = (template = ``) => {
  const wrapper = document.createElement(`div`);
  wrapper.innerHTML = template.trim();
  return wrapper;
};

const mainElement = document.querySelector(`#main`);

export const showScreen = (element) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(element);
};

export const getRadioInputValue = (elements) => {
  const radio = Array.from(elements).find((element) => element.checked === true);

  return radio ? radio.value : false;
};

export const getRadioInputsState = (elements) => {
  const radio = Array.from(elements).find((element) => element.checked === true);

  return radio ? radio.checked : false;
};
