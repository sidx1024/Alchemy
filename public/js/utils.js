/* eslint-disable no-unused-vars */

/*
|--------------------------------------------------------------------------
| Utility Functions
|--------------------------------------------------------------------------
|
| Application-wide Javascript functions.
|
*/

function filterObject(obj) {
  const keys = Object.keys(obj);
  const filteredObj = {};
  keys.forEach((key) => {
    if (obj[key] !== null && obj[key] !== undefined) {
      filteredObj[key] = obj[key];
    }
  });
  return filteredObj;
}

function fetchStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  return Promise.reject(response);
}
