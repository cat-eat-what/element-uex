<template>
    <transition name="fade">
      <div class="elx-context-menu" v-show="visible" :style="{width: width+'px', top: currentY+'px', left: currentX+'px'}">
        <ul>
          <context-menu-item @action="action" v-for="item in data" :key="item.label" :data="item"></context-menu-item>
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
        default: function() {
          return [];
        }
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    data: function() {
      return {
        currentX: 0,
        currentY: 0
      };
    },
    methods: {
      action: function(data) {
        this.$emit('action', data);
      },
      changePos: function() {
        var gap = 5;
        var bodyClientHeight = document.body.clientHeight;
        var bodyClientTop = document.body.clientTop;
        var height = this.$el.clientHeight;
        var elBottom = height + this.currentY;
        var viewHeight = bodyClientHeight + bodyClientTop;
        if (viewHeight < elBottom) {
          this.currentY = viewHeight - height - gap;
        }
      }
    },
    watch: {
      visible: function(val) {
        if (val) {
          var self = this;
          self.$nextTick(function() {
            self.changePos();
          });
        }
      },
      x: function(val) {
        this.currentX = val;
      },
      y: function(val) {
        this.currentY = val;
        this.changePos();
      }
    },
    created: function() {
      this.currentX = this.x;
      this.currentY = this.y;
    },
    mounted: function() {
      var self = this;
      this.changePos();
      var handleDisplay = function() {
        self.contentMenuShow = false;
      };
      if (window.addEventListener) {
        window.addEventListener('resize', handleDisplay);
      } else if (window.attachEvent) {
        window.attachEvent('onresize', handleDisplay);
      }
    }
  };
</script>

