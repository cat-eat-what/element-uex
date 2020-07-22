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
/******/ 	return __webpack_require__(__webpack_require__.s = 369);
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
  name: 'ElxNavbarConsole',
  componentName: 'ElxNavbarConsole',

  props: {
    data: {
      type: Array,
      default: []
    },
    navActive: {
      type: String,
      default: ''
    },
    navOpen: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      currentData: [],
      currentNavOpen: this.navOpen,
      currentNavActive: this.navActive,
      childrenListLengthObj: {}
    };
  },
  methods: {
    getModelDetail: function getModelDetail(modelcode) {
      var i;
      var j;
      for (i in this.currentData) {
        if (this.currentData[i].modelcode === modelcode) {
          return { model: this.currentData[i], lvl: 0, parent: null };
        }
        if (this.currentData[i].children.length > 0) {
          for (j in this.currentData[i].children) {
            if (this.currentData[i].children[j].modelcode === modelcode) {
              return { model: this.currentData[i].children[j], lvl: 1, parent: this.currentData[i] };
            }
          }
        }
      }
    },
    isModelChildren: function isModelChildren(model) {
      var self = this;
      var child = null;
      if (model.children.length > 0) {
        var func = function func(item) {
          for (var i in item.children) {
            if (item.children[i].modelcode === self.currentNavActive) {
              child = item.children[i];
            } else {
              func(item.children[i]);
            }
          }
        };
        func(model);
      }
      return child;
    },
    expandNav: function expandNav(model) {
      this.currentNavOpen = model.modelcode;
      this.$emit('update:navOpen', this.currentNavOpen);
      this.changeOpen();
      var activeModel = this.isModelChildren(model);
      if (!activeModel) {
        if (model.children.length > 0) {
          this.currentNavActive = model.children[0].modelcode;
          this.$emit('update:navActive', this.currentNavActive);
          this.changeActive();
        }
      }
      this.$emit('nav-expand', model);
    },
    collapseNav: function collapseNav(model) {
      for (var i in this.currentData) {
        this.currentData[i].open = false;
      }
      this.currentNavOpen = '';
      this.$emit('update:navOpen', this.currentNavOpen);
      this.$emit('nav-collapse', model);
    },
    navClick: function navClick(model) {
      this.currentNavActive = model.modelcode;
      this.$emit('update:navActive', this.currentNavActive);
      this.changeActive(model);
    },
    calcStringPixelsCount: function calcStringPixelsCount(str) {
      var elementPixelsLengthRuler = document.createElement('span');
      elementPixelsLengthRuler.style.fontSize = '12px';
      elementPixelsLengthRuler.style.visibility = 'hidden';
      elementPixelsLengthRuler.style.display = 'inline-block';
      elementPixelsLengthRuler.style.wordBreak = 'break-all !important';
      document.body.appendChild(elementPixelsLengthRuler);
      elementPixelsLengthRuler.innerHTML = str;
      var width = elementPixelsLengthRuler.offsetWidth;
      document.body.removeChild(elementPixelsLengthRuler);
      return width;
    },
    getChildrenListLengthArr: function getChildrenListLengthArr() {
      var childrenListLengthObj = {};
      this.currentData.map(function (model) {
        var strArr = model.children.map(function (item) {
          return typeof item.modelname === 'string' ? item.modelname : '';
        });
        childrenListLengthObj[model.modelcode] = 75 * strArr.length;
        return;
      });
      this.childrenListLengthObj = childrenListLengthObj;
    },
    changeOpen: function changeOpen() {
      for (var i in this.currentData) {
        if (this.currentData[i].modelcode === this.currentNavOpen) {
          this.currentData[i].open = true;
        } else {
          this.currentData[i].open = false;
        }
      }
    },
    changeActive: function changeActive() {
      var model = this.getModelDetail(this.currentNavActive);
      if (model) {
        this.currentData.map(function (item) {
          if (model.lvl === 1) {
            item.active = item.modelcode === model.parent.modelcode;
            item.children.map(function (children) {
              children.active = children.modelcode === model.model.modelcode;
              return;
            });
          } else {
            item.active = item.modelcode === model.model.modelcode;
          }
          return;
        });
        this.$emit('nav-change', model.model);
      }
    },
    formatData: function formatData() {
      var self = this;
      var fun = function fun(node) {
        if (!('open' in node)) {
          self.$set(node, 'open', false);
        }
        if (!('active' in node)) {
          self.$set(node, 'active', false);
        }
        if (node.children.length === 0) {
          return;
        }
        for (var i = 0; i < node.children.length; i++) {
          fun(node.children[i]);
        }
      };
      for (var i = 0; i < this.currentData.length; i++) {
        fun(this.currentData[i]);
      }
    }
  },
  watch: {
    data: function data(val, oldVal) {
      if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
        this.currentData = this.data;
        this.formatData();
        this.getChildrenListLengthArr();
      }
    },
    currentData: function currentData(val, oldVal) {
      if (JSON.stringify(this.data) !== JSON.stringify(this.currentData)) {
        this.$emit('update:data', JSON.parse(JSON.stringify(this.currentData)));
      }
    },
    navActive: function navActive(val, oldVal) {
      if (this.currentNavActive !== val) {
        this.currentNavActive = val;
        this.changeActive();
      }
    },
    navOpen: function navOpen(val, oldVal) {
      if (this.currentNavOpen !== val) {
        this.currentNavOpen = val;
        this.changeOpen();
      }
    },
    currentNavActive: function currentNavActive(val, oldVal) {
      if (this.navActive !== val) {
        this.$emit('update:navActive', val);
      }
    },
    currentNavOpen: function currentNavOpen(val, oldVal) {
      if (this.navOpen !== val) {
        this.$emit('update:navOpen', val);
      }
    }
  },
  created: function created() {
    this.currentData = this.data;
    this.formatData();
    this.getChildrenListLengthArr();
    window.addEventListener('resize', this.getChildrenListLengthArr);
    this.changeOpen();
    this.changeActive();
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener('resize', this.getChildrenListLengthArr);
  }
};

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-navbar-console/src/index.vue?vue&type=template&id=b7fd1e16&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-navbar-console"},[_c('div',{staticClass:"elx-navbar-console-content"},[_c('ul',_vm._l((_vm.currentData),function(model){return _c('li',{class:{
          open: model.open,
          active: model.active
        }},[_c('div',{staticClass:"nav-title"},[(!model.open)?_c('span',{class:'nav-icon ' + (model.images != '' && model.images && model.images != null ? model.images : 'uex-icon-default') + ' ' + (model.open ? 'open' : ''),on:{"click":function($event){_vm.expandNav(model)}}}):_vm._e(),_c('span',{staticClass:"nav-name",class:{ open: model.open, active: model.active},style:({
              'width': (_vm.currentNavOpen && _vm.currentNavOpen != '' ? model.open : true) ? model.modelname.length * 12 + 4 + 'px' : '0px',
              'padding': (_vm.currentNavOpen && _vm.currentNavOpen != '' ? model.open : true) ? '0px 2px' : '0px'
            }),domProps:{"textContent":_vm._s(model.modelname)},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.navClick(model)}}}),(_vm.currentNavOpen && _vm.currentNavOpen != '' ?  false : !model.open)?_c('span',{staticClass:"nav-expand uex-icon-logout",class:model.open ? 'open' : '',on:{"click":function($event){_vm.expandNav(model)}}}):_vm._e(),(_vm.currentNavOpen && _vm.currentNavOpen != '' ? model.open : false)?_c('span',{staticClass:"nav-collapse uex-icon-import",class:model.open ? 'open' : '',on:{"click":function($event){_vm.collapseNav(model)}}}):_vm._e()]),(model.open)?_c('div',{staticClass:"split"}):_vm._e(),_c('div',{class:'nav-expand-nav ' + model.sideType,style:({
            'width': model.open  && (model.children ? model.children.length > 0 : false) ? _vm.childrenListLengthObj[model.modelcode] + 'px' : '0px'
          })},[_c('ul',_vm._l((model.children),function(item){return _c('li',{class:{ open: item.open, active: item.active},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.navClick(item)}}},[_c('el-tooltip',{attrs:{"effect":"light","placement":"bottom","open-delay":500,"content":item.modelname}},[_c('span',{staticClass:"nav-name",domProps:{"textContent":_vm._s(item.modelname)}})])],1)}),0)])])}),0)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-navbar-console/src/index.vue?vue&type=template&id=b7fd1e16&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 369:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(370);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_index2.default.install = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

exports.default = _index2.default;

/***/ }),

/***/ 370:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_b7fd1e16___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(168);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_b7fd1e16___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_b7fd1e16___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });