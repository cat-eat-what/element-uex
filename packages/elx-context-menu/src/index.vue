<template>
  <transition name="fade">
    <div
      class="elx-context-menu"
      v-show="visible"
      :style="{width: width+'px', top: currentY+'px', left: currentX+'px'}">
      <ul>
        <context-menu-item
          v-for="item in data"
          :key="item.label"
          :data="item"
          :tip-show="tipShow"
          @action="action">
        </context-menu-item>
      </ul>
    </div>
  </transition>
</template>

<script>
  import ContextMenuItem from './item';

  export default {
    name: 'ElxContextMenu',
    componentName: 'ElxContextMenu',

    components: {
      ContextMenuItem
    },

    props: {
      width: {
        type: Number,
        default: 80
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      visible: {
        type: Boolean,
        default: false
      },
      tipShow: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        currentX: 0,
        currentY: 0
      };
    },
    methods: {
      action(data) {
        this.$emit('action', data);
      },
      changePos() {
        var gap = 5;
        var bodyClientHeight = document.body.clientHeight;
        var bodyClientTop = document.body.clientTop;
        var height = this.$el.clientHeight;
        var elBottom = height + this.currentY;
        var viewHeight = bodyClientHeight + bodyClientTop;
        if (viewHeight < elBottom) {
          this.currentY = viewHeight - height - gap;
        }
      },
      handleDisplay() {
        this.contentMenuShow = false;
      }
    },
    watch: {
      visible(val) {
        if (val) {
          var self = this;
          self.$nextTick(function() {
            self.changePos();
          });
        }
      },
      x(val) {
        this.currentX = val;
      },
      y(val) {
        this.currentY = val;
        this.changePos();
      }
    },
    created() {
      this.currentX = this.x;
      this.currentY = this.y;
    },
    mounted() {
      this.changePos();
      window.addEventListener('resize', this.handleDisplay);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleDisplay);
    }
  };
</script>

