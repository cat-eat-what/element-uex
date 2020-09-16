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
/******/ 	return __webpack_require__(__webpack_require__.s = 334);
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

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(133);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 133:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _emitter = __webpack_require__(2);

var _emitter2 = _interopRequireDefault(_emitter);

var _migrating = __webpack_require__(5);

var _migrating2 = _interopRequireDefault(_migrating);

__webpack_require__(336);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodeMirror = __webpack_require__(246); //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var sqlFormatter = __webpack_require__(337);
var beautify = __webpack_require__(338);
var js_beautify = void 0;
var css_beautify = void 0;
var html_beautify = void 0;

exports.default = {
  name: 'ElxCodemirror',
  componentName: 'ElxCodemirror',
  mixins: [_emitter2.default, _migrating2.default],
  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    option: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    height: {
      type: [String, Number],
      default: '100px'
    },
    actionData: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    inputRead: Function,
    beforeRender: Function,
    afterRender: Function
  },
  data: function data() {
    var _this = this;

    return {
      codemirror: null,
      defaultOption: {
        mode: 'javascript',
        lineNumbers: true,
        styleActiveLine: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
        extraKeys: {
          'Ctrl-F11': function CtrlF11(cm) {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          'Esc': function Esc(cm) {
            if (cm.getOption('fullScreen')) {
              cm.setOption('fullScreen', false);
            }
          },
          'Ctrl-Q': function CtrlQ(cm) {
            cm.foldCode(cm.getCursor());
          },

          'Shift-Space': function ShiftSpace(cm) {
            _this.$emit('show-hint', cm);
            cm.showHint();
          }
        }
      },
      currentActionData: [],
      defaultActionData: [{
        'label': '格式化',
        'action': 'codeMirrorFormat'
      }, {
        'label': '查找',
        'action': 'codeMirrorSearch'
      }, {
        'label': '替换',
        'action': 'codeMirrorReplace'
      }],
      contentMenuShow: false,
      pos: {
        x: 0,
        y: 0
      },
      searchVisible: false,
      replaceVisible: false,
      searchData: {
        search: null,
        replace: null
      },
      hintResult: null
    };
  },

  methods: {
    getEventPos: function getEventPos(e) {
      var x = e.clientX;
      var y = e.clientY;
      return { 'x': x, 'y': y };
    },
    contextmenu: function contextmenu(event) {
      this.$emit('right-click', this.codemirror);
      var e = event || window.event;
      var pos = this.getEventPos(e);
      if (e.which === 3) {
        this.contentMenuShow = false;
        this.pos.x = pos.x;
        this.pos.y = pos.y;
        this.contentMenuShow = true;
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
      if (typeof data.action === 'function') {
        data.action(this);
      } else if (typeof this[data.action] === 'function') {
        this[data.action]();
      }
      this.contentMenuShow = false;
    },
    getSelectedRange: function getSelectedRange() {
      return { from: this.codemirror.getCursor(true), to: this.codemirror.getCursor(false) };
    },
    codeMirrorFormat: function codeMirrorFormat() {
      var range = this.getSelectedRange();
      var cm = this.codemirror;
      var from = range.from;
      var to = range.to;
      var out = void 0;
      if (this.codemirror.getMode().name === 'sql') {
        if (sqlFormatter) {
          out = sqlFormatter.format(cm.getRange(from, to));
        }
      } else if (this.codemirror.getMode().name === 'javascript') {
        if (js_beautify) {
          out = js_beautify(cm.getRange(from, to));
        }
      } else if (this.codemirror.getMode().name === 'css') {
        if (css_beautify) {
          out = css_beautify(cm.getRange(from, to));
        }
      } else if (this.codemirror.getMode().name === 'html') {
        if (html_beautify) {
          out = html_beautify(cm.getRange(from, to));
        }
      }
      if (out) {
        cm.operation(function () {
          cm.replaceRange(out, from, to);
          cm.setSelection(from, cm.getCursor(false));
        });
      } else {
        this.codemirror.autoFormatRange(from, to);
      }
    },
    codeMirrorSearch: function codeMirrorSearch() {
      this.replaceVisible = false;
      this.searchVisible = true;
    },
    codeMirrorReplace: function codeMirrorReplace() {
      this.searchVisible = false;
      this.replaceVisible = true;
    },
    searchNext: function searchNext() {
      CodeMirror.extends.find(this.codemirror, this.searchData);
    },
    replace: function replace() {
      CodeMirror.extends.replace(this.codemirror, this.searchData);
    },
    replaceAll: function replaceAll() {
      CodeMirror.extends.replaceAll(this.codemirror, this.searchData);
    },
    searchCancel: function searchCancel() {
      this.searchVisible = false;
      CodeMirror.extends.clearSearch(this.codemirror);
    },
    replaceCancel: function replaceCancel() {
      this.replaceVisible = false;
      CodeMirror.extends.clearSearch(this.codemirror);
    },
    iGetInnerText: function iGetInnerText(testStr) {
      var resultStr = testStr.replace(/\ +/g, '');
      resultStr = testStr.replace(/[ ]/g, '');
      resultStr = testStr.replace(/[\r\n]/g, '');
      resultStr = testStr.replace(/\s+/g, ' ');
      return resultStr;
    },
    renderCodemirror: function renderCodemirror() {
      var self = this;
      var option = Object.assign({}, this.defaultOption, this.option);
      this.codemirror = CodeMirror.fromTextArea(this.$refs['elxCodemirror'].children[0], option);
      if (typeof this.beforeRender === 'function') {
        this.beforeRender(CodeMirror);
      }
      this.codemirror.setValue(this.value || '');
      if (typeof this.afterRender === 'function') {
        this.afterRender(this, this.codemirror);
      }
      if (typeof this.inputRead === 'function') {
        this.codemirror.on('inputRead', function (cm, range) {
          var val = self.iGetInnerText(self.codemirror.getValue());
          self.inputRead(cm, range, val);
        });
      }
      this.codemirror.on('change', function () {
        self.$emit('input', this.codemirror.getValue());
        if (self.value !== this.codemirror.getValue()) {
          var startPos = { ch: 0, line: 0 };
          var endPos = this.codemirror.getCursor();
          var range = this.codemirror.getRange(startPos, endPos);
          var innerText = self.iGetInnerText(range);
          var strArr = innerText.split(' ');
          var lastStr = strArr[strArr.length - 1];
          var regExp = /\w\.$/g;
          if (regExp.test(lastStr)) {
            var table = lastStr.slice(0, lastStr.length - 1);
            self.hintResult = table;
            self.$emit('show-hint', self.codemirror, table);
            self.codemirror.showHint();
          } else {
            self.hintResult = null;
            if (self.codemirror.state.completionActive) {
              self.codemirror.state.completionActive.close();
            }
          }
          self.$emit('change', this.codemirror.getValue());
          self.dispatch('ElFormItem', 'el.form.change', this.codemirror.getValue());
        }
      }.bind(this));
    },
    setActionData: function setActionData() {
      this.currentActionData = this.actionData ? this.defaultActionData.concat(this.actionData) : this.defaultActionData;
    },
    handleDisplay: function handleDisplay() {
      this.contentMenuShow = false;
    }
  },
  watch: {
    value: function value() {
      if (this.codemirror.getValue() !== this.value) {
        this.codemirror.setValue(this.value || '');
      }
    },
    option: function option() {
      this.renderCodemirror();
    },
    actionData: function actionData() {
      this.setActionData();
    }
  },
  created: function created() {
    js_beautify = window.js_beautify;
    css_beautify = window.css_beautify;
    html_beautify = window.html_beautify;
    if (!js_beautify) {
      js_beautify = beautify ? beautify['js_beautify'] : null;
    }
    if (!css_beautify) {
      css_beautify = beautify ? beautify['css_beautify'] : null;
    }
    if (!html_beautify) {
      html_beautify = beautify ? beautify['html_beautify'] : null;
    }
  },
  mounted: function mounted() {
    this.renderCodemirror();
    this.$nextTick(function () {
      document.body.addEventListener('click', this.handleDisplay);
    });
    this.setActionData();
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('click', this.handleDisplay);
    this.codemirror.toTextArea();
  }
};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/emitter");

/***/ }),

/***/ 207:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-codemirror/src/index.vue?vue&type=template&id=7c76045c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-codemirror",style:({'width': _vm.width, 'height': _vm.height})},[_c('div',{ref:"elxCodemirror",staticClass:"elx-codemirror-content",style:({'height': _vm.replaceVisible?'calc(100% - 78px)':(_vm.searchVisible?'calc(100% - 46px)':'100%')}),on:{"contextmenu":_vm.contextmenu}},[_c('textarea')]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.searchVisible),expression:"searchVisible"}],staticClass:"elx-codemirror-search-content search"},[_c('div',{staticClass:"form"},[_c('el-form',{attrs:{"model":_vm.searchData,"label-width":"90px","label-suffix":":"}},[_c('el-form-item',{attrs:{"label":"查找内容"}},[_c('el-input',{attrs:{"size":"mini","type":"textarea","rows":1},model:{value:(_vm.searchData.search),callback:function ($$v) {_vm.$set(_vm.searchData, "search", $$v)},expression:"searchData.search"}})],1)],1)],1),_c('div',{staticClass:"button-group"},[_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.searchNext($event)}}},[_vm._v("查找")]),_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.searchCancel($event)}}},[_vm._v("取消")])],1)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.replaceVisible),expression:"replaceVisible"}],staticClass:"elx-codemirror-search-content replace"},[_c('div',{staticClass:"form"},[_c('el-form',{attrs:{"model":_vm.searchData,"label-width":"90px","label-suffix":":"}},[_c('el-form-item',{attrs:{"label":"查找内容"}},[_c('el-input',{attrs:{"size":"mini","type":"textarea","rows":1},model:{value:(_vm.searchData.search),callback:function ($$v) {_vm.$set(_vm.searchData, "search", $$v)},expression:"searchData.search"}})],1),_c('el-form-item',{attrs:{"label":"替换内容"}},[_c('el-input',{attrs:{"size":"mini","type":"textarea","rows":1},model:{value:(_vm.searchData.replace),callback:function ($$v) {_vm.$set(_vm.searchData, "replace", $$v)},expression:"searchData.replace"}})],1)],1)],1),_c('div',{staticClass:"button-group"},[_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.searchNext($event)}}},[_vm._v("查找")]),_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.replace($event)}}},[_vm._v("替换")]),_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.replaceAll($event)}}},[_vm._v("替换所有")]),_c('el-button',{attrs:{"size":"mini"},nativeOn:{"click":function($event){return _vm.replaceCancel($event)}}},[_vm._v("取消")])],1)]),_c('elx-context-menu',{attrs:{"data":_vm.currentActionData,"width":90,"x":_vm.pos.x,"y":_vm.pos.y,"tip-show":false,"visible":_vm.contentMenuShow},on:{"action":_vm.action}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-codemirror/src/index.vue?vue&type=template&id=7c76045c&


