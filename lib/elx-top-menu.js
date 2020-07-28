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

/***/ 175:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(176);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 176:
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
//
//
//
//
//
//
//

exports.default = {
  name: 'ElxTopMenu',
  componentName: 'ElxTopMenu',

  props: {
    menuData: {
      type: Array,
      default: []
    }
  },
  data: function data() {
    return {
      currentMenuData: [],
      isOpen: false,
      liMaxHeight: [200],
      lineNum: 0,
      eveLineNum: 1,
      menuWidth: 0,
      ulMargin: 0
    };
  },
  methods: {
    openMenu: function openMenu() {
      var _this = this;

      this.isOpen = !this.isOpen;
      setTimeout(function () {
        _this.menuWidth = _this.$refs.menuDiv.clientWidth;
        console.log('menuWidth', _this.menuWidth);
        _this.getUlMargin();
      }, 50);
    },
    closeMenu: function closeMenu() {
      this.isOpen = false;
    },
    getLiMaxHeight: function getLiMaxHeight() {
      this.getLineNum();
      this.liMaxHeight = [];
      for (var i = 0; i <= this.lineNum; i++) {
        var lineHeight = 0;
        for (var j = i * this.eveLineNum; j < this.eveLineNum * (i + 1) && j < this.currentMenuData.length; j++) {
          var height = (this.currentMenuData[j].children.length + 1) * 40;
          if (lineHeight === 0 || height > lineHeight) {
            lineHeight = height;
          }
        }
        this.liMaxHeight.push(lineHeight);
      }
    },
    getLineNum: function getLineNum() {
      // var w = document.body.clientWidth;
      this.eveLineNum = parseInt((this.menuWidth - 40) / 240, 10);
      this.lineNum = parseInt(this.currentMenuData.length / this.eveLineNum, 10);
    },
    changeMenu: function changeMenu(item, index, child) {
      var menuData = this.menuData[index];
      this.$emit('change-menu', menuData, child);
      this.isOpen = false;
    },
    transMenuData: function transMenuData(data) {
      for (var i in data) {
        if (data[i].children.length > 4) {
          data[i].children = data[i].children.slice(0, 4);
        }
      }
      this.currentMenuData = data;
    },
    getUlMargin: function getUlMargin() {
      // var w = document.body.clientWidth;
      this.getLineNum();
      this.ulMargin = parseInt((this.menuWidth - 240 * this.eveLineNum) / (this.eveLineNum + 1), 10);
    }
  },
  watch: {
    menuData: function menuData(val) {
      this.transMenuData(val);
      // this.getLiMaxHeight();
    }
  },
  created: function created() {
    this.transMenuData(this.menuData);
    // this.getLiMaxHeight();
  }
};

/***/ }),

/***/ 187:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-top-menu/src/topMenu.vue?vue&type=template&id=77d80d70&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-top-menu"},[_c('div',{class:_vm.isOpen?'menuTitle open' : 'menuTitle',on:{"click":function($event){_vm.openMenu()}}},[_c('span',{staticClass:"uex-icon-menu-card",staticStyle:{"margin-right":"10px"}}),_c('span',[_vm._v("产品与服务")]),_c('svg',{class:_vm.isOpen?'menuLine show' : 'menuLine',staticStyle:{"position":"sticky","left":"0px","top":"38px","z-index":"1","display":"inherit","margin-top":"-2px"},attrs:{"id":"menuLine","width":"131px","height":"2px","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{staticStyle:{"fill":"#2F3C4E","stroke-width":"0","stroke":"#2F3C4E"},attrs:{"width":"131","height":"2"}})])]),_c('transition',{attrs:{"name":"menuFade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],ref:"menuDiv",staticClass:"treeview-menu"},[_c('ul',_vm._l((_vm.currentMenuData),function(item,index){return _c('li',{staticClass:"firstTitle",style:('height:'+_vm.liMaxHeight[parseInt(index/_vm.eveLineNum)]+'px;margin-left:'+_vm.ulMargin+'px')},[_c('dl',[_c('dt',{on:{"click":function($event){_vm.changeMenu(item,index)}}},[_c('span',{class:item.menuIcon==''||item.menuIcon==null?'uex-icon-gather':item.menuIcon,staticStyle:{"margin-right":"10px"}}),_c('span',[_vm._v(_vm._s(item.menuName))])]),_vm._l((item.children),function(child,idx){return _c('dd',{key:idx,on:{"click":function($event){_vm.changeMenu(child,index,child)}}},[_c('svg',{staticClass:"selectLine",staticStyle:{"position":"absolute","left":"58px"},attrs:{"id":"selectLine","width":"124px","height":"40px","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{staticStyle:{"fill":"none","stroke-width":"1px","stroke":"#495465"},attrs:{"width":"100%","height":"40"}})]),_c('span',[_vm._v(_vm._s(child.menuName))])])})],2)])}),0)])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-top-menu/src/topMenu.vue?vue&type=template&id=77d80d70&


/***/ }),

/***/ 373:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _topMenu = __webpack_require__(374);

var _topMenu2 = _interopRequireDefault(_topMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_topMenu2.default.install = function (Vue) {
  Vue.component(_topMenu2.default.name, _topMenu2.default);
};

exports.default = _topMenu2.default;

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _topMenu_vue_vue_type_template_id_77d80d70___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(187);
/* harmony import */ var _topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(175);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _topMenu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _topMenu_vue_vue_type_template_id_77d80d70___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _topMenu_vue_vue_type_template_id_77d80d70___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });