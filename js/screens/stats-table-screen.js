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

const renderTableFast = (result) => {
  let template = ``;

  if (result.isWinner && result.fast.count) {
    template = `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за скорость:</td>
        <td class="result__extra">${result.fast.count} <span class="stats__result stats__result--fast"></span></td>
        <td class="result__points">× 50</td>
      </tr>`;
  }

  return template;
};

const renderTableLife = (result) => {
  let template = ``;

  if (result.isWinner && result.lives.count) {
    template = `
      <tr>
        <td></td>
        <td class="result__extra">Бонус за жизни:</td>
        <td class="result__extra">${result.lives.count} <span class="stats__result stats__result--alive"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${result.lives.points}</td>
      </tr>
    `;
  }

  return template;
};

const renderTableSlow = (result) => {
  let template = ``;

  if (result.isWinner && result.slow.count) {
    template = `
      <tr>
        <td></td>
        <td class="result__extra">Штраф за медлительность:</td>
        <td class="result__extra">${result.slow.count} <span class="stats__result stats__result--slow"></span></td>
        <td class="result__points">× 50</td>
        <td class="result__total">${result.slow.points}</td>
      </tr>
    `;
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

      ${renderTableFast(result)}
      ${renderTableLife(result)}
      ${renderTableSlow(result)}
      ${renderTableTotal(result)}
    </table>`;

  return template;
};
