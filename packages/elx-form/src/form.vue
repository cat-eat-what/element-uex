<template>
  <div class="elx-form">
    <el-form
      ref="elxForm"
      :class="currentConfig.inline?'inline':'notInline'"
      :model="currentValue"
      :label-suffix="labelSuffix"
      :label-width="labelWidth"
      :rules="currentConfig.rules">
      <el-form-item
        v-for="(field, index) in currentConfig.fields"
        v-show="typeof field.isShow == 'boolean' ? field.isShow : true"
        :label="field.label"
        :class="'elx-form-item ' + field.type"
        :label-width="field.labelWidth"
        :style="{'width': field.width}"
        :key="field.name"
        :prop="field.name in currentConfig.rules?field.name:currentConfig.rules[field.name]">

        <template slot="label" v-if="field.label&&field.label!==''&&field.isRemark">
          <span>
            <span v-text="labelSuffix"></span>
            <el-tooltip
              v-if="field.isRemark"
              effect="dark"
              placement="bottom"
              :content="String(field.remark||field.label)">
              <span class="label-help uex-icon-help"></span>
            </el-tooltip>
            <span v-text="field.label"></span>
          </span>
        </template>

        <template v-if="field.type=='inputText'&&field.valueType!='number'" >
          <el-input
            v-model="currentValue[field.name]"
            :placeholder="field.placeholder"
            :disabled="field.isdisabled"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-input>
        </template>

        <template v-if="field.type=='inputText'&&field.valueType=='number'" >
          <el-input
            v-model.number="currentValue[field.name]"
            :placeholder="field.placeholder"
            :disabled="field.isdisabled"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-input>
        </template>

        <template v-if="field.type=='inputIcon'" >
          <el-input
            v-model="currentValue[field.name]"
            :placeholder="field.placeholder"
            :disabled="field.isdisabled"
            :icon="field.icon"
            :on-icon-click="function() {'iconClickHandler' in field ? field.iconClickHandler(getSelf(), field, currentValue[field.name]) : ''}"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-input>
        </template>

        <template v-if="field.type=='inputTextarea'" >
          <el-input
            v-model="currentValue[field.name]"
            type="textarea"
            :rows="field.row"
            :disabled="field.isdisabled"
            :placeholder="field.placeholder"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-input>
        </template>

        <template v-if="field.type=='inputCompound'" >
          <el-input
            v-model="currentValue[field.name]"
            :disabled="field.isdisabled"
            :placeholder="field.placeholder"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
            <template :slot="field.compoundType">
              {{field.compoundContent}}
            </template>
          </el-input>
        </template>

        <template v-if="field.type=='radio'" >
            <el-radio-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
                <el-radio
                  v-for="(opt, index) in field.options"
                  :key="opt.value || opt"
                  :disabled="opt.isdisabled"
                  :label="opt.value || opt">
                  {{opt.label || opt}}
                  <el-tooltip
                    v-show="field.isRemark"
                    class="item"
                    effect="dark"
                    :content="String(typeof opt == 'string' ? opt : (opt.remark || opt.label))"
                    placement="bottom">
                    <span class="uex-icon-help"></span>
                  </el-tooltip>
                </el-radio>
            </el-radio-group>
        </template>

        <template v-if="field.type=='radioButton'" >
            <el-radio-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
                <el-radio-button
                  v-for="(opt, index) in field.options"
                  :key="opt.value || opt"
                  :disabled="opt.isdisabled"
                  :label="opt.value || opt">
                  {{opt.label || opt}}
                  <el-tooltip
                    v-show="field.isRemark"
                    class="item"
                    effect="dark"
                    :content="String(typeof opt == 'string' ? opt : (opt.remark || opt.label))"
                    placement="bottom">
                    <span class="uex-icon-help"></span>
                  </el-tooltip>
                </el-radio-button>
            </el-radio-group>
        </template>

        <template v-if="field.type=='radioCard'" >
            <elx-radio-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
                <elx-radio
                  v-for="(opt, index) in field.options"
                  :key="opt.value || opt"
                  :disabled="opt.isdisabled"
                  :label="opt.value || opt">
                  {{opt.label || opt}}
                  <el-tooltip
                    v-show="field.isRemark"
                    class="item"
                    effect="dark"
                    :content="String(typeof opt == 'string' ? opt : (opt.remark || opt.label))"
                    placement="bottom">
                    <span class="uex-icon-help"></span>
                  </el-tooltip>
                </elx-radio>
            </elx-radio-group>
        </template>

        <template v-if="field.type=='checkbox'" >
            <el-checkbox-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
              <el-checkbox
                v-for="(opt, index) in field.options"
                :key="opt.value || opt"
                :disabled="opt.isdisabled"
                :label="opt.value || opt">
                {{opt.label || opt}}
              </el-checkbox>
            </el-checkbox-group>
        </template>

        <template v-if="field.type=='checkboxButton'" >
            <el-checkbox-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
              <el-checkbox-button
                v-for="(opt, index) in field.options"
                :disabled="opt.isdisabled"
                :key="index"
                :label="opt.value || opt">
                {{opt.label || opt}}
              </el-checkbox-button>
            </el-checkbox-group>
        </template>

        <template v-if="field.type=='checkboxCard'" >
            <elx-checkbox-group
              v-model="currentValue[field.name]"
              :disabled="field.isdisabled"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
                <elx-checkbox
                  v-for="(opt, index) in field.options"
                  :key="opt.value || opt"
                  :disabled="opt.isdisabled"
                  :label="opt.value || opt">
                  {{opt.label || opt}}
                </elx-checkbox>
            </elx-checkbox-group>
        </template>

        <template v-if="field.type=='select'&&(field.filterable || field.remote)" >
          <elx-select
            v-model="currentValue[field.name]"
            :root="getSelf()"
            :disabled="field.isdisabled"
            :loading="field.loading"
            :clearable="field.clearable"
            :is-post-root="field.isPostRoot"
            :filterable="field.filterable"
            :multiple="field.multiple"
            :remote="field.remote"
            :placeholder="field.placeholder"
            :filter-method="field.filterMethod"
            :remote-method="field.remoteMethod"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
            @visible-change="function(val){'visibleChange' in field ? field.visibleChange(getSelf(), field, currentValue[field.name], val) : ''}">
              <elx-option
                v-for="(item, index) in field.options"
                :option="item"
                :render-content="'renderContent' in field ? field.renderContent : null"
                :key="item.value || item"
                :label="item.label || item"
                :value="item.value || item">
              </elx-option>
          </elx-select>
        </template>

        <template v-if="field.type=='select'&&!field.filterable" >
          <el-select
            v-model="currentValue[field.name]"
            :filterable="field.filterable"
            :disabled="field.isdisabled"
            :clearable="field.clearable"
            :placeholder="field.placeholder"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
            @visible-change="function(val){'visibleChange' in field ? field.visibleChange(getSelf(), field, currentValue[field.name], val) : ''}">
              <el-option
                v-for="(item, index) in field.options"
                :key="item.value || item"
                :label="item.label || item"
                :value="item.value || item">
              </el-option>
          </el-select>
        </template>

        <template v-if="field.type=='multipleSelect'" >
          <el-select
            v-model="currentValue[field.name]"
            :disabled="field.isdisabled"
            :type="field.type"
            multiple
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
            @visible-change="function(val){'visibleChange' in field ? field.visibleChange(getSelf(), field, currentValue[field.name], val) : ''}">
              <el-option
                v-for="(item, index) in field.options"
                :key="item.value || item"
                :label="item.label || item"
                :value="item.value || item">
              </el-option>
          </el-select>
        </template>

        <template v-if="field.type=='selectInput'">
          <elx-select-input
            v-model="currentValue[field.name]"
            :root="getSelf()"
            :disabled="field.isdisabled"
            :loading="field.loading"
            :clearable="field.clearable"
            :is-post-root="field.isPostRoot"
            :filterable="field.filterable"
            :multiple="field.multiple"
            :remote="field.remote"
            :placeholder="field.placeholder"
            :filter-method="field.filterMethod"
            :remote-method="field.remoteMethod"
            :options="field.options"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
            @visible-change="'visibleChange' in field ? field.visibleChange(getSelf()) : ''">
          </elx-select-input>
        </template>

        <template v-if="field.type=='inputNumber'" >
          <el-input-number
            v-model="currentValue[field.name]"
            :disabled="field.isDisabled"
            :min="field.min"
            :max="field.max"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-input-number>
        </template>

        <template v-if="field.type=='switch'" >
          <el-switch
            v-model="currentValue[field.name]"
            :width="'switchWidth' in field ? field.switchWidth : 58"
            :active-text="'onText' in field ? field.onText : '是'"
            :inactive-text="'offText' in field ? field.offText : '否'"
            :active-value="'onValue' in field ? field.onValue : true"
            :inactive-value="'offValue' in field ? field.offValue : false"
            :active-color="'onColor' in field ? field.onColor : '#13ce66'"
            :inactive-color="'offColor' in field ? field.offColor : '#ff4949'"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </el-switch>
        </template>

        <template v-if="field.type=='slider'" >
          <div class="block">
            <el-slider
              v-model="currentValue[field.name]"
              show-input
              :step="field.step"
              :min="field.min"
              :max="field.max"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
            </el-slider>
          </div>
        </template>

        <template v-if="field.type=='cascader'" >
          <div class="block">
            <el-cascader
              v-model="currentValue[field.name]"
              :ref="'cascader'+index"
              :options="field.options"
              :props="field.props"
              :placeholder="field.placeholder"
              :disabled="field.isdisabled"
              :clearable="field.clearable"
              :filterable="field.filterable"
              :show-all-levels="field.showAllLevels"
              :change-on-select="field.changeOnSelect"
              @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
              @active-item-change="function(val){('activeItemChange' in field ? field.activeItemChange(val, getSelf(), field) : '')}">
            </el-cascader>
          </div>
        </template>

        <template v-if="field.type=='remoteTransfer'" >
          <elx-remote-transfer
            :transfer-value.sync="currentValue[field.name]"
            :ref="'remoteTransfer'+index"
            :request-url="field.url"
            :get-request-url="'getUrl' in field ? field.getUrl : function() {return '';}"
            :props="field.transferProps"
            :column="field.column"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-remote-transfer>
        </template>

        <template v-if="field.type=='inputTransfer'" >
          <elx-input-transfer
            v-model="currentValue[field.name]"
            :ref="'inputTransfer'+index"
            :edit-disabled="field.editDisabled"
            :disabled="field.isdisabled"
            :get-options-url="'getOptionsUrl' in field ? field.getOptionsUrl : function() {return '';}"
            :get-request-url="'getRequestUrl' in field ? field.getRequestUrl : function() {return '';}"
            :props="field.transferProps"
            :option-props="field.optionProps"
            :column="field.column"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-input-transfer>
        </template>

        <template v-if="field.type=='codeMirror'" >
          <elx-codemirror
            v-model="currentValue[field.name]"
            :ref="'codemirror'+field.name"
            :option="field.option"
            :height="field.height"
            :action-data="field.actionData?field.actionData:[]"
            :before-render="field.beforeRender?field.beforeRender:function(){}"
            :input-read="field.inputRead?field.inputRead:function(){}"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''"
            @show-hint="'showHint' in field ? field.showHint(getSelf(), field, currentValue[field.name]) : ''"
            @right-click="'rightClick' in field ? field.rightClick(getSelf(), field, currentValue[field.name]) : ''">
          </elx-codemirror>
        </template>

        <template v-if="field.type=='cron'" >
          <elx-cron
            v-model="currentValue[field.name]"
            :run-time-url="field.runTimeUrl"
            :disabled="field.isdisabled"
            :placeholder="field.placeholder"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-cron>
        </template>

        <template v-if="field.type=='tableForm'" >
          <elx-table-form
            v-model="currentValue[field.name]"
            :ref="'tableForm'+index"
            :config="field.config"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-table-form>
        </template>

        <template v-if="field.type=='operateParam'" >
          <elx-operate-param
            v-model="currentValue[field.name]"
            :is-add="field.isAdd"
            :is-remove="field.isRemove"
            :param-id-disable="field.paramIdDisable"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-operate-param>
        </template>

        <template v-if="field.type=='paramForm'" >
          <elx-param-form
            v-model="currentValue[field.name]"
            main-label="是否授权"
            :params="field.params"
            :param-en="field.paramEn"
            :param-zh="field.paramZh"
            :columns="field.columns"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-param-form>
        </template>

        <template v-if="field.type=='formGroup'" >
          <elx-form-group
            v-model="currentValue[field.name]"
            :ref="'formGroup'+index"
            :config="field.config"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-form-group>
        </template>

        <template v-if="field.type=='cardForm'" >
          <elx-card-form
            v-model="currentValue[field.name]"
            :ref="'cardForm'+index"
            :config="field.config"
            @change="'change' in field ? field.change(getSelf(), field, currentValue[field.name]) : ''">
          </elx-card-form>
        </template>

        <template v-if="field.type=='button'" >
          <el-button
            :disabled="field.isdisabled"
            @click.native="'click' in field ? field.click(getSelf()) : ''">
            {{field.text}}
          </el-button>
        </template>
        <template v-if="field.type=='component'" >
          <component
            :ref="'component' + index"
            v-bind:is="field.componentName"
            v-model="currentValue"
            :param="field.param"
            @change="'change' in field ? field.change(getSelf(), field, currentValue) : ''">
          </component>
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
        default() {
          return {};
        }
      },
      config: {
        type: Object,
        default() {
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
    data() {
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
      execFunc(val) {
        console.log(val);
      },
      getSelf() {
        return this;
      },
      setDefaultValue(obj, field) {
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
      setRelation() {
        for (let i in this.currentConfig.fields) {
          if ('relatedItems' in this.currentConfig.fields[i]) {
            const _relatedItems = this.currentConfig.fields[i].relatedItems;
            const _relatedValue = this.currentValue[this.currentConfig.fields[i].name];
            for (let j in this.currentConfig.fields) {
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
      setBindValue() {
        let _obj = JSON.parse(JSON.stringify(this.value));
        for (let i in this.currentConfig.fields) {
          if (!(this.currentConfig.fields[i].name in this.value) && 'name' in this.currentConfig.fields[i]) {
            _obj = this.setDefaultValue(_obj, this.currentConfig.fields[i]);
          }
        }
        this.currentValue = _obj;
      },
      validate() {
        let _valid = true;
        const _self = this;
        this.$refs.elxForm.validate(function(valid) {
          _valid = valid;
          for (let i in _self.config.fields) {
            const customComponent = ['tableForm', 'formGroup', 'cardForm', 'component'];
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
        handler(val, oldVal) {
          if (JSON.stringify(this.currentValue) !== JSON.stringify(val)) {
            this.currentValue = this.value;
            this.setBindValue();
          }
        }
      },
      currentValue: {
        deep: true,
        handler(val, oldVal) {
          if (typeof oldVal !== 'object') {
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
        handler(val, oldVal) {
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
    beforeCreate() {
      this.$emit('before-get-fields', this);
    },
    created() {
      this.setBindValue();
      this.$emit('before-render', this);
      if (this.config.beforeRender) {
        this.config.beforeRender(this);
      }
    },
    mounted() {
      this.$emit('after-render', this);
      if (this.config.afterRender) {
        this.config.afterRender(this);
      }
    }
  };
</script>

