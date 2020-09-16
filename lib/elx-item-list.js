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
/******/ 	return __webpack_require__(__webpack_require__.s = 310);
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

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(111);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(3);

var _locale2 = _interopRequireDefault(_locale);

var _resizeObserverPolyfill = __webpack_require__(24);

var _resizeObserverPolyfill2 = _interopRequireDefault(_resizeObserverPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  mixins: [_locale2.default],
  name: 'ElxItemList',
  componentName: 'ElxItemList',

  props: {
    icon: {
      type: String
    },
    data: {
      type: Array
    },
    draggable: Boolean,
    props: {
      default: function _default() {
        return {
          name: 'name',
          cnName: 'cnName'
        };
      }
    },
    multiselect: {
      type: Boolean,
      default: false
    },
    itemClass: Function
  },
  data: function data() {
    return {
      pos: {
        x: 0,
        y: 0
      },
      blankPos: {
        x: 0,
        y: 0
      },
      blankContentMenuShow: false,
      contentMenuShow: false,
      currentData: [],
      activeData: {},
      copyData: null,
      cutData: null,
      itemWidth: 120,
      lineNum: 1,
      itemMargin: 0,
      PreDataLength: 0,
      dropDoms: [],
      dropData: [],
      originPos: { x: 0, y: 0 },
      dropMousePos: { x: 0, y: 0 },
      browser: null,
      dropDomList: null,
      isMouseDown: false,
      dragging: false,
      ro: null
    };
  },

  computed: {
    isPaste: function isPaste() {
      if (!this.activeData.isCopy && !this.activeData.isCut) {
        return false;
      } else if (this.copyData === null && this.cutData === null) {
        return 'disabled';
      } else {
        return true;
      }
    }
  },
  methods: {
    getClass: function getClass(item) {
      if (typeof this.itemClass === 'function') {
        return this.itemClass(item);
      } else {
        return '';
      }
    },
    tranformStr: function tranformStr(str) {
      var strArr = str.split('-');
      for (var i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
      }
      return strArr.join('');
    },
    getDomDetail: function getDomDetail(dom) {
      var dropDetail = {
        dom: dom,
        size: { width: dom.offsetWidth, height: dom.offsetHeight },
        innerHTML: dom.innerHTML,
        class: dom.getAttribute('class'),
        style: dom.getAttribute('style')
      };
      return dropDetail;
    },
    createDropDomList: function createDropDomList(e) {
      var self = this;
      var dropData = this.dropData;
      var dropDoms = this.dropDoms;
      var li = void 0;
      if (dropData.length > 0) {
        var ul = document.createElement('ul');
        ul.setAttribute('class', 'drop-dom-list');
        ul.setAttribute('style', 'position: fixed; pointer-events: none; width: 120px; height: 135px');
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          ul.style.top = e.clientY + 20 + 'px';
          ul.style.left = e.clientX + 20 + 'px';
        } else {
          ul.style.top = e.clientY - 10 + 'px';
          ul.style.left = e.clientX - 20 + 'px';
        }
        var compatible = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
        var transform = '';
        dropDoms.map(function (dom, index) {
          li = document.createElement('li');
          transform = '';
          li.setAttribute('class', dom.class + ' drop-item');
          compatible.map(function (c) {
            transform = transform + c + 'transform: rotate(' + (index === dropDoms.length - 1 ? 0 : index % 2 === 0 ? 2 : -2) + 'deg);';
          });
          li.setAttribute('style', dom.style + ';' + transform + 'position: absolute; top: 0px; left: 0px; width: ' + dom.size.width + 'px; height: ' + dom.size.height + 'px; margin: 0px; background: #fff');
          li.innerHTML = dom.innerHTML;
          ul.appendChild(li);
        });
        var numLi = document.createElement('li');
        numLi.setAttribute('class', 'drop-dom-num');
        numLi.setAttribute('style', 'position: absolute; top: 2px; left: 5px');
        numLi.innerHTML = dropData.length;
        ul.appendChild(numLi);
        this.$el.appendChild(ul);
        this.addEvent(ul, 'dragstart', function (e) {
          self.handleDragStart(null, null, e);
        });
        this.addEvent(ul, 'dragstart', function (e) {
          self.handleDropDomMouseMove(null, null, e);
        });
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          setTimeout(function () {
            self.$el.removeChild(ul);
          });
        } else {
          this.dropDomList = ul;
        }
        return ul;
      }
      return null;
    },
    getDropDomList: function getDropDomList(item, index, e) {
      var self = this;
      var dropDom = void 0;
      this.dropDoms = [];
      this.dropData = [];
      this.originPos = {
        x: e.clientX,
        y: e.clientY
      };
      this.dropMousePos = { x: e.clientX, y: e.clientY };
      var selectedIdxArr = [];
      var childNodes = e.currentTarget.parentNode.childNodes;
      this.currentData.map(function (d, i) {
        if (d.selected && index !== i) {
          selectedIdxArr.push(i);
          dropDom = self.getDomDetail(childNodes[i]);
          self.dropDoms.push(dropDom);
          self.dropData.push(self.data[i]);
        }
      });
      if (selectedIdxArr.indexOf(index) < 0) {
        dropDom = this.getDomDetail(childNodes[index]);
        this.dropData.push(this.data[index]);
        this.dropDoms.push(dropDom);
      }
    },
    handleMouseDown: function handleMouseDown(item, index, e) {
      this.isMouseDown = true;
    },
    handleMouseMove: function handleMouseMove(item, index, e) {
      if (this.isMouseDown) {
        if (typeof DataTransfer.prototype.setDragImage !== 'function') {
          this.getDropDomList(item, index, e);
          var node = this.createDropDomList(e);
          if (node) {
            node.dragDrop();
          }
          this.isMouseDown = false;
        }
      }
    },
    handleDropDomMouseMove: function handleDropDomMouseMove(item, index, e) {},
    handleMouseUp: function handleMouseUp(item, index, e) {
      this.isMouseDown = false;
    },
    handleMouseLeave: function handleMouseLeave(item, index, e) {
      this.isMouseDown = false;
    },
    handleDragStart: function handleDragStart(item, index, e) {
      this.dragging = true;
      e.dataTransfer.setData('text', 'data');
      e.dataTransfer.effectAllowed = 'copy';
      if (typeof DataTransfer.prototype.setDragImage === 'function') {
        this.getDropDomList(item, index, e);
        var node = this.createDropDomList(e);
        if (node) {
          e.dataTransfer.setDragImage(node, -20, -20, e.currentTarget);
        }
      }
      this.$emit('drop-start', this.dropData);
    },
    handleDragEnter: function handleDragEnter(e) {
      if (!this.dragging) {
        return;
      }
      if (this.dropDomList) {
        this.$el.removeChild(this.dropDomList);
        this.dropDomList = null;
      }
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
      e.stopPropagation();
    },
    handleDragOver: function handleDragOver(e) {
      if (!this.dragging) {
        return;
      }
      e.dataTransfer.dropEffect = 'copy';
      e.preventDefault();
      e.stopPropagation();
    },
    handleDrop: function handleDrop(e) {
      if (!this.dragging) {
        return;
      }
      if (this.dropDomList) {
        console.log('Drop');
      }
      this.dragging = false;
      e.dataTransfer.dropEffect = 'copy';
      this.dropDoms = [];
      this.dropData = [];
      this.originPos = { x: 0, y: 0 };
      if (this.dropDomList) {
        this.dropDomList.style.top = '-200px';
        this.dropDomList.style.left = '-200px';
      }
    },
    selectItems: function selectItems(items) {
      for (var i in this.currentData) {
        this.currentData[i].selected = false;
      }
      for (var j in items) {
        var _index = this.data.indexOf(items[j]);
        this.currentData[_index].selected = true;
      }
    },
    formatData: function formatData() {
      var _fun = function _fun(node) {
        node.isEdit = 'isEdit' in node ? node.isEdit : true;
        node.isDelete = 'isDelete' in node ? node.isDelete : true;
        node.isCopy = 'isCopy' in node ? node.isCopy : true;
        node.isCut = 'isCut' in node ? node.isCut : true;
        node.selected = 'selected' in node ? node.selected : false;
      };
      var _data = Array.isArray(this.data) ? JSON.parse(JSON.stringify(this.data)) : [];
      for (var i = 0; i < _data.length; i++) {
        _fun(_data[i]);
      }
      return _data;
    },
    changePosY: function changePosY(ref, y) {
      var gap = 5;
      var bodyClientHeight = document.body.clientHeight;
      var bodyClientTop = document.body.clientTop;
      var height = this.$refs[ref].clientHeight;
      var elBottom = height + y;
      var viewHeight = bodyClientHeight + bodyClientTop;
      if (viewHeight < elBottom) {
        y = viewHeight - height - gap;
      }
      return y;
    },
    getEventPos: function getEventPos(e) {
      var x = e.clientX;
      var y = e.clientY;
      return { 'x': x, 'y': y };
    },
    blankRightClick: function blankRightClick(event) {
      var e = event || window.event;
      var pos = this.getEventPos(e);
      var self = this;
      if (e.which === 3) {
        this.contentMenuShow = false;
        this.blankContentMenuShow = false;
        this.blankPos.x = pos.x + 'px';
        this.blankPos.y = pos.y + 'px';
        this.blankContentMenuShow = true;
        this.$nextTick(function () {
          self.blankPos.y = self.changePosY('blankContentMenu', pos.y) + 'px';
        });
      }
      this.preventDefault(e);
      e.returnValue = false;
      return false;
    },
    handleClick: function handleClick(item, index) {
      this.activeData = item;
      if (!this.multiselect) {
        for (var i in this.currentData) {
          this.currentData[i].selected = false;
        }
        this.activeData.selected = !this.activeData.selected;
      } else {
        this.activeData.selected = !this.activeData.selected;
      }
      this.$emit('click', this.data[index], this.activeData.selected);
    },
    rightClick: function rightClick(item, event) {
      var e = event || window.event;
      var pos = this.getEventPos(e);
      var self = this;
      if (e.which === 3) {
        this.$emit('right-click', item);
        this.blankContentMenuShow = false;
        this.contentMenuShow = false;
        this.pos.x = pos.x + 'px';
        this.pos.y = pos.y + 'px';
        this.activeData = item;
        this.contentMenuShow = true;
        this.$nextTick(function () {
          self.pos.y = self.changePosY('contentMenu', pos.y) + 'px';
        });
      }
      this.preventDefault(e);
      e.returnValue = false;
      return false;
    },
    dblclickItem: function dblclickItem(item) {
      this.$emit('dblclick', item);
    },
    editItem: function editItem() {
      this.contentMenuShow = false;
      if (this.activeData.isEdit && this.activeData.isEdit !== 'disabled') {
        this.$emit('edit', this.activeData);
      }
    },
    deleteItem: function deleteItem() {
      this.contentMenuShow = false;
      if (this.activeData.isDelete && this.activeData.isDelete !== 'disabled') {
        this.$emit('delete', this.activeData);
      }
    },
    copyItem: function copyItem() {
      this.contentMenuShow = false;
      if (this.activeData.isCopy && this.activeData.isCopy !== 'disabled') {
        this.copyData = this.activeData;
        this.cutData = null;
        this.$emit('copy', this.activeData);
      }
    },
    cutItem: function cutItem() {
      this.contentMenuShow = false;
      if (this.activeData.isCut && this.activeData.isCut !== 'disabled') {
        this.copyData = null;
        this.cutData = this.activeData;
        var _index = this.currentData.indexOf(this.activeData);
        this.currentData.splice(_index, 1);
        this.$emit('cut', this.activeData);
      }
    },
    pasteItem: function pasteItem() {
      this.blankContentMenuShow = false;
      this.contentMenuShow = false;
      if (this.isPaste && this.activeData.isPaste !== 'disabled') {
        var _data = this.cutData !== null ? this.cutData : this.copyData;
        this.form = JSON.parse(JSON.stringify(_data));
        this.$emit('paste', this.form);
        this.cutData = null;
      }
    },
    preventDefault: function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault) {
        e.preventDefault();
      } else {
        e.returnvalue = false;
      }
    },
    parseFloat: function parseFloat(val) {
      val = window.parseFloat(val);
      return window.isNaN(val) ? 0 : val;
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
    getCss: function getCss(el) {
      var css = void 0;
      if (window.getComputedStyle) {
        css = window.getComputedStyle(el);
      } else {
        css = el.currentStyle;
      }
      return css;
    },
    getInnerWidth: function getInnerWidth(el) {
      var innerWidth = 0;
      var css = this.getCss(el);
      innerWidth = this.formatVal(css.width, el.clientWidth, -1) - this.parseFloat(css.paddingLeft) - this.parseFloat(css.paddingRight) - this.parseFloat(css.borderLeftWidth) - this.parseFloat(css.borderRightWidth);
      return innerWidth;
    },
    computeNum: function computeNum() {
      var _width = this.getInnerWidth(this.$el) - 1;
      var _num = window.parseInt(_width / this.itemWidth);
      for (var i = _num; i > -1; i--) {
        var _margin = window.parseInt((_width - i * this.itemWidth) / (i + 1));
        if (_margin > 9) {
          this.itemMargin = _margin;
          this.lineNum = i;
          break;
        }
      }
    },
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
        if (realLength > 30 && sub === -1) {
          sub = i;
        }
      }
      return sub !== -1 ? str.substring(0, sub) + '..' : str;
    },
    hideMenu: function hideMenu() {
      this.contentMenuShow = false;
      this.blankContentMenuShow = false;
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
    getTarget: function getTarget(event) {
      return event.target || event.srcElement;
    },
    dropEvent: function dropEvent(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    dragendEvent: function dragendEvent(e) {
      this.handleDrop(e);
      e.stopPropagation();
      e.preventDefault();
    }
  },
  watch: {
    data: function data(val, oldVal) {
      this.blankContentMenuShow = false;
      this.contentMenuShow = false;
      this.currentData = this.formatData();
      if (val.length !== this.PreDataLength) {
        this.computeNum();
      }
      this.PreDataLength = val.length;
    },
    currentData: function currentData(val, oldVal) {},
    multiselect: function multiselect(val, oldVal) {
      if (!val) {
        for (var i in this.currentData) {
          this.currentData[i].selected = false;
        }
      }
    }
  },
  created: function created() {
    this.currentData = this.formatData();
    this.PreDataLength = this.currentData.length;
  },
  mounted: function mounted() {
    var _self = this;
    this.$nextTick(function () {
      _self.dropDomList = this.$refs['dropDomList'];
      _self.computeNum();
      _self.ro = new _resizeObserverPolyfill2.default(function (entries) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var entry = _step.value;

            _self.computeNum(entry);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });

      _self.ro.observe(this.$el.parentNode);
      document.body.addEventListener('click', _self.hideMenu);
      document.body.addEventListener('dragenter', _self.handleDragEnter);
      document.body.addEventListener('dragover', _self.handleDragOver);
      document.body.addEventListener('drop', _self.dropEvent);
      document.body.addEventListener('dragend', _self.dragendEvent);
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.ro.unobserve(this.$el.parentNode);
    document.body.removeEventListener('click', this.hideMenu);
    document.body.removeEventListener('dragenter', this.handleDragEnter);
    document.body.removeEventListener('dragover', this.handleDragOver);
    document.body.removeEventListener('drop', this.dropEvent);
    document.body.removeEventListener('dragend', this.dragendEvent);
  }
};

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-item-list/src/item.vue?vue&type=template&id=a4a6124c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-item-list",on:{"contextmenu":function($event){$event.preventDefault();$event.stopPropagation();_vm.blankRightClick($event)}}},[_c('ul',_vm._l((_vm.currentData),function(item,index){return _c('li',{key:index,class:(item.selected?'activeItem ':' ') + _vm.getClass(item),style:({
        'margin-left': _vm.lineNum != 1 ? _vm.itemMargin + 'px' : '0px',
        'margin-right': (index + 1) % _vm.lineNum == 0 && _vm.lineNum != 1 ? _vm.itemMargin + 'px':'0px'
      }),attrs:{"draggable":_vm.draggable},on:{"mousedown":function($event){_vm.handleMouseDown(item, index, $event)},"mousemove":function($event){_vm.handleMouseMove(item, index, $event)},"mouseup":function($event){_vm.handleMouseUp(item, index, $event)},"mouseleave":function($event){_vm.handleMouseLeave(item, index, $event)},"dragstart":function($event){_vm.handleDragStart(item, index, $event)},"click":function($event){_vm.handleClick(item, index, $event)},"dblclick":function($event){_vm.dblclickItem(item)},"contextmenu":function($event){$event.preventDefault();$event.stopPropagation();_vm.rightClick(item, $event)}}},[_c('el-tooltip',{staticClass:"item",attrs:{"effect":"light","placement":"right","open-delay":1000,"content":item[_vm.props.cnName] || '无标题'}},[_c('div',[_c('div',{staticClass:"image"},[_c('span',{class:_vm.icon || item.icon || 'uex-icon-program-developed'})]),_c('div',{staticClass:"title"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.getCurLabel(item[_vm.props.cnName]))}})])])]),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.multiselect && item.selected),expression:"multiselect && item.selected"}],staticClass:"check"},[_c('span',{staticClass:"el-icon-check"})])])],1)}),0),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.blankContentMenuShow && _vm.isPaste),expression:"blankContentMenuShow && isPaste"}],ref:"blankContentMenu",staticClass:"elx-content-menu",style:({top: _vm.blankPos.y, left: _vm.blankPos.x})},[_c('ul',[_c('li',{class:_vm.isPaste == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.pasteItem($event)}}},[_c('span',{staticClass:"uex-icon-delete"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.paste')))])])])])]),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.contentMenuShow),expression:"contentMenuShow"}],ref:"contentMenu",staticClass:"elx-content-menu",style:({top: _vm.pos.y, left: _vm.pos.x})},[_vm._t("operate",null,{data:_vm.activeData}),_c('ul',[_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isEdit),expression:"activeData.isEdit"}],class:_vm.activeData.isEdit == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.editItem($event)}}},[_c('span',{staticClass:"uex-icon-edit"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.edit')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isDelete),expression:"activeData.isDelete"}],class:_vm.activeData.isDelete == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.deleteItem($event)}}},[_c('span',{staticClass:"uex-icon-delete"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.delete')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isCopy),expression:"activeData.isCopy"}],class:_vm.activeData.isCopy == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.copyItem($event)}}},[_c('span',{staticClass:"uex-icon-copy"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.copy')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isCut),expression:"activeData.isCut"}],class:_vm.activeData.isCut == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.cutItem($event)}}},[_c('span',{staticClass:"uex-icon-cross"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.cut')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.isPaste),expression:"isPaste"}],class:_vm.isPaste == 'disabled' ? 'disabled' : '',on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.pasteItem($event)}}},[_c('span',{staticClass:"uex-icon-copy"}),_c('span',[_vm._v(_vm._s(_vm.t('el.itemList.paste')))])])])],2)])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-item-list/src/item.vue?vue&type=template&id=a4a6124c&


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = require("resize-observer-polyfill");

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/locale");

/***/ }),

/***/ 310:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _item = __webpack_require__(311);

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_item2.default.install = function (Vue) {
  Vue.component(_item2.default.name, _item2.default);
};

exports.default = _item2.default;

/***/ }),

/***/ 311:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _item_vue_vue_type_template_id_a4a6124c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(223);
/* harmony import */ var _item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(110);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _item_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _item_vue_vue_type_template_id_a4a6124c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _item_vue_vue_type_template_id_a4a6124c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });