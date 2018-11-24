import {assert} from 'chai';
import {countResult} from './count-result.js';

const RIGHT_NORMAL_ARRAY = [
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15},
  {result: true, time: 15}
];

const RIGHT_FAST_ARRAY = [
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5},
  {result: true, time: 5}
];

const RIGHT_SLOW_ARRAY = [
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25},
  {result: true, time: 25}
];

const MIXED_ARRAY = [
  {result: false, time: 5},
  {result: true, time: 3},
  {result: false, time: 15},
  {result: true, time: 25},
  {result: false, time: 21},
  {result: true, time: 20},
  {result: false, time: 10},
  {result: false, time: 15},
  {result: true, time: 15},
  {result: true, time: 15}
];

const WRONG_FAST_ARRAY = [
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5},
  {result: false, time: 5}
];

const SHORT_ARRAY = [
  {result: false, time: 5},
  {result: true, time: 3},
  {result: false, time: 15},
  {result: true, time: 25},
  {result: false, time: 21},
  {result: true, time: 20},
  {result: false, time: 10},
  {result: false, time: 15},
];

describe(`Check result counter`, () => {

  it(`shouldn't be less than 10 answers`, () => {
    assert.equal(countResult([], 3), -1);
    assert.equal(countResult(SHORT_ARRAY, 3), -1);
    assert.notEqual(countResult([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3), -1);
  });

  it(`shouldn't allow set zero or negative numbers of lives`, () => {
    assert.equal(countResult(RIGHT_NORMAL_ARRAY, -1), -1);
    assert.equal(countResult(RIGHT_NORMAL_ARRAY, -5), -1);
    assert.equal(countResult(RIGHT_NORMAL_ARRAY, 0), -1);
    assert.equal(countResult(RIGHT_FAST_ARRAY, 0), -1);
    assert.equal(countResult(RIGHT_SLOW_ARRAY, 0), -1);
    assert.equal(countResult(MIXED_ARRAY, 0), -1);
    assert.equal(countResult(WRONG_FAST_ARRAY, 0), -1);
  });

  it(`should sum points correctly`, () => {
    assert.equal(countResult(RIGHT_NORMAL_ARRAY, 3), 1150);
    assert.equal(countResult(RIGHT_NORMAL_ARRAY, 1), 1050);
    assert.equal(countResult(RIGHT_FAST_ARRAY, 3), 1650);
    assert.equal(countResult(RIGHT_FAST_ARRAY, 1), 1550);
    assert.equal(countResult(RIGHT_SLOW_ARRAY, 3), 650);
    assert.equal(countResult(RIGHT_SLOW_ARRAY, 1), 550);
    assert.equal(countResult(MIXED_ARRAY, 3), 650);
    assert.equal(countResult(WRONG_FAST_ARRAY, 3), 150);
  });
});
