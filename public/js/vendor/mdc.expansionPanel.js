/*!
 Material Components for the web
 Copyright (c) 2018 Google Inc.
 License: Apache-2.0
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["expansionPanel"] = factory();
	else
		root["mdc"] = root["mdc"] || {}, root["mdc"]["expansionPanel"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @template A
 */
var MDCFoundation = function () {
  _createClass(MDCFoundation, null, [{
    key: "cssClasses",

    /** @return enum{cssClasses} */
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports every
      // CSS class the foundation class needs as a property. e.g. {ACTIVE: 'mdc-component--active'}
      return {};
    }

    /** @return enum{strings} */

  }, {
    key: "strings",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // semantic strings as constants. e.g. {ARIA_ROLE: 'tablist'}
      return {};
    }

    /** @return enum{numbers} */

  }, {
    key: "numbers",
    get: function get() {
      // Classes extending MDCFoundation should implement this method to return an object which exports all
      // of its semantic numbers as constants. e.g. {ANIMATION_DELAY_MS: 350}
      return {};
    }

    /** @return {!Object} */

  }, {
    key: "defaultAdapter",
    get: function get() {
      // Classes extending MDCFoundation may choose to implement this getter in order to provide a convenient
      // way of viewing the necessary methods of an adapter. In the future, this could also be used for adapter
      // validation.
      return {};
    }

    /**
     * @param {A=} adapter
     */

  }]);

  function MDCFoundation() {
    var adapter = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, MDCFoundation);

    /** @protected {!A} */
    this.adapter_ = adapter;
  }

  _createClass(MDCFoundation, [{
    key: "init",
    value: function init() {
      // Subclasses should override this method to perform initialization routines (registering events, etc.)
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // Subclasses should override this method to perform de-initialization routines (de-registering events, etc.)
    }
  }]);

  return MDCFoundation;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCFoundation);

/***/ }),

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */



/**
 * @template F
 */

var MDCComponent = function () {
  _createClass(MDCComponent, null, [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!MDCComponent}
     */
    value: function attachTo(root) {
      // Subclasses which extend MDCBase should provide an attachTo() method that takes a root element and
      // returns an instantiated component with its root set to that element. Also note that in the cases of
      // subclasses, an explicit foundation class will not have to be passed in; it will simply be initialized
      // from getDefaultFoundation().
      return new MDCComponent(root, new __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */]());
    }

    /**
     * @param {!Element} root
     * @param {F=} foundation
     * @param {...?} args
     */

  }]);

  function MDCComponent(root) {
    var foundation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, MDCComponent);

    /** @protected {!Element} */
    this.root_ = root;

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    this.initialize.apply(this, args);
    // Note that we initialize foundation here and not within the constructor's default param so that
    // this.root_ is defined and can be used within the foundation class.
    /** @protected {!F} */
    this.foundation_ = foundation === undefined ? this.getDefaultFoundation() : foundation;
    this.foundation_.init();
    this.initialSyncWithDOM();
  }

  _createClass(MDCComponent, [{
    key: 'initialize',
    value: function initialize() /* ...args */{}
    // Subclasses can override this to do any additional setup work that would be considered part of a
    // "constructor". Essentially, it is a hook into the parent constructor before the foundation is
    // initialized. Any additional arguments besides root and foundation will be passed in here.


    /**
     * @return {!F} foundation
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      // Subclasses must override this method to return a properly configured foundation class for the
      // component.
      throw new Error('Subclasses must override getDefaultFoundation to return a properly configured ' + 'foundation class');
    }
  }, {
    key: 'initialSyncWithDOM',
    value: function initialSyncWithDOM() {
      // Subclasses should override this method if they need to perform work to synchronize with a host DOM
      // object. An example of this would be a form control wrapper that needs to synchronize its internal state
      // to some property or attribute of the host DOM. Please note: this is *not* the place to perform DOM
      // reads/writes that would cause layout / paint, as this is called synchronously from within the constructor.
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      // Subclasses may implement this method to release any resources / deregister any listeners they have
      // attached. An example of this might be deregistering a resize event from the window object.
      this.foundation_.destroy();
    }

    /**
     * Wrapper method to add an event listener to the component's root element. This is most useful when
     * listening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'listen',
    value: function listen(evtType, handler) {
      this.root_.addEventListener(evtType, handler);
    }

    /**
     * Wrapper method to remove an event listener to the component's root element. This is most useful when
     * unlistening for custom events.
     * @param {string} evtType
     * @param {!Function} handler
     */

  }, {
    key: 'unlisten',
    value: function unlisten(evtType, handler) {
      this.root_.removeEventListener(evtType, handler);
    }

    /**
     * Fires a cross-browser-compatible custom event from the component root of the given type,
     * with the given data.
     * @param {string} evtType
     * @param {!Object} evtData
     * @param {boolean=} shouldBubble
     */

  }, {
    key: 'emit',
    value: function emit(evtType, evtData) {
      var shouldBubble = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var evt = void 0;
      if (typeof CustomEvent === 'function') {
        evt = new CustomEvent(evtType, {
          detail: evtData,
          bubbles: shouldBubble
        });
      } else {
        evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(evtType, shouldBubble, false, evtData);
      }

      this.root_.dispatchEvent(evt);
    }
  }]);

  return MDCComponent;
}();

