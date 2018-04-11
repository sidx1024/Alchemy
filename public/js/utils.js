/* eslint-disable no-unused-vars,no-param-reassign,no-undef */

/*
|--------------------------------------------------------------------------
| Utility Functions
|--------------------------------------------------------------------------
|
| Application-wide Javascript functions.
|
*/

function blurSelection(exclusions, callback, callbackArguments) {
  return (mouseEvent) => {
    mouseEvent.stopPropagation();
    const { target } = mouseEvent;
    if (!(exclusions && exclusions.indexOf(target) > -1)) {
      if (typeof callback === 'function') {
        callback(callbackArguments);
      }
      window.removeEventListener('click', blurSelection);
    }
  };
}

function scrollTo(element) {
  if (element && window.scroll) {
    window.scroll({
      behavior: 'smooth',
      top: element.offsetTop - 84
    });
  }
}

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

function removeLoadingOverlay() {
  const element = document.querySelector('#loading-overlay');
  if (element) {
    element.parentNode.removeChild(element);
    window.removeEventListener('load', removeLoadingOverlay);
  }
}
