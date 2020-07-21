<template>
  <div
    class="elx-checkbox"
    :class="focus?'active':''">
    <div class="lay" v-if="disabled"></div>
    <div
      class="elx-checkbox-item"
      @click="select">
      <slot></slot>
      <span v-if="focus" class="el-icon-check"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxCheckbox',
    componentName: 'ElxCheckbox',

    props: {
      label: {},
      disabled: Boolean
    },
    data: function() {
      return {
      };
    },
    computed: {
      focus: function() {
        var value = this.$parent.value;
        if (!Array.isArray(value)) {
          return false;
        } else {
          return value.indexOf(this.label) > -1;
        }
      }
    },
    methods: {
      select: function() {
        var value = this.$parent.value;
        var index = -1;
        if (!Array.isArray(value)) {
          value = [];
        }
        if (value.indexOf(this.label) < 0) {
          this.$parent.$emit('input', value.concat([this.label]));
        } else {
          index = value.indexOf(this.label);
          value.splice(index, 1);
          this.$parent.$emit('input', value);
        }
      }
    }
  };
</script>

