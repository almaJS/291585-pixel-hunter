import gameFooter from './game-footer.js';

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

export default (state, result) => {
  const template = `
    <table class="result__table">
      <tr>
        <td class="result__number">1.</td>
        <td colspan="2">
          ${gameFooter(state)}
        </td>
        ${renderTableHeader(result)}

      ${renderTableStat(result)}
      ${renderTableTotal(result)}
    </table>`;

  return template;
};
