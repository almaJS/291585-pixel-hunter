import gameFooter from './game-footer.js';
import templates from '../data/game-templates.js';

export default (state) => {
  const templateName = state.questions[state.level - 1].template;

  const template = `
  <section class="game">
    <p class="game__task">${state.questions[state.level - 1].text}</p>
    ${templates[templateName].getTemplate(state.questions[state.level - 1])}
    ${gameFooter(state)}
  </section>`;

  return template;
};