/* harmony default export */ __webpack_exports__["a"] = (MDCComponent);

/***/ }),

/***/ 18:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(30);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */





/**
 * @extends {MDCFoundation<!MDCExpansionPanelAdapter>}
 */

var MDCExpansionPanelFoundation = function (_MDCFoundation) {
  _inherits(MDCExpansionPanelFoundation, _MDCFoundation);

  _createClass(MDCExpansionPanelFoundation, [{
    key: 'expanded',


    /**
     * Checks whether the root element has the expanded class.
     * @return {boolean}
     */
    get: function get() {
      return this.adapter_.hasClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].EXPANDED);
    }

    /**
     * @param {!MDCExpansionPanelAdapter} adapter
     */

  }], [{
    key: 'defaultAdapter',

    /**
     * @return {!MDCExpansionPanelAdapter}
     */
    get: function get() {
      return (/** @type {!MDCExpansionPanelAdapter} */{
          blur: function blur() {},
          hasClass: function hasClass() {
            return (/* className: string */false
            );
          },
          addClass: function addClass() /* className: string */{},
          removeClass: function removeClass() /* className: string */{},
          setAttribute: function setAttribute() /* attributeName: string, value: string */{},
          setStyle: function setStyle() /* styleName: string, value: string */{},
          getStyle: function getStyle() /* styleName: string */{},
          getComputedHeight: function getComputedHeight() {},
          offsetHeight: function offsetHeight() {},
          registerInteractionHandler: function registerInteractionHandler() /* type: string, handler: EventListener */{},
          deregisterInteractionHandler: function deregisterInteractionHandler() /* type: string, handler: EventListener */{},
          notifyChange: function notifyChange() {},
          notifyExpand: function notifyExpand() {},
          notifyCollapse: function notifyCollapse() {},
          setExpansionIconInnerHTML: function setExpansionIconInnerHTML() /* innerHTML: string */{},
          shouldRespondToClickEvent: function shouldRespondToClickEvent() {
            return (/* event: MouseEvent */true
            );
          }
        }
      );
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */];
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["c" /* strings */];
    }

    /** @return enum {number} */

  }, {
    key: 'numbers',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* numbers */];
    }
  }]);

  function MDCExpansionPanelFoundation(adapter) {
    _classCallCheck(this, MDCExpansionPanelFoundation);

    /**
     * The class to add at the end of the expansion or collapse transition.
     * @private {?string}
     */
    var _this = _possibleConstructorReturn(this, (MDCExpansionPanelFoundation.__proto__ || Object.getPrototypeOf(MDCExpansionPanelFoundation)).call(this, _extends(MDCExpansionPanelFoundation.defaultAdapter, adapter)));

    _this.classToAddAtTransitionEnd_ = null;

    /**
     * Handles a click.
     * Blurs the root element, since we don't want background color sticking around for mouse inputs,
     * then toggles the expansion state of the panel.
     * @private {!EventListener}
     */
    _this.clickHandler_ = /** @type {!EventListener} */function (event) {
      _this.adapter_.blur();
      _this.toggleExpansion(event);
    };

    /**
     * Handles the end of the transition.
     * Responsible for setting height to auto when the panel is done expanding and also
     * for adding and removing the proper classes when expansion or collapse has completed.
     * @private {!EventListener}
     */
    _this.transitionEndHandler_ = /** @type {!EventListener} */function (event) {
      if (event.propertyName === 'height' && _this.expanded) _this.adapter_.setStyle('height', 'auto');

      // if this transitionend is for the end of collapsing or expanding event, ensure that block will run only once
      if (_this.classToAddAtTransitionEnd_) {
        _this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].COLLAPSING);
        _this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].EXPANDING);
        _this.adapter_.addClass(_this.classToAddAtTransitionEnd_);
        _this.classToAddAtTransitionEnd_ = null;
      }
    };

    /**
     * Handles a key press.
     * Used to implement the keyboard accessibility the spec requires.
     * It will toggle expansion on the Enter keypress.
     * TODO: Investigate whether it should also toggle on Space keypress.
     * @private {!EventListener}
     */
    _this.keyPressHandler_ = /** @type {!EventListener} */function (event) {
      if (event.key === 'Enter') _this.toggleExpansion(event);
    };
    return _this;
  }

  _createClass(MDCExpansionPanelFoundation, [{
    key: 'init',
    value: function init() {
      if (!this.expanded) {
        this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].COLLAPSED);
        this.setCollapsedHeight_();
      }
      // needed for keyboard navigation
      this.adapter_.setAttribute('tabindex', '0');

      this.adapter_.setExpansionIconInnerHTML('expand_more');
      this.adapter_.registerInteractionHandler('click', this.clickHandler_);
      this.adapter_.registerInteractionHandler('transitionend', this.transitionEndHandler_);
      this.adapter_.registerInteractionHandler('keypress', this.keyPressHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterInteractionHandler('click', this.clickHandler_);
      this.adapter_.deregisterInteractionHandler('transitionend', this.transitionEndHandler_);
      this.adapter_.deregisterInteractionHandler('keypress', this.keyPressHandler_);
    }

    /**
     * Collapses the panel.
     */

  }, {
    key: 'collapse',
    value: function collapse() {
      this.adapter_.notifyCollapse();

      this.classToAddAtTransitionEnd_ = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].COLLAPSED;
      this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].EXPANDED);
      this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].COLLAPSING);

      this.setCollapsedHeight_();
    }

    /**
     * Expands the panel.
     */

  }, {
    key: 'expand',
    value: function expand() {
      this.adapter_.notifyExpand();

      this.classToAddAtTransitionEnd_ = __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].EXPANDED;
      this.adapter_.removeClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].COLLAPSED);
      this.adapter_.addClass(__WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */].EXPANDING);

      this.setExpandedHeight_();
    }

    /**
     * Toggles the expansion state of the panel if the adapter says that it should respond to the provided event.
     * @param {?Event} event
     */

  }, {
    key: 'toggleExpansion',
    value: function toggleExpansion(event) {
      if (this.adapter_.shouldRespondToClickEvent(event)) {
        this.adapter_.notifyChange();
        if (this.expanded) this.collapse();else this.expand();
      }
    }

    /**
     * Ugly hack section.
     *
     * Browsers can't do transitions to and from auto and fixed heights,
     * so you need these ugly hacks to make the transition appear smooth
     * since the panel has a fixed height when collapsed.
     * See http://n12v.com/css-transition-to-from-auto/.
     * It basically works by setting the height to auto long enough to calculate
     * the height that the panel would be at the end of its transition.
     * It then sets the panel's hieght to that fixed amount until the transition finishes,
     * at which point the height is set back to auto to accomdate content that might change height.
     * Note that currently there are no height transitions implemented here for when the content changes
     * so if you want a pretty and smooth height transition, implement on your content that is changing.
     *
     * TODO: Have the panel's height always be auto and implement the transition by growing the panel content.
     */

    /**
     * Adds the vertical margin to the computed height since apparently it can't compute the margin automatically.
     * @return {string}
     * @private
     */

  }, {
    key: 'setCollapsedHeight_',


    /**
     * Sets collapsed height styles.
     * Needed so that transition from auto to fixed height will appear smooth.
     * @private
     */
    value: function setCollapsedHeight_() {
      this.adapter_.setStyle('height', this.computedHeight_.toString());
      this.adapter_.offsetHeight();
      this.adapter_.setStyle('height', __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* numbers */].COLLAPSED_HEIGHT + 'px');
    }

    /**
     * Sets expanded height styles.
     * Needed so that transition from fixed to auto height will appear smooth.
     * @private
     */

  }, {
    key: 'setExpandedHeight_',
    value: function setExpandedHeight_() {
      var prevHeight = this.adapter_.getStyle('height');
      this.adapter_.setStyle('height', 'auto');
      var endHeight = this.expandedHeightStyle_;
      this.adapter_.setStyle('height', prevHeight);
      this.adapter_.offsetHeight();
      this.adapter_.setStyle('height', endHeight);
    }
  }, {
    key: 'expandedHeightStyle_',
    get: function get() {
      return Number(this.computedHeight_.replace('px', '')) + __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* numbers */].EXPANDED_VERTICAL_MARGIN + 'px';
    }

    /**
     * Safely gets the computed height from the adapter.
     * @return {string | number}
     * @private
     */

  }, {
    key: 'computedHeight_',
    get: function get() {
      return this.adapter_.getComputedHeight() || '';
    }
  }]);

  return MDCExpansionPanelFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MDCExpansionPanelFoundation);

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return strings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return numbers; });
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/** @enum {string} */
var strings = {
  EXPANSION_ICON_SELECTOR: '.mdc-expansion-panel__expansion-icon',
  CHANGE_EVENT: 'MDCExpansionPanel:change',
  EXPAND_EVENT: 'MDCExpansionPanel:expand',
  COLLAPSE_EVENT: 'MDCExpansionPanel:collapse'
};

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-expansion-panel',
  EXPANDED: 'mdc-expansion-panel--expanded',
  COLLAPSED: 'mdc-expansion-panel--collapsed',
  COLLAPSING: 'mdc-expansion-panel--collapsing',
  EXPANDING: 'mdc-expansion-panel--expanding',
  NO_CLICK: 'mdc-expansion-panel--no-click',
  ICON: 'mdc-expansion-panel__expansion-icon',
  ICON_EXPANDED: 'mdc-expansion-panel__expansion-icon--expanded',
  ACTIONS: 'mdc-expansion-panel__actions'
};

