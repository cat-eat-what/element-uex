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
/******/ 	return __webpack_require__(__webpack_require__.s = 256);
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

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-menu/src/elx-menu.vue?vue&type=template&id=700676aa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:(_vm.handleClose),expression:"handleClose"}],staticClass:"elx-menu",class:_vm.currentMenuType == 'narrow' ? 'narrowActive' : 'outerActive',attrs:{"id":"sidebar"},on:{"mousemove":_vm.scrollGuide,"mouseup":_vm.scrollStop}},[_c('div',{class:_vm.currentMenuType == 'narrow' ? 'show-title' : 'show-title'},[_c('div',[(_vm.currentMenuType == 'outer' )?_c('span',{staticClass:"menuTitle",domProps:{"textContent":_vm._s(_vm.currentMenuTitle.title)}}):_vm._e()]),_c('div',{staticClass:"list"},[(_vm.currentMenuType == 'narrow')?_c('span',{class:_vm.currentMenuTitle.image != '' && _vm.currentMenuTitle.image && _vm.currentMenuTitle.image != null ? _vm.currentMenuTitle.image : 'uex-icon-default'}):_vm._e()])]),_c('div',{class:_vm.currentMenuType == 'narrow' ? 'show-more' : 'show-more'},[_c('div',{staticClass:"list",on:{"click":function($event){_vm.showMore(_vm.currentMenuType === 'narrow' ? 'outer' : 'narrow')}}},[_c('a',{attrs:{"href":"javascript:;"}},[_c('span',{class:_vm.currentMenuType == 'narrow' ? 'uex-icon-menu-row' : 'uex-icon-menu-column'})])])]),_c('div',{staticClass:"menu-content"},[_c('div',{class:_vm.currentMenuType == 'narrow' ? 'narrow-menu active' : 'narrow-menu',on:{"mouseleave":_vm.menuClose}},[_c('div',{ref:"narrowMenu",staticStyle:{"height":"100%","overflow-y":"auto","overflow-x":"hidden"},on:{"mousewheel":_vm.scroll,"DOMMouseScroll":_vm.scroll}},[_c('ul',_vm._l((_vm.currentMenuData),function(model,index){return _c('narrow-menu',{key:index,attrs:{"model":model,"list-top":index * 50 - _vm.scrollTop},on:{"menu-contextmenu":_vm.menuContextmenu,"menu-change":_vm.menuChange,"last-child-node-click":_vm.lastChildNodeClick,"emitactive":_vm.emitactive,"emitopen":_vm.emitopen}})}),1)])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentMenuType == 'narrow'),expression:"currentMenuType == 'narrow'"}],staticClass:"lay"}),_c('div',{ref:"outerMenu",class:_vm.currentMenuType == 'outer' ? 'outer-menu active' : 'outer-menu',style:({ top: '0px', height : '100%' })},[_c('ul',_vm._l((_vm.currentMenuData),function(model,index){return _c('outer-menu',{key:index,attrs:{"model":model},on:{"menu-contextmenu":_vm.menuContextmenu,"menu-change":_vm.menuChange,"last-child-node-click":_vm.lastChildNodeClick,"emitactive":_vm.emitactive,"emitopen":_vm.emitopen}})}),1)])]),_c('elx-context-menu',{attrs:{"data":_vm.actionData,"width":90,"x":_vm.pos.x,"y":_vm.pos.y,"tip-show":false,"visible":_vm.contextMenuShow},on:{"action":_vm.action}}),_c('transition',{attrs:{"name":"md-fade-bottom"},on:{"after-leave":_vm.doDestroy}},[_c('guide-arrow',{directives:[{name:"show",rawName:"v-show",value:(_vm.currentGuideArrowShow),expression:"currentGuideArrowShow"}],ref:"popper",attrs:{"visible":_vm.currentGuideArrowShow},on:{"update:visible":function($event){_vm.currentGuideArrowShow=$event}}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-menu/src/elx-menu.vue?vue&type=template&id=700676aa&


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/emitter");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/vue-popper");

/***/ }),

/***/ 229:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-menu/src/guide-arrow.vue?vue&type=template&id=727c92d4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-guide-arrow"},[_c('svg',{staticStyle:{"width":"150px","height":"26px"},attrs:{"id":"guide-arrow-svg"}},[_c('g',{attrs:{"transform":"scale(0.8) translate(0,-15)"}},[_c('path',{attrs:{"stroke-width":"0","fill":"white","d":"M 0 18 L 24 0 L 136 0 A 5 5, 0, 0, 1, 141 5 L 141 31 A 5 5, 0, 0, 1, 136 36 L 24 36 "}}),_c('path',{attrs:{"stroke-width":"0","fill":"#116edb","d":"M 10 18 L 26 6 L 132 6 A 5 5, 0, 0, 1, 137 11 L 137 25 A 5 5,0, 0, 1, 132 30 L 26 30 "}}),_c('animateMotion',{attrs:{"id":"animatePath","path":"M 0 10 A 2 2,0,0,1,4 10 A 2 2,0,0,1,0 10","begin":"0s","dur":"1.3s","repeatCount":"indefinite"}}),_c('animateTransform',{attrs:{"id":"enlarge","attributeName":"transform","begin":"indefinite","dur":"0.5s","type":"scale","from":"0.8","to":"0.9","fill":"freeze"}}),_c('animateTransform',{attrs:{"id":"narrow","attributeName":"transform","begin":"indefinite","dur":"0.8s","type":"scale","from":"0.9","to":"0.8","fill":"freeze"}})],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-menu/src/guide-arrow.vue?vue&type=template&id=727c92d4&


/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-menu/src/narrow-menu.vue?vue&type=template&id=575956d7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{
      'open': _vm.model.open,
      'active':  _vm.model.active,
      'hasChild': this.model.children.length !== 0,
      'isOuter':_vm.model.isOuter
    },on:{"mouseenter":_vm.menuOpen,"mouseleave":_vm.menuClose}},[(_vm.lvl < 1)?_c('a',{attrs:{"href":"javascript:;"},on:{"contextmenu":function($event){$event.preventDefault();$event.stopPropagation();_vm.contextmenu(_vm.model, $event)},"click":_vm.menuActive,"mouseenter":_vm.subMenuOpen}},[_c('span',{class:_vm.model.images != '' && _vm.model.images && _vm.model.images != null ? _vm.model.images : 'uex-icon-default'})]):_vm._e(),_c('div',{staticStyle:{"position":"relative","top":"-50px"}},[_c('svg',{class:_vm.model.active ? 'selectLine show' : 'selectLine',staticStyle:{"position":"absolute","left":"0px","top":"0px"},attrs:{"id":"selectLine","width":"3px","height":"50px","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{staticStyle:{"fill":"#2F3C4E","stroke-width":"0","stroke":"#2F3C4E"},attrs:{"width":"3","height":"50"}})])]),_c('div',{staticClass:"list",style:({top: _vm.lvl <= 1 ? _vm.listTop + 'px' : ''})},[_c('a',{attrs:{"href":"javascript:;"},on:{"contextmenu":function($event){$event.preventDefault();$event.stopPropagation();_vm.contextmenu(_vm.model, $event)},"click":_vm.menuActive,"mouseenter":_vm.subMenuOpen}},[_c('el-tooltip',{staticClass:"item",attrs:{"offset":"0","effect":"light","placement":"top-end","open-delay":1000,"content":_vm.model.modelname}},[_c('span',[_vm._v(_vm._s(_vm.getCurLabel(_vm.model.modelname)))])])],1),_c('ul',{class:_vm.model.open ? 'treeview-menu menu-open' : 'treeview-menu ',style:({
        bottom: _vm.bottom === '' ? '' : _vm.bottom + 'px'
      })},_vm._l((_vm.model.children),function(modelChildren,index){return _c('narrow-menu',{key:index,attrs:{"model":modelChildren,"lvl":_vm.lvl+1},on:{"menu-contextmenu":_vm.contextmenu,"menu-change":_vm.menuChange,"last-child-node-click":_vm.lastChildNodeClick,"emitactive":_vm.emitactive,"emitopen":_vm.emitopen}})}),1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-menu/src/narrow-menu.vue?vue&type=template&id=575956d7&


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-menu/src/outer-menu.vue?vue&type=template&id=18862400&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:_vm.liClass,on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.menuOpen($event)}}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"light","placement":"right","open-delay":1000,"content":_vm.model.modelname}},[_c('a',{style:({'padding-left': _vm.lvl == 0 ? '17px' : 50 + (_vm.lvl - 1) * 20 + 'px'}),attrs:{"href":"javascript:;"},on:{"contextmenu":function($event){$event.preventDefault();$event.stopPropagation();_vm.contextmenu(_vm.model, $event)},"click":function($event){$event.preventDefault();return _vm.menuActive($event)}}},[(_vm.lvl == 0)?_c('span',{class:_vm.model.images != '' && _vm.model.images && _vm.model.images != null ? _vm.model.images : 'uex-icon-default'}):_vm._e(),_c('span',{class:'name lvl' + _vm.lvl,staticStyle:{"width":"auto"},domProps:{"textContent":_vm._s(_vm.model.modelname)}}),(_vm.model.isOuter)?_c('span',{staticClass:"exportWin uex-icon-new-wins"}):_vm._e(),(_vm.model.children.length > 0)?_c('i',{staticClass:"uex-icon-arrow-right"}):_vm._e()])]),_c('svg',{class:_vm.model.active ? 'selectLine show' : 'selectLine',staticStyle:{"position":"absolute","left":"0px","top":"0px"},attrs:{"id":"selectLine","width":"3px","height":"40px","version":"1.1","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{staticStyle:{"fill":"#2F3C4E","stroke-width":"0","stroke":"#2F3C4E"},attrs:{"width":"3","height":"40"}})]),_c('ul',{class:_vm.model.open ? 'treeview-menu menu-open' : 'treeview-menu '},_vm._l((_vm.model.children),function(modelChildren,index){return _c('outer-menu',{key:index,attrs:{"model":modelChildren,"lvl":_vm.lvl + 1},on:{"menu-contextmenu":_vm.contextmenu,"menu-change":_vm.menuChange,"last-child-node-click":_vm.lastChildNodeClick,"emitactive":_vm.emitactive,"emitopen":_vm.emitopen}})}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-menu/src/outer-menu.vue?vue&type=template&id=18862400&


/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _elxMenu = __webpack_require__(257);

var _elxMenu2 = _interopRequireDefault(_elxMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_elxMenu2.default.install = function (Vue) {
  Vue.component(_elxMenu2.default.name, _elxMenu2.default);
};

exports.default = _elxMenu2.default;

/***/ }),

/***/ 257:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _elx_menu_vue_vue_type_template_id_700676aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(195);
/* harmony import */ var _elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(60);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _elx_menu_vue_vue_type_template_id_700676aa___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _elx_menu_vue_vue_type_template_id_700676aa___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _narrow_menu_vue_vue_type_template_id_575956d7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(234);
/* harmony import */ var _narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(62);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _narrow_menu_vue_vue_type_template_id_575956d7___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _narrow_menu_vue_vue_type_template_id_575956d7___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 259:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _outer_menu_vue_vue_type_template_id_18862400___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(236);
/* harmony import */ var _outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(64);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _outer_menu_vue_vue_type_template_id_18862400___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _outer_menu_vue_vue_type_template_id_18862400___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 260:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _guide_arrow_vue_vue_type_template_id_727c92d4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(229);
/* harmony import */ var _guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(66);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _guide_arrow_vue_vue_type_template_id_727c92d4___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _guide_arrow_vue_vue_type_template_id_727c92d4___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
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

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/migrating");

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(61);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_elx_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 61:
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

var _narrowMenu = __webpack_require__(258);

var _narrowMenu2 = _interopRequireDefault(_narrowMenu);

var _outerMenu = __webpack_require__(259);

var _outerMenu2 = _interopRequireDefault(_outerMenu);

var _guideArrow = __webpack_require__(260);

var _guideArrow2 = _interopRequireDefault(_guideArrow);

var _util = __webpack_require__(4);

var _emitter = __webpack_require__(2);

var _emitter2 = _interopRequireDefault(_emitter);

var _migrating = __webpack_require__(5);

var _migrating2 = _interopRequireDefault(_migrating);

var _clickoutside = __webpack_require__(7);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElxMenu',

  componentName: 'ElxMenu',
  mixins: [_emitter2.default, _migrating2.default],
  directives: { Clickoutside: _clickoutside2.default },

  components: {
    NarrowMenu: _narrowMenu2.default, OuterMenu: _outerMenu2.default, GuideArrow: _guideArrow2.default
  },

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
    menuData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    menuType: {
      type: String,
      default: 'outer'
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
    actionData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    menuTitle: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      currentMenuType: this.type,
      currentMenuData: [],
      currentGuideArrowShow: this.guideArrowShow,
      currentMenuTitle: {},
      scrollTop: 0,
      menuAni: null,
      timeOut: 400,
      pos: {
        x: 0,
        y: 0
      },
      contextMenuShow: false,
      contextMenuData: null
    };
  },

  methods: {
    scroll: function scroll(event) {
      if (this.currentMenuType === 'outer') {
        return;
      };
      this.scrollTop = this.$refs['narrowMenu'].scrollTop;
    },
    scrollGuide: function scrollGuide(event) {
      this.scroll();
    },
    scrollStop: function scrollStop() {
      this.scroll();
    },
    menuChange: function menuChange(model) {
      clearTimeout(this.menuAni);
      this.$emit('menu-change', model);
      this.$emit('update:menuActive', model.modelcode);
    },
    lastChildNodeClick: function lastChildNodeClick(model) {
      this.$emit('last-child-node-click', model);
    },
    showMore: function showMore(type) {
      var self = this;
      var _type = type;
      self.currentMenuType = _type;
      this.contextMenuShow = false;
      this.$emit('sidebar-open', this.currentMenuType);
      if (_type === 'outer') {} else {
        self.currentGuideArrowShow = false;
      }
      var fun = function fun(node) {
        node.open = false;
        if (node.children.length === 0) {
          return;
        }
        for (var i = 0; i < node.children.length; i++) {
          fun(node.children[i]);
        }
      };
      for (var i = 0; i < this.currentMenuData.length; i++) {
        this.currentMenuData[i].open = false;
        fun(this.currentMenuData[i]);
      }
    },
    menuClose: function menuClose() {
      var self = this;
      clearTimeout(this.menuAni);
      this.menuAni = setTimeout(function () {
        for (var i in self.currentMenuData) {
          self.operateStatus([self.currentMenuData[i]], 'open', true);
        }
      }, this.timeOut);
    },
    operateStatus: function operateStatus(modelArr, type, status) {
      var _index = 0;
      var _currentModel = void 0;
      var _cancelFun = function _cancelFun(node) {
        node[type] = false;
        if (node.children.length === 0) {
          return false;
        }
        for (var i = 0; i < node.children.length; i++) {
          _cancelFun(node.children[i]);
        }
      };
      if (status && type === 'open') {
        _cancelFun(modelArr[modelArr.length - 1]);
        return;
      }
      var _sureFun = function _sureFun(node) {
        _index++;
        node[type] = true;
        if (node.children.length === 0 || _index === modelArr.length) {
          return false;
        }
        for (var i = 0; i < node.children.length; i++) {
          if (node.children[i].modelcode === modelArr[_index].modelcode) {
            _currentModel = node.children[i];
          } else {
            _cancelFun(node.children[i]);
          }
        }
        _sureFun(_currentModel);
      };
      for (var i = 0; i < this.currentMenuData.length; i++) {
        if (this.currentMenuData[i].modelcode === modelArr[_index].modelcode) {
          _currentModel = this.currentMenuData[i];
        } else {
          _cancelFun(this.currentMenuData[i]);
        }
      }
      _sureFun(_currentModel);
    },
    emitactive: function emitactive(modelArr, status) {
      this.contextMenuShow = false;
      this.operateStatus(modelArr, 'active', status);
    },
    emitopen: function emitopen(modelArr, status, type) {
      clearTimeout(this.menuAni);
      if (type === 'narrow') {
        var self = this;
        this.menuAni = setTimeout(function () {
          self.operateStatus(modelArr, 'open', status);
        }, this.timeOut);
      } else {
        this.operateStatus(modelArr, 'open', status);
      }
    },
    getFirstChild: function getFirstChild(node, modelcode) {
      var activeNode = void 0;
      var fun = function fun(currentNode, modelcode) {
        if (currentNode.modelcode === modelcode) {
          if (currentNode.url || currentNode.children.length === 0) {
            activeNode = currentNode;
            return;
          } else if (currentNode.children.length !== 0 && !currentNode.url) {
            modelcode = currentNode.children[0].modelcode;
            activeNode = currentNode.children[0];
          }
        }
        if (currentNode.children.length === 0) {
          return;
        }
        for (var i = 0; i < currentNode.children.length; i++) {
          fun(currentNode.children[i], modelcode);
        }
      };
      fun(node, modelcode);
      return activeNode;
    },
    operateMenu: function operateMenu(type) {
      var self = this;
      var fun = function fun(node) {
        if (type === 'open') {
          if (node.modelcode === self.menuOpen) {
            node.open = self.currentMenuType === 'outer';
            return;
          }
        }
        if (type === 'active') {
          if (node.modelcode === self.menuActive) {
            if (node.url || node.children.length === 0) {
              node.active = true;
              node.open = self.currentMenuType === 'outer';
            } else if (node.children.length !== 0 && !node.url) {
              var activeNode = self.getFirstChild(node, node.children[0].modelcode);
              activeNode.active = true;
              activeNode.open = self.currentMenuType === 'outer';
            }
            return;
          }
        }
        if (node.children.length === 0) {
          return;
        }
        for (var i = 0; i < node.children.length; i++) {
          fun(node.children[i]);
        }
        return;
      };
      for (var i = 0; i < self.currentMenuData.length; i++) {
        fun(self.currentMenuData[i]);
      }
    },
    changeMenuActive: function changeMenuActive() {
      var self = this;
      var fun = function fun(node) {
        node.active = true;
        node.open = self.currentMenuType === 'outer';
        if (node.children.length > 0) {
          fun(node.children[0]);
        }
        return;
      };
      if (self.menuActive === '') {
        fun(self.currentMenuData[0]);
      } else {
        this.operateMenu('active');
      }
    },
    postMessage: function postMessage() {
      if (this.isPost) {
        _util.cMessage.postMessage(this.message, this.locationOrigin, parent);
      }
    },
    bindPostMessage: function bindPostMessage() {
      var self = this;
      _util.cMessage.receiveMessage(function (message) {
        if (_typeof(message.data) === 'object' && !Array.isArray(message.data)) {
          if ('menuType' in message.data) {
            if (window.top !== window.self) {
              _util.cMessage.postMessage(message.data, self.locationOrigin, parent);
            }
            if (message.data.menuType === 'narrow') {
              clearTimeout(self.menuAni);
              self.menuAni = setTimeout(function () {
                self.showMore('narrow');
              }, 1000);
            }
          } else if ('menuActive' in message.data) {
            self.$emit('update:menuActive', message.data.menuActive);
          }
        }
        self.$emit('receive-message', message);
      }, self.locationOrigin);
    },
    getEventPos: function getEventPos(e) {
      var x = e.clientX;
      var y = e.clientY;
      return { 'x': x, 'y': y };
    },
    menuContextmenu: function menuContextmenu(model, event) {
      if (this.actionData.length === 0) {
        return;
      }
      var e = event || window.event;
      var pos = this.getEventPos(e);
      if (e.which === 3) {
        this.contextMenuShow = false;
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        this.contextMenuData = model;
        this.contextMenuShow = true;
      }
      this.preventDefault(e);
      e.returnValue = false;
      return false;
    },
    preventDefault: function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnvalue = false;
      }
    },
    action: function action(data) {
      this.$emit('contextmenu-action', data, this.contextMenuData);
      this.contextMenuShow = false;
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
      for (var i = 0; i < this.currentMenuData.length; i++) {
        fun(this.currentMenuData[i]);
      }
    },
    getPrefixStyle: function getPrefixStyle(name, val) {
      var prefixs = ['', '-moz-', '-webkit-', '-o-'];
      var str = '';
      prefixs.map(function (prefix) {
        str = str + prefix + name + ': ' + val + ';';
        return;
      });
      return str;
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
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose: function handleClose() {
      this.currentGuideArrowShow = false;
    },
    getElOffsetTop: function getElOffsetTop(el, parentEl) {
      var top = el.offsetTop;
      var fun = function fun(el) {
        if (window.getComputedStyle(el).position !== 'static') {
          top = top + el.offsetTop;
        }
        if (el === parentEl) {
          return;
        }
        fun(el.parentNode);
      };
      fun(el.parentNode);
      return top;
    },
    handleScroll: function handleScroll(el, scrollHeight) {
      if (el.scrollTo) {
        el.scrollTo(0, scrollHeight);
      } else {
        el.scrollTop = scrollHeight;
      }
    }
  },
  watch: {
    currentGuideArrowShow: function currentGuideArrowShow(val, oldVal) {
      if (!val) {
        this.broadcast('GuideArrow', 'destroyPopper');
      } else {
        this.broadcast('GuideArrow', 'updatePopper');
      }
    },
    currentMenuData: function currentMenuData(val, oldVal) {},
    menuData: function menuData(val, oldVal) {
      this.currentMenuData = val;
      this.formatData();
      if (oldVal.length === 0 && val.length > 0) {
        this.changeMenuActive();
      }
    },
    menuTitle: function menuTitle(val) {
      this.currentMenuTitle = val;
    },
    menuType: function menuType(val, oldVal) {
      if (val !== this.currentMenuType) {
        this.showMore(val);
      }
    },
    guideArrowShow: function guideArrowShow(val, oldVal) {
      if (val !== this.currentGuideArrowShow) {
        if (val) {
          if (this.$refs['popper'].referenceElm) {
            this.currentGuideArrowShow = val;
          }
        } else {
          this.currentGuideArrowShow = val;
        }
      }
    },
    menuActive: function menuActive(val, oldVal) {
      this.operateMenu('active');
    },
    menuOpen: function menuOpen(val, oldVal) {
      var self = this;
      clearTimeout(this.menuAni);
      this.menuAni = setTimeout(function () {
        self.operateMenu('open');
        if (self.currentMenuType === 'outer') {
          if (self.guideArrowShow) {
            self.$nextTick(function () {
              var time = 0;
              var interval = setInterval(function () {
                if (time > 500) {
                  clearInterval(interval);
                  self.currentGuideArrowShow = true;
                }
                time = time + 20;
                var openDoms = document.querySelectorAll('.open');
                var el = openDoms[openDoms.length - 1];
                var parentEl = self.$refs['outerMenu'];
                self.handleScroll(parentEl, 0);
                var top = self.getElOffsetTop(el, parentEl);
                var scrollHeight = void 0;
                if (parentEl.offsetHeight + parentEl.scrollTop < top || parentEl.scrollTop > top) {
                  scrollHeight = top - parentEl.offsetHeight * 3 / 4;
                  self.handleScroll(parentEl, scrollHeight);
                }
                self.$refs['popper'].setReferenceElm(openDoms[openDoms.length - 1]);
              }, 20);
            });
          }
        } else {
          self.currentGuideArrowShow = false;
        }
      }, this.timeOut);
    },
    isPost: function isPost(val, oldVal) {
      this.postMessage();
    }
  },
  created: function created() {
    this.currentMenuData = this.menuData;
    this.currentMenuTitle = this.menuTitle;
    this.formatData();
    this.postMessage();
    this.bindPostMessage();
    this.currentMenuType = this.menuType;
    if (this.currentMenuData.length > 0) {
      this.changeMenuActive();
    }
    var text = '';
    var _text = void 0;
    for (var i = 1; i < 30; i++) {
      text = text + '.treeview-menu.menu-open li:nth-child(' + i + '){' + this.getPrefixStyle('transition', 'opacity 200ms linear ' + (8 + 3 * (i - 1)) / 100 + 's, ' + 'height 200ms linear, ' + 'line-height 200ms linear ' + (8 + 3 * (i - 1)) / 100 + 's') + '}';
      text = text + '.narrow-menu .treeview-menu.menu-open li:nth-child(' + i + '){' + this.getPrefixStyle('transition', 'opacity 200ms linear ' + (20 + 8 + 3 * (i - 1)) / 100 + 's, ' + 'height 200ms linear 200ms, ' + 'width 200ms linear, ' + 'line-height 200ms linear ' + (20 + 8 + 3 * (i - 1)) / 100 + 's, ' + 'padding-left 200ms linear ' + (20 + 8 + 3 * (i - 1)) / 100 + 's') + '}';
      text = text + '.outer-menu .treeview-menu.menu-open li:nth-child(' + i + ') a{' + this.getPrefixStyle('transition', 'padding-left 200ms linear ' + (8 + 3 * (i - 1)) / 100 + 's') + '}';
    }
    var styleDoms = document.querySelectorAll('style');
    var lastStyleDom = styleDoms[styleDoms.length - 1];
    if (lastStyleDom) {
      _text = lastStyleDom.innerText;
      lastStyleDom.innerText = _text + text;
    }
  },
  mounted: function mounted() {
    var self = this;
    this.$nextTick(function () {
      this.addEvent(document.body, 'click', function () {
        self.contextMenuShow = false;
      });
    });
  }
};

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(63);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_narrow_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 63:
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
  name: 'NarrowMenu',

  componentName: 'NarrowMenu',

  props: {
    model: {
      type: Object,
      default: {}
    },
    lvl: {
      type: Number,
      default: 0
    },
    listTop: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      top: 0,
      bottom: ''
    };
  },

  methods: {
    getCurLabel: function getCurLabel(str) {
      var realLength = 0;
      if (typeof str !== 'string') {
        return '';
      }
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
        if (realLength > 10 && sub === -1) {
          sub = i;
        }
      }
      return sub !== -1 ? str.substring(0, sub) + '..' : str;
    },
    canMenuChange: function canMenuChange() {
      var filterData = this.model.children.filter(function (item) {
        return item.active === true;
      });
      return this.model.children.length === 0 || this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null && filterData.length === 0;
    },
    menuChange: function menuChange(model) {
      this.$emit('menu-change', model);
    },
    lastChildNodeClick: function lastChildNodeClick(model) {
      this.$emit('last-child-node-click', model);
    },
    emitactive: function emitactive(modelArr, status) {
      var _arr = [this.model].concat(modelArr);
      this.$emit('emitactive', _arr, status);
    },
    emitopen: function emitopen(modelArr, status) {
      var _arr = [this.model].concat(modelArr);
      this.$emit('emitopen', _arr, status, 'narrow');
    },
    menuActive: function menuActive() {
      if (this.canMenuChange()) {
        if (this.model.active) {
          this.$emit('menu-change', this.model);
        }
        this.$emit('emitactive', [this.model], this.model.active);
      }
      if (this.model.children.length === 0) {
        this.$emit('last-child-node-click', this.model);
      }
    },
    subMenuOpen: function subMenuOpen() {
      var _arr = [this.model];
      if (this.model.active) {
        var fun = function fun(node) {
          if (node.active) {
            _arr.push(node);
          }
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            fun(node.children[i]);
          }
        };
        if (this.model.children.length > 0) {
          for (var i = 0; i < this.model.children.length; i++) {
            if (this.model.children[i].active) {
              fun(this.model.children[i]);
            }
          }
          this.$emit('emitopen', _arr, _arr[_arr.length - 1].open, 'narrow');
        }
      }
    },
    getElOffsetTop: function getElOffsetTop(el, parentEl) {
      var top = el.offsetTop;
      var fun = function fun(el) {
        if (window.getComputedStyle(el).position !== 'static') {
          top = top + el.offsetTop;
        }
        if (el === parentEl) {
          return;
        }
        fun(el.parentNode);
      };
      fun(el.parentNode);
      return top;
    },
    menuOpen: function menuOpen(event) {
      this.$emit('emitopen', [this.model], false, 'narrow');
      var _e = event || window.event;
      var _target = _e.currentTarget;
      var top = this.getElOffsetTop(_target, document.body);
      var _bottom = document.body.offsetHeight - this.getElOffsetTop(_target, document.body) - 40 + window.pageYOffset;
      if (top > _bottom && _bottom < this.model.children.length * 36) {
        this.bottom = -50;
        this.top = '';
      } else {
        this.bottom = '';
        this.top = 40;
      }
    },
    menuClose: function menuClose() {
      this.$emit('emitopen', [this.model], true, 'narrow');
    },
    contextmenu: function contextmenu(model, e) {
      this.$emit('menu-contextmenu', model, e);
    }
  }
};

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(65);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_outer_menu_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 65:
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

exports.default = {
  name: 'OuterMenu',
  componentName: 'OuterMenu',

  props: {
    model: {
      type: Object,
      default: {}
    },
    lvl: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      liClass: this.model.children.length !== 0 ? 'hasChild' : ''
    };
  },

  methods: {
    menuChange: function menuChange(model) {
      this.$emit('menu-change', model);
    },
    lastChildNodeClick: function lastChildNodeClick(model) {
      this.$emit('last-child-node-click', model);
    },
    canMenuChange: function canMenuChange() {
      var filterData = this.model.children.filter(function (item) {
        return item.active === true;
      });
      return this.model.children.length === 0 || this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null && filterData.length === 0;
    },
    menuActive: function menuActive() {
      if (this.canMenuChange()) {
        if (this.model.active) {
          this.$emit('menu-change', this.model);
        }
        this.$emit('emitactive', [this.model], this.model.active);
      }
      if (this.model.children.length === 0) {
        this.$emit('last-child-node-click', this.model);
      }
    },
    menuOpen: function menuOpen() {
      this.$emit('emitopen', [this.model], this.model.open, 'outer');
    },
    emitactive: function emitactive(modelArr, status) {
      var _arr = [this.model].concat(modelArr);
      this.$emit('emitactive', _arr, status);
    },
    emitopen: function emitopen(modelArr, status) {
      var _arr = [this.model].concat(modelArr);
      this.$emit('emitopen', _arr, status, 'outer');
    },
    changeClass: function changeClass() {
      var _str = '';
      if (this.model.open) {
        _str = _str + ' open';
      }
      if (this.model.active) {
        _str = _str + ' active';
      }
      if (this.model.children.length !== 0) {
        _str = _str + ' hasChild';
      }
      if (this.model.isOuter) {
        _str = _str + ' isOuter';
      }
      this.liClass = _str;
    },
    contextmenu: function contextmenu(model, e) {
      this.$emit('menu-contextmenu', model, e);
    }
  },
  watch: {
    'model.open': function modelOpen(val, oldVal) {
      this.changeClass();
      if (val) {
        this.$emit('emitopen', [this.model], false, 'outer');
      }
    },
    'model.active': function modelActive(val, oldVal) {
      this.changeClass();
      if (val) {
        if (this.canMenuChange()) {
          this.$emit('menu-change', this.model);
          this.$emit('emitactive', [this.model], false);
        }
        if (this.model.children.length === 0) {
          this.$emit('last-child-node-click', this.model);
        }
      }
    }
  },
  created: function created() {
    this.changeClass();
    if (this.model.open) {
      this.$emit('emitopen', [this.model], false, 'outer');
    }
    if (this.model.active) {
      if (this.model.children.length === 0 || this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null) {
        this.$emit('menu-change', this.model);
        this.$emit('emitactive', [this.model], false);
      }
      if (this.model.children.length === 0) {
        this.$emit('last-child-node-click', this.model);
      }
    }
  }
};

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(67);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_guide_arrow_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuePopper = __webpack_require__(22);

var _vuePopper2 = _interopRequireDefault(_vuePopper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'GuideArrow',
  componentName: 'GuideArrow',
  mixins: [_vuePopper2.default],
  props: {
    placement: {
      default: 'right'
    },
    visibleArrow: {
      default: true
    },
    appendToBody: {
      default: false
    },
    popperOptions: {
      default: function _default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    },
    visible: Boolean
  },
  data: function data() {
    return {
      referenceElm: null,
      popperElm: null
    };
  },

  methods: {
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
    setReferenceElm: function setReferenceElm(el) {
      this.referenceElm = el;
    }
  },
  created: function created() {},
  mounted: function mounted() {
    this.$parent.popperElm = this.popperElm = this.$el;
    this.$on('updatePopper', this.updatePopper);
    this.$on('destroyPopper', this.destroyPopper);
  }
}; //
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

/***/ }),

/***/ 7:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/clickoutside");

/***/ })

/******/ });