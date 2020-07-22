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
/******/ 	return __webpack_require__(__webpack_require__.s = 373);
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

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(173);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 173:
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
//
//

exports.default = {
  name: 'ElxRowResizeLayout',
  componentName: 'ElxRowResizeLayout',
  props: {
    height: {
      type: Number,
      default: 300
    },
    maxHeight: {
      type: Number,
      default: 500
    },
    defaultTop: {
      type: Number
    },
    topVisible: {
      type: Boolean,
      default: true
    },
    bottomVisible: {
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
    var splitW = this.splitType === 'wide' ? 12 : 1;
    return {
      test: null,
      currentHeight: this.height,
      splitTop: this.defaultTop || window.parseInt((this.height - splitW) * 0.5),
      originPageY: 0,
      prePageY: 0,
      mouseEnter: false
    };
  },
  computed: {
    splitW: function splitW() {
      return this.splitType === 'wide' ? 12 : 1;
    },
    single: function single() {
      return !this.topVisible && this.bottomVisible && this.splitVisible || this.topVisible && !this.bottomVisible && this.splitVisible;
    },
    resizeSplitTop: function resizeSplitTop() {
      var top = this.splitTop;
      if (this.mouseEnter && this.splitType === 'narrow') {
        top = top - 5;
      }
      return top + 'px';
    },
    resizeSplitBottom: function resizeSplitBottom() {
      var bottom = this.currentHeight - this.splitTop - this.splitW;
      if (this.mouseEnter && this.splitType === 'narrow') {
        bottom = bottom - 5;
      }
      return bottom + 'px';
    }
  },
  methods: {
    splitDown: function splitDown(e) {
      this.addEvent(document.body, 'mousedown', this.preventSelect);
      this.addCursorStyle();
      this.addBodyEvent();
      this.originPageY = e.pageY;
      this.prePageY = e.pageY;
      this.mouseDown = true;
    },
    splitMove: function splitMove(e) {
      if (this.originPageY !== 0 || this.mouseDown && e.pageY - this.prePageY > 0) {
        this.$emit('drag-start', this.currentHeight, this.splitTop);
        var gap = e.pageY - this.originPageY;
        var top = this.splitTop + gap;
        if (this.single) {
          gap = this.topVisible ? gap : -gap;
          if (this.currentHeight + gap <= this.splitW) {
            this.currentHeight = this.splitW;
            this.originPageY = 0;
          } else if (this.currentHeight + gap >= this.maxHeight) {
            this.currentHeight = this.maxHeight;
            this.originPageY = 0;
          } else {
            this.currentHeight = this.currentHeight + gap;
            this.originPageY = e.pageY;
          }
        } else {
          if (top <= 0) {
            this.splitTop = 0;
          } else if (top >= this.currentHeight - this.splitW) {
            this.splitTop = this.currentHeight - this.splitW;
          } else {
            this.splitTop = top;
          }
          this.originPageY = e.pageY;
        }
        e.preventDefault();
      }
      this.prePageY = e.pageY;
    },
    splitUp: function splitUp(e) {
      this.removeEvent(document.body, 'mousedown', this.preventSelect);
      this.removeCursorStyle();
      this.removeBodyEvent();
      this.$emit('drag-end', this.currentHeight, this.splitTop);
      this.originPageY = 0;
      this.mouseDown = false;
    },
    splitLeave: function splitLeave(e) {
      if (this.single) {
        this.splitMove(e);
      } else {
        this.removeEvent(document.body, 'mousedown', this.preventSelect);
        this.removeCursorStyle();
        this.removeBodyEvent();
        this.$emit('drag-end', this.currentHeight, this.splitTop);
        this.originPageY = 0;
        this.mouseDown = false;
      }
      e.preventDefault();
    },
    resizeByVisible: function resizeByVisible() {
      if (!this.topVisible) {
        this.splitTop = 0;
      }
      if (!this.bottomVisible) {
        this.splitTop = this.splitVisible ? this.currentHeight - this.splitW : this.currentHeight;
      }
    },
    addEvent: function addEvent(element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false);
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, function () {
          handler.call(element);
        });
      } else {
        element['on' + type] = handler;
      }
    },
    removeEvent: function removeEvent(element, type, handler) {
      if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
      } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
      } else {
        element['on' + type] = null;
      }
    },
    preventSelect: function preventSelect(e) {
      e.preventDefault();
      return false;
    },
    addCursorStyle: function addCursorStyle() {
      document.body.style.cursor = 'row-resize';
    },
    removeCursorStyle: function removeCursorStyle() {
      document.body.style.cursor = 'auto';
    },
    addBodyEvent: function addBodyEvent() {
      if (this.single) {
        this.addEvent(document.body, 'mouseup', this.splitUp);
        this.addEvent(document.body, 'mousemove', this.splitLeave);
        this.addEvent(document.body, 'mouseleave', this.splitUp);
      }
    },
    removeBodyEvent: function removeBodyEvent() {
      this.removeEvent(document.body, 'mouseup', this.splitUp);
      this.removeEvent(document.body, 'mousemove', this.splitLeave);
      this.removeEvent(document.body, 'mouseleave', this.splitUp);
    },
    splitMouseEnter: function splitMouseEnter() {
      this.mouseEnter = true;
    },
    splitMouseLeave: function splitMouseLeave() {
      this.mouseEnter = false;
    }
  },
  watch: {
    splitTop: function splitTop(val, oldVal) {
      this.$emit('resize', this.currentHeight, this.splitTop);
    },
    height: function height(val, oldVal) {
      this.currentHeight = val;
      if (!this.topVisible || !this.bottomVisible) {
        this.resizeByVisible();
      } else {
        if (oldVal === 0) {
          this.splitTop = this.defaultTop || window.parseInt((val - this.splitW) * 0.5);
        } else {
          this.splitTop = this.defaultTop || val * this.splitTop / oldVal;
        }
      }
      this.$emit('resize', this.currentHeight, this.splitTop);
    },
    currentHeight: function currentHeight(val) {
      this.$emit('update:height', val);
    },
    topVisible: function topVisible(val, oldVal) {
      this.resizeByVisible();
    },
    bottomVisible: function bottomVisible(val, oldVal) {
      this.resizeByVisible();
    },
    splitVisible: function splitVisible(val, oldVal) {
      if (!oldVal) {
        if (this.topVisible && this.bottomVisible && val) {
          this.splitTop = this.defaultTop || window.parseInt((this.currentHeight - this.splitW) * 0.5);
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
    this.removeEvent(document.body, 'mousedown', this.preventSelect);
  }
};

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-row-resize-layout/src/index.vue?vue&type=template&id=89a673c4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-row-resize-layout",style:({height: _vm.currentHeight + 'px'}),on:{"mouseup":_vm.splitUp,"mouseleave":_vm.splitLeave,"mousemove":_vm.splitMove}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.topVisible),expression:"topVisible"}],staticClass:"elx-layout-top",style:({bottom: _vm.currentHeight - _vm.splitTop + 'px'})},[_vm._t("top")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.splitVisible),expression:"splitVisible"}],staticClass:"row-resize-split",class:_vm.splitType,style:({
      top: _vm.resizeSplitTop,
      bottom: _vm.resizeSplitBottom
    }),on:{"mousedown":_vm.splitDown,"mouseenter":_vm.splitMouseEnter,"mouseleave":_vm.splitMouseLeave}},[(_vm.splitType == 'wide')?_c('span',{staticClass:"uex-icon-more-row"}):_vm._e()]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.bottomVisible),expression:"bottomVisible"}],staticClass:"elx-layout-bottom",style:({
      top: _vm.splitVisible ? _vm.splitTop + _vm.splitW + 'px' : _vm.splitTop + 'px'
    })},[_vm._t("bottom")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-row-resize-layout/src/index.vue?vue&type=template&id=89a673c4&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(374);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_index2.default.install = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

exports.default = _index2.default;

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_89a673c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(197);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(172);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_89a673c4___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_89a673c4___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });