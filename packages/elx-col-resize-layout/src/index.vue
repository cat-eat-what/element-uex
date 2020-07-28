<template>
  <div
    class="elx-col-resize-layout"
    :style="{width: currentWidth + 'px'}"
    @mouseup="splitUp"
    @mouseleave="splitLeave"
    @mousemove="splitMove">
    <div
      class="elx-layout-left"
      v-show="leftVisible"
      :style="{right: currentWidth - splitLeft + 'px'}">
      <slot name="left"></slot>
    </div>
    <div
      v-show="splitVisible"
      class="col-resize-split"
      :class="splitType"
      :style="{
        left: resizeSplitLeft,
        right: resizeSplitRight
      }"
      @mousedown="splitDown"
      @mouseenter="splitMouseEnter"
      @mouseleave="splitMouseLeave">
      <span class="uex-icon-more-col" v-if="splitType == 'wide'"></span>
    </div>
    <div
      class="elx-layout-right"
      v-show="rightVisible"
      :style="{left: splitVisible ? splitLeft + splitW + 'px' : splitLeft + 'px'}">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxColResizeLayout',
    componentName: 'ElxColResizeLayout',
    props: {
      width: {
        type: Number,
        default: 300
      },
      maxWidth: {
        type: Number,
        default: 500
      },
      defaultLeft: {
        type: Number
      },
      leftVisible: {
        type: Boolean,
        default: true
      },
      rightVisible: {
        type: Boolean,
        default: true
      },
      splitVisible: {
        type: Boolean,
        default: true
      },
      splitType: {
        type: String,
        default: 'wide'
      }
    },
    data() {
      var splitW = this.splitType === 'wide' ? 10 : 1;
      return {
        currentWidth: this.width,
        splitLeft: this.defaultLeft || window.parseInt((this.width - splitW) * 0.5),
        originPageX: 0,
        prePageX: 0,
        mouseEnter: false
      };
    },
    computed: {
      splitW() {
        return this.splitType === 'wide' ? 10 : 1;
      },
      single() {
        return (!this.leftVisible && this.rightVisible && this.splitVisible) || (this.leftVisible && !this.rightVisible && this.splitVisible);
      },
      resizeSplitLeft() {
        var left = this.splitLeft;
        if (this.mouseEnter && this.splitType === 'narrow') {
          left = left - 5;
        }
        return left + 'px';
      },
      resizeSplitRight() {
        var right = this.currentWidth - this.splitLeft - this.splitW;
        if (this.mouseEnter && this.splitType === 'narrow') {
          right = right - 5;
        }
        return right + 'px';
      }
    },
    methods: {
      splitDown(e) {
        document.body.addEventListener('mousedown', this.preventSelect);
        this.addCursorStyle();
        this.addBodyEvent();
        this.originPageX = e.pageX;
        this.$emit('drag-start', e);
        this.mouseDown = true;
      },
      splitMove(e) {
        if (this.originPageX !== 0) {
          var gap = e.pageX - this.originPageX;
          var left = this.splitLeft + gap;
          if (this.single) {
            gap = this.leftVisible ? gap : -gap;
            if (this.currentWidth + gap <= this.splitW) {
              this.currentWidth = this.splitW;
              this.originPageX = 0;
            } else if (this.currentWidth + gap >= this.maxWidth) {
              this.currentWidth = this.maxWidth;
              this.originPageX = 0;
            } else {
              this.currentWidth = this.currentWidth + gap;
              this.originPageX = e.pageX;
            }
          } else {
            if (left <= 0) {
              this.splitLeft = 0;
            } else if (left >= this.currentWidth - this.splitW) {
              this.splitLeft = this.currentWidth - this.splitW;
            } else {
              this.splitLeft = left;
            }
            this.originPageX = e.pageX;
          }
          e.preventDefault();
        }
        this.prePageX = e.pageX;
      },
      splitUp(e) {
        document.body.removeEventListener('mousedown', this.preventSelect);
        this.removeCursorStyle();
        this.removeBodyEvent();
        this.originPageX = 0;
        this.$emit('drag-end', e);
        this.mouseDown = false;
      },
      splitLeave(e) {
        if (this.single) {
          this.splitMove(e);
        } else {
          document.body.removeEventListener('mousedown', this.preventSelect);
          this.removeCursorStyle();
          this.removeBodyEvent();
          this.originPageX = 0;
          this.$emit('drag-end', e);
          this.mouseDown = false;
        }
        e.preventDefault();
      },
      resizeByVisible() {
        if (!this.leftVisible) {
          this.splitLeft = 0;
        }
        if (!this.rightVisible) {
          this.splitLeft = this.splitVisible ? this.currentWidth - this.splitW : this.currentWidth;
        }
      },
      preventSelect(e) {
        e.preventDefault();
        return false;
      },
      addCursorStyle() {
        document.body.style.cursor = 'col-resize';
      },
      removeCursorStyle() {
        document.body.style.cursor = 'auto';
      },
      addBodyEvent() {
        if (this.single) {
          document.body.addEventListener('mouseup', this.splitUp);
          document.body.addEventListener('mousemove', this.splitLeave);
          document.body.addEventListener('mouseleave', this.splitUp);
        }
      },
      removeBodyEvent() {
        document.body.removeEventListener('mouseup', this.splitUp);
        document.body.removeEventListener('mousemove', this.splitLeave);
        document.body.removeEventListener('mouseleave', this.splitUp);
      },
      splitMouseEnter() {
        this.mouseEnter = true;
      },
      splitMouseLeave() {
        this.mouseEnter = false;
      }
    },
    watch: {
      splitLeft(val, oldVal) {
        this.$emit('resize', this.currentWidth, this.splitLeft);
      },
      width(val, oldVal) {
        this.currentWidth = val;
        if ((!this.leftVisible || !this.rightVisible)) {
          this.resizeByVisible();
        } else {
          if (oldVal === 0) {
            this.splitLeft = this.defaultLeft || window.parseInt((val - this.splitW) * 0.5);
          } else {
            this.splitLeft = this.defaultLeft || val * this.splitLeft / oldVal;
          }
        }
        this.$emit('resize', this.currentWidth, this.splitLeft);
      },
      currentWidth(val) {
        this.$emit('update:width', val);
      },
      leftVisible(val, oldVal) {
        this.resizeByVisible();
      },
      rightVisible(val, oldVal) {
        this.resizeByVisible();
      },
      splitVisible(val, oldVal) {
        if (!oldVal) {
          if (this.leftVisible && this.rightVisible && val) {
            this.splitLeft = this.defaultLeft || window.parseInt((this.currentWidth - this.splitW) * 0.5);
          }
        }
      }
    },
    created() {
      this.resizeByVisible();
    },
    mounted() {
    },
    beforeDestroy() {
      this.removeBodyEvent();
      document.body.removeEventListener('mousedown', this.preventSelect);
    }
  };
</script>

