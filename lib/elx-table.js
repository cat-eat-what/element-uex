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
/******/ 	return __webpack_require__(__webpack_require__.s = 287);
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

/***/ 21:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/vue-popper");

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/clickoutside");

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-table/src/table.vue?vue&type=template&id=d91348aa&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-table el-table",class:{
    'el-table--fit': _vm.fit,
    'el-table--striped': _vm.stripe,
    'el-table--border': _vm.border,
    'el-table--fluid-height': _vm.maxHeight,
    'el-table--enable-row-hover': !_vm.store.states.isComplex,
    'el-table--enable-row-transition':  true || false
  },on:{"mouseleave":function($event){_vm.handleMouseLeave($event)}}},[_c('div',{ref:"hiddenColumns",staticClass:"hidden-columns"},[_vm._t("default")],2),(_vm.showHeader)?_c('div',{ref:"headerWrapper",staticClass:"el-table__header-wrapper"},[_c('table-header',{style:({ width: _vm.layout.bodyWidth ? _vm.layout.bodyWidth + 'px' : '' }),attrs:{"store":_vm.store,"layout":_vm.layout,"border":_vm.border,"default-sort":_vm.defaultSort}})],1):_vm._e(),_c('div',{ref:"bodyWrapper",staticClass:"el-table__body-wrapper",style:([_vm.bodyHeight])},[_c('table-body',{style:({ width: _vm.bodyWidth }),attrs:{"draggable":_vm.draggable,"sort-by-drag":_vm.sortByDrag,"context":_vm.context,"store":_vm.store,"layout":_vm.layout,"first-row-key":_vm.firstRowKey,"last-row-key":_vm.lastRowKey,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle,"highlight":_vm.highlightCurrentRow},on:{"drop-start":_vm.handleDropStart}}),(!_vm.data || _vm.data.length === 0)?_c('div',{staticClass:"el-table__empty-block",style:({ width: _vm.bodyWidth })},[_c('span',{staticClass:"el-table__empty-text"},[_vm._t("empty",[_vm._v(_vm._s(_vm.emptyText || _vm.t('el.table.emptyText')))])],2)]):_vm._e()],1),(_vm.fixedColumns.length > 0)?_c('div',{ref:"fixedWrapper",staticClass:"el-table__fixed",style:([
      { width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : '' },
      _vm.fixedHeight
    ])},[(_vm.showHeader)?_c('div',{ref:"fixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[_c('table-header',{style:({ width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : '' }),attrs:{"fixed":"left","border":_vm.border,"store":_vm.store,"layout":_vm.layout}})],1):_vm._e(),_c('div',{ref:"fixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:([
        { top: _vm.layout.headerHeight + 'px' },
        _vm.fixedBodyHeight
      ])},[_c('table-body',{style:({ width: _vm.layout.fixedWidth ? _vm.layout.fixedWidth + 'px' : '' }),attrs:{"fixed":"left","draggable":_vm.draggable,"sort-by-drag":_vm.sortByDrag,"store":_vm.store,"layout":_vm.layout,"highlight":_vm.highlightCurrentRow,"first-row-key":_vm.firstRowKey,"last-row-key":_vm.lastRowKey,"row-class-name":_vm.rowClassName,"row-style":_vm.rowStyle},on:{"drop-start":_vm.handleDropStart}})],1)]):_vm._e(),(_vm.rightFixedColumns.length > 0)?_c('div',{ref:"rightFixedWrapper",staticClass:"el-table__fixed-right",style:([
      { width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : '' },
      { right: _vm.layout.scrollY ? (_vm.border ? _vm.layout.gutterWidth : (_vm.layout.gutterWidth || 1)) + 'px' : '' },
      _vm.fixedHeight
    ])},[(_vm.showHeader)?_c('div',{ref:"rightFixedHeaderWrapper",staticClass:"el-table__fixed-header-wrapper"},[_c('table-header',{style:({ width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : '' }),attrs:{"fixed":"right","border":_vm.border,"store":_vm.store,"layout":_vm.layout}})],1):_vm._e(),_c('div',{ref:"rightFixedBodyWrapper",staticClass:"el-table__fixed-body-wrapper",style:([
        { top: _vm.layout.headerHeight + 'px' },
        _vm.fixedBodyHeight
      ])},[_c('table-body',{style:({ width: _vm.layout.rightFixedWidth ? _vm.layout.rightFixedWidth + 'px' : '' }),attrs:{"fixed":"right","draggable":_vm.draggable,"sort-by-drag":_vm.sortByDrag,"store":_vm.store,"layout":_vm.layout,"row-class-name":_vm.rowClassName,"first-row-key":_vm.firstRowKey,"last-row-key":_vm.lastRowKey,"row-style":_vm.rowStyle,"highlight":_vm.highlightCurrentRow},on:{"drop-start":_vm.handleDropStart}})],1)]):_vm._e(),(_vm.rightFixedColumns.length > 0)?_c('div',{staticClass:"el-table__fixed-right-patch",style:({ width: _vm.layout.scrollY ? _vm.layout.gutterWidth + 'px' : '0', height: _vm.layout.headerHeight + 'px' })}):_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.resizeProxyVisible),expression:"resizeProxyVisible"}],ref:"resizeProxy",staticClass:"el-table__column-resize-proxy"})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-table/src/table.vue?vue&type=template&id=d91348aa&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 23:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/resize-event");

/***/ }),

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-table/src/filter-panel.vue?vue&type=template&id=5e488d26&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"el-zoom-in-top"}},[(_vm.multiple)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPopper),expression:"showPopper"}],staticClass:"el-table-filter"},[_c('div',{staticClass:"el-table-filter__content"},[_c('el-checkbox-group',{staticClass:"el-table-filter__checkbox-group",model:{value:(_vm.filteredValue),callback:function ($$v) {_vm.filteredValue=$$v},expression:"filteredValue"}},_vm._l((_vm.filters),function(filter,index){return _c('el-checkbox',{key:index,attrs:{"label":filter.value}},[_vm._v(_vm._s(filter.text))])}),1)],1),_c('div',{staticClass:"el-table-filter__bottom"},[_c('button',{class:{ 'is-disabled': _vm.filteredValue.length === 0 },attrs:{"disabled":_vm.filteredValue.length === 0},on:{"click":_vm.handleConfirm}},[_vm._v(_vm._s(_vm.t('el.table.confirmFilter')))]),_c('button',{on:{"click":_vm.handleReset}},[_vm._v(_vm._s(_vm.t('el.table.resetFilter')))])])]):_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPopper),expression:"showPopper"}],staticClass:"el-table-filter"},[_c('ul',{staticClass:"el-table-filter__list"},[_c('li',{staticClass:"el-table-filter__list-item",class:{ 'is-active': !_vm.filterValue },on:{"click":function($event){_vm.handleSelect(null)}}},[_vm._v(_vm._s(_vm.t('el.table.clearFilter')))]),_vm._l((_vm.filters),function(filter,index){return _c('li',{key:index,staticClass:"el-table-filter__list-item",class:{ 'is-active': _vm.isActive(filter) },attrs:{"label":filter.value},on:{"click":function($event){_vm.handleSelect(filter.value)}}},[_vm._v(_vm._s(filter.text))])})],2)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-table/src/filter-panel.vue?vue&type=template&id=5e488d26&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 28:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/debounce");

/***/ }),

/***/ 287:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table = __webpack_require__(288);

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_table2.default.install = function (Vue) {
  Vue.component(_table2.default.name, _table2.default);
};

exports.default = _table2.default;

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _table_vue_vue_type_template_id_d91348aa___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(223);
/* harmony import */ var _table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(88);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _table_vue_vue_type_template_id_d91348aa___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _table_vue_vue_type_template_id_d91348aa___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 289:
/***/ (function(module, exports) {

module.exports = require("throttle-debounce/throttle");

/***/ }),

/***/ 29:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/dom");

/***/ }),

/***/ 290:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(31);

var _vue2 = _interopRequireDefault(_vue);

var _debounce = __webpack_require__(28);

var _debounce2 = _interopRequireDefault(_debounce);

var _util = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortData = function sortData(data, states) {
  var sortingColumn = states.sortingColumn;
  if (!sortingColumn || typeof sortingColumn.sortable === 'string') {
    return data;
  }
  return (0, _util.orderBy)(data, states.sortProp, states.sortOrder, sortingColumn.sortMethod);
};

var getKeysMap = function getKeysMap(array, rowKey) {
  var arrayMap = {};
  (array || []).forEach(function (row, index) {
    arrayMap[(0, _util.getRowIdentity)(row, rowKey)] = { row: row, index: index };
  });
  return arrayMap;
};

var toggleRowSelection = function toggleRowSelection(states, row, selected) {
  var changed = false;
  var selection = states.selection;
  var index = selection.indexOf(row);
  if (typeof selected === 'undefined') {
    if (index === -1) {
      selection.push(row);
      changed = true;
    } else {
      selection.splice(index, 1);
      changed = true;
    }
  } else {
    if (selected && index === -1) {
      selection.push(row);
      changed = true;
    } else if (!selected && index > -1) {
      selection.splice(index, 1);
      changed = true;
    }
  }

  return changed;
};

var TableStore = function TableStore(table) {
  var initialState = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!table) {
    throw new Error('Table is required.');
  }
  this.table = table;

  this.states = {
    rowKey: null,
    _columns: [],
    originColumns: [],
    columns: [],
    fixedColumns: [],
    rightFixedColumns: [],
    isComplex: false,
    _data: null,
    filteredData: null,
    data: null,
    sortingColumn: null,
    sortProp: null,
    sortOrder: null,
    isAllSelected: false,
    selection: [],
    reserveSelection: false,
    selectable: null,
    currentRow: null,
    hoverRow: null,
    filters: {},
    expandRows: [],
    defaultExpandAll: false
  };

  for (var prop in initialState) {
    if (initialState.hasOwnProperty(prop) && this.states.hasOwnProperty(prop)) {
      this.states[prop] = initialState[prop];
    }
  }
};

TableStore.prototype.mutations = {
  setData: function setData(states, data) {
    var _this = this;

    var dataInstanceChanged = states._data !== data;
    states._data = data;
    states.data = sortData(data || [], states);

    // states.data.forEach((item) => {
    //   if (!item.$extra) {
    //     Object.defineProperty(item, '$extra', {
    //       value: {},
    //       enumerable: false
    //     });
    //   }
    // });

    this.updateCurrentRow();

    if (!states.reserveSelection) {
      if (dataInstanceChanged) {
        this.clearSelection();
      } else {
        this.cleanSelection();
      }
      this.updateAllSelected();
    } else {
      (function () {
        var rowKey = states.rowKey;
        if (rowKey) {
          (function () {
            var selection = states.selection;
            var selectedMap = getKeysMap(selection, rowKey);

            states.data.forEach(function (row) {
              var rowId = (0, _util.getRowIdentity)(row, rowKey);
              var rowInfo = selectedMap[rowId];
              if (rowInfo) {
                selection[rowInfo.index] = row;
              }
            });

            _this.updateAllSelected();
          })();
        } else {
          console.warn('WARN: rowKey is required when reserve-selection is enabled.');
        }
      })();
    }

    var defaultExpandAll = states.defaultExpandAll;
    if (defaultExpandAll) {
      this.states.expandRows = (states.data || []).slice(0);
    }

    _vue2.default.nextTick(function () {
      return _this.table.updateScrollY();
    });
  },
  changeSortCondition: function changeSortCondition(states) {
    var _this2 = this;

    states.data = sortData(states.filteredData || states._data || [], states);

    this.table.$emit('sort-change', {
      column: this.states.sortingColumn,
      prop: this.states.sortProp,
      order: this.states.sortOrder
    });

    _vue2.default.nextTick(function () {
      return _this2.table.updateScrollY();
    });
  },
  filterChange: function filterChange(states, options) {
    var _this3 = this;

    var column = options.column,
        values = options.values,
        silent = options.silent;

    if (values && !Array.isArray(values)) {
      values = [values];
    }

    var prop = column.property;
    var filters = {};

    if (prop) {
      states.filters[column.id] = values;
      filters[column.columnKey || column.id] = values;
    }

    var data = states._data;

    Object.keys(states.filters).forEach(function (columnId) {
      var values = states.filters[columnId];
      if (!values || values.length === 0) return;
      var column = (0, _util.getColumnById)(_this3.states, columnId);
      if (column && column.filterMethod) {
        data = data.filter(function (row) {
          return values.some(function (value) {
            return column.filterMethod.call(null, value, row);
          });
        });
      }
    });

    states.filteredData = data;
    states.data = sortData(data, states);

    if (!silent) {
      this.table.$emit('filter-change', filters);
    }

    _vue2.default.nextTick(function () {
      return _this3.table.updateScrollY();
    });
  },
  insertColumn: function insertColumn(states, column, index, parent) {
    var array = states._columns;
    if (parent) {
      array = parent.children;
      if (!array) array = parent.children = [];
    }

    if (typeof index !== 'undefined') {
      array.splice(index, 0, column);
    } else {
      array.push(column);
    }

    if (column.type === 'selection') {
      states.selectable = column.selectable;
      states.reserveSelection = column.reserveSelection;
    }

    this.updateColumns();
    this.scheduleLayout();
  },
  removeColumn: function removeColumn(states, column) {
    var _columns = states._columns;
    if (_columns) {
      _columns.splice(_columns.indexOf(column), 1);
    }

    this.updateColumns();
    this.scheduleLayout();
  },
  setHoverRow: function setHoverRow(states, row) {
    states.hoverRow = row;
  },
  setCurrentRow: function setCurrentRow(states, row) {
    var oldCurrentRow = states.currentRow;
    states.currentRow = row;

    if (oldCurrentRow !== row) {
      this.table.$emit('current-change', row, oldCurrentRow);
    }
  },
  rowSelectedChanged: function rowSelectedChanged(states, row) {
    var changed = toggleRowSelection(states, row);
    var selection = states.selection;

    if (changed) {
      var table = this.table;
      table.$emit('selection-change', selection);
      table.$emit('select', selection, row);
    }

    this.updateAllSelected();
  },


  toggleRowExpanded: function toggleRowExpanded(states, row, expanded) {
    var expandRows = states.expandRows;
    if (typeof expanded !== 'undefined') {
      var index = expandRows.indexOf(row);
      if (expanded) {
        if (index === -1) expandRows.push(row);
      } else {
        if (index !== -1) expandRows.splice(index, 1);
      }
    } else {
      var _index = expandRows.indexOf(row);
      if (_index === -1) {
        expandRows.push(row);
      } else {
        expandRows.splice(_index, 1);
      }
    }
    this.table.$emit('expand', row, expandRows.indexOf(row) !== -1);
  },

  toggleAllSelection: (0, _debounce2.default)(10, function (states) {
    var data = states.data || [];
    var value = !states.isAllSelected;
    var selection = this.states.selection;
    var selectionChanged = false;

    data.forEach(function (item, index) {
      if (states.selectable) {
        if (states.selectable.call(null, item, index) && toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      } else {
        if (toggleRowSelection(states, item, value)) {
          selectionChanged = true;
        }
      }
    });

    var table = this.table;
    if (selectionChanged) {
      table.$emit('selection-change', selection);
    }
    table.$emit('select-all', selection);
    states.isAllSelected = value;
  })
};

var doFlattenColumns = function doFlattenColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push.apply(result, doFlattenColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

TableStore.prototype.updateColumns = function () {
  var states = this.states;
  var _columns = states._columns || [];
  states.fixedColumns = _columns.filter(function (column) {
    return column.fixed === true || column.fixed === 'left';
  });
  states.rightFixedColumns = _columns.filter(function (column) {
    return column.fixed === 'right';
  });

  if (states.fixedColumns.length > 0 && _columns[0] && _columns[0].type === 'selection' && !_columns[0].fixed) {
    _columns[0].fixed = true;
    states.fixedColumns.unshift(_columns[0]);
  }
  states.originColumns = [].concat(states.fixedColumns).concat(_columns.filter(function (column) {
    return !column.fixed;
  })).concat(states.rightFixedColumns);
  states.columns = doFlattenColumns(states.originColumns);
  states.isComplex = states.fixedColumns.length > 0 || states.rightFixedColumns.length > 0;
};

TableStore.prototype.isSelected = function (row) {
  return (this.states.selection || []).indexOf(row) > -1;
};

TableStore.prototype.clearSelection = function () {
  var states = this.states;
  states.isAllSelected = false;
  var oldSelection = states.selection;
  states.selection = [];
  if (oldSelection.length > 0) {
    this.table.$emit('selection-change', states.selection);
  }
};

TableStore.prototype.setExpandRowKeys = function (rowKeys) {
  var expandRows = [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  if (!rowKey) throw new Error('[Table] prop row-key should not be empty.');
  var keysMap = getKeysMap(data, rowKey);
  rowKeys.forEach(function (key) {
    var info = keysMap[key];
    if (info) {
      expandRows.push(info.row);
    }
  });

  this.states.expandRows = expandRows;
};

TableStore.prototype.toggleRowSelection = function (row, selected) {
  var changed = toggleRowSelection(this.states, row, selected);
  if (changed) {
    this.table.$emit('selection-change', this.states.selection);
  }
};

TableStore.prototype.cleanSelection = function () {
  var selection = this.states.selection || [];
  var data = this.states.data;
  var rowKey = this.states.rowKey;
  var deleted = void 0;
  if (rowKey) {
    deleted = [];
    var selectedMap = getKeysMap(selection, rowKey);
    var dataMap = getKeysMap(data, rowKey);
    for (var key in selectedMap) {
      if (selectedMap.hasOwnProperty(key) && !dataMap[key]) {
        deleted.push(selectedMap[key].row);
      }
    }
  } else {
    deleted = selection.filter(function (item) {
      return data.indexOf(item) === -1;
    });
  }

  deleted.forEach(function (deletedItem) {
    selection.splice(selection.indexOf(deletedItem), 1);
  });

  if (deleted.length) {
    this.table.$emit('selection-change', selection);
  }
};

TableStore.prototype.updateAllSelected = function () {
  var states = this.states;
  var selection = states.selection,
      rowKey = states.rowKey,
      selectable = states.selectable,
      data = states.data;

  if (!data || data.length === 0) {
    states.isAllSelected = false;
    return;
  }

  var selectedMap = void 0;
  if (rowKey) {
    selectedMap = getKeysMap(states.selection, rowKey);
  }

  var isSelected = function isSelected(row) {
    if (selectedMap) {
      return !!selectedMap[(0, _util.getRowIdentity)(row, rowKey)];
    } else {
      return selection.indexOf(row) !== -1;
    }
  };

  var isAllSelected = true;
  var selectedCount = 0;
  for (var i = 0, j = data.length; i < j; i++) {
    var item = data[i];
    if (selectable) {
      var isRowSelectable = selectable.call(null, item, i);
      if (isRowSelectable) {
        if (!isSelected(item)) {
          isAllSelected = false;
          break;
        } else {
          selectedCount++;
        }
      }
    } else {
      if (!isSelected(item)) {
        isAllSelected = false;
        break;
      } else {
        selectedCount++;
      }
    }
  }

  if (selectedCount === 0) isAllSelected = false;

  states.isAllSelected = isAllSelected;
};

TableStore.prototype.scheduleLayout = function () {
  this.table.debouncedLayout();
};

TableStore.prototype.setCurrentRowKey = function (key) {
  var states = this.states;
  var rowKey = states.rowKey;
  if (!rowKey) throw new Error('[Table] row-key should not be empty.');
  var data = states.data || [];
  var keysMap = getKeysMap(data, rowKey);
  var info = keysMap[key];
  if (info) {
    states.currentRow = info.row;
  }
};

TableStore.prototype.updateCurrentRow = function () {
  var states = this.states;
  var table = this.table;
  var data = states.data || [];
  var oldCurrentRow = states.currentRow;

  if (data.indexOf(oldCurrentRow) === -1) {
    states.currentRow = null;

    if (states.currentRow !== oldCurrentRow) {
      table.$emit('current-change', null, oldCurrentRow);
    }
  }
};

TableStore.prototype.commit = function (name) {
  var mutations = this.mutations;
  if (mutations[name]) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    mutations[name].apply(this, [this.states].concat(args));
  } else {
    throw new Error('Action not found: ' + name);
  }
};

exports.default = TableStore;

/***/ }),

/***/ 291:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _scrollbarWidth = __webpack_require__(292);

var _scrollbarWidth2 = _interopRequireDefault(_scrollbarWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TableLayout = function () {
  function TableLayout(options) {
    _classCallCheck(this, TableLayout);

    this.table = null;
    this.store = null;
    this.columns = null;
    this.fit = true;
    this.showHeader = true;

    this.height = null;
    this.scrollX = false;
    this.scrollY = false;
    this.bodyWidth = null;
    this.fixedWidth = null;
    this.rightFixedWidth = null;
    this.tableHeight = null;
    this.headerHeight = 44; // Table Header Height
    this.viewportHeight = null; // Table Height - Scroll Bar Height
    this.bodyHeight = null; // Table Height - Table Header Height
    this.fixedBodyHeight = null; // Table Height - Table Header Height - Scroll Bar Height
    this.gutterWidth = (0, _scrollbarWidth2.default)();

    for (var name in options) {
      if (options.hasOwnProperty(name)) {
        this[name] = options[name];
      }
    }

    if (!this.table) {
      throw new Error('table is required for Table Layout');
    }
    if (!this.store) {
      throw new Error('store is required for Table Layout');
    }
  }

  _createClass(TableLayout, [{
    key: 'updateScrollY',
    value: function updateScrollY() {
      var height = this.height;
      if (typeof height !== 'string' && typeof height !== 'number') return;
      var bodyWrapper = this.table.bodyWrapper;
      if (this.table.$el && bodyWrapper) {
        var body = bodyWrapper.querySelector('.el-table__body');
        this.scrollY = body.offsetHeight > bodyWrapper.offsetHeight;
      }
    }
  }, {
    key: 'setHeight',
    value: function setHeight(value) {
      var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'height';

      var el = this.table.$el;
      if (typeof value === 'string' && /^\d+$/.test(value)) {
        value = Number(value);
      }

      this.height = value;

      if (!el) return;
      if (typeof value === 'number') {
        el.style[prop] = value + 'px';

        this.updateHeight();
      } else if (typeof value === 'string') {
        if (value === '') {
          el.style[prop] = '';
        }
        this.updateHeight();
      }
    }
  }, {
    key: 'setMaxHeight',
    value: function setMaxHeight(value) {
      return this.setHeight(value, 'max-height');
    }
  }, {
    key: 'updateHeight',
    value: function updateHeight() {
      var height = this.tableHeight = this.table.$el.clientHeight;
      var noData = !this.table.data || this.table.data.length === 0;
      var headerWrapper = this.table.$refs.headerWrapper;

      if (this.showHeader && !headerWrapper) return;
      if (!this.showHeader) {
        this.headerHeight = 0;
        if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
          this.bodyHeight = height;
        }
        this.fixedBodyHeight = this.scrollX ? height - this.gutterWidth : height;
      } else {
        var headerHeight = this.headerHeight = headerWrapper.offsetHeight;
        var bodyHeight = height - headerHeight;
        if (this.height !== null && (!isNaN(this.height) || typeof this.height === 'string')) {
          this.bodyHeight = bodyHeight;
        }
        this.fixedBodyHeight = this.scrollX ? bodyHeight - this.gutterWidth : bodyHeight;
      }
      this.viewportHeight = this.scrollX ? height - (noData ? 0 : this.gutterWidth) : height;
    }
  }, {
    key: 'update',
    value: function update() {
      var fit = this.fit;
      var columns = this.table.columns;
      var bodyWidth = this.table.$el.clientWidth;
      var bodyMinWidth = 0;

      var flattenColumns = [];
      columns.forEach(function (column) {
        if (column.isColumnGroup) {
          flattenColumns.push.apply(flattenColumns, column.columns);
        } else {
          flattenColumns.push(column);
        }
      });

      var flexColumns = flattenColumns.filter(function (column) {
        return typeof column.width !== 'number';
      });

      if (flexColumns.length > 0 && fit) {
        flattenColumns.forEach(function (column) {
          bodyMinWidth += column.width || column.minWidth || 80;
        });

        if (bodyMinWidth < bodyWidth - this.gutterWidth) {
          // DON'T HAVE SCROLL BAR
          this.scrollX = false;

          var totalFlexWidth = bodyWidth - this.gutterWidth - bodyMinWidth;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth;
          } else {
            (function () {
              var allColumnsWidth = flexColumns.reduce(function (prev, column) {
                return prev + (column.minWidth || 80);
              }, 0);
              var flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
              var noneFirstWidth = 0;

              flexColumns.forEach(function (column, index) {
                if (index === 0) return;
                var flexWidth = Math.floor((column.minWidth || 80) * flexWidthPerPixel);
                noneFirstWidth += flexWidth;
                column.realWidth = (column.minWidth || 80) + flexWidth;
              });

              flexColumns[0].realWidth = (flexColumns[0].minWidth || 80) + totalFlexWidth - noneFirstWidth;
            })();
          }
        } else {
          // HAVE HORIZONTAL SCROLL BAR
          this.scrollX = true;
          flexColumns.forEach(function (column) {
            column.realWidth = column.minWidth;
          });
        }

        this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      } else {
        flattenColumns.forEach(function (column) {
          if (!column.width && !column.minWidth) {
            column.realWidth = 80;
          } else {
            column.realWidth = column.width || column.minWidth;
          }

          bodyMinWidth += column.realWidth;
        });
        this.scrollX = bodyMinWidth > bodyWidth;

        this.bodyWidth = bodyMinWidth;
      }

      var fixedColumns = this.store.states.fixedColumns;

      if (fixedColumns.length > 0) {
        var fixedWidth = 0;
        fixedColumns.forEach(function (column) {
          fixedWidth += column.realWidth;
        });

        this.fixedWidth = fixedWidth;
      }

      var rightFixedColumns = this.store.states.rightFixedColumns;
      if (rightFixedColumns.length > 0) {
        var rightFixedWidth = 0;
        rightFixedColumns.forEach(function (column) {
          rightFixedWidth += column.realWidth;
        });

        this.rightFixedWidth = rightFixedWidth;
      }
    }
  }]);

  return TableLayout;
}();

exports.default = TableLayout;

/***/ }),

/***/ 292:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/scrollbar-width");

/***/ }),

/***/ 293:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(30);

var _dom = __webpack_require__(29);

var _debounce = __webpack_require__(28);

var _debounce2 = _interopRequireDefault(_debounce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

  props: {
    store: {
      required: true
    },
    context: {},
    layout: {
      required: true
    },
    firstRowKey: String,
    lastRowKey: String,
    rowClassName: [String, Function],
    rowStyle: [Object, Function],
    fixed: String,
    highlight: Boolean,
    draggable: Boolean,
    sortByDrag: {
      type: Boolean,
      default: true
    }
  },

  render: function render(h) {
    var _this = this;

    var columnsHidden = this.columns.map(function (column, index) {
      return _this.isColumnHidden(index);
    });
    return h('div', [h(
      'table',
      {
        'class': 'el-table__body',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          width: '100%',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: {
            name: column.id,
            width: column.realWidth || column.width
          }
        });
      })]), h(
        'div',
        { 'class': 'table-drag-area' },
        [this._l(this.data, function (row, $index) {
          return [h(
            'tr',
            {
              style: _this.rowStyle ? _this.getRowStyle(row, $index) : $index === _this.dragIndex && _this.isDrag ? 'visibility: hidden;' : null,
              attrs: { draggable: _this.draggable
              },
              on: {
                'dragstart': function dragstart($event) {
                  return _this.handleDragStart(row, $index, $event);
                },
                'dblclick': function dblclick($event) {
                  return _this.handleDoubleClick($event, row);
                },
                'click': function click($event) {
                  return _this.handleClick($event, row);
                },
                'contextmenu': function contextmenu($event) {
                  return _this.handleContextMenu($event, row);
                },
                'mouseenter': function mouseenter(_) {
                  return _this.handleMouseEnter($index);
                },
                'mousedown': function mousedown($event) {
                  return _this.handleMouseDown(row, $index, $event);
                },
                'mousemove': function mousemove($event) {
                  return _this.handleMouseMove(row, $index, $event);
                },
                'mouseup': function mouseup($event) {
                  return _this.handleMouseUp(row, $index, $event);
                },
                'mouseleave': function mouseleave($event) {
                  return _this.handleMouseLeave(row, $index, $event);
                }
              },

              key: _this.table.rowKey ? _this.getKeyOfRow(row, $index) : $index,

              'class': [_this.getRowClass(row, $index), $index === _this.dragIndex && _this.isDrag ? 'elx-drag-row' : ''] },
            [_this._l(_this.columns, function (column, cellIndex) {
              return h(
                'td',
                {
                  on: {
                    'mousedown': function mousedown($event) {
                      return _this.handleDown($event, row, $index, column);
                    },
                    'mouseenter': function mouseenter($event) {
                      return _this.handleCellMouseEnter($event, row);
                    },
                    'mouseleave': _this.handleCellMouseLeave
                  },

                  'class': [column.id, column.align, column.className || '', columnsHidden[cellIndex] ? 'is-hidden' : '']
                },
                [column.renderCell.call(_this._renderProxy, h, { row: row, column: column, $index: $index, store: _this.store, _self: _this.context || _this.table.$vnode.context }, columnsHidden[cellIndex])]
              );
            }), !_this.fixed && _this.layout.scrollY && _this.layout.gutterWidth ? h('td', { 'class': 'gutter' }) : '']
          ), _this.store.states.expandRows.indexOf(row) > -1 && !_this.isDrag ? h(
            'tr',
            {
              'class': 'expand-tr',
              attrs: { draggable: _this.draggable
              },
              on: {
                'dragstart': function dragstart($event) {
                  return _this.handleDragStart(row, $index, $event, 'expand');
                },
                'mousedown': function mousedown($event) {
                  return _this.handleMouseDown(row, $index, $event);
                },
                'mousemove': function mousemove($event) {
                  return _this.handleMouseMove(row, $index, $event);
                },
                'mouseup': function mouseup($event) {
                  return _this.handleMouseUp(row, $index, $event);
                },
                'mouseleave': function mouseleave($event) {
                  return _this.handleMouseLeave(row, $index, $event);
                }
              }
            },
            [h(
              'td',
              {
                attrs: { colspan: _this.columns.length },
                'class': 'el-table__expanded-cell' },
              [_this.table.renderExpanded ? _this.table.renderExpanded(h, { row: row, $index: $index, store: _this.store }) : '']
            )]
          ) : ''];
        }).concat(h('el-tooltip', {
          attrs: { effect: this.table.tooltipEffect, placement: 'top', content: this.tooltipContent },
          ref: 'tooltip' }))]
      )]
    ), this.isDrag ? h(
      'div',
      {
        'class': 'elx-drag-item',
        style: 'top:' + this.dragTop,
        on: {
          'mousedown': function mousedown($event) {
            return _this.handleDragDown($event);
          },
          'mouseup': function mouseup($event) {
            return _this.handleDragUp($event);
          }
        }
      },
      [h(
        'table',
        {
          attrs: { cellspacing: '0', cellpadding: '0', border: '0', width: '100%' },
          'class': 'el-table__body' },
        [h('colgroup', [this._l(this.columns, function (column) {
          return h('col', {
            attrs: {
              name: column.id,
              width: column.realWidth || column.width
            }
          });
        })]), h('tbody', [h('tr', [this._l(this.columns, function (column, cellIndex) {
          return h('td', [column.renderCell.call(_this._renderProxy, h, { row: _this.dragData, $index: null, column: column, store: _this.store, _self: _this.context || _this.table.$vnode.context }, columnsHidden[cellIndex])]);
        })])])]
      )]
    ) : '']);
  },


  watch: {
    'store.states.hoverRow': function storeStatesHoverRow(newVal, oldVal) {
      if (!this.store.states.isComplex) return;
      var el = this.$el;
      if (!el) return;
      var rows = el.querySelectorAll('tbody > tr');
      var oldRow = rows[oldVal];
      var newRow = rows[newVal];
      if (oldRow) {
        oldRow.classList.remove('hover-row');
      }
      if (newRow) {
        newRow.classList.add('hover-row');
      }
    },
    'store.states.currentRow': function storeStatesCurrentRow(newVal, oldVal) {
      if (!this.highlight) return;
      var el = this.$el;
      if (!el) return;
      var data = this.store.states.data;
      var expandRows = this.store.states.expandRows;
      var expandIndexArr = [];
      expandRows.map(function (expandRow) {
        expandIndexArr.push(data.indexOf(expandRow));
      });
      expandIndexArr = expandIndexArr.sort(function (a, b) {
        return a > b ? 1 : -1;
      });
      var rows = el.querySelectorAll('.table-drag-area > tr');
      var oldRowIndex = data.indexOf(oldVal);
      var oldRowFilter = expandIndexArr.filter(function (index) {
        return index < oldRowIndex;
      });
      var newRowIndex = data.indexOf(newVal);
      var newRowFilter = expandIndexArr.filter(function (index) {
        return index < newRowIndex;
      });
      var oldRow = rows[oldRowIndex + oldRowFilter.length];
      var newRow = rows[newRowIndex + newRowFilter.length];
      if (oldRow) {
        oldRow.classList.remove('current-row');
      } else if (rows) {
        [].forEach.call(rows, function (row) {
          return row.classList.remove('current-row');
        });
      }
      if (newRow) {
        newRow.classList.add('current-row');
      }
    }
  },

  computed: {
    table: function table() {
      return this.$parent;
    },
    data: function data() {
      return this.store.states.data;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  data: function data() {
    return {
      tooltipContent: '',
      dragData: {},
      dragIndex: null,
      isDrag: false,
      dragTop: '0px',
      dragItem: null,
      mousePos: { x: '', y: '' },
      mousePosGap: { x: '', y: '' },
      changeItems: [],
      dropDoms: [],
      dropData: [],
      originPos: { x: 0, y: 0 },
      dropMousePos: { x: 0, y: 0 },
      isMouseDown: false,
      dragging: false
    };
  },
  created: function created() {
    this.activateTooltip = (0, _debounce2.default)(50, function (tooltip) {
      tooltip.handleShowPopper();
      tooltip.showPopper = true;
    });
  },


  mounted: function mounted() {
    document.body.addEventListener('mouseup', this.handleDragUp);
    document.body.addEventListener('mousemove', this.handleDragMove);
    document.body.addEventListener('mouseleave', this.hhandleDragUp);
    document.body.addEventListener('dragenter', this.handleDragEnter);
    document.body.addEventListener('dragover', this.handleDragOver);
    document.body.addEventListener('drop', this.handleBodyDrop);
    document.body.addEventListener('dragend', this.handleDragEnd);
  },
  beforeDestroy: function beforeDestroy() {
    document.body.removeEventListener('mouseup', this.handleDragUp);
    document.body.removeEventListener('mousemove', this.handleDragMove);
    document.body.removeEventListener('mouseleave', this.hhandleDragUp);
    document.body.removeEventListener('dragenter', this.handleDragEnter);
    document.body.removeEventListener('dragover', this.handleDragOver);
    document.body.removeEventListener('drop', this.handleBodyDrop);
    document.body.removeEventListener('dragend', this.handleDragEnd);
  },

  methods: {
    handleBodyDrop: function handleBodyDrop(e) {
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragEnd: function handleDragEnd(e) {
      this.handleDrop(e);
      e.stopPropagation();
      e.preventDefault();
    },
    getTarget: function getTarget(event) {
      return event.target || event.srcElement;
    },
    getRowByIndex: function getRowByIndex(index, nodes, e) {
      var data = this.store.states.data;
      var expandRows = this.store.states.expandRows;
      var expandIndexArr = [];
      expandRows.map(function (expandRow) {
        expandIndexArr.push(data.indexOf(expandRow));
      });
      expandIndexArr = expandIndexArr.sort(function (a, b) {
        return a > b ? 1 : -1;
      });
      var rows = nodes;
      var rowIndex = index;
      var rowFilter = expandIndexArr.filter(function (index) {
        return index < rowIndex;
      });
      var row = rows[rowIndex + rowFilter.length];
      if (expandIndexArr.indexOf(index) > -1) {
        return [this.getDomDetail(row, e), this.getDomDetail(rows[rowIndex + rowFilter.length + 1], e)];
      } else {
        return [this.getDomDetail(row, e)];
      }
    },
    tranformStr: function tranformStr(str) {
      var strArr = str.split('-');
      for (var i = 1; i < strArr.length; i++) {
        strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
      }
      return strArr.join('');
    },
    getDomDetail: function getDomDetail(dom, e) {
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
      var table;
      var colgroup;
      var col;
      var tr;
      if (dropData.length > 0) {
        var div = document.createElement('div');
        div.setAttribute('class', 'drop-dom-list');
        div.setAttribute('style', 'position: fixed; pointer-events: none; width: ' + this.dropDoms[0].size.width + 'px; height: 120px');
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          div.style.top = e.clientY + 20 + 'px';
          div.style.left = e.clientX + 20 + 'px';
        } else {
          div.style.top = e.clientY - 10 + 'px';
          div.style.left = e.clientX - 20 + 'px';
        }
        var compatible = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
        var transform = '';

        dropDoms.map(function (dom, index) {
          table = document.createElement('table');
          table.setAttribute('class', 'drop-item el-table__body');
          table.setAttribute('cellspacing', '0');
          table.setAttribute('cellpadding', '0');
          table.setAttribute('border', '0');
          transform = '';
          compatible.map(function (c) {
            transform = transform + c + 'transform: rotate(' + (index === dropDoms.length - 1 ? 0 : index % 2 === 0 ? 0 : 0) + 'deg);';
          });
          table.setAttribute('style', dom.style + ';' + transform + 'position: absolute; top: ' + 2 * (dropDoms.length - 1 - index) + 'px; left: ' + 2 * (dropDoms.length - 1 - index) + 'px; width: ' + dom.size.width + 'px; height: ' + dom.size.height + 'px; margin: 0px; background: #fff; border:1px solid #d3d3d3');

          colgroup = document.createElement('colgroup');
          self.columns.map(function (column) {
            col = document.createElement('col');
            col.setAttribute('name', column.id);
            col.setAttribute('width', column.realWidth || column.width);
            colgroup.appendChild(col);
          });

          tr = dom.dom.cloneNode(true);

          table.appendChild(colgroup);
          table.appendChild(tr);

          div.appendChild(table);
        });
        var numDiv = document.createElement('div');
        numDiv.setAttribute('class', 'drop-dom-num');
        numDiv.setAttribute('style', 'position: absolute; top: 2px; left: 5px');
        numDiv.innerHTML = dropData.length;
        div.appendChild(numDiv);
        this.$el.appendChild(div);

        div.addEventListener('dragstart', function (e) {
          self.handleDragStart(null, null, e);
        });
        div.addEventListener('dragstart', function (e) {
          self.handleDropDomMouseMove(null, null, e);
        });
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          setTimeout(function () {
            self.$el.removeChild(div);
          });
        } else {
          this.dropDomList = div;
        }

        return div;
      }
      return null;
    },
    getDropDomList: function getDropDomList(item, index, e) {
      var self = this;
      var dropDoms;
      var pos = {
        x: e.clientX,
        y: e.clientY
      };
      this.dropMousePos = { x: pos.x, y: pos.y };
      this.dropDoms = [];
      this.dropData = [];
      this.originPos = pos;
      var selectedIdxArr = [];
      var childNodes = e.currentTarget.parentNode.childNodes;
      this.store.states.selection.map(function (d, i) {
        i = self.data.indexOf(d);
        if (index !== i) {
          selectedIdxArr.push(i);
          dropDoms = self.getRowByIndex(i, childNodes, e);
          self.dropDoms = self.dropDoms.concat(dropDoms[0]);

          self.dropData.push(self.data[i]);
        }
      });
      if (selectedIdxArr.indexOf(index) < 0) {
        dropDoms = this.getRowByIndex(index, childNodes, e);
        this.dropDoms = this.dropDoms.concat(dropDoms[0]);
        this.dropData.push(this.data[index]);
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
    handleDragStart: function handleDragStart(item, index, e, type) {
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
      if (this.dropDomList) {
        this.$el.removeChild(this.dropDomList);
        this.dropDomList = null;
      }
      if (!this.dragging) {
        return;
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
    getKeyOfRow: function getKeyOfRow(row, index) {
      var rowKey = this.table.rowKey;
      if (rowKey) {
        return (0, _util.getRowIdentity)(row, rowKey);
      }
      return index;
    },
    isColumnHidden: function isColumnHidden(index) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    },
    getRowStyle: function getRowStyle(row, index) {
      var rowStyle = this.rowStyle;
      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, row, index);
      }
      return rowStyle;
    },
    getRowClass: function getRowClass(row, index) {
      var classes = [];

      var rowClassName = this.rowClassName;
      if (typeof rowClassName === 'string') {
        classes.push(rowClassName);
      } else if (typeof rowClassName === 'function') {
        classes.push(rowClassName.call(null, row, index) || '');
      }

      return classes.join(' ');
    },

    validateRowKey: function validateRowKey(row) {
      var rowKey = this.getKeyOfRow(row);
      if (this.firstRowKey) {
        if (rowKey === this.firstRowKey) {
          return false;
        }
      }
      if (this.lastRowKey) {
        if (rowKey === this.lastRowKey) {
          return false;
        }
      }
      return true;
    },
    handleDown: function handleDown(event, row, index, column) {
      if (!this.validateRowKey(row)) {
        return;
      }
      if (this.sortByDrag && column.type === 'index' && event.which === 1) {
        this.dragData = row;
        this.dragIndex = index;
        this.dragItem = event.currentTarget.parentNode;
        this.isDrag = true;
        var _top = this.dragItem.offsetTop - this.dragItem.parentNode.offsetTop;
        this.dragTop = _top + 'px';
        this.preventDefault(event);
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
    handleDragDown: function handleDragDown(event) {
      if (event.which === 1) {
        this.isDrag = true;
        this.preventDefault(event);
      }
    },
    handleDragMove: function handleDragMove(event) {
      this.mousePosGap.x = event.pageX - this.mousePos.x;
      this.mousePosGap.y = event.pageY - this.mousePos.y;
      this.mousePos.x = event.pageX;
      this.mousePos.y = event.pageY;
      if (this.isDrag) {
        this.preventDefault(event);
        var _top = window.parseInt(document.querySelector('.elx-drag-item').offsetTop) + this.mousePosGap.y;
        var _trTop = this.dragItem.offsetTop - this.dragItem.parentNode.offsetTop;
        if (_top < _trTop - this.dragItem.offsetHeight / 2) {
          if (this.dragIndex - 1 < 0) {
            return;
          }
          this.changeItems = [this.data[this.dragIndex], this.data[this.dragIndex - 1]];
          if (!this.validateRowKey(this.changeItems[1])) {} else {
            this.data.splice(this.dragIndex - 1, 1, this.changeItems[0]);
            this.data.splice(this.dragIndex, 1, this.changeItems[1]);
            this.dragIndex = this.dragIndex - 1;
            this.$nextTick(function () {
              this.dragItem = this.dragItem.parentNode.childNodes[this.dragIndex];
            });
            this.dragData = this.data[this.dragIndex];
          }
        }
        if (_top > _trTop + this.dragItem.offsetHeight / 2) {
          if (this.dragIndex + 1 > this.data.length - 1) {
            return;
          }
          this.changeItems = [this.data[this.dragIndex], this.data[this.dragIndex + 1]];
          if (!this.validateRowKey(this.changeItems[1])) {} else {
            this.data.splice(this.dragIndex + 1, 1, this.changeItems[0]);
            this.data.splice(this.dragIndex, 1, this.changeItems[1]);
            this.dragIndex = this.dragIndex + 1;
            this.$nextTick(function () {
              this.dragItem = this.dragItem.parentNode.childNodes[this.dragIndex];
            });
            this.dragData = this.data[this.dragIndex];
          }
        }
        this.dragTop = _top + 'px';
      }
    },
    handleDragUp: function handleDragUp(event) {
      this.isDrag = false;
      this.preventDefault(event);
    },
    handleCellMouseEnter: function handleCellMouseEnter(event, row) {
      var table = this.table;
      var cell = (0, _util.getCell)(event);

      if (cell) {
        var column = (0, _util.getColumnByCell)(table, cell);
        var hoverState = table.hoverState = { cell: cell, column: column, row: row };
        table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event);
      }

      // 判断是否text-overflow, 如果是就显示tooltip
      var cellChild = event.target.querySelector('.cell');
      if ((0, _dom.hasClass)(cellChild, 'el-tooltip') && cellChild.scrollWidth > cellChild.offsetWidth) {
        var tooltip = this.$refs.tooltip;

        this.tooltipContent = cell.innerText;
        tooltip.referenceElm = cell;
        tooltip.$refs.popper.style.display = 'none';
        tooltip.doDestroy();
        window.tooltip = tooltip;
        this.activateTooltip(tooltip);
      }
    },
    handleCellMouseLeave: function handleCellMouseLeave(event) {
      this.$refs.tooltip.handleClosePopper();
      var cell = (0, _util.getCell)(event);
      if (!cell) return;

      var oldHoverState = this.table.hoverState;
      this.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event);
    },
    handleMouseEnter: function handleMouseEnter(index) {
      this.store.commit('setHoverRow', index);
    },
    handleMouseLeave: function handleMouseLeave() {
      this.isMouseDown = false;
      this.store.commit('setHoverRow', null);
    },
    handleContextMenu: function handleContextMenu(event, row) {
      this.handleEvent(event, row, 'contextmenu');
    },
    handleDoubleClick: function handleDoubleClick(event, row) {
      this.handleEvent(event, row, 'dblclick');
    },
    handleClick: function handleClick(event, row) {
      this.store.commit('setCurrentRow', row);
      this.handleEvent(event, row, 'click');
    },
    handleEvent: function handleEvent(event, row, name) {
      var table = this.table;
      var cell = (0, _util.getCell)(event);
      var column = void 0;
      if (cell) {
        column = (0, _util.getColumnByCell)(table, cell);
        if (column) {
          table.$emit('cell-' + name, row, column, cell, event);
        }
      }
      table.$emit('row-' + name, row, event, column);
    },
    handleExpandClick: function handleExpandClick(row) {
      this.store.commit('toggleRowExpanded', row);
    }
  }
};

/***/ }),

/***/ 294:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(31);

var _vue2 = _interopRequireDefault(_vue);

var _filterPanel = __webpack_require__(295);

var _filterPanel2 = _interopRequireDefault(_filterPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getAllColumns = function getAllColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.children) {
      result.push(column);
      result.push.apply(result, getAllColumns(column.children));
    } else {
      result.push(column);
    }
  });
  return result;
};

var convertToRows = function convertToRows(originColumns) {
  var maxLevel = 1;
  var traverse = function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    }
    if (column.children) {
      var colSpan = 0;
      column.children.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  };

  originColumns.forEach(function (column) {
    column.level = 1;
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = getAllColumns(originColumns);

  allColumns.forEach(function (column) {
    if (!column.children) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });

  return rows;
};

exports.default = {
  name: 'ElxTableHeader',

  render: function render(h) {
    var _this = this;

    var originColumns = this.store.states.originColumns;
    var columnRows = convertToRows(originColumns, this.columns);

    return h(
      'table',
      {
        'class': 'el-table__header',
        attrs: { cellspacing: '0',
          cellpadding: '0',
          border: '0' }
      },
      [h('colgroup', [this._l(this.columns, function (column) {
        return h('col', {
          attrs: {
            name: column.id,
            width: column.realWidth || column.width
          }
        });
      }), !this.fixed && this.layout.gutterWidth ? h('col', {
        attrs: { name: 'gutter', width: this.layout.scrollY ? this.layout.gutterWidth : '' }
      }) : '']), h('thead', [this._l(columnRows, function (columns, rowIndex) {
        return h('tr', [_this._l(columns, function (column, cellIndex) {
          return h(
            'th',
            {
              attrs: {
                colspan: column.colSpan,
                rowspan: column.rowSpan
              },
              on: {
                'mousemove': function mousemove($event) {
                  return _this.handleMouseMove($event, column);
                },
                'mouseout': _this.handleMouseOut,
                'mousedown': function mousedown($event) {
                  return _this.handleMouseDown($event, column);
                },
                'click': function click($event) {
                  return _this.handleHeaderClick($event, column);
                }
              },

              'class': [column.id, column.order, column.headerAlign, column.className || '', rowIndex === 0 && _this.isCellHidden(cellIndex, columns) ? 'is-hidden' : '', !column.children ? 'is-leaf' : '', column.labelClassName] },
            [h(
              'div',
              { 'class': ['cell', column.filteredValue && column.filteredValue.length > 0 ? 'highlight' : '', column.labelClassName] },
              [column.renderHeader ? column.renderHeader.call(_this._renderProxy, h, { column: column, $index: cellIndex, store: _this.store, _self: _this.$parent.$vnode.context }) : column.label, column.sortable ? h(
                'span',
                { 'class': 'caret-wrapper', on: {
                    'click': function click($event) {
                      return _this.handleSortClick($event, column);
                    }
                  }
                },
                [h('i', { 'class': 'sort-caret ascending', on: {
                    'click': function click($event) {
                      return _this.handleSortClick($event, column, 'ascending');
                    }
                  }
                }), h('i', { 'class': 'sort-caret descending', on: {
                    'click': function click($event) {
                      return _this.handleSortClick($event, column, 'descending');
                    }
                  }
                })]
              ) : '', column.filterable ? h(
                'span',
                { 'class': 'el-table__column-filter-trigger', on: {
                    'click': function click($event) {
                      return _this.handleFilterClick($event, column);
                    }
                  }
                },
                [h('i', { 'class': ['el-icon-arrow-down', column.filterOpened ? 'el-icon-arrow-up' : ''] })]
              ) : '']
            )]
          );
        }), !_this.fixed && _this.layout.gutterWidth ? h('th', { 'class': 'gutter', style: { width: _this.layout.scrollY ? _this.layout.gutterWidth + 'px' : '0' } }) : '']);
      })])]
    );
  },


  props: {
    fixed: String,
    store: {
      required: true
    },
    layout: {
      required: true
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: function _default() {
        return {
          prop: '',
          order: ''
        };
      }
    }
  },

  computed: {
    isAllSelected: function isAllSelected() {
      return this.store.states.isAllSelected;
    },
    columnsCount: function columnsCount() {
      return this.store.states.columns.length;
    },
    leftFixedCount: function leftFixedCount() {
      return this.store.states.fixedColumns.length;
    },
    rightFixedCount: function rightFixedCount() {
      return this.store.states.rightFixedColumns.length;
    },
    columns: function columns() {
      return this.store.states.columns;
    }
  },

  created: function created() {
    this.filterPanels = {};
  },
  mounted: function mounted() {
    var _this2 = this;

    if (this.defaultSort.prop) {
      (function () {
        var states = _this2.store.states;
        states.sortProp = _this2.defaultSort.prop;
        states.sortOrder = _this2.defaultSort.order || 'ascending';
        _this2.$nextTick(function (_) {
          for (var i = 0, length = _this2.columns.length; i < length; i++) {
            var column = _this2.columns[i];
            if (column.property === states.sortProp) {
              column.order = states.sortOrder;
              states.sortingColumn = column;
              break;
            }
          }

          if (states.sortingColumn) {
            _this2.store.commit('changeSortCondition');
          }
        });
      })();
    }
  },
  beforeDestroy: function beforeDestroy() {
    var panels = this.filterPanels;
    for (var prop in panels) {
      if (panels.hasOwnProperty(prop) && panels[prop]) {
        panels[prop].$destroy(true);
      }
    }
  },


  methods: {
    isCellHidden: function isCellHidden(index, columns) {
      if (this.fixed === true || this.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (this.fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    },
    toggleAllSelection: function toggleAllSelection() {
      this.store.commit('toggleAllSelection');
    },
    handleFilterClick: function handleFilterClick(event, column) {
      event.stopPropagation();
      var target = event.target;
      var cell = target.parentNode;
      var table = this.$parent;

      var filterPanel = this.filterPanels[column.id];

      if (filterPanel && column.filterOpened) {
        filterPanel.showPopper = false;
        return;
      }

      if (!filterPanel) {
        filterPanel = new _vue2.default(_filterPanel2.default);
        this.filterPanels[column.id] = filterPanel;

        filterPanel.table = table;
        filterPanel.cell = cell;
        filterPanel.column = column;
        !this.$isServer && filterPanel.$mount(document.createElement('div'));
      }

      setTimeout(function () {
        filterPanel.showPopper = true;
      }, 16);
    },
    handleHeaderClick: function handleHeaderClick(event, column) {
      if (!column.filters && column.sortable) {
        this.handleSortClick(event, column);
      } else if (column.filters && !column.sortable) {
        this.handleFilterClick(event, column);
      }

      this.$parent.$emit('header-click', column, event);
    },
    handleMouseDown: function handleMouseDown(event, column) {
      var _this3 = this;

      if (this.$isServer) return;
      if (column.children && column.children.length > 0) return;
      /* istanbul ignore if */
      if (this.draggingColumn && this.border) {
        (function () {
          _this3.dragging = true;

          _this3.$parent.resizeProxyVisible = true;

          var table = _this3.$parent;
          var tableEl = table.$el;
          var tableLeft = tableEl.getBoundingClientRect().left;
          var columnEl = _this3.$el.querySelector('th.' + column.id);
          var columnRect = columnEl.getBoundingClientRect();
          var minLeft = columnRect.left - tableLeft + 30;

          columnEl.classList.add('noclick');

          _this3.dragState = {
            startMouseLeft: event.clientX,
            startLeft: columnRect.right - tableLeft,
            startColumnLeft: columnRect.left - tableLeft,
            tableLeft: tableLeft
          };

          var resizeProxy = table.$refs.resizeProxy;
          resizeProxy.style.left = _this3.dragState.startLeft + 'px';

          document.onselectstart = function () {
            return false;
          };
          document.ondragstart = function () {
            return false;
          };

          var handleMouseMove = function handleMouseMove(event) {
            var deltaLeft = event.clientX - _this3.dragState.startMouseLeft;
            var proxyLeft = _this3.dragState.startLeft + deltaLeft;

            resizeProxy.style.left = Math.max(minLeft, proxyLeft) + 'px';
          };

          var handleMouseUp = function handleMouseUp() {
            if (_this3.dragging) {
              var _dragState = _this3.dragState,
                  startColumnLeft = _dragState.startColumnLeft,
                  startLeft = _dragState.startLeft;

              var finalLeft = parseInt(resizeProxy.style.left, 10);
              var columnWidth = finalLeft - startColumnLeft;
              column.width = column.realWidth = columnWidth;
              table.$emit('header-dragend', column.width, startLeft - startColumnLeft, column, event);

              _this3.store.scheduleLayout();

              document.body.style.cursor = '';
              _this3.dragging = false;
              _this3.draggingColumn = null;
              _this3.dragState = {};

              table.resizeProxyVisible = false;
            }

            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.onselectstart = null;
            document.ondragstart = null;

            setTimeout(function () {
              columnEl.classList.remove('noclick');
            }, 0);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        })();
      }
    },
    handleMouseMove: function handleMouseMove(event, column) {
      if (column.children && column.children.length > 0) return;
      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (!column || !column.resizable) return;

      if (!this.dragging && this.border) {
        var rect = target.getBoundingClientRect();

        var bodyStyle = document.body.style;
        if (rect.width > 12 && rect.right - event.pageX < 8) {
          bodyStyle.cursor = 'col-resize';
          this.draggingColumn = column;
        } else if (!this.dragging) {
          bodyStyle.cursor = '';
          this.draggingColumn = null;
        }
      }
    },
    handleMouseOut: function handleMouseOut() {
      if (this.$isServer) return;
      document.body.style.cursor = '';
    },
    toggleOrder: function toggleOrder(order) {
      return !order ? 'ascending' : order === 'ascending' ? 'descending' : null;
    },
    handleSortClick: function handleSortClick(event, column, givenOrder) {
      event.stopPropagation();
      var order = givenOrder || this.toggleOrder(column.order);

      var target = event.target;
      while (target && target.tagName !== 'TH') {
        target = target.parentNode;
      }

      if (target && target.tagName === 'TH') {
        if (target.classList.contains('noclick')) {
          target.classList.remove('noclick');
          return;
        }
      }

      if (!column.sortable) return;

      var states = this.store.states;
      var sortProp = states.sortProp;
      var sortOrder = void 0;
      var sortingColumn = states.sortingColumn;

      if (sortingColumn !== column) {
        if (sortingColumn) {
          sortingColumn.order = null;
        }
        states.sortingColumn = column;
        sortProp = column.property;
      }

      if (!order) {
        sortOrder = column.order = null;
        states.sortingColumn = null;
        sortProp = null;
      } else {
        sortOrder = column.order = order;
      }

      states.sortProp = sortProp;
      states.sortOrder = sortOrder;

      this.store.commit('changeSortCondition');
    }
  },

  data: function data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {}
    };
  }
};

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filter_panel_vue_vue_type_template_id_5e488d26___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(242);
/* harmony import */ var _filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(90);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _filter_panel_vue_vue_type_template_id_5e488d26___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _filter_panel_vue_vue_type_template_id_5e488d26___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 296:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/utils/popup");

/***/ }),

/***/ 297:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(31);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropdowns = [];

!_vue2.default.prototype.$isServer && document.addEventListener('click', function (event) {
  dropdowns.forEach(function (dropdown) {
    var target = event.target;
    if (!dropdown || !dropdown.$el) return;
    if (target === dropdown.$el || dropdown.$el.contains(target)) {
      return;
    }
    dropdown.handleOutsideClick && dropdown.handleOutsideClick(event);
  });
});

exports.default = {
  open: function open(instance) {
    if (instance) {
      dropdowns.push(instance);
    }
  },
  close: function close(instance) {
    var index = dropdowns.indexOf(instance);
    if (index !== -1) {
      dropdowns.splice(instance, 1);
    }
  }
};

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = require("element-uex/lib/mixins/locale");

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var getCell = exports.getCell = function getCell(event) {
  var cell = event.target;

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell;
    }
    cell = cell.parentNode;
  }

  return null;
};

var getValueByPath = exports.getValueByPath = function getValueByPath(object, prop) {
  prop = prop || '';
  var paths = prop.split('.');
  var current = object;
  var result = null;
  for (var i = 0, j = paths.length; i < j; i++) {
    var path = paths[i];
    if (!current) break;

    if (i === j - 1) {
      result = current[path];
      break;
    }
    current = current[path];
  }
  return result;
};

var isObject = function isObject(obj) {
  return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
};

var orderBy = exports.orderBy = function orderBy(array, sortKey, reverse, sortMethod) {
  if (typeof reverse === 'string') {
    reverse = reverse === 'descending' ? -1 : 1;
  }
  if (!sortKey) {
    return array;
  }
  var order = reverse && reverse < 0 ? -1 : 1;

  // sort on a copy to avoid mutating original array
  return array.slice().sort(sortMethod ? function (a, b) {
    return sortMethod(a, b) ? order : -order;
  } : function (a, b) {
    if (sortKey !== '$key') {
      if (isObject(a) && '$value' in a) a = a.$value;
      if (isObject(b) && '$value' in b) b = b.$value;
    }
    a = isObject(a) ? getValueByPath(a, sortKey) : a;
    b = isObject(b) ? getValueByPath(b, sortKey) : b;
    return a === b ? 0 : a > b ? order : -order;
  });
};

var getColumnById = exports.getColumnById = function getColumnById(table, columnId) {
  var column = null;
  table.columns.forEach(function (item) {
    if (item.id === columnId) {
      column = item;
    }
  });
  return column;
};

var getColumnByCell = exports.getColumnByCell = function getColumnByCell(table, cell) {
  var matches = (cell.className || '').match(/el-table_[^\s]+/gm);
  if (matches) {
    return getColumnById(table, matches[0]);
  }
  return null;
};

var isFirefox = typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

var mousewheel = exports.mousewheel = function mousewheel(element, callback) {
  if (element && element.addEventListener) {
    element.addEventListener(isFirefox ? 'DOMMouseScroll' : 'mousewheel', callback);
  }
};

var getRowIdentity = exports.getRowIdentity = function getRowIdentity(row, rowKey) {
  if (!row) throw new Error('row is required when get row identity');
  if (typeof rowKey === 'string') {
    return row[rowKey];
  } else if (typeof rowKey === 'function') {
    return rowKey.call(null, row);
  }
};

/***/ }),

/***/ 31:
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(89);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_table_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _throttle = __webpack_require__(289);

var _throttle2 = _interopRequireDefault(_throttle);

var _debounce = __webpack_require__(28);

var _debounce2 = _interopRequireDefault(_debounce);

var _resizeEvent = __webpack_require__(23);

var _locale = __webpack_require__(3);

var _locale2 = _interopRequireDefault(_locale);

var _tableStore = __webpack_require__(290);

var _tableStore2 = _interopRequireDefault(_tableStore);

var _tableLayout = __webpack_require__(291);

var _tableLayout2 = _interopRequireDefault(_tableLayout);

var _tableBody = __webpack_require__(293);

var _tableBody2 = _interopRequireDefault(_tableBody);

var _tableHeader = __webpack_require__(294);

var _tableHeader2 = _interopRequireDefault(_tableHeader);

var _util = __webpack_require__(30);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableIdSeed = 1; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'ElxTable',

  mixins: [_locale2.default],
  props: {
    data: {
      type: Array,
      default: function _default() {
        return [];
      }
    },

    width: [String, Number],

    height: [String, Number],

    maxHeight: [String, Number],

    fit: {
      type: Boolean,
      default: true
    },

    stripe: Boolean,

    border: Boolean,

    rowKey: [String, Function],

    firstRowKey: String,

    lastRowKey: String,

    context: {},

    showHeader: {
      type: Boolean,
      default: true
    },

    rowClassName: [String, Function],

    rowStyle: [Object, Function],

    highlightCurrentRow: Boolean,

    currentRowKey: [String, Number],

    emptyText: String,

    expandRowKeys: Array,

    defaultExpandAll: Boolean,

    defaultSort: Object,

    tooltipEffect: String,

    draggable: Boolean,

    sortByDrag: {
      type: Boolean,
      default: true
    }
  },

  components: {
    TableHeader: _tableHeader2.default,
    TableBody: _tableBody2.default
  },

  methods: {
    handleDropStart: function handleDropStart(data) {
      this.$emit('drop-start', data);
    },
    toggleRowSelection: function toggleRowSelection(row, selected) {
      this.store.toggleRowSelection(row, selected);
      this.store.updateAllSelected();
    },
    clearSelection: function clearSelection() {
      this.store.clearSelection();
    },
    handleMouseLeave: function handleMouseLeave() {
      this.store.commit('setHoverRow', null);
      if (this.hoverState) this.hoverState = null;
    },
    updateScrollY: function updateScrollY() {
      this.layout.updateScrollY();
    },
    syncPostion: function syncPostion() {
      var headerWrapper = this.$refs.headerWrapper;

      var refs = this.$refs;
      if (headerWrapper) headerWrapper.scrollLeft = this.scrollLeft;
      if (refs.fixedBodyWrapper) refs.fixedBodyWrapper.scrollTop = this.scrollTop;
      if (refs.rightFixedBodyWrapper) refs.rightFixedBodyWrapper.scrollTop = this.scrollTop;
    },
    bindEvents: function bindEvents() {
      var _this = this;

      var headerWrapper = this.$refs.headerWrapper;

      this.bodyWrapper.addEventListener('scroll', this.syncPostion);

      if (headerWrapper) {
        (0, _util.mousewheel)(headerWrapper, (0, _throttle2.default)(16, function (event) {
          var deltaX = event.deltaX;

          if (deltaX > 0) {
            _this.bodyWrapper.scrollLeft += 10;
          } else {
            _this.bodyWrapper.scrollLeft -= 10;
          }
        }));
      }

      if (this.fit) {
        this.windowResizeListener = (0, _throttle2.default)(50, function () {
          if (_this.$ready) _this.doLayout();
        });
        (0, _resizeEvent.addResizeListener)(this.$el, this.windowResizeListener);
      }
    },
    unbindEvents: function unbindEvents() {
      this.bodyWrapper.removeEventListener('scroll', this.syncPostion);
      if (this.windowResizeListener) (0, _resizeEvent.removeResizeListener)(this.$el, this.windowResizeListener);
    },
    doLayout: function doLayout() {
      var _this2 = this;

      this.store.updateColumns();
      this.layout.update();
      this.updateScrollY();
      this.$nextTick(function () {
        if (_this2.height) {
          _this2.layout.setHeight(_this2.height);
        } else if (_this2.maxHeight) {
          _this2.layout.setMaxHeight(_this2.maxHeight);
        } else if (_this2.shouldUpdateHeight) {
          _this2.layout.updateHeight();
        }
      });
    }
  },

  created: function created() {
    var _this3 = this;

    this.tableId = 'el-table_' + tableIdSeed + '_';
    this.debouncedLayout = (0, _debounce2.default)(50, function () {
      return _this3.doLayout();
    });
  },


  computed: {
    bodyWrapper: function bodyWrapper() {
      return this.$refs.bodyWrapper;
    },
    shouldUpdateHeight: function shouldUpdateHeight() {
      return typeof this.height === 'number' || this.fixedColumns.length > 0 || this.rightFixedColumns.length > 0;
    },
    selection: function selection() {
      return this.store.selection;
    },
    columns: function columns() {
      return this.store.states.columns;
    },
    tableData: function tableData() {
      return this.store.states.data;
    },
    fixedColumns: function fixedColumns() {
      return this.store.states.fixedColumns;
    },
    rightFixedColumns: function rightFixedColumns() {
      return this.store.states.rightFixedColumns;
    },
    bodyHeight: function bodyHeight() {
      var style = {};

      if (this.height) {
        style = {
          height: this.layout.bodyHeight ? this.layout.bodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        style = {
          'max-height': (this.showHeader ? this.maxHeight - this.layout.headerHeight : this.maxHeight) + 'px'
        };
      }

      return style;
    },
    bodyWidth: function bodyWidth() {
      var _layout = this.layout,
          bodyWidth = _layout.bodyWidth,
          scrollY = _layout.scrollY,
          gutterWidth = _layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) + 'px' : '';
    },
    fixedBodyHeight: function fixedBodyHeight() {
      var style = {};

      if (this.height) {
        style = {
          height: this.layout.fixedBodyHeight ? this.layout.fixedBodyHeight + 'px' : ''
        };
      } else if (this.maxHeight) {
        var maxHeight = this.layout.scrollX ? this.maxHeight - this.layout.gutterWidth : this.maxHeight;

        if (this.showHeader) {
          maxHeight -= this.layout.headerHeight;
        }

        style = {
          'max-height': maxHeight + 'px'
        };
      }

      return style;
    },
    fixedHeight: function fixedHeight() {
      var style = {};

      if (this.maxHeight) {
        style = {
          bottom: this.layout.scrollX && this.data.length ? this.layout.gutterWidth + 'px' : ''
        };
      } else {
        style = {
          height: this.layout.viewportHeight ? this.layout.viewportHeight + 'px' : ''
        };
      }

      return style;
    }
  },

  watch: {
    height: function height(value) {
      this.layout.setHeight(value);
    },
    currentRowKey: function currentRowKey(newVal) {
      this.store.setCurrentRowKey(newVal);
    },


    data: {
      immediate: true,
      handler: function handler(val) {
        this.store.commit('setData', val);
      }
    },

    expandRowKeys: function expandRowKeys(newVal) {
      this.store.setExpandRowKeys(newVal);
    }
  },

  destroyed: function destroyed() {
    this.unbindEvents();
  },
  mounted: function mounted() {
    var _this4 = this;

    var _self = this;
    this.doLayout();
    this.$nextTick(function () {
      _self.bindEvents();
    });
    // init filters
    this.store.states.columns.forEach(function (column) {
      if (column.filteredValue && column.filteredValue.length) {
        _this4.store.commit('filterChange', {
          column: column,
          values: column.filteredValue,
          silent: true
        });
      }
    });

    this.$ready = true;
  },
  data: function data() {
    var store = new _tableStore2.default(this, {
      rowKey: this.rowKey,
      defaultExpandAll: this.defaultExpandAll
    });
    var layout = new _tableLayout2.default({
      store: store,
      table: this,
      fit: this.fit,
      showHeader: this.showHeader
    });
    return {
      store: store,
      layout: layout,
      renderExpanded: null,
      resizeProxyVisible: false
    };
  }
};

/***/ }),

/***/ 90:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(91);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_filter_panel_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vuePopper = __webpack_require__(21);

var _vuePopper2 = _interopRequireDefault(_vuePopper);

var _popup = __webpack_require__(296);

var _locale = __webpack_require__(3);

var _locale2 = _interopRequireDefault(_locale);

var _clickoutside = __webpack_require__(22);

var _clickoutside2 = _interopRequireDefault(_clickoutside);

var _dropdown = __webpack_require__(297);

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'ElxTableFilterPanel',

  mixins: [_vuePopper2.default, _locale2.default],

  directives: {
    Clickoutside: _clickoutside2.default
  },

  props: {
    placement: {
      type: String,
      default: 'bottom-end'
    }
  },

  customRender: function customRender(h) {
    return h(
      'div',
      { 'class': 'el-table-filter' },
      [h('div', { 'class': 'el-table-filter__content' }), h(
        'div',
        { 'class': 'el-table-filter__bottom' },
        [h(
          'button',
          {
            on: {
              'click': this.handleConfirm
            }
          },
          [this.t('el.table.confirmFilter')]
        ), h(
          'button',
          {
            on: {
              'click': this.handleReset
            }
          },
          [this.t('el.table.resetFilter')]
        )]
      )]
    );
  },


  methods: {
    isActive: function isActive(filter) {
      return filter.value === this.filterValue;
    },
    handleOutsideClick: function handleOutsideClick() {
      this.showPopper = false;
    },
    handleConfirm: function handleConfirm() {
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleReset: function handleReset() {
      this.filteredValue = [];
      this.confirmFilter(this.filteredValue);
      this.handleOutsideClick();
    },
    handleSelect: function handleSelect(filterValue) {
      this.filterValue = filterValue;

      if (typeof filterValue !== 'undefined' && filterValue !== null) {
        this.confirmFilter(this.filteredValue);
      } else {
        this.confirmFilter([]);
      }

      this.handleOutsideClick();
    },
    confirmFilter: function confirmFilter(filteredValue) {
      this.table.store.commit('filterChange', {
        column: this.column,
        values: filteredValue
      });
    }
  },

  data: function data() {
    return {
      table: null,
      cell: null,
      column: null
    };
  },


  computed: {
    filters: function filters() {
      return this.column && this.column.filters;
    },


    filterValue: {
      get: function get() {
        return (this.column.filteredValue || [])[0];
      },
      set: function set(value) {
        if (this.filteredValue) {
          if (typeof value !== 'undefined' && value !== null) {
            this.filteredValue.splice(0, 1, value);
          } else {
            this.filteredValue.splice(0, 1);
          }
        }
      }
    },

    filteredValue: {
      get: function get() {
        if (this.column) {
          return this.column.filteredValue || [];
        }
        return [];
      },
      set: function set(value) {
        if (this.column) {
          this.column.filteredValue = value;
        }
      }
    },

    multiple: function multiple() {
      if (this.column) {
        return this.column.filterMultiple;
      }
      return true;
    }
  },

  mounted: function mounted() {
    var _this = this;

    this.popperElm = this.$el;
    this.referenceElm = this.cell;
    this.table.bodyWrapper.addEventListener('scroll', function () {
      _this.updatePopper();
    });

    this.$watch('showPopper', function (value) {
      if (_this.column) _this.column.filterOpened = value;
      if (value) {
        _dropdown2.default.open(_this);
      } else {
        _dropdown2.default.close(_this);
      }
    });
  },

  watch: {
    showPopper: function showPopper(val) {
      if (val === true && parseInt(this.popperJS._popper.style.zIndex, 10) < _popup.PopupManager.zIndex) {
        this.popperJS._popper.style.zIndex = _popup.PopupManager.nextZIndex();
      }
    }
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

/***/ })

/******/ });