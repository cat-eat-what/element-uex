<template>
  <div
    class="elx-row-resize-layout"
    :style="{height: currentHeight + 'px'}"
    @mouseup="splitUp"
    @mouseleave="splitLeave"
    @mousemove="splitMove">
    <div
      v-show="topVisible"
      class="elx-layout-top"
      :style="{bottom: currentHeight - splitTop + 'px'}">
      <slot name="top"></slot>
    </div>
    <div
      v-show="splitVisible"
      class="row-resize-split"
      :class="splitType"
      :style="{
        top: resizeSplitTop,
        bottom: resizeSplitBottom
      }"
      @mousedown="splitDown"
      @mouseenter="splitMouseEnter"
      @mouseleave="splitMouseLeave">
      <span class="uex-icon-more-row" v-if="splitType == 'wide'"></span>
    </div>
    <div
      v-show="bottomVisible"
      class="elx-layout-bottom"
      :style="{
        top: splitVisible ? splitTop + splitW + 'px' : splitTop + 'px'
      }">
      <slot name="bottom"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxRowResizeLayout',
    componentName: 'ElxRowResizeLayout',
    props: {
      height: {
        type: Number,
        default: 300
      },
      maxHeight: {
        type: Number,
        default: 500
      },
      defaultTop: {
        type: Number
      },
      topVisible: {
        type: Boolean,
        default: true
      },
      bottomVisible: {
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
    data: function() {
      var splitW = this.splitType === 'wide' ? 12 : 1;
      return {
        test: null,
        currentHeight: this.height,
        splitTop: this.defaultTop || window.parseInt((this.height - splitW) * 0.5),
        originPageY: 0,
        prePageY: 0,
        mouseEnter: false
      };
    },
    computed: {
      splitW: function() {
        return this.splitType === 'wide' ? 12 : 1;
      },
      single: function() {
        return (!this.topVisible && this.bottomVisible && this.splitVisible) || (this.topVisible && !this.bottomVisible && this.splitVisible);
      },
      resizeSplitTop: function() {
        var top = this.splitTop;
        if (this.mouseEnter && this.splitType === 'narrow') {
          top = top - 5;
        }
        return top + 'px';
      },
      resizeSplitBottom: function() {
        var bottom = this.currentHeight - this.splitTop - this.splitW;
        if (this.mouseEnter && this.splitType === 'narrow') {
          bottom = bottom - 5;
        }
        return bottom + 'px';
      }
    },
    methods: {
      splitDown: function(e) {
        this.addEvent(document.body, 'mousedown', this.preventSelect);
        this.addCursorStyle();
        this.addBodyEvent();
        this.originPageY = e.pageY;
        this.prePageY = e.pageY;
        this.mouseDown = true;
      },
      splitMove: function(e) {
        if (this.originPageY !== 0 || (this.mouseDown && (e.pageY - this.prePageY > 0))) {
          this.$emit('drag-start', this.currentHeight, this.splitTop);
          var gap = e.pageY - this.originPageY;
          var top = this.splitTop + gap;
          if (this.single) {
            gap = this.topVisible ? gap : -gap;
            if (this.currentHeight + gap <= this.splitW) {
              this.currentHeight = this.splitW;
              this.originPageY = 0;
            } else if (this.currentHeight + gap >= this.maxHeight) {
              this.currentHeight = this.maxHeight;
              this.originPageY = 0;
            } else {
              this.currentHeight = this.currentHeight + gap;
              this.originPageY = e.pageY;
            }
          } else {
            if (top <= 0) {
              this.splitTop = 0;
            } else if (top >= this.currentHeight - this.splitW) {
              this.splitTop = this.currentHeight - this.splitW;
            } else {
              this.splitTop = top;
            }
            this.originPageY = e.pageY;
          }
          e.preventDefault();
        }
        this.prePageY = e.pageY;
      },
      splitUp: function(e) {
        this.removeEvent(document.body, 'mousedown', this.preventSelect);
        this.removeCursorStyle();
        this.removeBodyEvent();
        this.$emit('drag-end', this.currentHeight, this.splitTop);
        this.originPageY = 0;
        this.mouseDown = false;
      },
      splitLeave: function(e) {
        if (this.single) {
          this.splitMove(e);
        } else {
          this.removeEvent(document.body, 'mousedown', this.preventSelect);
          this.removeCursorStyle();
          this.removeBodyEvent();
          this.$emit('drag-end', this.currentHeight, this.splitTop);
          this.originPageY = 0;
          this.mouseDown = false;
        }
        e.preventDefault();
      },
      resizeByVisible: function() {
        if (!this.topVisible) {
          this.splitTop = 0;
        }
        if (!this.bottomVisible) {
          this.splitTop = this.splitVisible ? this.currentHeight - this.splitW : this.currentHeight;
        }
      },
      addEvent: function(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
            handler.call(element);
          });
        } else {
          element['on' + type] = handler;
        }
      },
      removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
          element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
          element.detachEvent('on' + type, handler);
        } else {
          element['on' + type] = null;
        }
      },
      preventSelect: function(e) {
        e.preventDefault();
        return false;
      },
      addCursorStyle: function() {
        document.body.style.cursor = 'row-resize';
      },
      removeCursorStyle: function() {
        document.body.style.cursor = 'auto';
      },
      addBodyEvent: function() {
        if (this.single) {
          this.addEvent(document.body, 'mouseup', this.splitUp);
          this.addEvent(document.body, 'mousemove', this.splitLeave);
          this.addEvent(document.body, 'mouseleave', this.splitUp);
        }
      },
      removeBodyEvent: function() {
        this.removeEvent(document.body, 'mouseup', this.splitUp);
        this.removeEvent(document.body, 'mousemove', this.splitLeave);
        this.removeEvent(document.body, 'mouseleave', this.splitUp);
      },
      splitMouseEnter: function() {
        this.mouseEnter = true;
      },
      splitMouseLeave: function() {
        this.mouseEnter = false;
      }
    },
    watch: {
      splitTop: function(val, oldVal) {
        this.$emit('resize', this.currentHeight, this.splitTop);
      },
      height: function(val, oldVal) {
        this.currentHeight = val;
        if ((!this.topVisible || !this.bottomVisible)) {
          this.resizeByVisible();
        } else {
          if (oldVal === 0) {
            this.splitTop = this.defaultTop || window.parseInt((val - this.splitW) * 0.5);
          } else {
            this.splitTop = this.defaultTop || val * this.splitTop / oldVal;
          }
        }
        this.$emit('resize', this.currentHeight, this.splitTop);
      },
      currentHeight: function(val) {
        this.$emit('update:height', val);
      },
      topVisible: function(val, oldVal) {
        this.resizeByVisible();
      },
      bottomVisible: function(val, oldVal) {
        this.resizeByVisible();
      },
      splitVisible: function(val, oldVal) {
        if (!oldVal) {
          if (this.topVisible && this.bottomVisible && val) {
            this.splitTop = this.defaultTop || window.parseInt((this.currentHeight - this.splitW) * 0.5);
          }
        }
      }
    },
    created: function() {
      this.resizeByVisible();
    },
    mounted: function() {
    },
    beforeDestroy: function() {
      this.removeBodyEvent();
      this.removeEvent(document.body, 'mousedown', this.preventSelect);
    }
  };
</script>

