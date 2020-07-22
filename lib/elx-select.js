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
/******/ 	return __webpack_require__(__webpack_require__.s = 266);
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

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _option_vue_vue_type_template_id_7c96ee99___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);
/* harmony import */ var _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _option_vue_vue_type_template_id_7c96ee99___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _option_vue_vue_type_template_id_7c96ee99___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/emitter");

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/locale");

/***/ }),

/***/ 206:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-select/src/select.vue?vue&type=template&id=c09431a2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"clickoutside",rawName:"v-clickoutside",value:(_vm.handleClose),expression:"handleClose"}],staticClass:"el-select",class:{ 'is-multiple': _vm.multiple, 'is-small': _vm.size === 'small'}},[(_vm.multiple)?_c('div',{ref:"tags",staticClass:"el-select__tags",style:({ 'max-width': _vm.inputWidth - 32 + 'px' }),on:{"click":function($event){$event.stopPropagation();return _vm.toggleMenu($event)}}},[_c('transition-group',{on:{"after-leave":_vm.resetInputHeight}},_vm._l((_vm.selected),function(item){return _c('el-tag',{key:item.value,attrs:{"closable":"","hit":item.hitState,"type":"primary","close-transition":""},on:{"close":function($event){_vm.deleteTag($event, item)}}},[_vm._v(_vm._s(item.currentLabel))])}),1)],1):_vm._e(),_c('el-input',{ref:"reference",attrs:{"type":"text","placeholder":_vm.currentPlaceholder,"name":_vm.name,"disabled":_vm.disabled,"readonly":"readonly","icon":_vm.iconClass},on:{"focus":_vm.toggleMenu,"click":_vm.toggleMenu},nativeOn:{"mousedown":function($event){return _vm.handleMouseDown($event)},"mouseenter":function($event){_vm.inputHovering = true},"mouseleave":function($event){_vm.inputHovering = false}},model:{value:(_vm.selectedLabel),callback:function ($$v) {_vm.selectedLabel=$$v},expression:"selectedLabel"}}),_c('transition',{attrs:{"name":"md-fade-bottom"},on:{"after-leave":_vm.doDestroy}},[_c('el-select-menu',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"popper",class:{'card': _vm.type === 'card'}},[(_vm.filterable||(_vm.multiple&&_vm.filterable))?_c('el-input',{staticClass:"el-select-dropdown__search",attrs:{"placeholder":_vm.t('el.select.inputKw'),"size":"small","debounce":_vm.remote ? 300 : 0},on:{"click":_vm.toggleMenu},nativeOn:{"keyup":function($event){return _vm.debouncedOnInputChange($event)},"keydown":[function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"down",40,$event.key,["Down","ArrowDown"])){ return null; }$event.preventDefault();_vm.navigateOptions('next')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"up",38,$event.key,["Up","ArrowUp"])){ return null; }$event.preventDefault();_vm.navigateOptions('prev')},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }$event.preventDefault();return _vm.selectOption($event)},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }$event.preventDefault();_vm.visible = false},function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"tab",9,$event.key,"Tab")){ return null; }_vm.visible = false}]},model:{value:(_vm.query),callback:function ($$v) {_vm.query=$$v},expression:"query"}}):_vm._e(),_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.options.length > 0 && _vm.filteredOptionsCount > 0 && !_vm.loading),expression:"options.length > 0 && filteredOptionsCount > 0 && !loading"}],staticClass:"el-select-dropdown__list"},[_vm._t("default")],2),(_vm.emptyText)?_c('p',{staticClass:"el-select-dropdown__empty"},[_vm._v(_vm._s(_vm.emptyText))]):_vm._e()],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-select/src/select.vue?vue&type=template&id=c09431a2&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/vue-popper");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/clickoutside");

/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/resize-event");

/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-select/src/select-dropdown.vue?vue&type=template&id=2c52d1fa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"el-select-dropdown elx-select-dropdown",class:{ 'is-multiple': _vm.$parent.multiple },style:({ minWidth: _vm.minWidth,width: _vm.minWidth })},[_vm._t("default")],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-select/src/select-dropdown.vue?vue&type=template&id=2c52d1fa&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 26:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-select/src/option.vue?vue&type=template&id=7c96ee99&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],staticClass:"el-select-dropdown__item",class:{ 'selected': _vm.itemSelected, 'is-disabled': _vm.disabled || _vm.groupDisabled, 'hover': _vm.parent.hoverIndex === _vm.index },on:{"mouseenter":_vm.hoverItem,"click":function($event){$event.stopPropagation();return _vm.selectOptionClick($event)}}},[_vm._t("default",[_c('option-content',{attrs:{"option":_vm.option,"label":_vm.label}})])],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-select/src/option.vue?vue&type=template&id=7c96ee99&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 266:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _select = __webpack_require__(267);

var _select2 = _interopRequireDefault(_select);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_select2.default.install = function (Vue) {
  Vue.component(_select2.default.name, _select2.default);
};

exports.default = _select2.default;

/***/ }),

/***/ 267:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_vue_vue_type_template_id_c09431a2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(206);
/* harmony import */ var _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _select_vue_vue_type_template_id_c09431a2___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _select_vue_vue_type_template_id_c09431a2___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 268:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _select_dropdown_vue_vue_type_template_id_2c52d1fa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(236);
/* harmony import */ var _select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(70);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _select_dropdown_vue_vue_type_template_id_2c52d1fa___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _select_dropdown_vue_vue_type_template_id_2c52d1fa___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

module.exports = require("wind-dom/src/class");

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/locale");

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(69);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = __webpack_require__(2);

var _emitter2 = _interopRequireDefault(_emitter);

var _locale = __webpack_require__(3);

var _locale2 = _interopRequireDefault(_locale);

var _debounce = __webpack_require__(28);

var _debounce2 = _interopRequireDefault(_debounce);

var _selectDropdown = __webpack_require__(268);

var _selectDropdown2 = _interopRequireDefault(_selectDropdown);

var _option = __webpack_require__(182);

var _option2 = _interopRequireDefault(_option);

var _clickoutside = __webpack_require__(22);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _class = __webpack_require__(269);

var _resizeEvent = __webpack_require__(23);

