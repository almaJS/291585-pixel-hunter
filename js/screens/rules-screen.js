import RulesView from '../view/rules-view.js';
import HeaderView from '../view/header-view.js';

export default class RulesScreen {
  constructor(showNextScreen, showModalConfirm) {
    this.header = new HeaderView(showModalConfirm);
    this.content = new RulesView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);

    this.content.onClick = (evt, playerName) => {
      evt.preventDefault();
      showNextScreen(playerName);
    };
  }

  get element() {
    return this.root;
  }
}
