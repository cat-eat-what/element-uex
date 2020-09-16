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
/******/ 	return __webpack_require__(__webpack_require__.s = 365);
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

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(169);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 169:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
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
//
//
//

exports.default = {
  name: 'ElxColResizeLayout',
  componentName: 'ElxColResizeLayout',
  props: {
    width: {
      type: Number,
      default: 300
    },
    maxWidth: {
      type: Number,
      default: 500
    },
    defaultLeft: {
      type: Number
    },
    leftVisible: {
      type: Boolean,
      default: true
    },
    rightVisible: {
      type: Boolean,
      default: true
    },
    splitVisible: {
      type: Boolean,
      default: true
    },
    splitType: {
      type: String,
      default: 'wide'
    }
  },
  data: function data() {
    var splitW = this.splitType === 'wide' ? 10 : 1;
    return {
      currentWidth: this.width,
      splitLeft: this.defaultLeft || window.parseInt((this.width - splitW) * 0.5),
      originPageX: 0,
      prePageX: 0,
      mouseEnter: false
    };
  },

  computed: {
    splitW: function splitW() {
      return this.splitType === 'wide' ? 10 : 1;
    },
    single: function single() {
      return !this.leftVisible && this.rightVisible && this.splitVisible || this.leftVisible && !this.rightVisible && this.splitVisible;
    },
    resizeSplitLeft: function resizeSplitLeft() {
      var left = this.splitLeft;
      if (this.mouseEnter && this.splitType === 'narrow') {
        left = left - 5;
      }
      return left + 'px';
    },
    resizeSplitRight: function resizeSplitRight() {
      var right = this.currentWidth - this.splitLeft - this.splitW;
      if (this.mouseEnter && this.splitType === 'narrow') {
        right = right - 5;
      }
      return right + 'px';
    }
  },
  methods: {
    splitDown: function splitDown(e) {
      document.body.addEventListener('mousedown', this.preventSelect);
      this.addCursorStyle();
      this.addBodyEvent();
      this.originPageX = e.pageX;
      this.$emit('drag-start', e);
      this.mouseDown = true;
    },
    splitMove: function splitMove(e) {
      if (this.originPageX !== 0) {
        var gap = e.pageX - this.originPageX;
        var left = this.splitLeft + gap;
        if (this.single) {
          gap = this.leftVisible ? gap : -gap;
          if (this.currentWidth + gap <= this.splitW) {
            this.currentWidth = this.splitW;
            this.originPageX = 0;
          } else if (this.currentWidth + gap >= this.maxWidth) {
            this.currentWidth = this.maxWidth;
            this.originPageX = 0;
          } else {
            this.currentWidth = this.currentWidth + gap;
            this.originPageX = e.pageX;
          }
        } else {
          if (left <= 0) {
            this.splitLeft = 0;
          } else if (left >= this.currentWidth - this.splitW) {
            this.splitLeft = this.currentWidth - this.splitW;
          } else {
            this.splitLeft = left;
          }
          this.originPageX = e.pageX;
        }
        e.preventDefault();
      }
      this.prePageX = e.pageX;
    },
    splitUp: function splitUp(e) {
      document.body.removeEventListener('mousedown', this.preventSelect);
      this.removeCursorStyle();
      this.removeBodyEvent();
      this.originPageX = 0;
      this.$emit('drag-end', e);
      this.mouseDown = false;
    },
    splitLeave: function splitLeave(e) {
      if (this.single) {
        this.splitMove(e);
      } else {
        document.body.removeEventListener('mousedown', this.preventSelect);
        this.removeCursorStyle();
        this.removeBodyEvent();
        this.originPageX = 0;
        this.$emit('drag-end', e);
        this.mouseDown = false;
      }
      e.preventDefault();
    },
    resizeByVisible: function resizeByVisible() {
      if (!this.leftVisible) {
        this.splitLeft = 0;
      }
      if (!this.rightVisible) {
        this.splitLeft = this.splitVisible ? this.currentWidth - this.splitW : this.currentWidth;
      }
    },
    preventSelect: function preventSelect(e) {
      e.preventDefault();
      return false;
    },
    addCursorStyle: function addCursorStyle() {
      document.body.style.cursor = 'col-resize';
    },
    removeCursorStyle: function removeCursorStyle() {
      document.body.style.cursor = 'auto';
    },
    addBodyEvent: function addBodyEvent() {
      if (this.single) {
        document.body.addEventListener('mouseup', this.splitUp);
        document.body.addEventListener('mousemove', this.splitLeave);
        document.body.addEventListener('mouseleave', this.splitUp);
      }
    },
    removeBodyEvent: function removeBodyEvent() {
      document.body.removeEventListener('mouseup', this.splitUp);
      document.body.removeEventListener('mousemove', this.splitLeave);
      document.body.removeEventListener('mouseleave', this.splitUp);
    },
    splitMouseEnter: function splitMouseEnter() {
      this.mouseEnter = true;
    },
    splitMouseLeave: function splitMouseLeave() {
      this.mouseEnter = false;
    }
  },
  watch: {
    splitLeft: function splitLeft(val, oldVal) {
      this.$emit('resize', this.currentWidth, this.splitLeft);
    },
    width: function width(val, oldVal) {
      this.currentWidth = val;
      if (!this.leftVisible || !this.rightVisible) {
        this.resizeByVisible();
      } else {
        if (oldVal === 0) {
          this.splitLeft = this.defaultLeft || window.parseInt((val - this.splitW) * 0.5);
        } else {
          this.splitLeft = this.defaultLeft || val * this.splitLeft / oldVal;
        }
      }
      this.$emit('resize', this.currentWidth, this.splitLeft);
    },
    currentWidth: function currentWidth(val) {
      this.$emit('update:width', val);
    },
    leftVisible: function leftVisible(val, oldVal) {
      this.resizeByVisible();
    },
    rightVisible: function rightVisible(val, oldVal) {
      this.resizeByVisible();
    },
    splitVisible: function splitVisible(val, oldVal) {
      if (!oldVal) {
        if (this.leftVisible && this.rightVisible && val) {
          this.splitLeft = this.defaultLeft || window.parseInt((this.currentWidth - this.splitW) * 0.5);
        }
      }
    }
  },
  created: function created() {
    this.resizeByVisible();
  },
  mounted: function mounted() {},
  beforeDestroy: function beforeDestroy() {
    this.removeBodyEvent();
    document.body.removeEventListener('mousedown', this.preventSelect);
  }
};

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-col-resize-layout/src/index.vue?vue&type=template&id=f3f6812e&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-col-resize-layout",style:({width: _vm.currentWidth + 'px'}),on:{"mouseup":_vm.splitUp,"mouseleave":_vm.splitLeave,"mousemove":_vm.splitMove}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.leftVisible),expression:"leftVisible"}],staticClass:"elx-layout-left",style:({right: _vm.currentWidth - _vm.splitLeft + 'px'})},[_vm._t("left")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.splitVisible),expression:"splitVisible"}],staticClass:"col-resize-split",class:_vm.splitType,style:({
      left: _vm.resizeSplitLeft,
      right: _vm.resizeSplitRight
    }),on:{"mousedown":_vm.splitDown,"mouseenter":_vm.splitMouseEnter,"mouseleave":_vm.splitMouseLeave}},[(_vm.splitType == 'wide')?_c('span',{staticClass:"uex-icon-more-col"}):_vm._e()]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.rightVisible),expression:"rightVisible"}],staticClass:"elx-layout-right",style:({left: _vm.splitVisible ? _vm.splitLeft + _vm.splitW + 'px' : _vm.splitLeft + 'px'})},[_vm._t("right")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-col-resize-layout/src/index.vue?vue&type=template&id=f3f6812e&


/***/ }),

/***/ 365:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(366);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_index2.default.install = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

exports.default = _index2.default;

/***/ }),

/***/ 366:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_f3f6812e___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(194);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(168);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_f3f6812e___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_f3f6812e___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });