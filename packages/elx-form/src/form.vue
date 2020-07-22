<template>
    <div class="elx-form">
      <el-form ref="elxForm" :model="currentValue" :label-suffix="labelSuffix" :label-width="labelWidth" :rules="currentConfig.rules">
          <el-form-item  class="elx-form-item" :label-width="field.labelWidth" :style="{'width': field.width}" v-for="(field, index) in currentConfig.fields" :key="index" :label="field.label" v-show="typeof field.isShow == 'boolean' ? field.isShow : true" :prop="field.name in currentConfig.rules?field.name:currentConfig.rules[field.name]">
              <template v-if="field.type=='radio'" >
                  <el-radio-group v-model="currentValue[field.name]" :disabled="field.isdisabled" @change="'change' in field ? field.change(getSelf()) : ''">
                      <el-radio v-for="(opt, index) in field.options" :key="index" :disabled="opt.isdisabled" :label="opt.value || opt">
                          {{opt.label || opt}}
                          <el-tooltip v-show="field.isRemark" class="item" effect="dark" :content="typeof opt == 'string' ? opt : (opt.remark || opt.label)" placement="bottom">
                            <span class="uex-icon-help"></span>
                          </el-tooltip>
                      </el-radio>
                  </el-radio-group>
              </template>

              <template v-if="field.type=='radioButton'" >
                  <el-radio-group v-model="currentValue[field.name]" :disabled="field.isdisabled" @change="'change' in field ? field.change(getSelf()) : ''">
                      <el-radio-button v-for="(opt, index) in field.options" :key="index" :disabled="opt.isdisabled" :label="opt.value || opt">{{opt.label || opt}}</el-radio-button>
                  </el-radio-group>
              </template>

              <template v-if="field.type=='radioCard'" >
                  <elx-radio-group v-model="currentValue[field.name]" :disabled="field.isdisabled" @change="'change' in field ? field.change(getSelf()) : ''">
                      <elx-radio v-for="(opt, index) in field.options" :key="index" :disabled="opt.isdisabled" :label="opt.value || opt">{{opt.label || opt}}</elx-radio>
                  </elx-radio-group>
              </template>

              <template v-if="field.type=='checkbox'" >
                  <el-checkbox-group v-model="currentValue[field.name]" :disabled="field.isdisabled" @change="'change' in field ? field.change(getSelf()) : ''">
                    <el-checkbox v-for="(opt, index) in field.options" :key="index" :disabled="opt.isdisabled" :label="opt.value || opt">{{opt.label || opt}}</el-checkbox>
                  </el-checkbox-group>
              </template>
              
              <template v-if="field.type=='checkboxButton'" >
                  <el-checkbox-group v-model="currentValue[field.name]" :disabled="field.isdisabled" @change="'change' in field ? field.change(getSelf()) : ''">
                    <el-checkbox-button v-for="(opt, index) in field.options" :disabled="opt.isdisabled" :key="index" :label="opt.value || opt">{{opt.label || opt}}</el-checkbox-button>
                  </el-checkbox-group>
              </template>

              <template v-if="field.type=='select'&&field.filterable" >
                <elx-select :filterable="field.filterable" v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" :placeholder="field.placeholder">
                    <elx-option v-for="(item, index) in field.options" :key="index" :label="item.label || item" :value="item.value || item"></elx-option>
                </elx-select>
              </template>

              <template v-if="field.type=='select'&&!field.filterable" >
                <el-select :filterable="field.filterable" v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" :placeholder="field.placeholder">
                    <el-option v-for="(item, index) in field.options" :key="index" :label="item.label || item" :value="item.value || item"></el-option>
                </el-select>
              </template>

              <template v-if="field.type=='multipleSelect'" >
                <el-select v-model="currentValue[field.name]" multiple @change="'change' in field ? field.change(getSelf()) : ''">
                    <el-option v-for="(item, index) in field.options" :key="index" :label="item.label || item" :value="item.value || item"></el-option>
                </el-select>
              </template>

              <template v-if="field.type=='inputText'" >
                <el-input v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" :placeholder="field.placeholder" :disabled="field.isdisabled"></el-input>
              </template>

              <template v-if="field.type=='inputIcon'" >
                <el-input :placeholder="field.placeholder" @change="'change' in field ? field.change(getSelf()) : ''" icon="field.icon" v-model="currentValue[field.name]" :on-icon-click="field.iconClickHandler"></el-input>
              </template>

              <template v-if="field.type=='inputTextarea'" >
                <el-input type="textarea" :rows="field.row" @change="'change' in field ? field.change(getSelf()) : ''" :placeholder="field.placeholder" v-model="currentValue[field.name]"></el-input>
              </template>

              <template v-if="field.type=='inputCompound'" >
                <el-input :disabled="field.isdisabled" :placeholder="field.placeholder" @change="'change' in field ? field.change(getSelf()) : ''" v-model="currentValue[field.name]">
                  <template :slot="field.compoundType">{{field.compoundContent}}</template>
                </el-input>
              </template>

              <template v-if="field.type=='inputNumber'" >
                <el-input-number :disabled="field.isDisabled" @change="'change' in field ? field.change(getSelf()) : ''" v-model="currentValue[field.name]" :min="field.min" :max="field.max"></el-input-number>
              </template>

              <template v-if="field.type=='switch'" >
                  <el-switch v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" on-text="是" off-text="否" on-color="#13ce66" off-color="#ff4949">赋值</el-switch>
              </template>

              <template v-if="field.type=='slider'" >
                  <div class="block">
                      <el-slider v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" show-input :step="10"></el-slider>
                  </div>
              </template>

              <template v-if="field.type=='operateParam'" >
                  <elx-operate-param v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" :is-add="field.isAdd" :is-remove="field.isRemove" :param-id-disable="field.paramIdDisable"></elx-operate-param>
              </template>

              <template v-if="field.type=='paramForm'" >
                  <elx-param-form v-model="currentValue[field.name]" @change="'change' in field ? field.change(getSelf()) : ''" :params="field.params" main-label="是否授权" :param-en="field.paramEn" :param-zh="field.paramZh" :columns="field.columns" ></elx-param-form>
              </template>

              <template v-if="field.type=='formGroup'" >
                  <elx-form-group :ref="'formGroup'+index" v-model="currentValue[field.name]" :config="field.config" @change="'change' in field ? field.change(getSelf()) : ''"></elx-form-group>
              </template>

              <template v-if="field.type=='tableForm'" >
                  <elx-table-form :ref="'tableForm'+index" v-model="currentValue[field.name]" :config="field.config" @change="'change' in field ? field.change(getSelf()) : ''"></elx-table-form>
              </template>
              
              <template v-if="field.type=='cardForm'" >
                  <elx-card-form :ref="'cardForm'+index" v-model="currentValue[field.name]" :config="field.config" @change="'change' in field ? field.change(getSelf()) : ''"></elx-card-form>
              </template>
              <template v-if="field.type=='codeMirror'" >
                  <elx-codemirror v-model="currentValue[field.name]" :option="field.option" :height="field.height" :action-data="field.actionData?field.actionData:[]" @change="'change' in field ? field.change(getSelf()) : ''"></elx-codemirror>
              </template>

              <template v-if="field.type=='button'" >
                  <el-button @click.native="'click' in field ? field.click(getSelf()) : ''">{{field.text}}</el-button>
              </template>
              
          </el-form-item>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: 'ElxForm',
    componentName: 'ElxForm',

    props: {
      index: {
        type: Number,
        default: 0
      },
      value: {
        type: Object,
        default: {}
      },
      config: {
        type: Object,
        default: {}
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
    data: function() {
      return {
        currentValue: this.value,
        currentConfig: {
          fields: this.config.fields || [],
          rules: this.config.rules || {}
        },
        objects: ['paramForm', 'formGroup'],
        options: ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm', 'cardForm']
      };
    },
    methods: {
      getSelf: function() {
        return this;
      },
      setDefaultValue: function(obj, field) {
        if (this.options.indexOf(field.type) > -1) {
          obj[field.name] = field.defaultValue ? field.defaultValue : [];
        } else if (this.objects.indexOf(field.type) > -1) {
          obj[field.name] = field.defaultValue ? field.defaultValue : {};
        } else if (field.type === 'switch') {
          obj[field.name] = typeof field.defaultValue === 'boolean' ? field.defaultValue : (field.defaultValue ? field.defaultValue : null);
        } else {
          obj[field.name] = field.defaultValue ? field.defaultValue : null;
        }
        return obj;
      },
      setRelation: function() {
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
      setBindValue: function() {
        var _obj = JSON.parse(JSON.stringify(this.value));
        for (var i in this.currentConfig.fields) {
          if (!(this.currentConfig.fields[i].name in this.value) && 'name' in this.currentConfig.fields[i]) {
            _obj = this.setDefaultValue(_obj, this.currentConfig.fields[i]);
          }
        }
        this.currentValue = _obj;
      },
      validate: function() {
        var _valid = true;
        var _self = this;
        this.$refs.elxForm.validate(function(valid) {
          _valid = valid;
          for (var i in _self.config.fields) {
            var customComponent = ['tableForm', 'formGroup', 'cardForm'];
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
        handler: function(val, oldVal) {
          if (this.currentValue !== val) {
            this.currentValue = this.value;
            this.setBindValue();
          }
        }
      },
      currentValue: {
        deep: true,
        handler: function(val, oldVal) {
          if (typeof oldVal !== 'object') {
            return;
          }
          this.setRelation();
          this.$emit('input', val, this.index);
        }
      },
      config: {
        deep: true,
        handler: function(val, oldVal) {
          if (this.currentConfig !== val) {
            this.currentConfig = {
              fields: val.fields || [],
              rules: val.rules || {}
            };
            this.setBindValue();
          }
        }
      }
    },
    beforeCreate: function() {
      this.$emit('beforeGetFields', this);
    },
    created: function() {
      this.setBindValue();
      this.$emit('beforeRender', this);
      if (this.config.beforeRender) {
        this.config.beforeRender(this);
      }
    },
    mounted: function() {
      this.$emit('afterRender', this);
      if (this.config.afterRender) {
        this.config.afterRender(this);
      }
    }
  };
</script>

