import {assert} from 'chai';
import {reduceNumberOfLives} from './reduce-lives.js';
import INITIAL_STATE from './game-data.js';

describe(`Check lives changer`, () => {

  it(`should set number of lives`, () => {
    assert.equal(reduceNumberOfLives(INITIAL_STATE).lives, 2);
  });

  it(`shouldn't allow to set negative numbers of lives`, () => {
    assert.equal(reduceNumberOfLives({lives: -1, level: 1, time: 30}).lives, 0);
    assert.equal(reduceNumberOfLives({lives: -10, level: 1, time: 30}).lives, 0);
  });
});
