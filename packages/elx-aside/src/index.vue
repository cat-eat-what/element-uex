<template>
    <div
      class="elx-aside"
      :style="{height: height + 'px'}">
      <slot>无分发内容</slot>
    </div>
</template>

<script>
  export default {
    name: 'ElxAside',
    componentName: 'ElxAside',

    props: {
    },
    data: function() {
      return {
        height: 0
      };
    },
    methods: {
      parseInt: function(val) {
        val = window.parseInt(val);
        return window.isNaN(val) ? 0 : val;
      },
      parseFloat: function(val) {
        val = window.parseFloat(val);
        return window.isNaN(val) ? 0 : val;
      },
      getCss: function(el) {
        let css;
        if (window.getComputedStyle) {
          css = window.getComputedStyle(el);
        } else {
          css = el.currentStyle;
        }
        return css;
      },
      judgeElLocation: function(el) {
        const css = this.getCss(el);
        if (css.position === 'fixed' || css.position === 'absolute') {
          return false;
        }
        return true;
      },
      getRealHeight: function(el, height) {
        let realHeight = 0;
        const css = this.getCss(el);
        if (css.boxSizing === 'border-box') {
          realHeight = this.parseFloat(height) -
            this.parseFloat(css.marginTop) -
            this.parseFloat(css.marginBottom);
        } else {
          realHeight = this.parseFloat(height) -
            this.parseFloat(css.paddingTop) -
            this.parseFloat(css.paddingBottom) -
            this.parseFloat(css.borderTopWidth) -
            this.parseFloat(css.borderBottomWidth) -
            this.parseFloat(css.marginTop) -
            this.parseFloat(css.marginBottom);
        }
        return realHeight;
      },
      getInnerHeight: function(el) {
        let innerHeight = 0;
        const css = this.getCss(el);
        innerHeight = this.formatVal(css.height, el.offsetHeight, -1) -
          this.parseFloat(css.paddingTop) -
          this.parseFloat(css.paddingBottom) -
          this.parseFloat(css.borderTopWidth) -
          this.parseFloat(css.borderBottomWidth);
        return innerHeight;
      },
      formatVal: function(realVal, offsetVal, gap) {
        realVal = this.parseFloat(realVal);
        if (realVal.toString().split('.').length > 1) {
          const point = this.parseFloat('0.' + realVal.toString().split('.')[1]);
          if (point >= 0.5) {
            offsetVal = offsetVal - 1 + point;
          } else {
            offsetVal = offsetVal + point;
          }
          return offsetVal;
        }
        return this.parseFloat(offsetVal);
      },
      resize: function() {
        const parentEl = this.$el.parentNode;
        if (!parentEl) {
          return;
        }
        this.height = this.getRealHeight(this.$el, this.getInnerHeight(parentEl));
      }
    },
    watch: {
    },
    mounted: function() {
      this.resize();
      window.addEventListener('resize', this.resize);
    },
    beforeDestroy: function() {
      window.removeEventListener('resize', this.resize);
    }
  };
</script>

