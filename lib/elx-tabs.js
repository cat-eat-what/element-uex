module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 300);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(101);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tabBar = __webpack_require__(303);

var _tabBar2 = _interopRequireDefault(_tabBar);

var _resizeEvent = __webpack_require__(23);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

exports.default = {
  name: 'TabNav',

  components: {
    TabBar: _tabBar2.default
  },

  props: {
    panes: Array,
    currentName: String,
    editable: Boolean,
    onTabClick: {
      type: Function,
      default: noop
    },
    onTabContextmenu: {
      type: Function,
      default: noop
    },
    onTabRemove: {
      type: Function,
      default: noop
    },
    type: String
  },

  data: function data() {
    return {
      scrollable: false,
      navStyle: {
        transform: ''
      }
    };
  },


  methods: {
    scrollPrev: function scrollPrev() {
      var containerWidth = this.$refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();

      if (!currentOffset) return;

      var newOffset = currentOffset > containerWidth ? currentOffset - containerWidth : 0;

      this.setOffset(newOffset);
    },
    scrollNext: function scrollNext() {
      var navWidth = this.$refs.nav.offsetWidth;
      var containerWidth = this.$refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();

      if (navWidth - currentOffset <= containerWidth) return;

      var newOffset = navWidth - currentOffset > containerWidth * 2 ? currentOffset + containerWidth : navWidth - containerWidth;

      this.setOffset(newOffset);
    },
    scrollToActiveTab: function scrollToActiveTab() {
      if (!this.scrollable) return;
      var nav = this.$refs.nav;
      var activeTab = this.$el.querySelector('.is-active');
      var navScroll = this.$refs.navScroll;
      if (!activeTab) {
        return;
      }
      var activeTabBounding = activeTab.getBoundingClientRect();
      var navScrollBounding = navScroll.getBoundingClientRect();
      var navBounding = nav.getBoundingClientRect();
      var currentOffset = this.getCurrentScrollOffset();
      var newOffset = currentOffset;

      if (activeTabBounding.left < navScrollBounding.left) {
        newOffset = currentOffset - (navScrollBounding.left - activeTabBounding.left);
      }
      if (activeTabBounding.right > navScrollBounding.right) {
        newOffset = currentOffset + activeTabBounding.right - navScrollBounding.right;
      }
      if (navBounding.right < navScrollBounding.right) {
        newOffset = nav.offsetWidth - navScrollBounding.width;
      }
      this.setOffset(Math.max(newOffset, 0));
    },
    getCurrentScrollOffset: function getCurrentScrollOffset() {
      var navStyle = this.navStyle;

      return navStyle.transform ? Number(navStyle.transform.match(/translateX\(-(\d+(\.\d+)*)px\)/)[1]) : 0;
    },
    setOffset: function setOffset(value) {
      this.navStyle.transform = 'translateX(-' + value + 'px)';
    },
    update: function update() {
      var navWidth = this.$refs.nav.offsetWidth;
      var containerWidth = this.$refs.navScroll.offsetWidth;
      var currentOffset = this.getCurrentScrollOffset();

      if (containerWidth < navWidth) {
        var _currentOffset = this.getCurrentScrollOffset();
        this.scrollable = this.scrollable || {};
        this.scrollable.prev = _currentOffset;
        this.scrollable.next = _currentOffset + containerWidth < navWidth;
        if (navWidth - _currentOffset < containerWidth) {
          this.setOffset(navWidth - containerWidth);
        }
      } else {
        this.scrollable = false;
        if (currentOffset > 0) {
          this.setOffset(0);
        }
      }
    }
  },

  updated: function updated() {
    this.update();
  },
  render: function render(h) {
    var type = this.type,
        panes = this.panes,
        editable = this.editable,
        onTabClick = this.onTabClick,
        onTabContextmenu = this.onTabContextmenu,
        onTabRemove = this.onTabRemove,
        navStyle = this.navStyle,
        scrollable = this.scrollable,
        scrollNext = this.scrollNext,
        scrollPrev = this.scrollPrev;


    var scrollBtn = scrollable ? [h(
      'span',
      { 'class': ['el-tabs__nav-prev', scrollable.prev ? '' : 'is-disabled'], on: {
          'click': scrollPrev
        }
      },
      [h('i', { 'class': 'el-icon-arrow-left' })]
    ), h(
      'span',
      { 'class': ['el-tabs__nav-next', scrollable.next ? '' : 'is-disabled'], on: {
          'click': scrollNext
        }
      },
      [h('i', { 'class': 'el-icon-arrow-right' })]
    )] : null;

    var tabs = this._l(panes, function (pane, index) {
      var tabName = pane.name || pane.index || index;
      var closable = pane.isClosable || editable;

      pane.index = '' + index;

      var btnClose = closable ? h('span', { 'class': 'uex-icon-cross', on: {
          'click': function click(ev) {
            onTabRemove(pane, ev);
          }
        }
      }) : null;

      var tabLabelContent = pane.$slots.label || pane.label;
      var tabLabel = pane.label;
      return h(
        'el-tooltip',
        { 'class': 'item', attrs: { effect: 'dark', content: tabLabel, placement: 'bottom' }
        },
        [h(
          'div',
          {
            'class': {
              'el-tabs__item': true,
              'is-active': pane.active,
              'is-disabled': pane.disabled,
              'is-closable': closable
            },
            ref: 'tabs',
            refInFor: true,
            on: {
              'contextmenu': function contextmenu(ev) {
                onTabContextmenu(pane, tabName, ev);
              },
              'click': function click(ev) {
                onTabClick(pane, tabName, ev);
              }
            }
          },
          [h('span', [tabLabelContent]), btnClose]
        )]
      );
    });
    return h(
      'div',
      { 'class': ['el-tabs__nav-wrap', scrollable ? 'is-scrollable' : ''] },
      [scrollBtn, h(
        'div',
        { 'class': ['el-tabs__nav-scroll'], ref: 'navScroll' },
        [h(
          'div',
          { 'class': 'el-tabs__nav', ref: 'nav', style: navStyle },
          [!type ? h('tab-bar', {
            attrs: { tabs: panes }
          }) : null, tabs]
        )]
      )]
    );
  },
  mounted: function mounted() {
    (0, _resizeEvent.addResizeListener)(this.$el, this.update);
  },
  beforeDestroy: function beforeDestroy() {
    if (this.$el && this.update) (0, _resizeEvent.removeResizeListener)(this.$el, this.update);
  }
};

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(103);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//

