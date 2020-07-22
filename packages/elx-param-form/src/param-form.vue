<template>
  <div class="elx-param-form">
    <div  class="param-content" v-for="param in paramsData">
      <div class="api-info-left">
          <ul>
              <li><span>{{mainLabel}} : </span><el-switch  @change="changeSwitch(param)" on-color="#71b7e6" off-color="#e5e5e5" :on-text="t('el.paramForm.booleanTrue')" :off-text="t('el.paramForm.booleanFalse')" v-model="param.isReturn"></el-switch></li>
              <li>{{param[paramEn]}} / {{param[paramZh]}}</li>
          </ul>
      </div>
      <div class="api-info-right">
          <template v-for="(columnItem,index) in columns">
              <div class="input-item" v-if="index==0">
                  <span class="label">{{columnItem.label}} : </span>
                  <el-switch @change="changeSwitch(param)" on-color="#71b7e6" off-color="#e5e5e5" :on-text="t('el.paramForm.booleanTrue')" :off-text="t('el.paramForm.booleanFalse')" v-model="param.is_cryptTypeCheck"></el-switch>
                  <select class="select-control" :class="!(param.isReturn&&param.is_cryptTypeCheck)?'disabled':''" v-model="param[columnItem.property]" :disabled="!(param.isReturn&&param.is_cryptTypeCheck)">
                      <option v-for="opt in columnItem.field.options" :value="opt.value">{{opt.label}}</option>
                  </select>
              </div>
              <div class="input-item" v-if="index==1">
                  <select class="select-control" :class="!(param.isReturn&&param.is_cryptTypeCheck)?'disabled':''" v-model="param[columnItem.property]" :disabled="!(param.isReturn&&param.is_cryptTypeCheck)">
                      <option v-for="opt in columnItem.field.options" :value="opt.ruleId">{{opt.ruleName}}</option>
                  </select>
              </div>
              <div class="input-item" v-if="index>1">
                  <span class="label">{{columnItem.label}}: </span>
                  <el-switch @change="changeSwitch(param)" on-color="#71b7e6" off-color="#e5e5e5" :on-text="t('el.paramForm.booleanTrue')" :off-text="t('el.paramForm.booleanFalse')"  v-model="param['is_'+columnItem.property+'Check']"></el-switch>
                  <el-input :class="columnItem.property" :disabled="!(param.isReturn&&param['is_'+columnItem.property+'Check'])" v-if="columnItem.field.type=='number' || 'text'" v-model="param[columnItem.property]" :placeholder="columnItem.placeHolder" :type="columnItem.field.type"></el-input>
              </div>
          </template>        
      </div>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery');
  var _ = require('underscore');
  import Locale from 'element-uex/src/mixins/locale';

  export default {
    mixins: [Locale],
    name: 'ElxParamForm',
    componentName: 'ElxParamForm',

    props: ['params', 'columns', 'value', 'mainLabel', 'paramEn', 'paramZh'],
    template: '#param-form-template',
    replace: true,
    data: function() {
      var _stepCfgValMap = this.value ? this.value : {};
      var _paramArr = [];
      var _params = this.params;
      var _currentData;
      for (var i = 0; _params && i < _params.length; i++) {
        _params[i] = JSON.parse(JSON.stringify(_params[i]));
        var _param = this.paramEn in _stepCfgValMap ? _stepCfgValMap[_params[i][this.paramEn]] : {};
        _params[i].isReturn = this.paramEn in _stepCfgValMap;
        var _isStringLen = 'stringLen' in _param;
        var _isEnumVal = 'enumVal' in _param;
        var _isRegExp = 'regExp' in _param;
        var _isCryptType = 'cryptType' in _param;
        _currentData = {
          is_stringLenCheck: _isStringLen,
          is_enumValCheck: _isEnumVal,
          is_regExpCheck: _isRegExp,
          is_cryptTypeCheck: _isCryptType,
          stringLen: _isStringLen ? _param.stringLen : null,
          enumVal: _isEnumVal ? _param.enumVal : null,
          regExp: _isRegExp ? _param.regExp : null,
          cryptRuleId: _isCryptType ? _param.cryptRuleId : null,
          cryptType: _isCryptType ? _param.cryptType : null
        };
        _params[i] = $.extend(_params[i], _currentData);
        _paramArr.push(JSON.parse(JSON.stringify(_params[i])));
      }
      return {paramsData: _.sortBy(_paramArr, function(body) {
        return body.seq;
      })};
    },
    methods: {
      changeSwitch: function(param) {
        var _currentData;
        if (!param.isReturn) {
          _currentData = {
            is_stringLenCheck: false,
            is_enumValCheck: false,
            is_regExpCheck: false,
            is_cryptTypeCheck: false,
            cryptRuleId: null,
            cryptType: null,
            stringLen: null,
            enumVal: null,
            regExp: null
          };
          param = $.extend(param, _currentData);
        }
        if (!param.is_cryptTypeCheck) {
          _currentData = {
            cryptRuleId: null,
            cryptType: null
          };
          param = $.extend(param, _currentData);
        }
        if (!param.is_stringLenCheck) {
          param.stringLen = null;
        }
        if (!param.is_enumValCheck) {
          param.enumVal = null;
        }
        if (!param.is_regExpCheck) {
          param.regExp = null;
        }
      }
    },
    watch: {
      paramsData: {
        deep: true,
        handler: function(val, oldVal) {
          var _params = this.paramsData;
          var _obj = {};
          for (var i in _params) {
            if (_params[i].isReturn) {
              var _field = _params[i][this.paramEn];
              _obj[_field] = {};
              if (_params[i].is_cryptTypeCheck) {
                _obj[_field].cryptType = _params[i].cryptType;
                _obj[_field].cryptRuleId = _params[i].cryptRuleId;
              }
              if (_params[i].is_stringLenCheck) {
                _obj[_field].stringLen = _params[i].stringLen;
              }
              if (_params[i].is_enumValCheck) {
                _obj[_field].enumVal = _params[i].enumVal;
              }
              if (_params[i].is_regExpCheck) {
                _obj[_field].regExp = _params[i].regExp;
              }
            }
          }
          this.$emit('input', _obj);
          this.$emit('change', _obj);
        }
      }
    }
  };
</script>

