<template>
    <div
      class="elx-checkbox-group"
      :class="size">
        <slot></slot>
    </div>
</template>

<script>
  import emitter from 'element-uex/src/mixins/emitter';
  import Migrating from 'element-uex/src/mixins/migrating';

  export default {
    name: 'ElxCheckboxGroup',
    componentName: 'ElxCheckboxGroup',
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
      size: String,
      validateEvent: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      };
    },
    watch: {
      value(value) {
        this.$emit('change', value);
        if (this.validateEvent) {
          this.dispatch('ElFormItem', 'el.form.change', value);
        }
      }
    }
  };
</script>