exports.default = {
  name: 'TabBar',

  props: {
    tabs: Array
  },

  computed: {
    barStyle: {
      cache: false,
      get: function get() {
        var _this = this;

        if (!this.$parent.$refs.tabs) return {};
        var style = {};
        var offset = 0;
        var tabWidth = 0;

        this.tabs.every(function (tab, index) {
          var $el = _this.$parent.$refs.tabs[index];
          if (!$el) {
            return false;
          }

          if (!tab.active) {
            offset += $el.clientWidth;
            return true;
          } else {
            tabWidth = $el.clientWidth;
            return false;
          }
        });

        var transform = 'translateX(' + offset + 'px)';
        style.width = tabWidth + 'px';
        style.transform = transform;
        style.msTransform = transform;
        style.webkitTransform = transform;

        return style;
      }
    }
  }
};

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/resize-event");

/***/ }),

/***/ 241:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-tabs/src/tab-bar.vue?vue&type=template&id=d9adba10&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-tabs__active-bar",style:(_vm.barStyle)})}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-tabs/src/tab-bar.vue?vue&type=template&id=d9adba10&


/***/ }),

/***/ 300:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tabs = __webpack_require__(301);

var _tabs2 = _interopRequireDefault(_tabs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_tabs2.default.install = function (Vue) {
  Vue.component(_tabs2.default.name, _tabs2.default);
};

exports.default = _tabs2.default;

/***/ }),

