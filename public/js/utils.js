/* eslint-disable no-unused-vars,no-param-reassign,no-undef */

/*
|--------------------------------------------------------------------------
| Utility Functions
|--------------------------------------------------------------------------
|
| Application-wide Javascript functions.
|
*/

const PERSISTENT_TOAST_TIME = 9999999;
const HEADER_HEIGHT_OFFSET = 84;

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
      top: element.offsetTop - HEADER_HEIGHT_OFFSET
    });
  }
}

function arrayToHtml(arr) {
  if (!Array.isArray(arr)) return '';
  let html = '';
  arr.forEach((text, i) => {
    if (i === 0) {
      html += `${text}`;
    } else {
      html += `<br/>${text}`;
    }
  });
  return html;
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

function notchOutline(element) {
  const outline = element.querySelector('.mdc-notched-outline');
  if (outline) {
    outline.classList.add('mdc-notched-outline--notched');
  }
}

function setTextFieldInput(entity, value) {
  const { element, mdc } = entity;
  const inputElement = Array.from(element.querySelectorAll('input'));
  if (inputElement.length === 0) {
    console.error('No text field input found in the element', element);
    return;
  }
  const textField = inputElement[0];
  textField.value = value;
  mdc.getDefaultFoundation().inputBlurHandler_();
}

function setRadioInput(element, value) {
  const inputElements = Array.from(element.querySelectorAll('input[type=radio]'));
  if (inputElements.length === 0) {
    console.error('No radio inputs found in the element', element);
    return;
  }
  inputElements.forEach((radio) => {
    radio.checked = false;
    // eslint-disable-next-line eqeqeq
    if (radio.value == value) {
      radio.checked = true;
    }
  });
}

function getSelectedRadio(element) {
  return element.querySelector(':checked');
}

function getSelectedRadioValue(element) {
  return getSelectedRadio(element).getAttribute('value');
}

function limitElements(parent, count) {
  const children = Array.from(parent.children);
  if (children.length < 1) {
    throw new Error('Cannot find children.');
  }
  for (let i = 0; i < children.length; i += 1) {
    if (i <= count) {
      children[i].style.display = 'inline-flex';
    } else {
      children[i].style.display = 'none';
    }
  }
}

function enumerateRadioElements(parent) {
  const children = Array.from(parent.querySelectorAll('input[type=radio]'));
  if (children.length < 1) {
    throw new Error('Cannot find children.');
  }
  const hashMap = {};
  children.forEach((r) => {
    hashMap[r.value] = r;
  });
  return hashMap;
}

function setOnRadioSwitch(parent, action) {
  const radioButtons = parent.querySelectorAll('input[type=radio]');
  parent.setAttribute('data-last-selected', getSelectedRadioValue(parent));

  radioButtons.forEach((radio) => {
    radio.addEventListener('click', (e) => {
      const target = e.currentTarget;
      const lastSelected = parent.getAttribute('data-last-selected');
      if (getSelectedRadioValue(parent) !== lastSelected) {
        parent.setAttribute('data-last-selected', getSelectedRadioValue(parent));
        action(getSelectedRadio(parent));
      }
    });
  });
}

// Convert name to alias (Data Mining and Business Intelligence --> D.M.B.I.)
function getAliasFromName(name) {
  return `${name.split(' ') // Split string by space and return an array of words
    .filter(c => c !== 'and') // remove the word 'and'
    .map(c => c[0]) // Take the first letter of each word
    .join('.')}.`; // join letters by dot and append dot at the end.
}

function difference(o1, o2) {
  return Object.keys(o2).reduce((diff, key) => {
    if (o1[key] === o2[key]) return diff;
    return {
      ...diff,
      [key]: o2[key]
    };
  }, {});
}

function setSelectedItem(table, id) {
  if (!table || !table.element) {
    throw new Error('Table or table element is null.');
  }
  const selectedItem = table.element.querySelector('tr.selected');
  if (selectedItem) {
    selectedItem.removeAttribute('selected');
  }
  // eslint-disable-next-line eqeqeq
  const targetItem = Array.from(table.element.querySelectorAll('tr'))
    .find(d => +d.getAttribute('data-id') === id);
  if (targetItem) {
    targetItem.classList.add('selected');
  } else {
    console.log('Target item was not found in the table.', id);
  }
}

function fetchStatus(response) {
  alchemyCommon.loadingBar.dequeue();
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    accessControl.logout();
    alchemyCommon.dialog.info({
      header: 'Unauthorized',
      body: 'You are logged out because your access token is invalid.',
      accept: 'Reload',
      // eslint-disable-next-line no-restricted-globals
      onAccept: () => (location.reload())
    }).show();
  }
  return Promise.reject(response);
}