/** @enum {number} */
var numbers = {
  COLLAPSED_HEIGHT: 48,
  EXPANDED_VERTICAL_MARGIN: 16
};



/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toArray", function() { return toArray; });
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Helper to convert a node list to an array.
 * Needed beacuse IE is a steaming pile of ****.
 * TODO: Drop IE support.
 * @param {!NodeList} list
 */
function toArray(list) {
  var array = [];
  for (var i = 0, e; e = list[i]; i++) {
    array.push(e);
  }
  return array;
}



/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return cssClasses; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return strings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation__ = __webpack_require__(18);
/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// I have to import the foundation to get the constants, because closure won't let me
// do import {strings as MDCExpansionPanelFoundation.strings}


/** @enum {string} */
var strings = {
  CHILD_SELECTOR: '.' + __WEBPACK_IMPORTED_MODULE_0__foundation__["a" /* default */].cssClasses.ROOT,
  CHANGE_EVENT: 'MDCExpansionPanelAccordion:change'
};

/** @enum {string} */
var cssClasses = {
  ROOT: 'mdc-expansion-panel-accordion',
  EXCLUDED: 'mdc-expansion-panel-accordion--excluded'
};



/***/ }),

/***/ 33:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__material_base_foundation__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__adapter__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation__ = __webpack_require__(18);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */




