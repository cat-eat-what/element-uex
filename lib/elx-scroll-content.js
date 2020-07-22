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
/******/ 	return __webpack_require__(__webpack_require__.s = 351);
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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(143);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 143:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'ElxScrollContent',
  componentName: 'ElxScrollContent',

  props: {
    splitType: {
      type: String,
      default: 'row'
    }
  },
  data: function data() {
    return {
      width: 0,
      height: 0,
      overflow: 'hidden',
      innerWidth: 0,
      innerHeight: 0
    };
  },
  computed: {
    size: function size() {
      return {
        width: this.width,
        height: this.height,
        innerWidth: this.innerWidth,
        innerHeight: this.innerHeight
      };
    }
  },
  methods: {
    parseInt: function parseInt(val) {
      val = window.parseInt(val);
      return window.isNaN(val) ? 0 : val;
    },
    parseFloat: function parseFloat(val) {
      val = window.parseFloat(val);
      return window.isNaN(val) ? 0 : val;
    },
    getCss: function getCss(el) {
      var css;
      if (window.getComputedStyle) {
        css = window.getComputedStyle(el);
      } else {
        css = el.currentStyle;
      }
      return css;
    },
    judgeElLocation: function judgeElLocation(el) {
      var css = this.getCss(el);
      if (css.position === 'fixed' || css.position === 'absolute') {
        return false;
      }
      return true;
    },
    getRealHeight: function getRealHeight(el, height) {
      var realHeight = 0;
      var css = this.getCss(el);
      if (css.boxSizing === 'border-box') {
        realHeight = this.parseFloat(height) - this.parseFloat(css.marginTop) - this.parseFloat(css.marginBottom);
      } else {
        realHeight = this.parseFloat(height) - this.parseFloat(css.paddingTop) - this.parseFloat(css.paddingBottom) - this.parseFloat(css.borderTopWidth) - this.parseFloat(css.borderBottomWidth) - this.parseFloat(css.marginTop) - this.parseFloat(css.marginBottom);
      }
      return realHeight;
    },
    getInnerHeight: function getInnerHeight(el) {
      var innerHeight = 0;
      var css = this.getCss(el);
      innerHeight = this.formatVal(css.height, el.offsetHeight, -1) - this.parseFloat(css.paddingTop) - this.parseFloat(css.paddingBottom) - this.parseFloat(css.borderTopWidth) - this.parseFloat(css.borderBottomWidth);
      return innerHeight;
    },
    getOuterHeight: function getOuterHeight(el) {
      var outerHeight = 0;
      var css = this.getCss(el);
      outerHeight = this.parseFloat(css.marginTop) + this.formatVal(css.height, el.offsetHeight, 1) + this.parseFloat(css.marginBottom);
      return outerHeight;
    },
    getRealWidth: function getRealWidth(el, width) {
      var realWidth = 0;
      var css = this.getCss(el);
      if (css.boxSizing === 'border-box') {
        realWidth = this.parseFloat(width) - this.parseFloat(css.marginLeft) - this.parseFloat(css.marginRight);
      } else {
        realWidth = this.parseFloat(width) - this.parseFloat(css.paddingLeft) - this.parseFloat(css.paddingRight) - this.parseFloat(css.borderLeftWidth) - this.parseFloat(css.borderRightWidth) - this.parseFloat(css.marginLeft) - this.parseFloat(css.marginRight);
      }
      return realWidth;
    },
    getOffsetWidth: function getOffsetWidth(el, type) {
      var rect = el.getBoundingClientRect();
      var xOffsetWidth = Math.round(rect.right - rect.left);
      var offsetWidth = el.offsetWidth;
      return type === 'inner' ? Math.min(xOffsetWidth, offsetWidth) : Math.max(xOffsetWidth, offsetWidth);
    },
    getInnerWidth: function getInnerWidth(el) {
      var innerWidth = 0;
      var css = this.getCss(el);
      innerWidth = this.formatVal(css.width, this.getOffsetWidth(el, 'inner'), -1) - this.parseFloat(css.paddingLeft) - this.parseFloat(css.paddingRight) - this.parseFloat(css.borderLeftWidth) - this.parseFloat(css.borderRightWidth);
      return innerWidth;
    },

    getOuterWidth: function getOuterWidth(el) {
      var outerWidth = 0;
      var css = this.getCss(el);
      outerWidth = this.parseFloat(css.marginLeft) + this.formatVal(css.width, this.getOffsetWidth(el, 'outer'), 1) + this.parseFloat(css.marginRight);
      return outerWidth;
    },
    formatVal: function formatVal(realVal, offsetVal, gap) {
      realVal = this.parseFloat(realVal);
      if (realVal.toString().split('.').length > 1) {
        var point = this.parseFloat('0.' + realVal.toString().split('.')[1]);
        if (point >= 0.5) {
          offsetVal = offsetVal - 1 + point;
        } else {
          offsetVal = offsetVal + point;
        }
        return offsetVal;
      }
      return this.parseFloat(offsetVal);
    },
    refreshHeight: function refreshHeight() {
      var self = this;
      var parentEl = this.$el.parentNode;
      if (!parentEl) {
        return;
      }
      var childNodes = parentEl.childNodes;
      var childHeightTotal = 0;
      var parentElWidth = self.getInnerWidth(parentEl);
      var parentElHeight = self.getInnerHeight(parentEl);
      var filterItems = [];
      Object.keys(childNodes).forEach(function (key) {
        var node = childNodes[key];
        if (typeof node.className !== 'string') {
          return false;
        }
        if (node.className.indexOf('elx-scroll-content') > -1) {
          filterItems.push(node);
          return true;
        } else if (self.judgeElLocation(node)) {
          childHeightTotal += self.getOuterHeight(node);
        }
        return false;
      });
      if (filterItems.length > 0) {
        this.width = this.getRealWidth(this.$el, parentElWidth);
        this.height = this.getRealHeight(this.$el, (parentElHeight - childHeightTotal) / filterItems.length);
        this.$nextTick(function () {
          self.innerWidth = self.getInnerWidth(self.$el);
          self.innerHeight = self.getInnerHeight(self.$el);
        });
      }
    },
    refreshWidth: function refreshWidth() {
      var self = this;
      var parentEl = this.$el.parentNode;
      if (!parentEl) {
        return;
      }
      var childNodes = parentEl.childNodes;
      var childWidthTotal = 0;
      var parentElWidth = self.getInnerWidth(parentEl);
      var parentElHeight = self.getInnerHeight(parentEl);
      var filterItems = [];
      Object.keys(childNodes).forEach(function (key) {
        var node = childNodes[key];
        if (typeof node.className !== 'string') {
          return false;
        }
        if (node.className.indexOf('elx-scroll-content') > -1) {
          filterItems.push(node);
          return true;
        } else {
          childWidthTotal += self.getOuterWidth(node);
        }
        return false;
      });
      if (filterItems.length > 0) {
        this.width = this.getRealWidth(this.$el, (parentElWidth - childWidthTotal) / filterItems.length);
        this.height = this.getRealHeight(this.$el, parentElHeight);
        this.$nextTick(function () {
          self.innerWidth = self.getInnerWidth(self.$el);
          self.innerHeight = self.getInnerHeight(self.$el);
        });
      }
    },
    resize: function resize() {
      var self = this;
      this.overflow = 'hidden';
      var parentEl = this.$el.parentNode;
      if (!parentEl) {
        return;
      } else {
        if (parentEl.className.indexOf('elx-row') > -1) {
          this.refreshHeight();
        } else {
          this.refreshWidth();
        }
        this.$nextTick(function () {
          if (_typeof(self.$children) === 'object') {
            self.$children.map(function (item) {
              if (typeof item.resize === 'function') {
                item.resize();
              }
            });
          }
        });
      }
      this.$nextTick(function () {
        self.overflow = 'auto';
      });
    }
  },
  watch: {
    size: function size() {
      this.$emit('resize', this.size);
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.resize);
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.resize);
  }
};

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-scroll-content/src/index.vue?vue&type=template&id=7414d307&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-scroll-content",class:{
    'elx-row': _vm.splitType == 'row',
    'elx-col': _vm.splitType == 'col'
  },style:({
    height: typeof _vm.height == 'number' ? _vm.height + 'px' : _vm.height,
    width: typeof _vm.width == 'number' ? _vm.width + 'px' : _vm.width,
    overflow: _vm.overflow
  })},[_vm._t("default",[_vm._v("无分发内容")])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-scroll-content/src/index.vue?vue&type=template&id=7414d307&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 351:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(352);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_index2.default.install = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

exports.default = _index2.default;

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_7414d307___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(205);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(142);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_7414d307___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_7414d307___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });