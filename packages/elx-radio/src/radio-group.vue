<template>
  <div class="elx-radio-group">
    <slot></slot>
  </div>
</template>

<script>
  import emitter from 'element-uex/src/mixins/emitter';
  import Migrating from 'element-uex/src/mixins/migrating';

  export default {
    name: 'ElxRadioGroup',
    componentName: 'ElxRadioGroup',
    mixins: [emitter, Migrating],
    inject: {
      elForm: {
        default: ''
      },
      elFormItem: {
        default: ''
      }
    },

    props: {
      value: {},
      validateEvent: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
      };
    },
    watch: {
      value(value) {
        this.$emit('change', value);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', [value]);
        }
      }
    }
  };
</script>

