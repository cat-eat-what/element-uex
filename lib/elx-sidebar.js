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
/******/ 	return __webpack_require__(__webpack_require__.s = 289);
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

/***/ 219:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-sidebar/src/sidebar.vue?vue&type=template&id=05831aaf&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-siderbar",class:_vm.currentShow?'show':'hide'},[_c('div',{staticClass:"elx-siderbar-content"},[_c('div',{staticClass:"elx-sidebar-intro"},[_c('div',{staticClass:"elx-siderbar-title",domProps:{"innerHTML":_vm._s(_vm.title)}}),_c('el-tooltip',{staticClass:"item",attrs:{"effect":"light","placement":"right","open-delay":1000,"content":_vm.descr}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.descr!=''),expression:"descr!=''"}],staticClass:"elx-siderbar-descr",domProps:{"innerHTML":_vm._s(_vm.getCurDesc(_vm.descr))}})]),_c('div',{staticClass:"separate"})],1),_c('elx-menu',{style:({height: _vm.height}),attrs:{"menu-data":_vm.menuData,"menu-active":_vm.menuActive,"menu-open":_vm.menuOpen,"type":'outer',"guide-arrow-show":_vm.guideArrowShow,"action-data":_vm.actionData},on:{"contextmenu-action":_vm.contextmenuAction,"menu-change":_vm.menuChange}})],1),_c('div',{staticClass:"elx-sidebar-operate",on:{"click":_vm.operateSidebar}},[_c('div',{staticClass:"elx-sidebar-operate-back"}),_c('span',{staticClass:"uex-icon-d-arrow-left"})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-sidebar/src/sidebar.vue?vue&type=template&id=05831aaf&


/***/ }),

/***/ 289:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _sidebar = __webpack_require__(290);

var _sidebar2 = _interopRequireDefault(_sidebar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_sidebar2.default.install = function (Vue) {
  Vue.component(_sidebar2.default.name, _sidebar2.default);
};

exports.default = _sidebar2.default;

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sidebar_vue_vue_type_template_id_05831aaf___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(219);
/* harmony import */ var _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(87);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _sidebar_vue_vue_type_template_id_05831aaf___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _sidebar_vue_vue_type_template_id_05831aaf___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cMessage = exports.cMessage = function (event) {
  var interval_id;
  var last_hash;
  var cache_bust = 1;
  var attached_callback;
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

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_sidebar_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 88:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //
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
//
//
//
//
//
//

var _util = __webpack_require__(4);

exports.default = {
  name: 'ElxSidebar',
  componentName: 'ElxSidebar',

  props: {
    isPost: {
      type: Boolean,
      default: false
    },
    message: {
      type: [Array, Object, Number, String],
      default: ''
    },
    locationOrigin: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '暂无'
    },
    descr: {
      type: String,
      default: ''
    },
    menuData: {
      type: Array,
      default: []
    },
    menuActive: {
      type: String,
      default: ''
    },
    menuOpen: {
      type: String,
      default: ''
    },
    guideArrowShow: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    actionData: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      currentShow: this.show,
      menuAni: null,
      height: '0px'
    };
  },
  methods: {
    getCurDesc: function getCurDesc(str) {
      var realLength = 0;
      var len = str.length;
      var charCode = -1;
      var sub = -1;
      for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode > 0 && charCode < 129) {
          realLength += 1;
        } else {
          realLength += 2;
        }
        if (realLength > 68 && sub === -1) {
          sub = i;
        }
      }
      return sub !== -1 ? this.descr.substring(0, sub) + '..' : this.descr;
    },
    menuChange: function menuChange(model) {
      this.$emit('menu-change', model);
      this.$emit('update:menuActive', model.modelcode);
    },
    operateSidebar: function operateSidebar(judge) {
      var _self = this;
      this.currentShow = typeof judge === 'boolean' ? judge : !this.currentShow;
      setTimeout(function () {
        _self.changeSidebarHeight();
      }, 200);
      this.$emit('sidebar-open', this.currentShow);
    },
    postMessage: function postMessage() {
      if (this.isPost) {
        _util.cMessage.postMessage(this.message, this.locationOrigin, parent);
      }
    },
    bindPostMessage: function bindPostMessage() {
      var _self = this;
      _util.cMessage.receiveMessage(function (message) {
        if (_typeof(message.data) === 'object' && !Array.isArray(message.data)) {
          if ('menuType' in message.data) {
            if (window.top !== window.self) {
              _util.cMessage.postMessage(message.data, _self.locationOrigin, parent);
            }
            if (message.data.menuType === 'narrow') {
              clearTimeout(_self.menuAni);
              _self.menuAni = setTimeout(function () {
                _self.operateSidebar(false);
              }, 2000);
            }
          } else if ('menuActive' in message.data) {
            _self.$emit('update:menuActive', message.data.menuActive);
          }
        }
        _self.$emit('receive-message', message);
      }, _self.locationOrigin);
    },
    changeSidebarHeight: function changeSidebarHeight() {
      var el = document.querySelector('.elx-siderbar');
      var introEl = document.querySelector('.elx-siderbar .elx-sidebar-intro');
      this.height = window.parseFloat(el.offsetHeight) - window.parseFloat(introEl.offsetHeight) - 10 + 'px';
    },
    contextmenuAction: function contextmenuAction(action, model) {
      this.$emit('contextmenu-action', action, model);
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
    }
  },
  watch: {
    'isPost': function isPost(val, oldVal) {
      this.postMessage();
    },
    'currentShow': function currentShow(val, oldVal) {
      this.$emit('update:show', val);
    },
    'show': function show(val, oldVal) {
      this.currentShow = val;
    },
    'descr': function descr() {
      this.changeSidebarHeight();
    }
  },
  mounted: function mounted() {
    this.$nextTick(function () {
      this.changeSidebarHeight();
      window.addEventListener('resize', this.changeSidebarHeight);
    });
  },
  created: function created() {
    this.postMessage();
    this.bindPostMessage();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.changeSidebarHeight);
  }
};

/***/ })

/******/ });