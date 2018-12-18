import RulesView from '../view/rules-view.js';
import HeaderView from '../view/header-view.js';
import Application from '../application.js';

export default class RulesScreen {
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
