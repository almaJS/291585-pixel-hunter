import getResult from '../data/get-result.js';
import StatsView from '../view/stat-view.js';
import HeaderView from '../view/header-view.js';

export default class StatScreen {
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
