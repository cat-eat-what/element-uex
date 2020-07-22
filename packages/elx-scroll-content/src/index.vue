<template>
  <div
    class="elx-scroll-content"
    :class="{
      'elx-row': splitType == 'row',
      'elx-col': splitType == 'col'
    }"
    :style="{
      height: typeof height == 'number' ? height + 'px' : height,
      width: typeof width == 'number' ? width + 'px' : width,
      overflow: overflow
    }">
    <slot>无分发内容</slot>
  </div>
</template>

<script>
  export default {
    name: 'ElxScrollContent',
    componentName: 'ElxScrollContent',

    props: {
      splitType: {
        type: String,
        default: 'row'
      }
    },
    data: function() {
      return {
        width: 0,
        height: 0,
        overflow: 'hidden',
        innerWidth: 0,
        innerHeight: 0
      };
    },
    computed: {
      size: function() {
        return {
          width: this.width,
          height: this.height,
          innerWidth: this.innerWidth,
          innerHeight: this.innerHeight
        };
      }
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
        var css;
        if (window.getComputedStyle) {
          css = window.getComputedStyle(el);
        } else {
          css = el.currentStyle;
        }
        return css;
      },
      judgeElLocation: function(el) {
        var css = this.getCss(el);
        if (css.position === 'fixed' || css.position === 'absolute') {
          return false;
        }
        return true;
      },
      getRealHeight: function(el, height) {
        var realHeight = 0;
        var css = this.getCss(el);
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
        var innerHeight = 0;
        var css = this.getCss(el);
        innerHeight = this.formatVal(css.height, el.offsetHeight, -1) -
          this.parseFloat(css.paddingTop) -
          this.parseFloat(css.paddingBottom) -
          this.parseFloat(css.borderTopWidth) -
          this.parseFloat(css.borderBottomWidth);
        return innerHeight;
      },
      getOuterHeight: function(el) {
        var outerHeight = 0;
        var css = this.getCss(el);
        outerHeight = this.parseFloat(css.marginTop) +
          this.formatVal(css.height, el.offsetHeight, 1) +
          this.parseFloat(css.marginBottom);
        return outerHeight;
      },
      getRealWidth: function(el, width) {
        var realWidth = 0;
        var css = this.getCss(el);
        if (css.boxSizing === 'border-box') {
          realWidth = this.parseFloat(width) -
            this.parseFloat(css.marginLeft) -
            this.parseFloat(css.marginRight);
        } else {
          realWidth = this.parseFloat(width) -
            this.parseFloat(css.paddingLeft) -
            this.parseFloat(css.paddingRight) -
            this.parseFloat(css.borderLeftWidth) -
            this.parseFloat(css.borderRightWidth) -
            this.parseFloat(css.marginLeft) -
            this.parseFloat(css.marginRight);
        }
        return realWidth;
      },
      getOffsetWidth: function(el, type) {
        var rect = el.getBoundingClientRect();
        var xOffsetWidth = Math.round(rect.right - rect.left);
        var offsetWidth = el.offsetWidth;
        return type === 'inner' ? Math.min(xOffsetWidth, offsetWidth) : Math.max(xOffsetWidth, offsetWidth);
      },
      getInnerWidth: function(el) {
        var innerWidth = 0;
        var css = this.getCss(el);
        innerWidth = this.formatVal(css.width, this.getOffsetWidth(el, 'inner'), -1) -
          this.parseFloat(css.paddingLeft) -
          this.parseFloat(css.paddingRight) -
          this.parseFloat(css.borderLeftWidth) -
          this.parseFloat(css.borderRightWidth);
        return innerWidth;
      },

      getOuterWidth: function(el) {
        var outerWidth = 0;
        var css = this.getCss(el);
        outerWidth = this.parseFloat(css.marginLeft) +
          this.formatVal(css.width, this.getOffsetWidth(el, 'outer'), 1) +
          this.parseFloat(css.marginRight);
        return outerWidth;
      },
      formatVal: function(realVal, offsetVal, gap) {
        realVal = this.parseFloat(realVal);
        if (realVal.toString().split('.').length > 1) {
          var point = this.parseFloat('0.' + realVal.toString().split('.')[1]);
          if (point >= 0.5) {
            offsetVal = offsetVal - 1 + point;
          } else {
            offsetVal = offsetVal + point;
          }
          return offsetVal;
        }
        return this.parseFloat(offsetVal);
      },
      refreshHeight: function() {
        var self = this;
        var parentEl = this.$el.parentNode;
        if (!parentEl) {
          return;
        }
        var childNodes = parentEl.childNodes;
        var childHeightTotal = 0;
        var parentElWidth = self.getInnerWidth(parentEl);
        var parentElHeight = self.getInnerHeight(parentEl);
        var filterItems = [];
        Object.keys(childNodes).forEach(function(key) {
          var node = childNodes[key];
          if (typeof node.className !== 'string') {
            return false;
          }
          if (node.className.indexOf('elx-scroll-content') > -1) {
            filterItems.push(node);
            return true;
          } else if (self.judgeElLocation(node)) {
            childHeightTotal += self.getOuterHeight(node);
          }
          return false;
        });
        if (filterItems.length > 0) {
          this.width = this.getRealWidth(this.$el, parentElWidth);
          this.height = this.getRealHeight(this.$el, (parentElHeight - childHeightTotal) / filterItems.length);
          this.$nextTick(function() {
            self.innerWidth = self.getInnerWidth(self.$el);
            self.innerHeight = self.getInnerHeight(self.$el);
          });
        }
      },
      refreshWidth: function() {
        var self = this;
        var parentEl = this.$el.parentNode;
        if (!parentEl) {
          return;
        }
        var childNodes = parentEl.childNodes;
        var childWidthTotal = 0;
        var parentElWidth = self.getInnerWidth(parentEl);
        var parentElHeight = self.getInnerHeight(parentEl);
        var filterItems = [];
        Object.keys(childNodes).forEach(function(key) {
          var node = childNodes[key];
          if (typeof node.className !== 'string') {
            return false;
          }
          if (node.className.indexOf('elx-scroll-content') > -1) {
            filterItems.push(node);
            return true;
          } else {
            childWidthTotal += self.getOuterWidth(node);
          }
          return false;
        });
        if (filterItems.length > 0) {
          this.width = this.getRealWidth(this.$el, (parentElWidth - childWidthTotal) / filterItems.length);
          this.height = this.getRealHeight(this.$el, parentElHeight);
          this.$nextTick(function() {
            self.innerWidth = self.getInnerWidth(self.$el);
            self.innerHeight = self.getInnerHeight(self.$el);
          });
        }
      },
      resize: function() {
        var self = this;
        this.overflow = 'hidden';
        var parentEl = this.$el.parentNode;
        if (!parentEl) {
          return;
        } else {
          if (parentEl.className.indexOf('elx-row') > -1) {
            this.refreshHeight();
          } else {
            this.refreshWidth();
          }
          this.$nextTick(function() {
            if (typeof self.$children === 'object') {
              self.$children.map(function(item) {
                if (typeof item.resize === 'function') {
                  item.resize();
                }
              });
            }
          });
        }
        this.$nextTick(function() {
          self.overflow = 'auto';
        });
      }
    },
    watch: {
      size: function() {
        this.$emit('resize', this.size);
      }
    },
    mounted: function() {
      this.resize();
      if (window.addEventListener) {
        window.addEventListener('resize', this.resize);
      } else if (window.attachEvent) {
        window.attachEvent('resize', this.resize);
      }
    }
  };
</script>

