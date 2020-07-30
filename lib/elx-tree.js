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
/******/ 	return __webpack_require__(__webpack_require__.s = 307);
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

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(108);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 108:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _locale = __webpack_require__(3);

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  mixins: [_locale2.default],
  name: 'ElxTree',
  componentName: 'ElxTree',

  props: {
    data: {
      type: Array
    },
    defaultExpandedKeys: Array,
    currentNodeKey: String,
    props: {
      default: function _default() {
        return {
          children: 'children',
          label: 'label'
        };
      }
    },
    expandOnClickNode: Boolean,
    defaultExpandAll: Boolean,
    lazy: Boolean,
    load: Function,
    line: {
      default: true,
      Boolean: Boolean
    },
    draggable: Boolean,
    dropByOutside: Boolean,
    allowDrag: Function,
    allowDrop: Function
  },
  data: function data() {
    return {
      store: {},
      id: 1000,
      currentTreeData: [],
      activeNode: {},
      activeData: {},
      pos: {
        x: 0,
        y: 0
      },
      contentMenuShow: false,
      filterText: ''
    };
  },

  methods: {
    appendTree: function appendTree(data, parentNode) {
      this.$refs['elxTreeChild'].append(data, parentNode);
    },
    insertBefore: function insertBefore(data, refNode) {
      this.$refs['elxTreeChild'].insertBefore(data, refNode);
    },
    insertAfter: function insertAfter(data, refNode) {
      this.$refs['elxTreeChild'].insertAfter(data, refNode);
    },
    handleDragStart: function handleDragStart(node, e) {
      this.$emit('node-drag-start', node, e);
    },
    handleDragEnter: function handleDragEnter(draggingNode, dropNode, e) {
      this.$emit('node-drag-enter', draggingNode, dropNode, e);
    },
    handleDragLeave: function handleDragLeave(draggingNode, dropNode, e) {
      this.$emit('node-drag-leave', draggingNode, dropNode, e);
    },
    handleDragOver: function handleDragOver(draggingNode, dropNode, e) {
      this.$emit('node-drag-over', draggingNode, dropNode, e);
    },
    handleDragEnd: function handleDragEnd(draggingNode, dropNode, dropType, e) {
      this.$emit('node-drag-end', draggingNode, dropNode, dropType, e);
    },
    handleDrop: function handleDrop(draggingNode, dropNode, dropType, e) {
      this.$emit('node-drop', draggingNode, dropNode, dropType, e);
    },
    hasText: function hasText(label, value) {
      return String(label).toLowerCase().indexOf(String(value).toLowerCase()) !== -1;
    },
    childNodesHasText: function childNodesHasText(item) {
      var judge = false;
      var self = this;
      var func = function func(node) {
        if (Array.isArray(node.childNodes)) {
          var childNodes = node.childNodes;
          for (var i = 0; i < childNodes.length; i++) {
            if (self.hasText(childNodes[i].data.label, self.filterText)) {
              judge = true;
              return;
            }
            func(childNodes[i]);
          }
        }
      };
      func(item);
      return judge;
    },
    filterNode: function filterNode(value, data, node) {
      if (!value) return true;
      var isParentVal = false;
      var parentNodes = [];
      var self = this;
      var getParent = function getParent(node) {
        if (node.parent) {
          parentNodes.push(node.parent);
          isParentVal = isParentVal || self.hasText(node.parent.data.label, value);
          getParent(node.parent);
        }
      };
      getParent(node);
      var isVal = this.hasText(data.label, value);
      if (isVal) {
        node.hasText = true;
      } else {
        node.hasText = false;
      }
      this.$nextTick(function () {
        if (this.childNodesHasText(node)) {
          node.expand();
          data.isExpand = true;
        } else {
          data.isExpand = false;
          node.collapse();
        }
      });
      return isVal || isParentVal;
    },
    expandNode: function expandNode(key) {
      var _fun = function _fun(node) {
        if (!Array.isArray(node.children)) {
          return;
        }
        if (node.children.length === 0) {
          return;
        }
        if (node.id === key && node.children.length !== 0) {
          node.isExpand = true;
        }
        for (var i = 0; i < node.children.length; i++) {
          _fun(node.children[i]);
        }
      };
      for (var i = 0; i < this.currentTreeData.length; i++) {
        _fun(this.currentTreeData[i]);
      }
    },
    formatData: function formatData() {
      var _fun = function _fun(node) {
        node.isExpand = 'isExpand' in node ? node.isExpand : false;
        node.rename = 'rename' in node ? node.rename : false;
        node.isAdd = 'isAdd' in node ? node.isAdd : true;
        node.isEdit = 'isEdit' in node ? node.isEdit : true;
        node.isDelete = 'isDelete' in node ? node.isDelete : true;
        node.hasExtraAction = 'hasExtraAction' in node ? node.hasExtraAction : false;
        if ('children' in node) {
          if (Array.isArray(node.children)) {
            if (node.children.length === 0) {
              return;
            }
          } else {
            node.children = [];
            return;
          }
        } else {
          node.children = [];
          return;
        }
        for (var i = 0; i < node.children.length; i++) {
          _fun(node.children[i]);
        }
      };
      var _data = JSON.parse(JSON.stringify(this.data));
      for (var i = 0; i < _data.length; i++) {
        _fun(_data[i]);
      }
      return _data;
    },
    nodeExpand: function nodeExpand(data, node, obj) {
      data.isExpand = true;
    },
    nodeCollapse: function nodeCollapse(data, node, obj) {
      data.isExpand = false;
    },
    treeNodeClick: function treeNodeClick(data, node, obj, event) {
      this.contentMenuShow = false;
      this.$emit('node-click', node, event);
      this.renameFalse(event, node === this.activeNode);
    },
    nodeDblClick: function nodeDblClick(data, node, obj, event) {
      this.contentMenuShow = false;
      this.$emit('node-dblclick', node, event);
      this.renameFalse(event, node === this.activeNode);
    },
    getEventPos: function getEventPos(e) {
      var x = e.clientX;
      var y = e.clientY;
      return { 'x': x, 'y': y };
    },
    nodeClick: function nodeClick(node, data, store, event) {
      var e = event || window.event;
      var pos = this.getEventPos(e);
      if (e.which === 3) {
        this.$emit('right-click', node, event);
        this.contentMenuShow = false;
        this.renameFalse(event);
        this.pos.x = pos.x + 'px';
        this.pos.y = pos.y + 'px';
        this.activeData = data;
        this.store = store;
        this.activeNode = node;
        this.contentMenuShow = true;
      }
      this.preventDefault(e);
      e.returnValue = false;
      return false;
    },
    changeLabel: function changeLabel(data, event) {
      var e = event || window.event;
      data.label = e.target.value;
    },
    append: function append() {
      var _self = this;
      this.activeData.children.push({ id: this.id++, rename: false, isExpand: false, hasExtraAction: false, isEdit: true, isAdd: true, isDelete: true, label: '新增', children: [] });
      this.contentMenuShow = false;
      this.$nextTick(function () {
        _self.activeData.isExpand = _self.activeData.children.length !== 0;
        _self.activeNode.expand();
        _self.$emit('add', _self.activeNode);
      });
    },
    remove: function remove() {
      var _self = this;
      var _index = void 0;
      if ('children' in this.activeNode.parent.data) {
        _index = this.activeNode.parent.data.children.indexOf(this.activeData);
        this.activeNode.parent.data.children.splice(_index, 1);
        var _length = this.activeNode.parent.data.children.length;
        this.activeNode.parent.data.isExpand = _length !== 0;
      } else {
        _index = this.activeNode.parent.data.indexOf(this.activeData);
        this.activeNode.parent.data.splice(_index, 1);
      }
      this.activeNode.parent.removeChild(this.activeNode);
      this.contentMenuShow = false;
      this.$nextTick(function () {
        _self.$emit('remove', _self.activeNode);
      });
    },
    rename: function rename() {
      this.activeData.rename = true;
      this.contentMenuShow = false;
    },
    renameEmit: function renameEmit() {
      var _self = this;
      this.$nextTick(function () {
        _self.$emit('rename', _self.activeNode);
      });
    },
    getDisabled: function getDisabled() {
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
    changeRename: function changeRename(data) {
      data.rename = true;
    },
    renameFalse: function renameFalse(event, judge) {
      var e = event || window.event;
      if (e) {
        if (e.target.localName === 'input' && !('disabled' in e.target.attributes)) {
          return;
        }
      } else {
        if (judge) {
          return;
        }
      }
      var _fun = function _fun(node) {
        node.rename = false;
        if (!Array.isArray(node.children)) {
          return;
        }
        if (node.children.length === 0) {
          return;
        }
        for (var i = 0; i < node.children.length; i++) {
          _fun(node.children[i]);
        }
      };
      for (var i = 0; i < this.currentTreeData.length; i++) {
        _fun(this.currentTreeData[i]);
      }
    },
    renderContent: function renderContent(h, _ref) {
      var _this = this;

      var node = _ref.node,
          data = _ref.data,
          store = _ref.store;

      this.store = store;
      var self = this;
      var nodeClass = 'node level-' + node.level + ' child-' + node.childNodes.length;
      var level = this.data.length > 1 ? node.level : node.level - 2;
      var parentNodes = [];
      var getParent = function getParent(node) {
        if (node.parent) {
          parentNodes.push(node.parent);
          getParent(node.parent);
        }
      };
      getParent(node);
      nodeClass = node.nextNodesVisible ? nodeClass + ' has-next' : nodeClass;
      nodeClass = node.childNodesVisible ? nodeClass + ' has-child' : nodeClass;
      nodeClass = node.preNodesVisible ? nodeClass + ' has-pre' : nodeClass;
      nodeClass = node.parent ? node.parent.parent ? nodeClass + ' has-parent' : nodeClass : nodeClass;
      nodeClass = !node.isLeaf ? nodeClass + ' is-not-leaf' : nodeClass;
      var texts = [h('span', [data.label])];
      if (this.filterText) {
        if (node.hasText) {
          var indexs = [];
          var regexp = new RegExp(this.filterText, 'gi');
          var filterLength = this.filterText.length;
          data.label.replace(regexp, function (t, index, label) {
            indexs.push(index);
          });
          if (indexs.length > 0) {
            texts = [];
            var i = 0;
            indexs.map(function (index, pos) {
              var sliceText = data.label.slice(i, index);
              texts.push(h('span', [sliceText]));
              texts.push(h(
                'span',
                { 'class': 'filter' },
                [self.filterText]
              ));
              i = index + filterLength;
              if (pos === indexs.length - 1) {
                texts.push(h('span', [data.label.slice(i, data.label.length)]));
              }
            });
          }
        }
      }

      return h(
        'div',
        { 'class': nodeClass, on: {
            'dblclick': function dblclick($event) {
              return _this.nodeDblClick(node, data, store, $event);
            },
            'contextmenu': function contextmenu($event) {
              return _this.nodeClick(node, data, store, $event);
            }
          }
        },
        [this.line && level > 0 ? this._l(parentNodes, function (node, index) {
          return node.nextNodesVisible ? h('span', { 'class': 'line' + index, style: 'left: ' + (-index * 19 - 33) + 'px' }) : '';
        }) : '', h(
          'el-tooltip',
          { 'class': 'item', attrs: { 'open-delay': 1000, effect: 'light', content: data.label, placement: 'right' }
          },
          [h('span', [!data.icon ? !node.isLeaf ? node.expanded ? h('span', { 'class': 'uex-icon-folder-open' }) : h('span', { 'class': 'uex-icon-folder' }) : h('span', { 'class': 'uex-icon-document' }) : h('span', { 'class': data.icon }), data.rename ? h('input', {
            attrs: { type: 'text' },
            on: {
              'blur': function blur() {
                return _this.renameEmit(node);
              },
              'click': function click() {
                return _this.changeRename(data);
              },
              'input': function input($event) {
                return _this.changeLabel(data, $event);
              }
            },
            domProps: {
              'value': data.label
            }
          }) : this._l(texts, function (text) {
            return text;
          })])]
        )]
      );
    },
    initTree: function initTree() {
      for (var i in this.defaultExpandedKeys) {
        this.expandNode(this.defaultExpandedKeys[i]);
      }
      if (this.store.currentNode) {
        this.$emit('node-click', this.store.currentNode);
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
    docClick: function docClick(event) {
      this.contentMenuShow = false;
      this.renameFalse(event);
    }
  },
  watch: {
    data: function data(val, oldVal) {
      this.currentTreeData = this.formatData();
      if (Array.isArray(oldVal)) {
        if (oldVal.length === 0) {
          this.initTree();
        }
      }
    },
    currentTreeData: function currentTreeData(val, oldVal) {
      this.$emit('update:data', val);
    },
    filterText: function filterText(val) {
      this.$refs.elxTreeChild.filter(val);
    }
  },
  mounted: function mounted() {
    var _self = this;
    this.$nextTick(function () {
      document.body.addEventListener('click', this.docClick);
      _self.initTree();
    });
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('click', this.docClick);
  },
  created: function created() {
    this.currentTreeData = this.formatData();
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
//
//
//
//
//
//

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* reexport */ render; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* reexport */ staticRenderFns; });

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-tree/src/tree.vue?vue&type=template&id=73cba2c4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:'elx-tree ' + (_vm.line ? 'elx-tree-line ' : ' ') + (_vm.draggable ? 'draggable' : '')},[_c('el-input',{attrs:{"size":"mini","suffix-icon":"uex-icon-search","placeholder":_vm.t('el.tree.filter')},model:{value:(_vm.filterText),callback:function ($$v) {_vm.filterText=$$v},expression:"filterText"}}),_c('elx-el-tree',{ref:"elxTreeChild",attrs:{"node-key":"id","data":_vm.currentTreeData,"props":_vm.props,"lazy":_vm.lazy,"indent":19,"load":_vm.load,"render-content":_vm.renderContent,"expand-on-click-node":_vm.expandOnClickNode,"current-node-key":_vm.currentNodeKey,"default-expanded-keys":_vm.defaultExpandedKeys,"filter-node-method":_vm.filterNode,"default-expand-all":_vm.defaultExpandAll,"draggable":_vm.draggable,"allow-drop":_vm.allowDrop,"allow-drag":_vm.allowDrag,"drop-by-outside":_vm.dropByOutside},on:{"node-expand":_vm.nodeExpand,"node-collapse":_vm.nodeCollapse,"node-click":_vm.treeNodeClick,"node-drag-start":_vm.handleDragStart,"node-drag-enter":_vm.handleDragEnter,"node-drag-leave":_vm.handleDragLeave,"node-drag-over":_vm.handleDragOver,"node-drag-end":_vm.handleDragEnd,"node-drop":_vm.handleDrop}}),_c('transition',{attrs:{"name":"fade"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.contentMenuShow && (_vm.activeData.isDelete || _vm.activeData.isAdd || _vm.activeData.isEdit || _vm.activeData.hasExtraAction)),expression:"contentMenuShow && (activeData.isDelete || activeData.isAdd || activeData.isEdit || activeData.hasExtraAction)"}],staticClass:"elx-content-menu",style:({
        top: _vm.pos.y,
        left: _vm.pos.x
      })},[_c('ul',[_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isAdd),expression:"activeData.isAdd"}],on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.append($event)}}},[_c('span',{staticClass:"uex-icon-add"}),_c('span',[_vm._v(_vm._s(_vm.t('el.tree.addNode')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isEdit),expression:"activeData.isEdit"}],on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.rename($event)}}},[_c('span',{staticClass:"uex-icon-edit"}),_c('span',[_vm._v(_vm._s(_vm.t('el.tree.rename')))])]),_c('li',{directives:[{name:"show",rawName:"v-show",value:(_vm.activeData.isDelete),expression:"activeData.isDelete"}],on:{"click":function($event){$event.stopPropagation();$event.preventDefault();return _vm.remove($event)}}},[_c('span',{staticClass:"uex-icon-delete"}),_c('span',[_vm._v(_vm._s(_vm.t('el.tree.delete')))])]),_vm._t("operate",null,{data:_vm.activeData})],2)])])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-tree/src/tree.vue?vue&type=template&id=73cba2c4&


/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/locale");

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _tree = __webpack_require__(308);

var _tree2 = _interopRequireDefault(_tree);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_tree2.default.install = function (Vue) {
  Vue.component(_tree2.default.name, _tree2.default);
};

exports.default = _tree2.default;

/***/ }),

/***/ 308:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree_vue_vue_type_template_id_73cba2c4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(224);
/* harmony import */ var _tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(107);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _tree_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _tree_vue_vue_type_template_id_73cba2c4___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _tree_vue_vue_type_template_id_73cba2c4___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ })

/******/ });