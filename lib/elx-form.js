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
/******/ 	return __webpack_require__(__webpack_require__.s = 295);
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

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./packages/elx-form/src/form.vue?vue&type=template&id=6f52eb34&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"elx-form"},[_c('el-form',{ref:"elxForm",class:_vm.currentConfig.inline?'inline':'notInline',attrs:{"model":_vm.currentValue,"label-suffix":_vm.labelSuffix,"label-width":_vm.labelWidth,"rules":_vm.currentConfig.rules}},_vm._l((_vm.currentConfig.fields),function(field,index){return _c('el-form-item',{directives:[{name:"show",rawName:"v-show",value:(typeof field.isShow == 'boolean' ? field.isShow : true),expression:"typeof field.isShow == 'boolean' ? field.isShow : true"}],key:field.name,class:'elx-form-item ' + field.type,style:({'width': field.width}),attrs:{"label":field.label,"label-width":field.labelWidth,"prop":field.name in _vm.currentConfig.rules?field.name:_vm.currentConfig.rules[field.name]}},[(field.label&&field.label!==''&&field.isRemark)?_c('template',{slot:"label"},[_c('span',[_c('span',{domProps:{"textContent":_vm._s(_vm.labelSuffix)}}),(field.isRemark)?_c('el-tooltip',{attrs:{"effect":"dark","placement":"bottom","content":String(field.remark||field.label)}},[_c('span',{staticClass:"label-help uex-icon-help"})]):_vm._e(),_c('span',{domProps:{"textContent":_vm._s(field.label)}})],1)]):_vm._e(),(field.type=='inputText'&&field.valueType!='number')?[_c('el-input',{attrs:{"placeholder":field.placeholder,"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='inputText'&&field.valueType=='number')?[_c('el-input',{attrs:{"placeholder":field.placeholder,"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, _vm._n($$v))},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='inputIcon')?[_c('el-input',{attrs:{"placeholder":field.placeholder,"disabled":field.isdisabled,"icon":field.icon,"on-icon-click":function() {'iconClickHandler' in field ? field.iconClickHandler(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='inputTextarea')?[_c('el-input',{attrs:{"type":"textarea","rows":field.row,"disabled":field.isdisabled,"placeholder":field.placeholder},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='inputCompound')?[_c('el-input',{attrs:{"disabled":field.isdisabled,"placeholder":field.placeholder},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},[_c('template',{slot:field.compoundType},[_vm._v("\n            "+_vm._s(field.compoundContent)+"\n          ")])],2)]:_vm._e(),(field.type=='radio')?[_c('el-radio-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('el-radio',{key:opt.value || opt,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n                "+_vm._s(opt.label || opt)+"\n                "),_c('el-tooltip',{directives:[{name:"show",rawName:"v-show",value:(field.isRemark),expression:"field.isRemark"}],staticClass:"item",attrs:{"effect":"dark","content":String(typeof opt == 'string' ? opt : (opt.remark || opt.label)),"placement":"bottom"}},[_c('span',{staticClass:"uex-icon-help"})])],1)}),1)]:_vm._e(),(field.type=='radioButton')?[_c('el-radio-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('el-radio-button',{key:opt.value || opt,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n                "+_vm._s(opt.label || opt)+"\n                "),_c('el-tooltip',{directives:[{name:"show",rawName:"v-show",value:(field.isRemark),expression:"field.isRemark"}],staticClass:"item",attrs:{"effect":"dark","content":String(typeof opt == 'string' ? opt : (opt.remark || opt.label)),"placement":"bottom"}},[_c('span',{staticClass:"uex-icon-help"})])],1)}),1)]:_vm._e(),(field.type=='radioCard')?[_c('elx-radio-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('elx-radio',{key:opt.value || opt,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n                "+_vm._s(opt.label || opt)+"\n                "),_c('el-tooltip',{directives:[{name:"show",rawName:"v-show",value:(field.isRemark),expression:"field.isRemark"}],staticClass:"item",attrs:{"effect":"dark","content":String(typeof opt == 'string' ? opt : (opt.remark || opt.label)),"placement":"bottom"}},[_c('span',{staticClass:"uex-icon-help"})])],1)}),1)]:_vm._e(),(field.type=='checkbox')?[_c('el-checkbox-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('el-checkbox',{key:opt.value || opt,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n              "+_vm._s(opt.label || opt)+"\n            ")])}),1)]:_vm._e(),(field.type=='checkboxButton')?[_c('el-checkbox-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('el-checkbox-button',{key:index,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n              "+_vm._s(opt.label || opt)+"\n            ")])}),1)]:_vm._e(),(field.type=='checkboxCard')?[_c('elx-checkbox-group',{attrs:{"disabled":field.isdisabled},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(opt,index){return _c('elx-checkbox',{key:opt.value || opt,attrs:{"disabled":opt.isdisabled,"label":opt.value || opt}},[_vm._v("\n                "+_vm._s(opt.label || opt)+"\n              ")])}),1)]:_vm._e(),(field.type=='select'&&(field.filterable || field.remote))?[_c('elx-select',{attrs:{"root":_vm.getSelf(),"disabled":field.isdisabled,"loading":field.loading,"clearable":field.clearable,"is-post-root":field.isPostRoot,"filterable":field.filterable,"multiple":field.multiple,"remote":field.remote,"placeholder":field.placeholder,"filter-method":field.filterMethod,"remote-method":field.remoteMethod},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"visible-change":function(val){'visibleChange' in field ? field.visibleChange(_vm.getSelf(), field, _vm.currentValue[field.name], val) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(item,index){return _c('elx-option',{key:item.value || item,attrs:{"option":item,"render-content":'renderContent' in field ? field.renderContent : null,"label":item.label || item,"value":item.value || item}})}),1)]:_vm._e(),(field.type=='select'&&!field.filterable)?[_c('el-select',{attrs:{"filterable":field.filterable,"disabled":field.isdisabled,"clearable":field.clearable,"placeholder":field.placeholder},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"visible-change":function(val){'visibleChange' in field ? field.visibleChange(_vm.getSelf(), field, _vm.currentValue[field.name], val) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(item,index){return _c('el-option',{key:item.value || item,attrs:{"label":item.label || item,"value":item.value || item}})}),1)]:_vm._e(),(field.type=='multipleSelect')?[_c('el-select',{attrs:{"disabled":field.isdisabled,"type":field.type,"multiple":""},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"visible-change":function(val){'visibleChange' in field ? field.visibleChange(_vm.getSelf(), field, _vm.currentValue[field.name], val) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}},_vm._l((field.options),function(item,index){return _c('el-option',{key:item.value || item,attrs:{"label":item.label || item,"value":item.value || item}})}),1)]:_vm._e(),(field.type=='selectInput')?[_c('elx-select-input',{attrs:{"root":_vm.getSelf(),"disabled":field.isdisabled,"loading":field.loading,"clearable":field.clearable,"is-post-root":field.isPostRoot,"filterable":field.filterable,"multiple":field.multiple,"remote":field.remote,"placeholder":field.placeholder,"filter-method":field.filterMethod,"remote-method":field.remoteMethod,"options":field.options},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"visible-change":function($event){'visibleChange' in field ? field.visibleChange(_vm.getSelf()) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='inputNumber')?[_c('el-input-number',{attrs:{"disabled":field.isDisabled,"min":field.min,"max":field.max},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='switch')?[_c('el-switch',{attrs:{"width":'switchWidth' in field ? field.switchWidth : 58,"active-text":'onText' in field ? field.onText : '是',"inactive-text":'offText' in field ? field.offText : '否',"active-value":'onValue' in field ? field.onValue : true,"inactive-value":'offValue' in field ? field.offValue : false,"active-color":'onColor' in field ? field.onColor : '#13ce66',"inactive-color":'offColor' in field ? field.offColor : '#ff4949'},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='slider')?[_c('div',{staticClass:"block"},[_c('el-slider',{attrs:{"show-input":"","step":field.step,"min":field.min,"max":field.max},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})],1)]:_vm._e(),(field.type=='cascader')?[_c('div',{staticClass:"block"},[_c('el-cascader',{ref:'cascader'+index,refInFor:true,attrs:{"options":field.options,"props":field.props,"placeholder":field.placeholder,"disabled":field.isdisabled,"clearable":field.clearable,"filterable":field.filterable,"show-all-levels":field.showAllLevels,"change-on-select":field.changeOnSelect},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"active-item-change":function(val){('activeItemChange' in field ? field.activeItemChange(val, _vm.getSelf(), field) : '')}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})],1)]:_vm._e(),(field.type=='remoteTransfer')?[_c('elx-remote-transfer',{ref:'remoteTransfer'+index,refInFor:true,attrs:{"transfer-value":_vm.currentValue[field.name],"request-url":field.url,"get-request-url":'getUrl' in field ? field.getUrl : function() {return '';},"props":field.transferProps,"column":field.column},on:{"update:transferValue":function($event){_vm.$set(_vm.currentValue, field.name, $event)},"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}}})]:_vm._e(),(field.type=='inputTransfer')?[_c('elx-input-transfer',{ref:'inputTransfer'+index,refInFor:true,attrs:{"edit-disabled":field.editDisabled,"disabled":field.isdisabled,"get-options-url":'getOptionsUrl' in field ? field.getOptionsUrl : function() {return '';},"get-request-url":'getRequestUrl' in field ? field.getRequestUrl : function() {return '';},"props":field.transferProps,"option-props":field.optionProps,"column":field.column},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='codeMirror')?[_c('elx-codemirror',{ref:'codemirror'+field.name,refInFor:true,attrs:{"option":field.option,"height":field.height,"action-data":field.actionData?field.actionData:[],"before-render":field.beforeRender?field.beforeRender:function(){},"input-read":field.inputRead?field.inputRead:function(){}},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"show-hint":function($event){'showHint' in field ? field.showHint(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''},"right-click":function($event){'rightClick' in field ? field.rightClick(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='cron')?[_c('elx-cron',{attrs:{"run-time-url":field.runTimeUrl,"disabled":field.isdisabled,"placeholder":field.placeholder},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='tableForm')?[_c('elx-table-form',{ref:'tableForm'+index,refInFor:true,attrs:{"config":field.config},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='operateParam')?[_c('elx-operate-param',{attrs:{"is-add":field.isAdd,"is-remove":field.isRemove,"param-id-disable":field.paramIdDisable},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='paramForm')?[_c('elx-param-form',{attrs:{"main-label":"是否授权","params":field.params,"param-en":field.paramEn,"param-zh":field.paramZh,"columns":field.columns},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='formGroup')?[_c('elx-form-group',{ref:'formGroup'+index,refInFor:true,attrs:{"config":field.config},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='cardForm')?[_c('elx-card-form',{ref:'cardForm'+index,refInFor:true,attrs:{"config":field.config},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue[field.name]) : ''}},model:{value:(_vm.currentValue[field.name]),callback:function ($$v) {_vm.$set(_vm.currentValue, field.name, $$v)},expression:"currentValue[field.name]"}})]:_vm._e(),(field.type=='button')?[_c('el-button',{attrs:{"disabled":field.isdisabled},nativeOn:{"click":function($event){'click' in field ? field.click(_vm.getSelf()) : ''}}},[_vm._v("\n          "+_vm._s(field.text)+"\n        ")])]:_vm._e(),(field.type=='component')?[_c(field.componentName,{ref:'component' + index,refInFor:true,tag:"component",attrs:{"param":field.param},on:{"change":function($event){'change' in field ? field.change(_vm.getSelf(), field, _vm.currentValue) : ''}},model:{value:(_vm.currentValue),callback:function ($$v) {_vm.currentValue=$$v},expression:"currentValue"}})]:_vm._e()],2)}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./packages/elx-form/src/form.vue?vue&type=template&id=6f52eb34&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ 295:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _form = __webpack_require__(296);

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* istanbul ignore next */
_form2.default.install = function (Vue) {
  Vue.component(_form2.default.name, _form2.default);
};

exports.default = _form2.default;

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_vue_vue_type_template_id_6f52eb34___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(200);
/* harmony import */ var _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(93);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _form_vue_vue_type_template_id_6f52eb34___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _form_vue_vue_type_template_id_6f52eb34___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(94);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_form_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 94:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: 'ElxForm',
  componentName: 'ElxForm',

  props: {
    index: {
      type: Number,
      default: 0
    },
    value: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default: '140px'
    },
    labelSuffix: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      currentValue: this.value,
      currentConfig: {
        fields: this.config.fields || [],
        rules: this.config.rules || {},
        inline: 'inline' in this.config ? this.config.inline : false
      },
      objects: ['paramForm', 'formGroup'],
      options: ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'checkboxCard', 'tableForm', 'cardForm', 'remoteTransfer', 'cascader']
    };
  },
  methods: {
    execFunc: function execFunc(val) {
      console.log(val);
    },
    getSelf: function getSelf() {
      return this;
    },
    setDefaultValue: function setDefaultValue(obj, field) {
      if (this.options.indexOf(field.type) > -1) {
        obj[field.name] = field.defaultValue ? field.defaultValue : [];
      } else if (this.objects.indexOf(field.type) > -1) {
        obj[field.name] = field.defaultValue ? field.defaultValue : {};
      } else if (field.type === 'switch') {
        obj[field.name] = typeof field.defaultValue === 'boolean' ? field.defaultValue : field.defaultValue ? field.defaultValue : null;
      } else {
        obj[field.name] = field.defaultValue ? field.defaultValue : null;
      }
      return obj;
    },
    setRelation: function setRelation() {
      for (var i in this.currentConfig.fields) {
        if ('relatedItems' in this.currentConfig.fields[i]) {
          var _relatedItems = this.currentConfig.fields[i].relatedItems;
          var _relatedValue = this.currentValue[this.currentConfig.fields[i].name];
          for (var j in this.currentConfig.fields) {
            if (_relatedItems.indexOf(this.currentConfig.fields[j].name) >= 0) {
              if (this.currentConfig.fields[j].dependVal.indexOf(_relatedValue) >= 0) {
                if (!this.currentConfig.fields[j].isShow) {
                  this.currentConfig.fields[j].isShow = true;
                }
              } else {
                this.currentConfig.fields[j].isShow = false;
                this.currentValue = this.setDefaultValue(this.currentValue, this.currentConfig.fields[j]);
              }
            }
          }
        }
      }
    },
    setBindValue: function setBindValue() {
      var _obj = JSON.parse(JSON.stringify(this.value));
      for (var i in this.currentConfig.fields) {
        if (!(this.currentConfig.fields[i].name in this.value) && 'name' in this.currentConfig.fields[i]) {
          _obj = this.setDefaultValue(_obj, this.currentConfig.fields[i]);
        }
      }
      this.currentValue = _obj;
    },
    validate: function validate() {
      var _valid = true;
      var _self = this;
      this.$refs.elxForm.validate(function (valid) {
        _valid = valid;
        for (var i in _self.config.fields) {
          var customComponent = ['tableForm', 'formGroup', 'cardForm', 'component'];
          if (customComponent.indexOf(_self.config.fields[i].type) > -1) {
            _valid = _self.$refs[_self.config.fields[i].type + i][0].validate() && _valid;
          }
        }
      });
      return _valid;
    }
  },
  watch: {
    value: {
      deep: true,
      handler: function handler(val, oldVal) {
        if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
          this.currentValue = this.value;
          this.setBindValue();
        }
      }
    },
    currentValue: {
      deep: true,
      handler: function handler(val, oldVal) {
        if ((typeof oldVal === 'undefined' ? 'undefined' : _typeof(oldVal)) !== 'object') {
          return;
        }
        this.setRelation();
        if (JSON.stringify(this.value) !== JSON.stringify(val)) {
          this.$emit('input', val, this.index);
        }
      }
    },
    config: {
      deep: true,
      handler: function handler(val, oldVal) {
        if (this.currentConfig !== val) {
          this.currentConfig = {
            fields: val.fields || [],
            rules: val.rules || {},
            inline: 'inline' in val ? val.inline : false
          };
          this.setBindValue();
        }
      }
    }
  },
  beforeCreate: function beforeCreate() {
    this.$emit('before-get-fields', this);
  },
  created: function created() {
    this.setBindValue();
    this.$emit('before-render', this);
    if (this.config.beforeRender) {
      this.config.beforeRender(this);
    }
  },
  mounted: function mounted() {
    this.$emit('after-render', this);
    if (this.config.afterRender) {
      this.config.afterRender(this);
    }
  }
};

/***/ })

/******/ });