// I have to import the foundation to get the constants, because closure won't let me
// do import {strings as MDCExpansionPanelFoundation.strings}


/**
 * @extends {MDCFoundation<!MDCExpansionPanelAccordionAdapter>}
 */

var MDCExpansionPanelAccordionFoundation = function (_MDCFoundation) {
  _inherits(MDCExpansionPanelAccordionFoundation, _MDCFoundation);

  _createClass(MDCExpansionPanelAccordionFoundation, [{
    key: 'expandedChild',


    /**
     * The component instance that is currently expanded.
     * @return {?{collapse: Function}}
     */
    get: function get() {
      return this.expandedChild_;
    }

    /**
     * @param {!MDCExpansionPanelAccordionAdapter} adapter
     */

  }], [{
    key: 'defaultAdapter',

    /**
     * @return {!MDCExpansionPanelAccordionAdapter}
     */
    get: function get() {
      return (/** @type {!MDCExpansionPanelAccordionAdapter} */{
          notifyChange: function notifyChange() {},
          getComponentInstanceFromEvent: function getComponentInstanceFromEvent() /* event: Event */{},
          registerChildrenExpansionPanelInteractionListener: function registerChildrenExpansionPanelInteractionListener() /* type: string, handler: EventListener */{},
          deregisterChildrenExpansionPanelInteractionListener: function deregisterChildrenExpansionPanelInteractionListener() /* type: string, handler: EventListener */{}
        }
      );
    }

    /** @return enum {string} */

  }, {
    key: 'cssClasses',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["a" /* cssClasses */];
    }

    /** @return enum {string} */

  }, {
    key: 'strings',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_2__constants__["b" /* strings */];
    }
  }]);

  function MDCExpansionPanelAccordionFoundation(adapter) {
    _classCallCheck(this, MDCExpansionPanelAccordionFoundation);

    /**
     * The currently expanded child.
     * @private {?{collapse: Function}}
     */
    var _this = _possibleConstructorReturn(this, (MDCExpansionPanelAccordionFoundation.__proto__ || Object.getPrototypeOf(MDCExpansionPanelAccordionFoundation)).call(this, _extends(MDCExpansionPanelAccordionFoundation.defaultAdapter, adapter)));

    _this.expandedChild_ = null;

    /**
     * Collapses the expanded child when a child is expanded.
     * @private {!EventListener}
     */
    _this.expansionHandler_ = /** @type {!EventListener} */function (event) {
      if (_this.expandedChild_) _this.expandedChild_.collapse();
      _this.expandedChild_ = _this.adapter_.getComponentInstanceFromEvent(event);
    };
    return _this;
  }

  _createClass(MDCExpansionPanelAccordionFoundation, [{
    key: 'init',
    value: function init() {
      this.adapter_.registerChildrenExpansionPanelInteractionListener(__WEBPACK_IMPORTED_MODULE_3__foundation__["a" /* default */].strings.EXPAND_EVENT, this.expansionHandler_);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.adapter_.deregisterChildrenExpansionPanelInteractionListener(__WEBPACK_IMPORTED_MODULE_3__foundation__["a" /* default */].strings.EXPAND_EVENT, this.expansionHandler_);
    }
  }]);

  return MDCExpansionPanelAccordionFoundation;
}(__WEBPACK_IMPORTED_MODULE_0__material_base_foundation__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (MDCExpansionPanelAccordionFoundation);

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MDCExpansionPanel", function() { return MDCExpansionPanel; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__accordion_index__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__accordion_foundation__ = __webpack_require__(33);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MDCExpansionPanelFoundation", function() { return __WEBPACK_IMPORTED_MODULE_2__foundation__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MDCExpansionPanelAccordion", function() { return __WEBPACK_IMPORTED_MODULE_4__accordion_index__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MDCExpansionPanelAccordionFoundation", function() { return __WEBPACK_IMPORTED_MODULE_5__accordion_foundation__["a"]; });
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "util", function() { return __WEBPACK_IMPORTED_MODULE_3__util__; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */









/**
 * @extends {MDCComponent<!MDCExpansionPanelFoundation>}
 */

var MDCExpansionPanel = function (_MDCComponent) {
  _inherits(MDCExpansionPanel, _MDCComponent);

  _createClass(MDCExpansionPanel, [{
    key: 'expanded',


    /**
     * Checks whether the root element has the expanded class.
     * @return {boolean}
     */
    get: function get() {
      return this.foundation_.expanded;
    }

    /**
     * @param {...?} args
     */

  }], [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!MDCExpansionPanel}
     */
    value: function attachTo(root) {
      return new MDCExpansionPanel(root);
    }
  }]);

  function MDCExpansionPanel() {
    var _ref;

    _classCallCheck(this, MDCExpansionPanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * All the elements that have been marked as expansion icons by the user.
     * @private {?Array<Element>}
     */
    var _this = _possibleConstructorReturn(this, (_ref = MDCExpansionPanel.__proto__ || Object.getPrototypeOf(MDCExpansionPanel)).call.apply(_ref, [this].concat(args)));

    _this.expansionIcons_;
    return _this;
  }

  _createClass(MDCExpansionPanel, [{
    key: 'initialize',
    value: function initialize() {
      this.expansionIcons_ = __WEBPACK_IMPORTED_MODULE_3__util__["toArray"](this.root_.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* strings */].EXPANSION_ICON_SELECTOR));
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.expansionIcons_ = [];
    }

    /**
     * Expands the panel.
     */

  }, {
    key: 'expand',
    value: function expand() {
      this.foundation_.expand();
    }

    /**
     * Collapses the panel.
     */

  }, {
    key: 'collapse',
    value: function collapse() {
      this.foundation_.collapse();
    }

    /**
     * @return {!MDCExpansionPanelFoundation}
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */]({
        blur: function blur() {
          return _this2.root_.blur();
        },
        hasClass: function hasClass(className) {
          return _this2.root_.classList.contains(className);
        },
        addClass: function addClass(className) {
          return _this2.root_.classList.add(className);
        },
        removeClass: function removeClass(className) {
          return _this2.root_.classList.remove(className);
        },
        setAttribute: function setAttribute(attributeName, value) {
          return _this2.root_.setAttribute(attributeName, value);
        },
        registerInteractionHandler: function registerInteractionHandler(type, handler) {
          return _this2.root_.addEventListener(type, handler);
        },
        deregisterInteractionHandler: function deregisterInteractionHandler(type, handler) {
          return _this2.root_.removeEventListener(type, handler);
        },
        setExpansionIconInnerHTML: function setExpansionIconInnerHTML(innerHTML) {
          return _this2.expansionIcons_.forEach(function (e) {
            return e.innerHTML = innerHTML.toString();
          });
        },
        notifyChange: function notifyChange() {
          return _this2.emit(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* strings */].CHANGE_EVENT, _this2);
        },
        notifyExpand: function notifyExpand() {
          return _this2.emit(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* strings */].EXPAND_EVENT, _this2);
        },
        notifyCollapse: function notifyCollapse() {
          return _this2.emit(__WEBPACK_IMPORTED_MODULE_0__constants__["c" /* strings */].COLLAPSE_EVENT, _this2);
        },
        setStyle: function setStyle(styleName, value) {
          return _this2.root_.style[styleName] = value;
        },
        getStyle: function getStyle(styleName) {
          return _this2.root_.style[styleName];
        },
        getComputedHeight: function getComputedHeight() {
          return getComputedStyle(_this2.root_).height;
        },
        offsetHeight: function offsetHeight() {
          return _this2.root_.offsetHeight;
        },
        shouldRespondToClickEvent: function shouldRespondToClickEvent(event) {
          return !event.target.classList.contains(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* cssClasses */].NO_CLICK);
        }
      });
    }
  }]);

  return MDCExpansionPanel;
}(__WEBPACK_IMPORTED_MODULE_1__material_base_component__["a" /* default */]);



/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Expansion Panel. Provides an interface for managing
 * - classes
 * - dom
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCExpansionPanelAdapter = function () {
  function MDCExpansionPanelAdapter() {
    _classCallCheck(this, MDCExpansionPanelAdapter);
  }

  _createClass(MDCExpansionPanelAdapter, [{
    key: "blur",
    value: function blur() {}

    /**
     * @param {string} className
     * @return {boolean}
     */

  }, {
    key: "hasClass",
    value: function hasClass(className) {}

    /**
     * @param {string} className
     */

  }, {
    key: "addClass",
    value: function addClass(className) {}

    /**
     * @param {string} className
     */

  }, {
    key: "removeClass",
    value: function removeClass(className) {}

    /**
     * @param {string} attributeName
     * @param {string} value
     */

  }, {
    key: "setAttribute",
    value: function setAttribute(attributeName, value) {}

    /**
     * @param {string} styleName
     * @param {string} value
     */

  }, {
    key: "setStyle",
    value: function setStyle(styleName, value) {}

    /**
     * @param {string} styleName
     * @return {string}
     */

  }, {
    key: "getStyle",
    value: function getStyle(styleName) {}

    /**
     * @return {string}
     */

  }, {
    key: "getComputedHeight",
    value: function getComputedHeight() {}

    /**
     * @return {number}
     */

  }, {
    key: "offsetHeight",
    value: function offsetHeight() {}

    /**
     * @param {string} type
     * @param {!EventListener} handler
     */

  }, {
    key: "registerInteractionHandler",
    value: function registerInteractionHandler(type, handler) {}

    /**
     * @param {string} type
     * @param {!EventListener} handler
     */

  }, {
    key: "deregisterInteractionHandler",
    value: function deregisterInteractionHandler(type, handler) {}
  }, {
    key: "notifyChange",
    value: function notifyChange() {}
  }, {
    key: "notifyExpand",
    value: function notifyExpand() {}
  }, {
    key: "notifyCollapse",
    value: function notifyCollapse() {}

    /**
     * @param {string} innerHTML
     */

  }, {
    key: "setExpansionIconInnerHTML",
    value: function setExpansionIconInnerHTML(innerHTML) {}

    /**
     * @param {Event} event
     * @return {boolean}
     */

  }, {
    key: "shouldRespondToClickEvent",
    value: function shouldRespondToClickEvent(event) {}
  }]);

  return MDCExpansionPanelAdapter;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (MDCExpansionPanelAdapter);

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MDCExpansionPanelAccordion; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__material_base_component__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(31);
/* unused harmony reexport MDCExpansionPanelAccordionFoundation */
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */







/**
 * @extends MDCComponent<!MDCExpansionPanelAccordionFoundation>
 */

var MDCExpansionPanelAccordion = function (_MDCComponent) {
  _inherits(MDCExpansionPanelAccordion, _MDCComponent);

  _createClass(MDCExpansionPanelAccordion, [{
    key: 'expandedChild',


    /**
     * The component instance that is currently expanded.
     * @return {?{collapse: Function}}
     */
    get: function get() {
      return this.foundation_.expandedChild;
    }

    /**
     * @param {...?} args
     */

  }], [{
    key: 'attachTo',

    /**
     * @param {!Element} root
     * @return {!MDCExpansionPanelAccordion}
     */
    value: function attachTo(root) {
      return new MDCExpansionPanelAccordion(root);
    }
  }]);

  function MDCExpansionPanelAccordion() {
    var _ref;

    _classCallCheck(this, MDCExpansionPanelAccordion);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    /**
     * Contains all the expansion panels that are children of the root element,
     * minus those that have the excluded class applied.
     * @private {Array<{collapse: Function, addEventListener: Function, removeEventListener: Function}>}
     */
    var _this = _possibleConstructorReturn(this, (_ref = MDCExpansionPanelAccordion.__proto__ || Object.getPrototypeOf(MDCExpansionPanelAccordion)).call.apply(_ref, [this].concat(args)));

    _this.childrenExpansionPanels_;
    return _this;
  }

  _createClass(MDCExpansionPanelAccordion, [{
    key: 'initialize',
    value: function initialize() {
      this.childrenExpansionPanels_ = __WEBPACK_IMPORTED_MODULE_3__util__["toArray"](this.root_.querySelectorAll(__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* strings */].CHILD_SELECTOR)).filter(function (e) {
        return !e.classList.contains(__WEBPACK_IMPORTED_MODULE_0__constants__["a" /* cssClasses */].EXCLUDED);
      });
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.childrenExpansionPanels_ = [];
    }

    /**
     * @return {!MDCExpansionPanelAccordionFoundation}
     */

  }, {
    key: 'getDefaultFoundation',
    value: function getDefaultFoundation() {
      var _this2 = this;

      return new __WEBPACK_IMPORTED_MODULE_2__foundation__["a" /* default */]({
        notifyChange: function notifyChange() {
          return _this2.emit(__WEBPACK_IMPORTED_MODULE_0__constants__["b" /* strings */].CHANGE_EVENT, _this2);
        },
        getComponentInstanceFromEvent: function getComponentInstanceFromEvent(event) {
          return event.detail;
        },
        registerChildrenExpansionPanelInteractionListener: function registerChildrenExpansionPanelInteractionListener(type, handler) {
          return _this2.childrenExpansionPanels_.forEach(function (panel) {
            return panel.addEventListener(type, handler);
          });
        },
        deregisterChildrenExpansionPanelInteractionListener: function deregisterChildrenExpansionPanelInteractionListener(type, handler) {
          return _this2.childrenExpansionPanels_.forEach(function (panel) {
            return panel.removeEventListener(type, handler);
          });
        }
      });
    }
  }]);

  return MDCExpansionPanelAccordion;
}(__WEBPACK_IMPORTED_MODULE_1__material_base_component__["a" /* default */]);



