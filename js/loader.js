const SERVER_URL = `https://es.dump.academy/pixel-hunter/`;

const DEFAULT_NAME = `anonymous`;
const APP_ID = 291585;

const toJSON = (res) => res.json();

const checkFetchStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Loader {
  static loadData() {
    return fetch(`${SERVER_URL}/questions`)
      .then(checkFetchStatus)
      .then(toJSON);
  }

  static loadResults(playerName = DEFAULT_NAME) {
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`)
      .then(checkFetchStatus)
      .then(toJSON);
  }

  static saveResults(data, playerName = DEFAULT_NAME) {
    const requestSettings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${playerName}`, requestSettings)
      .then(checkFetchStatus);
  }
}