var _locale3 = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_emitter2.default, _locale2.default],

  name: 'elx-select',

  componentName: 'elx-select',

  computed: {
    iconClass: function iconClass() {
      return this.showCloseIcon ? 'circle-close' : this.remote && this.filterable ? 'caret-top' : 'caret-top';
    },
    debounce: function debounce() {
      return this.remote ? 300 : 0;
    },
    showCloseIcon: function showCloseIcon() {
      var criteria = this.clearable && this.inputHovering && !this.multiple && this.options.indexOf(this.selected) > -1;
      if (!this.$el) return false;

      var icon = this.$el.querySelector('.el-input__icon');
      if (icon) {
        if (criteria) {
          (0, _class.addClass)(icon, 'is-show-close');
        } else {
          (0, _class.removeClass)(icon, 'is-show-close');
        }
      }
      return criteria;
    },
    emptyText: function emptyText() {
      if (this.loading) {
        return this.t('el.select.loading');
      } else {
        if (this.voidRemoteQuery) {
          this.voidRemoteQuery = false;
          return false;
        }
        if (this.filterable && this.filteredOptionsCount === 0) {
          return this.t('el.select.noMatch');
        }
        if (this.options.length === 0) {
          return this.t('el.select.noData');
        }
      }
      return null;
    }
  },

  directives: { Clickoutside: _clickoutside2.default },

  components: {
    ElSelectMenu: _selectDropdown2.default,
    ElOption: _option2.default
  },

  props: {
    root: Object,
    name: String,
    type: String,
    value: {},
    size: String,
    isPostRoot: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    filterable: Boolean,
    loading: Boolean,
    remote: Boolean,
    remoteMethod: Function,
    filterMethod: Function,
    multiple: Boolean,
    placeholder: {
      type: String,
      default: function _default() {
        return (0, _locale3.t)('el.select.placeholder');
      }
    }
  },

  data: function data() {
    return {
      options: [],
      selected: {},
      isSelect: true,
      inputLength: 20,
      inputWidth: 0,
      valueChangeBySelected: false,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      dropdownUl: null,
      visible: false,
      selectedLabel: '',
      query: '',
      selectInit: false,
      hoverIndex: -1,
      voidRemoteQuery: false,
      bottomOverflowBeforeHidden: 0,
      optionsAllDisabled: false,
      inputHovering: false,
      currentPlaceholder: ''
    };
  },


  watch: {
    placeholder: function placeholder(val) {
      this.currentPlaceholder = val;
    },
    value: function value(val, oldVal) {
      this.changeValue();
      if (Array.isArray(val)) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
          this.$emit('change', val);
          this.dispatch('ElFormItem', 'el.form.change', val);
        } else {
          return;
        }
      }
      this.$emit('change', val);
      this.dispatch('ElFormItem', 'el.form.change', val);
    },
    selected: function selected(val, oldVal) {
      var _this = this;

      if (this.multiple) {
        if (this.selected.length > 0) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        this.$nextTick(function () {
          _this.resetInputHeight();
        });
        if (this.selectedInit) {
          this.selectedInit = false;
          return;
        }
        this.valueChangeBySelected = true;
        var result = val.map(function (item) {
          return item.value;
        });
        this.$emit('input', result);
        if (this.filterable) {

          this.hoverIndex = -1;
          this.inputLength = 20;
        }
      } else {
        if (this.selectedInit) {
          this.selectedInit = false;
          return;
        }
        if (val.value === oldVal.value) return;
        this.$emit('input', val.value);
      }
    },
    query: function query(val) {
      var _this2 = this;

      this.$nextTick(function () {
        _this2.broadcast('select-dropdown', 'updatePopper');
      });
      if (this.multiple && this.filterable) {
        this.resetInputHeight();
      }
      if (this.remote && typeof this.remoteMethod === 'function') {
        this.hoverIndex = -1;
        if (this.isPostRoot) {
          this.remoteMethod(this.root, val);
        } else {
          this.remoteMethod(val);
        }
        this.voidRemoteQuery = val === '';
        this.broadcast('elx-option', 'resetIndex');
      } else if (typeof this.filterMethod === 'function') {
        this.filterMethod(val);
      } else {
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('elx-option', 'queryChange', val);
      }
    },
    visible: function visible(val) {
      if (!val) {
        this.$refs.reference.$el.querySelector('input').blur();
        if (this.$el.querySelector('.el-input__icon')) {
          (0, _class.removeClass)(this.$el.querySelector('.el-input__icon'), 'is-reverse');
        }
        this.broadcast('select-dropdown', 'destroyPopper');
        if (this.$refs.input) {
          this.$refs.input.blur();
        }
        this.resetHoverIndex();
        if (!this.multiple) {
          if (this.dropdownUl && this.selected.$el) {
            this.bottomOverflowBeforeHidden = this.selected.$el.getBoundingClientRect().bottom - this.$refs.popper.$el.getBoundingClientRect().bottom;
          }
          if (this.selected && this.selected.value) {
            this.selectedLabel = this.selected.currentLabel;
          }
        }
      } else {
        var icon = this.$el.querySelector('.el-input__icon');
        if (icon && !(0, _class.hasClass)(icon, 'el-icon-circle-close')) {
          (0, _class.addClass)(this.$el.querySelector('.el-input__icon'), 'is-reverse');
        }
        this.broadcast('select-dropdown', 'updatePopper');
        if (this.filterable) {
          this.broadcast('input', 'inputSelect');
        }
        if (!this.dropdownUl) {
          var dropdownChildNodes = this.$refs.popper.$el.childNodes;
          this.dropdownUl = [].filter.call(dropdownChildNodes, function (item) {
            return item.tagName === 'UL';
          })[0];
        }
        if (this.dropdownUl) {
          if (this.bottomOverflowBeforeHidden > 0) {
            this.dropdownUl.scrollTop += this.bottomOverflowBeforeHidden;
          }
        }
      }
      if (val) {
        this.$emit('visible-change', val);
      }
    },
    options: function options(val) {
      this.optionsAllDisabled = val.length === val.filter(function (item) {
        return item.disabled === true;
      }).length;
      var inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.changeValue();
      }
    }
  },

  methods: {
    changeValue: function changeValue() {
      var _this3 = this;

      var val = this.value;
      if (this.valueChangeBySelected) {
        this.valueChangeBySelected = false;
        return;
      }
      this.$nextTick(function () {
        if (_this3.multiple && Array.isArray(val)) {
          _this3.$nextTick(function () {
            _this3.resetInputHeight();
          });
          _this3.selectedInit = true;
          _this3.selected = [];
          _this3.currentPlaceholder = _this3.cachedPlaceHolder;
          val.forEach(function (item) {
            var option = _this3.options.filter(function (option) {
              return option.value === item;
            })[0];
            if (option) {
              _this3.$emit('addOptionToValue', option);
            }
          });
        }
        if (!_this3.multiple) {
          var option = _this3.options.filter(function (option) {
            return option.value === val;
          })[0];
          if (option) {
            _this3.$emit('addOptionToValue', option);
          } else {
            var label = typeof val === 'string' || typeof val === 'number' ? val : '';
            var newOption = {
              value: val,
              currentLabel: label
            };
            newOption.hitState = false;
            _this3.selected = newOption;
            _this3.selectedLabel = label;
          }
        }
        _this3.resetHoverIndex();
      });
    },
    handleMouseDown: function handleMouseDown(event) {
      if (event.target.tagName !== 'INPUT') return;
      if (this.visible) {
        this.handleClose();
        event.preventDefault();
      }
    },
    doDestroy: function doDestroy() {
      this.$refs.popper && this.$refs.popper.doDestroy();
    },
    handleClose: function handleClose() {
      this.visible = false;
    },
    toggleLastOptionHitState: function toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      var option = this.selected[this.selected.length - 1];
      if (!option) return;

      if (hit === true || hit === false) {
        option.hitState = hit;
        return hit;
      }

      option.hitState = !option.hitState;
      return option.hitState;
    },
    deletePrevTag: function deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        this.selected.pop();
      }
    },
    addOptionToValue: function addOptionToValue(option, init) {
      if (this.multiple) {
        if (this.selected.indexOf(option) === -1) {
          this.selectedInit = !!init;
          this.selected.push(option);
          this.resetHoverIndex();
        }
      } else {
        this.selectedInit = !!init;
        this.selected = option;
        this.selectedLabel = option.currentLabel;
        this.hoverIndex = option.index;
      }
    },
    resetInputHeight: function resetInputHeight() {
      var _this4 = this;

      this.$nextTick(function () {
        var inputChildNodes = _this4.$refs.reference.$el.childNodes;
        var input = [].filter.call(inputChildNodes, function (item) {
          return item.tagName === 'INPUT';
        })[0];
        input.style.height = Math.max(_this4.$refs.tags.clientHeight + 6, _this4.size === 'small' ? 28 : 36) + 'px';
        _this4.broadcast('select-dropdown', 'updatePopper');
      });
    },
    resetHoverIndex: function resetHoverIndex() {
      var _this5 = this;

      setTimeout(function () {
        if (!_this5.multiple) {
          _this5.hoverIndex = _this5.options.indexOf(_this5.selected);
        } else {
          if (_this5.selected.length > 0) {
            _this5.hoverIndex = Math.min.apply(null, _this5.selected.map(function (item) {
              return _this5.options.indexOf(item);
            }));
          } else {
            _this5.hoverIndex = -1;
          }
        }
      }, 300);
    },
    handleOptionSelect: function handleOptionSelect(option) {
      if (!this.multiple) {
        this.selected = option;
        this.selectedLabel = option.currentLabel;
        this.visible = false;
      } else {
        var optionIndex = -1;
        this.selected.forEach(function (item, index) {
          if (item === option || item.currentLabel === option.currentLabel) {
            optionIndex = index;
          }
        });
        if (optionIndex > -1) {
          this.selected.splice(optionIndex, 1);
        } else {
          this.selected.push(option);
        }
      }
    },
    toggleMenu: function toggleMenu(event) {
      if (event.target.tagName !== 'INPUT') {
        var tagClass = event.target.getAttribute('class');
        if (tagClass.indexOf('circle-close') > -1) {
          this.deleteSelected(event);
          return;
        }
      }
      if (this.filterable && this.query === '' && this.visible) {
        return;
      }
      if (!this.disabled) {
        this.visible = !this.visible;
        this.query = '';
      }
    },
    navigateOptions: function navigateOptions(direction) {
      if (!this.visible) {
        this.visible = true;
        return;
      }
      if (!this.optionsAllDisabled) {
        if (direction === 'next') {
          this.hoverIndex++;
          if (this.hoverIndex === this.options.length) {
            this.hoverIndex = 0;
          }
          this.resetScrollTop();
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('next');
          }
        }
        if (direction === 'prev') {
          this.hoverIndex--;
          if (this.hoverIndex < 0) {
            this.hoverIndex = this.options.length - 1;
          }
          this.resetScrollTop();
          if (this.options[this.hoverIndex].disabled === true || this.options[this.hoverIndex].groupDisabled === true || !this.options[this.hoverIndex].visible) {
            this.navigateOptions('prev');
          }
        }
      }
    },
    resetScrollTop: function resetScrollTop() {
      var bottomOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().bottom - this.$refs.popper.$el.getBoundingClientRect().bottom;
      var topOverflowDistance = this.options[this.hoverIndex].$el.getBoundingClientRect().top - this.$refs.popper.$el.getBoundingClientRect().top;
      if (bottomOverflowDistance > 0) {
        this.dropdownUl.scrollTop += bottomOverflowDistance;
      }
      if (topOverflowDistance < 0) {
        this.dropdownUl.scrollTop += topOverflowDistance;
      }
    },
    selectOption: function selectOption() {
      if (this.options[this.hoverIndex]) {
        this.handleOptionSelect(this.options[this.hoverIndex]);
      }
    },
    deleteSelected: function deleteSelected(event) {
      event.stopPropagation();
      this.selected = {};
      this.selectedLabel = '';
      this.$emit('input', '');
      this.$emit('change', '');
      this.visible = false;
    },
    deleteTag: function deleteTag(event, tag) {
      var index = this.selected.indexOf(tag);
      if (index > -1) {
        this.selected.splice(index, 1);
      }
      event.stopPropagation();
    },
    onInputChange: function onInputChange() {
      if (this.filterable && this.selectedLabel !== this.value) {}
    },
    onOptionDestroy: function onOptionDestroy(option) {
      this.optionsCount--;
      this.filteredOptionsCount--;
      var index = this.options.indexOf(option);
      if (index > -1) {
        this.options.splice(index, 1);
      }
      this.broadcast('option', 'resetIndex');
    },
    resetInputWidth: function resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    }
  },

  created: function created() {
    var _this6 = this;

    this.cachedPlaceHolder = this.currentPlaceholder = this.placeholder;
    if (this.multiple) {
      this.selectedInit = true;
      this.selected = [];
    }
    if (this.remote) {
      this.voidRemoteQuery = true;
    }

    this.debouncedOnInputChange = (0, _debounce2.default)(this.debounce, function () {
      _this6.onInputChange();
    });
    this.changeValue();
    this.$on('addOptionToValue', this.addOptionToValue);
    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('onOptionDestroy', this.onOptionDestroy);
  },
  mounted: function mounted() {
    var _this7 = this;

    (0, _resizeEvent.addResizeListener)(this.$el, this.resetInputWidth);
    if (this.remote && this.multiple && Array.isArray(this.value)) {
      this.selected = this.options.reduce(function (prev, curr) {
        return _this7.value.indexOf(curr.value) > -1 ? prev.concat(curr) : prev;
      }, []);
      this.$nextTick(function () {
        _this7.resetInputHeight();
      });
    }
    this.$nextTick(function () {
      if (_this7.$refs.reference.$el) {
        _this7.inputWidth = _this7.$refs.reference.$el.getBoundingClientRect().width;
      }
    });
  },
  destroyed: function destroyed() {
    if (this.resetInputWidth) (0, _resizeEvent.removeResizeListener)(this.$el, this.resetInputWidth);
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
//
//
//
//
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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_option_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(71);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_select_dropdown_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuePopper = __webpack_require__(21);

var _vuePopper2 = _interopRequireDefault(_vuePopper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'el-select-dropdown',

  componentName: 'select-dropdown',

  mixins: [_vuePopper2.default],

  props: {
    placement: {
      default: 'bottom-start'
    },

    boundariesPadding: {
      default: 0
    },

    options: {
      default: function _default() {
        return {
          forceAbsolute: true,
          gpuAcceleration: false
        };
      }
    }
  },

  data: function data() {
    return {
      minWidth: ''
    };
  },


  watch: {
    '$parent.inputWidth': function $parentInputWidth() {
      this.minWidth = this.$parent.$el.getBoundingClientRect().width + 'px';
    }
  },

  mounted: function mounted() {
    this.referenceElm = this.$parent.$refs.reference.$el;
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

/***/ }),

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = __webpack_require__(2);

var _emitter2 = _interopRequireDefault(_emitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_emitter2.default],

  name: 'elx-option',

  componentName: 'elx-option',

  props: {
    value: {
      required: true
    },
    option: Object,
    label: [String, Number],
    selected: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    renderContent: Function
  },

  components: {
    OptionContent: {
      props: {
        label: {
          required: true
        },
        option: {
          required: true
        }
      },
      render: function render(h) {
        var parent = this.$parent;
        var option = this.option;
        var label = this.label;
        return parent.renderContent ? parent.renderContent.call(parent._renderProxy, h, option) : h('span', [label]);
      }
    }
  },

  data: function data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false
    };
  },


  computed: {
    currentLabel: function currentLabel() {
      return this.label || (typeof this.value === 'string' || typeof this.value === 'number' ? this.value : '');
    },
    parent: function parent() {
      var result = this.$parent;
      while (!result.isSelect) {
        result = result.$parent;
      }
      return result;
    },
    itemSelected: function itemSelected() {
      if (!this.parent.multiple) {
        return this.value === this.parent.value;
      } else if (Array.isArray(this.parent.selected)) {
        return this.parent.value.indexOf(this.value) > -1;
      }
    },
    currentSelected: function currentSelected() {
      return this.selected || (this.parent.multiple ? this.parent.value.indexOf(this.value) > -1 : this.parent.value === this.value);
    }
  },

  watch: {
    currentSelected: function currentSelected(val) {
      if (val === true) {
        this.dispatch('select', 'addOptionToValue', this);
      }
    }
  },

  methods: {
    handleGroupDisabled: function handleGroupDisabled(val) {
      this.groupDisabled = val;
    },
    hoverItem: function hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.parent.hoverIndex = this.parent.options.indexOf(this);
      }
    },
    selectOptionClick: function selectOptionClick() {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('elx-select', 'handleOptionClick', this);
      }
    },
    queryChange: function queryChange(query) {
      // query 里如果有正则中的特殊字符，需要先将这些字符转义
      var parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
      this.visible = new RegExp(parsedQuery, 'i').test(this.currentLabel);
      if (!this.visible) {
        this.parent.filteredOptionsCount--;
      }
    },
    resetIndex: function resetIndex() {
      var _this = this;

      this.$nextTick(function () {
        _this.index = _this.parent.options.indexOf(_this);
      });
    }
  },

  created: function created() {
    this.parent.options.push(this);
    this.parent.optionsCount++;
    this.parent.filteredOptionsCount++;
    this.index = this.parent.options.indexOf(this);
    if (this.currentSelected === true) {
      this.dispatch('select', 'addOptionToValue', [this, true]);
    }

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
    this.$on('resetIndex', this.resetIndex);
  },
  beforeDestroy: function beforeDestroy() {
    this.dispatch('select', 'onOptionDestroy', this);
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

/***/ })

/******/ });