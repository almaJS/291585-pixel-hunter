import INITIAL_STATE from './game-data.js';
import {changeLevel} from './change-level.js';
import {reduceNumberOfLives} from './reduce-lives.js';
import setLevelStat from './set-level-stat.js';
import reduceCountdown from './reduce-countdown.js';

export default class GameModel {
  constructor(gameData, playerName) {
    this.gameData = gameData;
    this.playerName = playerName;
    this.restart();
  }

  restart() {
    this._state = JSON.parse(JSON.stringify(INITIAL_STATE));
    this._state = Object.assign({}, this._state, {questions: this.gameData, username: this.playerName});
  }

  get state() {
    return this._state;
  }

  changeLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
    this._state = Object.assign({}, this._state, {time: INITIAL_STATE.time});
  }

  reduceNumberOfLives() {
    this._state = reduceNumberOfLives(this._state);
  }

  setLevelStat(result, time) {
    const answerTime = INITIAL_STATE.time - time;
    this._state = setLevelStat(this._state, result, answerTime);
  }

  tick() {
    this._state = reduceCountdown(this._state);
  }

  isEndOfGame() {
    return (this._state.level < 0 || this._state.lives <= 0 || this._state.time <= 0);
  }

  isEndOfTime() {
    return this._state.time <= 0;
  }
}