/***/ }),

/***/ 246:
/***/ (function(module, exports) {

module.exports = require("codemirror");

/***/ }),

/***/ 334:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = __webpack_require__(335);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_index2.default.install = function (Vue) {
  Vue.component(_index2.default.name, _index2.default);
};

exports.default = _index2.default;

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_7c76045c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(207);
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(132);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_7c76045c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _index_vue_vue_type_template_id_7c76045c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 336:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _codemirror = __webpack_require__(246);

var _codemirror2 = _interopRequireDefault(_codemirror);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (mod) {
  mod(_codemirror2.default);
})(function (CodeMirror) {
  'use strict';

  if (!CodeMirror) {
    return;
  }
  CodeMirror.extendMode('css', {
    commentStart: '/*',
    commentEnd: '*/',
    newlineAfterToken: function newlineAfterToken(type, content) {
      return (/^[;{}]$/.test(content)
      );
    }
  });

  CodeMirror.extendMode('javascript', {
    commentStart: '/*',
    commentEnd: '*/',
    // FIXME semicolons inside of for
    newlineAfterToken: function newlineAfterToken(type, content, textAfter, state) {
      if (this.jsonMode) {
        return (/^[\[,{]$/.test(content) || /^}/.test(textAfter)
        );
      } else {
        if (content === ';' && state.lexical && state.lexical.type === ')') return false;
        return (/^[;{}]$/.test(content) && !/^;/.test(textAfter)
        );
      }
    }
  });

  CodeMirror.extendMode('xml', {
    commentStart: '<!--',
    commentEnd: '-->',
    newlineAfterToken: function newlineAfterToken(type, content, textAfter) {
      return type === 'tag' && />$/.test(content) || /^</.test(textAfter);
    }
  });

  // Comment/uncomment the specified range
  CodeMirror.defineExtension('commentRange', function (isComment, from, to) {
    var cm = this;
    var curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
    cm.operation(function () {
      if (isComment) {
        // Comment range
        cm.replaceRange(curMode.commentEnd, to);
        cm.replaceRange(curMode.commentStart, from);
        if (from.line === to.line && from.ch === to.ch) {
          cm.setCursor(from.line, from.ch + curMode.commentStart.length); // An empty comment inserted - put cursor inside
        }
      } else {
        // Uncomment range
        var selText = cm.getRange(from, to);
        var startIndex = selText.indexOf(curMode.commentStart);
        var endIndex = selText.lastIndexOf(curMode.commentEnd);
        if (startIndex > -1 && endIndex > -1 && endIndex > startIndex) {
          // Take string till comment start
          selText = selText.substr(0, startIndex) +
          // From comment start till comment end
          selText.substring(startIndex + curMode.commentStart.length, endIndex) +
          // From comment end till string end
          selText.substr(endIndex + curMode.commentEnd.length);
        }
        cm.replaceRange(selText, from, to);
      }
    });
  });

  // Applies automatic mode-aware indentation to the specified range
  CodeMirror.defineExtension('autoIndentRange', function (from, to) {
    var cmInstance = this;
    this.operation(function () {
      for (var i = from.line; i <= to.line; i++) {
        cmInstance.indentLine(i, 'smart');
      }
    });
  });

  // Applies automatic formatting to the specified range
  CodeMirror.defineExtension('autoFormatRange', function (from, to) {
    var cm = this;
    var outer = cm.getMode();
    var text = cm.getRange(from, to).split('\n');
    var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
    var tabSize = cm.getOption('tabSize');
    var out = '';
    var lines = 0;
    var atSol = from.ch === 0;
    function newline() {
      out += '\n';
      atSol = true;
      ++lines;
    }

    for (var i = 0; i < text.length; ++i) {
      var stream = new CodeMirror.StringStream(text[i], tabSize);
      while (!stream.eol()) {
        var inner = CodeMirror.innerMode(outer, state);
        var style = outer.token(stream, state);
        var cur = stream.current();
        stream.start = stream.pos;
        if (!atSol || /\S/.test(cur)) {
          out += cur;
          atSol = false;
        }
        if (!atSol && inner.mode.newlineAfterToken && inner.mode.newlineAfterToken(style, cur, stream.string.slice(stream.pos) || text[i + 1] || '', inner.state)) {
          newline();
        }
      }
      if (!stream.pos && outer.blankLine) {
        outer.blankLine(state);
      }
      if (!atSol) {
        newline();
      }
    }

    cm.operation(function () {
      cm.replaceRange(out, from, to);
      for (var _cur = from.line + 1, end = from.line + lines; _cur <= end; ++_cur) {
        cm.indentLine(_cur, 'smart');
      }
      cm.setSelection(from, cm.getCursor(false));
    });
  });
  function searchOverlay(query, caseInsensitive) {
    if (typeof query === 'string') {
      query = new RegExp(query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&'), caseInsensitive ? 'gi' : 'g');
    } else if (!query.global) {
      query = new RegExp(query.source, query.ignoreCase ? 'gi' : 'g');
    }
    return { token: function token(stream) {
        query.lastIndex = stream.pos;
        var match = query.exec(stream.string);
        if (match && match.index === stream.pos) {
          stream.pos += match[0].length || 1;
          return 'searching';
        } else if (match) {
          stream.pos = match.index;
        } else {
          stream.skipToEnd();
        }
      } };
  }

  function SearchState() {
    this.posFrom = this.posTo = this.lastQuery = this.query = null;
    this.overlay = null;
  }

  function getSearchState(cm) {
    return cm.state.search || (cm.state.search = new SearchState());
  }

  function queryCaseInsensitive(query) {
    return typeof query === 'string' && query === query.toLowerCase();
  }

  function getSearchCursor(cm, query, pos) {
    // Heuristic: if the query string is all lowercase, do a case insensitive search.
    return cm.getSearchCursor(query, pos, { caseFold: queryCaseInsensitive(query), multiline: true });
  }

  function parseString(string) {
    return string.replace(/\\(.)/g, function (_, ch) {
      if (ch === 'n') {
        return '\n';
      }
      if (ch === 'r') {
        return '\r';
      }
      return ch;
    });
  }

  function parseQuery(query) {
    var isRE = query.match(/^\/(.*)\/([a-z]*)$/);
    if (isRE) {
      try {
        query = new RegExp(isRE[1], isRE[2].indexOf('i') === -1 ? '' : 'i');
      } catch (e) {} // Not a regular expression after all, do a string search
    } else {
      query = parseString(query);
    }
    if (typeof query === 'string' ? query === '' : query.test('')) {
      query = /x^/;
    }
    return query;
  }

  function startSearch(cm, state, query) {
    state.queryText = query;
    state.query = parseQuery(query);
    cm.removeOverlay(state.overlay, queryCaseInsensitive(state.query));
    state.overlay = searchOverlay(state.query, queryCaseInsensitive(state.query));
    cm.addOverlay(state.overlay);
    if (cm.showMatchesOnScrollbar) {
      if (state.annotate) {
        state.annotate.clear();state.annotate = null;
      }
      state.annotate = cm.showMatchesOnScrollbar(state.query, queryCaseInsensitive(state.query));
    }
  }

  function doSearch(cm, data, cmd, rev, persistent, immediate) {
    var state = getSearchState(cm);
    var query = data.search;
    if (state.query) return findNext(cm, rev);
    var q = cm.getSelection() || state.lastQuery;
    if (q instanceof RegExp && q.source === 'x^') {
      q = null;
    }
    if (persistent && cm.openDialog) {
      var searchNext = function searchNext(query, event) {
        if (!query) return;
        if (query !== state.queryText) {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
        }
      };
      if (cmd === 'findNext' || cmd === 'findPrev' || cmd === 'findPersistentNext' || cmd === 'findPersistentPrev') {
        startSearch(cm, getSearchState(cm), query);
        cm.execCommand(cmd);
      } else if (cmd === 'find' || cmd === 'findPersistent') {
        searchNext(query);
      }
      if (immediate && q) {
        startSearch(cm, state, q);
        findNext(cm, rev);
      }
    } else {
      if (query && !state.query) {
        cm.operation(function () {
          startSearch(cm, state, query);
          state.posFrom = state.posTo = cm.getCursor();
          findNext(cm, rev);
        });
      }
    }
  }

  function findNext(cm, rev, callback) {
    cm.operation(function () {
      var state = getSearchState(cm);
      var cursor = getSearchCursor(cm, state.query, rev ? state.posFrom : state.posTo);
      if (!cursor.find(rev)) {
        cursor = getSearchCursor(cm, state.query, rev ? CodeMirror.Pos(cm.lastLine()) : CodeMirror.Pos(cm.firstLine(), 0));
        if (!cursor.find(rev)) return;
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({ from: cursor.from(), to: cursor.to() }, 20);
      state.posFrom = cursor.from();state.posTo = cursor.to();
      if (callback) {
        callback(cursor.from(), cursor.to());
      }
    });
  }

  function clearSearch(cm) {
    cm.operation(function () {
      var state = getSearchState(cm);
      state.lastQuery = state.query;
      if (!state.query) {
        return;
      }
      state.query = state.queryText = null;
      cm.removeOverlay(state.overlay);
      if (state.annotate) {
        state.annotate.clear();
        state.annotate = null;
      }
    });
  }

  function replaceAll(cm, data) {
    var query = data.search;
    var text = data.replace;
    cm.operation(function () {
      for (var cursor = getSearchCursor(cm, query); cursor.findNext();) {
        if (typeof query !== 'string') {
          (function () {
            var match = cm.getRange(cursor.from(), cursor.to()).match(query);
            cursor.replace(text.replace(/\$(\d)/g, function (_, i) {
              return match[i];
            }));
          })();
        } else cursor.replace(text);
      }
    });
  }

  function replace(cm, data) {
    if (cm.getOption('readOnly')) {
      return;
    }
    var query = parseQuery(data.search);
    var text = parseString(data.replace);
    clearSearch(cm);
    var cursor = getSearchCursor(cm, query, cm.getCursor('from'));
    var cursorPointer = function cursorPointer() {
      var start = cursor.from();
      var match = void 0;
      if (!(match = cursor.findNext())) {
        cursor = getSearchCursor(cm, query);
        if (!(match = cursor.findNext()) || start && cursor.from().line === start.line && cursor.from().ch === start.ch) {
          return;
        }
      }
      cm.setSelection(cursor.from(), cursor.to());
      cm.scrollIntoView({ from: cursor.from(), to: cursor.to() });
      return match;
    };
    var advance = function advance() {
      var match = cursorPointer();
      doReplace(match);
      cursorPointer();
    };
    var doReplace = function doReplace(match) {
      cursor.replace(typeof query === 'string' ? text : text.replace(/\$(\d)/g, function (_, i) {
        return match[i];
      }));
    };
    advance();
  }
  CodeMirror.extends = {};
  CodeMirror.extends.find = function (cm, data, cmd) {
    clearSearch(cm);doSearch(cm, data, cmd);
  };
  CodeMirror.extends.findPersistent = function (cm, data, cmd) {
    clearSearch(cm);doSearch(cm, data, cmd, false, true);
  };
  CodeMirror.extends.findPersistentNext = function (cm, data, cmd) {
    doSearch(cm, data, cmd, false, true, true);
  };
  CodeMirror.extends.findPersistentPrev = function (cm, data, cmd) {
    doSearch(cm, data, cmd, true, true, true);
  };
  CodeMirror.extends.findNext = function (cm) {
    doSearch(cm);
  };
  CodeMirror.extends.findPrev = function (cm, data, cmd) {
    doSearch(cm, data, cmd, true);
  };
  CodeMirror.extends.clearSearch = function (cm) {
    clearSearch(cm);
  };
  CodeMirror.extends.replace = function (cm, data, cmd) {
    replace(cm, data);
  };
  CodeMirror.extends.replaceAll = function (cm, data, cmd) {
    replaceAll(cm, data, cmd, true);
  };
  var define = define;
  if (typeof define === 'function' && define.amd) {
    define('CodeMirror', [], function () {
      return CodeMirror;
    });
  }
});

/***/ }),

/***/ 337:
/***/ (function(module, exports) {

module.exports = require("sql-formatter");

/***/ }),

/***/ 338:
/***/ (function(module, exports) {

module.exports = require("js-beautify");

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/migrating");

/***/ })

/******/ });