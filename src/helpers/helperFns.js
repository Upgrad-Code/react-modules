import { TIMEOUT } from './config.js';

const timeout = (sec) => {
  return new Promise((_, reject) => {
    return setTimeout(() => {
      return reject(`Request is taking too long. More than ${sec} seconds.`);
    }, sec * 1000);
  });
};

export const getJson = async (url, errMsg = 'Something went wrong.') => {
  try {
    const response = await Promise.race([fetch(url), timeout(TIMEOUT)]);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(`${errMsg} ${response.status} ${data.message}`);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
