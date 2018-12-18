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
  let radioValue = false;

  elements.forEach((element) => {
    if (element.checked) {
      radioValue = element.value;
    }
  });

  return radioValue;
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