/***/ }),

/***/ 84:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @license
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* eslint no-unused-vars: [2, {"args": "none"}] */

/**
 * Adapter for MDC Expansion Panel Accordion. Provides an interface for managing
 * - classes
 * - dom
 * - event handlers
 *
 * Additionally, provides type information for the adapter to the Closure
 * compiler.
 *
 * Implement this adapter for your framework of choice to delegate updates to
 * the component in your framework of choice. See architecture documentation
 * for more details.
 * https://github.com/material-components/material-components-web/blob/master/docs/code/architecture.md
 *
 * @record
 */
var MDCExpansionPanelAccordionAdapter = function () {
  function MDCExpansionPanelAccordionAdapter() {
    _classCallCheck(this, MDCExpansionPanelAccordionAdapter);
  }

  _createClass(MDCExpansionPanelAccordionAdapter, [{
    key: "notifyChange",
    value: function notifyChange() {}

    /**
     * @param {!Event} event
     * @return {{collapse: Function}}
     */

  }, {
    key: "getComponentInstanceFromEvent",
    value: function getComponentInstanceFromEvent(event) {}

    /**
     * @param {string} type
     * @param {!EventListener} handler
     */

  }, {
    key: "registerChildrenExpansionPanelInteractionListener",
    value: function registerChildrenExpansionPanelInteractionListener(type, handler) {}

    /**
     * @param {string} type
     * @param {!EventListener} handler
     */

  }, {
    key: "deregisterChildrenExpansionPanelInteractionListener",
    value: function deregisterChildrenExpansionPanelInteractionListener(type, handler) {}
  }]);

  return MDCExpansionPanelAccordionAdapter;
}();

/* unused harmony default export */ var _unused_webpack_default_export = (MDCExpansionPanelAccordionAdapter);

/***/ })

/******/ });
});
//# sourceMappingURL=mdc.expansionPanel.js.map