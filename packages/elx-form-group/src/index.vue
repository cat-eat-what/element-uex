<template>
  <div class="elx-form-group">
    <elx-form
      ref="elxFormGroup"
      v-model="currentValue"
      :label-width="'0px'"
      :config="config">
    </elx-form>
  </div>
</template>

<script>
  export default {
    name: 'ElxFormGroup',
    componentName: 'ElxFormGroup',

    props: {
      value: {
        type: Object,
        default() {
          return {};
        }
      },
      config: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currentValue: this.value
      };
    },
    methods: {
      validate() {
        return this.$refs.elxFormGroup.validate();
      }
    },
    watch: {
      value: {
        deep: true,
        handler(val) {
          if (this.currentValue !== val) {
            this.currentValue = val;
          }
        }
      },
      currentValue: {
        deep: true,
        handler(val) {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      }
    },
    created() {
    }
  };
</script>

