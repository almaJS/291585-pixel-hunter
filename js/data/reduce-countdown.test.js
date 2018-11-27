import {assert} from 'chai';
import {reduceCountdown} from './reduce-countdown.js';
import {INITIAL_STATE} from './game-data.js';

describe(`Check countdown timer`, () => {

  it(`should decrease countdown timer`, () => {
    assert.equal(reduceCountdown(INITIAL_STATE).time, 29);
  });

  it(`shouldn't allow to set negatime time`, () => {
    assert.throws(() => reduceCountdown({lives: 3, level: 1, time: -1}).time, /Время не может быть отрицательным/);
  });

  it(`shouldn't decrease countdown timer if it's finished`, () => {
    assert.equal(reduceCountdown({lives: 3, level: 1, time: 0}).time, 0);
  });
});
