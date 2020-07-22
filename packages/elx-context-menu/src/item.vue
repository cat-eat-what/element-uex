<template>
  <li @click.stop.prevent="exec" @mouseenter.stop.prevent="showChild" @mouseleave.stop.prevent="hideChild">
      <el-tooltip :content="data.label" placement="left" :hide-after="500">
        <div class="elx-context-menu-title">
          <span v-html="data.label"></span>
          <template v-if="'children' in data">
            <span v-if="data.children.length>0"class="uex-icon-caret-right"></span>
          </template>
        </div>
      </el-tooltip>
      <ul v-show="('children' in data)&&visible" :style="{top: pos.top, bottom: pos.bottom}">
          <context-menu-item @action="action" v-for="item in data.children" :data="item"></context-menu-item>
      </ul>
  </li>
</template>
<script>
    export default {
      name: 'ContextMenuItem',

      componentName: 'ContextMenuItem',

      props: {
        data: {
          type: Object,
          default: function() {
            return {};
          }
        }
      },
      data: function() {
        return {
          pos: {
            top: '0px',
            bottom: 'auto'
          },
          visible: false
        };
      },
      methods: {
        getElementPosition: function(el) {
          var x = 0;
          var y = 0;
          while (el != null) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
          }
          return { x: x, y: y };
        },
        exec: function() {
          this.$emit('action', this.data);
        },
        action: function(data) {
          this.$emit('action', data);
        },
        changeStyle: function() {
          var self = this;
          if (self.$el.childNodes[1]) {
            if (typeof self.$el.childNodes[1].tagName === 'string') {
              if (self.$el.childNodes[1].tagName.toLowerCase() === 'ul') {
                var bodyClientHeight = document.body.clientHeight;
                var bodyClientTop = document.body.clientTop;
                var viewHeight = bodyClientHeight + bodyClientTop;
                var clientTop = this.getElementPosition(self.$el.childNodes[1]).y;
                var height = self.$el.childNodes[1].clientHeight;
                var elBottom = height + clientTop;
                if (viewHeight < elBottom) {
                  this.pos.top = 'auto';
                  this.pos.bottom = '0px';
                } else {
                  this.pos.top = '0px';
                  this.pos.bottom = 'auto';
                }
              }
            }
          }
        },
        showChild: function() {
          this.visible = true;
        },
        hideChild: function() {
          this.visible = false;
          this.pos.top = '0px';
          this.pos.bottom = 'auto';
        }
      },
      watch: {
        visible: function(val) {
          if (val) {
            var self = this;
            this.$nextTick(function() {
              self.changeStyle();
            });
          }
        }
      },
      created: function() {
      },
      mounted: function() {
        this.changeStyle();
      }
    };
</script>