/***/ 301:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 302:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _tab_nav_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 303:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tab_bar_vue_vue_type_template_id_d9adba10___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(241);
/* harmony import */ var _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(102);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _tab_bar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tab_bar_vue_vue_type_template_id_d9adba10___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _tab_bar_vue_vue_type_template_id_d9adba10___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 304:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var getBrowser = function getBrowser() {
  var userAgent = navigator.userAgent;
  var isOpera = userAgent.indexOf('Opera') > -1;
  if (isOpera) {
    return 'Opera';
  };
  if (userAgent.indexOf('Firefox') > -1) {
    return 'FF';
  }
  if (userAgent.indexOf('Chrome') > -1) {
    return 'Chrome';
  }
  if (userAgent.indexOf('Safari') > -1) {
    return 'Safari';
  }
  if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
    return 'IE';
  };
};
var handleFullScreen = function handleFullScreen(element) {
  if (element.requestFullScreen) {
    element.requestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullscreen();
  }
};
var handleExitFullscreen = function handleExitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
var originStyle = {
  fullScreen: {},
  maximize: {}
};
var setOriginStyle = function setOriginStyle(dom, iframe, type) {
  originStyle[type] = {
    position: dom.style.position,
    top: dom.style.top,
    left: dom.style.left,
    marginTop: dom.style.marginTop,
    marginLeft: dom.style.marginLeft,
    zIndex: dom.style.zIndex,
    width: dom.style.width,
    height: dom.style.height
  };
};
var fullScreen = exports.fullScreen = function fullScreen(dom, iframe) {
  setOriginStyle(dom, iframe, 'fullScreen');
  if (getBrowser() === 'Chrome') {
    handleFullScreen(iframe);
    return;
  }
};
var maximize = exports.maximize = function maximize(dom, iframe) {
  setOriginStyle(dom, iframe, 'maximize');
  dom.style.position = 'fixed';
  dom.style.zIndex = '1000';
  dom.style.top = '0px';
  dom.style.left = '0px';
  dom.style.marginTop = '0px';
  dom.style.marginLeft = '0px';
  dom.style.width = '100%';
  dom.style.height = '100%';
};
var restore = exports.restore = function restore(dom, iframe, type) {
  if (getBrowser() === 'Chrome') {
    handleExitFullscreen();
  }
  var oldStyle = originStyle[type];
  dom.style.position = oldStyle.position;
  dom.style.zIndex = oldStyle.zIndex;
  dom.style.top = oldStyle.top;
  dom.style.left = oldStyle.left;
  dom.style.marginTop = oldStyle.marginTop;
  dom.style.marginLeft = oldStyle.marginLeft;
  dom.style.width = oldStyle.width;
  dom.style.height = oldStyle.height;
};

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cMessage = exports.cMessage = function (event) {
  var interval_id = void 0;
  var last_hash = void 0;
  var cache_bust = 1;
  var attached_callback = void 0;
  return {
    postMessage: function postMessage(message, target_url, target) {
      if (!target_url) {
        return;
      }
      target = target || parent;
      if (window['postMessage']) {
        target['postMessage'](message, target_url.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
      } else if (target_url) {
        target.location = target_url.replace(/#.*$/, '') + '#' + +new Date() + cache_bust++ + '&' + message;
      }
    },
    receiveMessage: function receiveMessage(callback, source_origin) {
      if (window['postMessage']) {
        if (callback) {
          attached_callback = function attached_callback(e) {
            if (typeof source_origin === 'string' && e.origin !== source_origin || Object.prototype.toString.call(source_origin) === '[object Function]' && source_origin(e.origin) === !1) {
              return !1;
            }
            callback(e);
          };
        }
        if (window['addEventListener']) {
          window[callback ? 'addEventListener' : 'removeEventListener']('message', attached_callback, !1);
        } else {
          window[callback ? 'attachEvent' : 'detachEvent']('onmessage', attached_callback);
        }
      } else {
        interval_id && clearInterval(interval_id);
        interval_id = null;
        if (callback) {
          interval_id = setInterval(function () {
            var hash = document.location.hash;
            var re = /^#?\d+&/;
            if (hash !== last_hash && re.test(hash)) {
              last_hash = hash;
              callback({ data: hash.replace(re, '') });
            }
          }, 100);
        }
      }
    },
    bindReceiveMessage: function bindReceiveMessage(attr) {
      var isExecFunc = null;
      var base = {};
      if ((typeof attr === 'undefined' ? 'undefined' : _typeof(attr)) === 'object' && !Array.isArray(attr)) {
        isExecFunc = attr.isExecFunc;
        base = attr.base;
      }
      this.receiveMessage(function (message) {
        if (_typeof(message.data) === 'object' && !Array.isArray(message.data)) {
          if (isExecFunc) {
            if (message.data.func) {
              if (message.data.base) {
                if (message.data.base === 'window') {
                  if (window[message.data.func]) {
                    window[message.data.func](message.data.para);
                  }
                } else {
                  if (base[message.data.func]) {
                    base[message.data.func](message.data.para);
                  }
                }
              }
            }
          }
        }
      });
    }
  };
}();

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tabs_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 99:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _tabNav = __webpack_require__(302);

var _tabNav2 = _interopRequireDefault(_tabNav);

var _util = __webpack_require__(4);

var _process = __webpack_require__(304);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElxTabs',

  components: {
    TabNav: _tabNav2.default
  },

  props: {
    type: String,
    activeName: String,
    closable: Boolean,
    addable: Boolean,
    value: {},
    editable: Boolean
  },

  data: function data() {
    return {
      currentName: this.value || this.activeName,
      panes: []
    };
  },


  watch: {
    activeName: function activeName(value) {
      this.setCurrentName(value);
    },
    value: function value(_value) {
      this.setCurrentName(_value);
    },
    currentName: function currentName(value) {
      var _this = this;

      if (this.$refs.nav) {
        this.$nextTick(function (_) {
          _this.$refs.nav.scrollToActiveTab();
        });
      }
    }
  },

  methods: {
    calcPaneInstances: function calcPaneInstances() {
      var _this2 = this;

      var isForceUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.$slots.default) {
        var paneSlots = this.$slots.default.filter(function (vnode) {
          return vnode.tag && vnode.componentOptions && vnode.componentOptions.Ctor.options.name === 'ElTabPane';
        });
        // update indeed
        var panes = paneSlots.map(function (_ref) {
          var componentInstance = _ref.componentInstance;
          return componentInstance;
        });
        var panesChanged = !(panes.length === this.panes.length && panes.every(function (pane, index) {
          return pane === _this2.panes[index];
        }));
        if (isForceUpdate || panesChanged) {
          this.panes = panes;
        }
      } else if (this.panes.length !== 0) {
        this.panes = [];
      }
    },
    handleTabClick: function handleTabClick(tab, tabName, event) {
      if (tab.disabled) return;
      this.setCurrentName(tabName);
      this.$emit('tab-click', tab, event);
    },
    handleTabRemove: function handleTabRemove(pane, ev) {
      if (pane.disabled) return;
      ev.stopPropagation();
      this.$emit('edit', pane.name, 'remove');
      this.$emit('tab-remove', pane.name);
    },
    handleTabContextmenu: function handleTabContextmenu(tab, tabName, event) {
      this.$emit('tab-contextmenu', tab, tabName, event);
    },
    handleTabAdd: function handleTabAdd() {
      this.$emit('edit', null, 'add');
      this.$emit('tab-add');
    },
    setCurrentName: function setCurrentName(value) {
      var _this3 = this;

      var changeCurrentName = function changeCurrentName() {
        _this3.currentName = value;
        _this3.$emit('input', value);
      };
      if (this.currentName !== value && this.beforeLeave) {
        var before = this.beforeLeave(value, this.currentName);
        if (before && before.then) {
          before.then(function () {
            changeCurrentName();
            _this3.$refs.nav && _this3.$refs.nav.removeFocus();
          }, function () {
            // https://github.com/ElemeFE/element/pull/14816
            // ignore promise rejection in `before-leave` hook
          });
        } else if (before !== false) {
          changeCurrentName();
        }
      } else {
        changeCurrentName();
      }
    },
    addPanes: function addPanes(item) {
      var index = this.$slots.default.indexOf(item.$vnode);
      this.panes.splice(index, 0, item);
    },
    removePanes: function removePanes(item) {
      var panes = this.panes;
      var index = panes.indexOf(item);
      if (index > -1) {
        panes.splice(index, 1);
      }
    }
  },
  render: function render(h) {
    var type = this.type,
        handleTabClick = this.handleTabClick,
        handleTabRemove = this.handleTabRemove,
        handleTabContextmenu = this.handleTabContextmenu,
        handleTabAdd = this.handleTabAdd,
        currentName = this.currentName,
        panes = this.panes,
        editable = this.editable,
        addable = this.addable;


    var newButton = editable || addable ? h(
      'span',
      {
        'class': 'el-tabs__new-tab',
        on: {
          'click': handleTabAdd
        }
      },
      [h('i', { 'class': 'el-icon-plus' })]
    ) : null;

    var navData = {
      props: {
        currentName: currentName,
        onTabClick: handleTabClick,
        onTabRemove: handleTabRemove,
        onTabContextmenu: handleTabContextmenu,
        editable: editable,
        type: type,
        panes: panes
      },
      ref: 'nav'
    };

    return h(
      'div',
      { 'class': {
          'el-tabs': true,
          'el-tabs--card': type === 'card',
          'el-tabs--border-card': type === 'border-card'
        } },
      [h(
        'div',
        { 'class': 'el-tabs__header' },
        [newButton, this.$slots.title, h('tab-nav', navData), this.$slots.extra]
      ), h(
        'div',
        { 'class': 'el-tabs__content' },
        [this.$slots.default]
      )]
    );
  },
  created: function created() {
    if (!this.currentName) {
      this.setCurrentName('0');
    }
    _util.cMessage.receiveMessage(function (message) {
      if (_typeof(message.data) === 'object' && !Array.isArray(message.data)) {
        if ('screen' in message.data) {
          var frame = message.source.frameElement;
          if (message.data.screen === 'fullScreen') {
            (0, _process.fullScreen)(frame, frame);
          } else if (message.data.screen === 'maximize') {
            (0, _process.maximize)(frame, frame);
          } else {
            (0, _process.restore)(frame, frame, message.data.type);
          }
          if (window.top !== window.self) {
            _util.cMessage.postMessage(message.data, window.location.origin, parent);
          }
        }
      }
    }, window.location.origin);
    if (!this.currentName) {
      this.setCurrentName('0');
    }

    this.$on('tab-nav-update', this.calcPaneInstances.bind(null, true));
  },
  mounted: function mounted() {
    this.calcPaneInstances();
  },
  updated: function updated() {
    this.calcPaneInstances();
  }
};

/***/ })

/******/ });