function handleResponse(response, callback) {
  const isJSON = response.headers.get('content-type').indexOf('json') > -1;
  if (isJSON) {
    response.json().then(callback);
  } else {
    response.text().then(callback);
  }
}

function focusListener(element, key, callback) {
  function onKeyDown(e) {
    if (e.key === key) {
      callback();
    }
  }

  function onFocus() {
    window.addEventListener('keydown', onKeyDown);
  }

  function onBlur() {
    window.removeEventListener('keydown', onKeyDown);
  }

  element.addEventListener('focus', onFocus);
  element.addEventListener('blur', onBlur);
}

function onEnterKey(target, callback, once = false) {
  if (!target) throw new Error('Target is null or undefined.');
  target.addEventListener('keydown', function onKeyDown(e) {
    console.log('key press', e);
    e.preventDefault();
    if (e.keyCode === 13) {
      callback();
      if (once) {
        target.removeEventListener('keydown', onKeyDown);
      }
    }
  });
}

function createElement(tagName, className, children) {
  const element = document.createElement(tagName);

  if (className) {
    if (Array.isArray(className)) {
      element.classList.add(...className);
    } else {
      element.classList.add(className);
    }
  }

  if (children) {
    if (Array.isArray(children)) {
      children.forEach(() => {
        element.appendChild(children);
      });
    } else {
      element.appendChild(children);
    }
  }

  return element;
}

function mdcListItem(primary, secondary, tertiary) {
  const spanSecondaryText = createElement('span', 'mdc-list-item__secondary-text');
  spanSecondaryText.innerHTML = secondary || '';
  if (tertiary) {
    const spanTertiaryText = createElement('span', 'mdc-list-item__secondary-text');
    spanTertiaryText.innerHTML = tertiary;
    spanSecondaryText.innerHTML += spanTertiaryText;
  }
  const spanText = createElement('span', 'mdc-list-item__text', spanSecondaryText);
  spanText.innerHTML += primary;
  const listItem = createElement('li', 'mdc-list-item', spanText);
  return listItem;
}

function arrayToMdcList(array, methods) {
  return array.map((item) => {
    const listItemText = [];
    if (typeof methods.primary === 'function') {
      listItemText.push(methods.primary(item));
    }
    if (typeof methods.secondary === 'function') {
      listItemText.push(methods.secondary(item));
    }
    if (typeof methods.tertiary === 'function') {
      listItemText.push(methods.tertiary(item));
    }
    const mdcListItemString = mdcListItem(...listItemText);
    if (typeof methods.also === 'function') {
      return methods.also(mdcListItemString, item);
    }
    return mdcListItemString;
  });
}

// "Course Offered Faculty" --> "course-offered-faculty"
function urlFriendlyName(name) {
  return name.toLowerCase().split(' ').join('-');
}

function removeLoadingOverlay() {
  const element = document.querySelector('#loading-overlay');
  if (element) {
    element.parentNode.removeChild(element);
    window.removeEventListener('load', removeLoadingOverlay);
  }
}

function removeItemsById(exclusions) {
  return item => (exclusions.indexOf(item.id) === -1);
}

function subtractArray(b, key = 'id') {
  return a => a.filter(removeItemsById(b.map(r => r[key])));
}

function unique(value, index, self) {
  return self.indexOf(value) === index;
}

function isCommon(arr) {
  if (!arr || arr.length < 1) {
    return true;
  }
  return arr.filter(unique).length === 1;
}

function assertPath(event, className) {
  if (!event || !event.path || event.path.length === 0) {
    return null;
  }
  return event.path.find(r => r.classList.contains(className));
}
