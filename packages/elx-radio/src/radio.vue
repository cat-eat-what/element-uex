<template>
  <div
    class="elx-radio"
    :class="focus?'active':''">
    <div
      class="lay"
      v-if="disabled"></div>
    <div
      class="elx-radio-item"
      @click="select">
      <slot></slot>
      <span
        v-if="focus"
        class="el-icon-check">
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxRadio',
    componentName: 'ElxRadio',

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
        return this.$parent.value === this.label;
      }
    },
    methods: {
      select: function() {
        this.$parent.$emit('input', this.label);
      }
    }
  };
</script>

