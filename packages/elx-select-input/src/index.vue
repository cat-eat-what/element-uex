<template>
    <div class="elx-select-input">
      <div class="select-input-group">
        <elx-select
          v-show="currentType == 'select'"
          v-model="currentValue"
          :root="root"
          :disabled="disabled"
          :loading="loading"
          :clearable="clearable"
          :is-post-root="isPostRoot"
          :filterable="filterable"
          :multiple="multiple"
          :remote="remote"
          :placeholder="placeholder"
          :filter-method="filterMethod"
          :remote-method="remoteMethod"
          @change="change"
          @visible-change="visibleChange">
            <elx-option
              v-for="(item, index) in options"
              :option="item"
              :render-content="renderContent"
              :key="item.value || item"
              :label="item.label || item"
              :value="item.value || item">
            </elx-option>
        </elx-select>
        <el-input
          v-show="currentType == 'input'"
          v-model="currentValue"
          @change="change"
          :placeholder="placeholder"
          :disabled="disabled">
        </el-input>
      </div>
      <div
        class="icon-button"
        @click="changeType">
        <span
          class="uex-icon-edit"
          v-if="currentType == 'select'"></span>
        <span
          class="uex-icon-back"
          v-if="currentType != 'select'">
        </span>
      </div>
    </div>
</template>

<script>
  import Emitter from 'element-uex/src/mixins/emitter';
  import Locale from 'element-uex/src/mixins/locale';
  import { t } from 'element-uex/src/locale';
  export default {
    mixins: [Emitter, Locale],
    name: 'ElxSelectInput',
    componentName: 'ElxSelectInput',

    props: {
      root: Object,
      value: {},
      disabled: Boolean,
      loading: Boolean,
      clearable: Boolean,
      isPostRoot: Boolean,
      filterable: Boolean,
      multiple: Boolean,
      remote: Boolean,
      placeholder: {
        type: String,
        default() {
          return t('el.select.placeholder');
        }
      },
      filterMethod: Function,
      remoteMethod: Function,
      options: Array,
      renderContent: Function,
      type: {
        type: String,
        default: 'select'
      }
    },
    data() {
      return {
        currentValue: '',
        currentType: ''
      };
    },
    methods: {
      change(val) {
      },
      visibleChange(val) {
        this.$emit('visible-change', val);
      },
      changeType() {
        this.currentType = this.currentType === 'select' ? 'input' : 'select';
        this.$emit('update:type', this.currentType);
      }
    },
    watch: {
      value(val, oldVal) {
        this.currentValue = val;
        if (Array.isArray(val)) {
          if (JSON.stringify(val) !== JSON.stringify(oldVal)) {
            this.dispatch('ElFormItem', 'el.form.change', val);
          } else {
            return;
          }
        }
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      },
      currentValue(val, oldVal) {
        this.$emit('input', val);
      },
      type() {
        this.currentType = this.type;
      }
    },
    created() {
      this.currentValue = this.value;
      this.currentType = this.type;
    },
    mounted() {
    }
  };
</script>

