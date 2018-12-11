import templates from '../data/game-templates.js';

export default (state) => {
  const currentQuestion = state.questions[state.level - 1];
  const templateName = currentQuestion.template;

  const template = `
  <section class="game">
    <p class="game__task">${currentQuestion.text}</p>
    ${templates[templateName].getTemplate(currentQuestion)}`;

  return template;
};
