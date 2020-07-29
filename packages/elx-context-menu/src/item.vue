<template>
  <li
    @click.stop.prevent="exec"
    @mouseenter.stop.prevent="showChild"
    @mouseleave.stop.prevent="hideChild">
    <el-tooltip
      :content="data.label"
      placement="left"
      :hide-after="500"
      v-if="tipShow">
      <div class="elx-context-menu-title">
        <span :class="data.class">
          <span
            v-if="data.icon"
            :class="data.icon">
          </span>
          <node-content :node="data"></node-content>
        </span>
        <template v-if="'children' in data">
          <span
            v-if="data.children.length>0"
            class="uex-icon-caret-right">
          </span>
        </template>
      </div>
    </el-tooltip>
    <div
      class="elx-context-menu-title"
      v-if="!tipShow"
      :title="data.label">
      <span :class="data.class">
        <span
          v-if="data.icon"
          :class="data.icon">
        </span>
        <node-content :node="data"></node-content>
      </span>
      <template v-if="'children' in data">
        <span
          v-if="data.children.length>0"
          class="uex-icon-caret-right">
        </span>
      </template>
    </div>
    <ul
      v-if="'children' in data"
      v-show="visible"
      :style="{top: pos.top, bottom: pos.bottom}">
      <context-menu-item
        v-for="item in data.children"
        :data="item"
        :key="item.value"
        @action="action">
      </context-menu-item>
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
          default() {
            return {};
          }
        },
        tipShow: {
          type: Boolean,
          default: false
        }
      },

      components: {
        NodeContent: {
          props: {
            node: {
              required: true
            }
          },
          data() {
            return {};
          },
          render(h) {
            const node = this.node;
            const parent = this.$parent;
            return (
              node.renderContent
                ? node.renderContent.call(parent._renderProxy, h, node, this)
                : <span>{ node.label }</span>
            );
          }
        }
      },

      data() {
        return {
          pos: {
            top: '0px',
            bottom: 'auto'
          },
          visible: false
        };
      },
      methods: {
        getElementPosition(el) {
          let x = 0;
          let y = 0;
          while (el != null) {
            x += el.offsetLeft;
            y += el.offsetTop;
            el = el.offsetParent;
          }
          return { x: x, y: y };
        },
        exec() {
          this.$emit('action', this.data);
        },
        action(data) {
          this.$emit('action', data);
        },
        changeStyle() {
          const self = this;
          if (self.$el.childNodes[1]) {
            if (typeof self.$el.childNodes[1].tagName === 'string') {
              if (self.$el.childNodes[1].tagName.toLowerCase() === 'ul') {
                const bodyClientHeight = document.body.clientHeight;
                const bodyClientTop = document.body.clientTop;
                const viewHeight = bodyClientHeight + bodyClientTop;
                const clientTop = this.getElementPosition(self.$el.childNodes[1]).y;
                const height = self.$el.childNodes[1].clientHeight;
                const elBottom = height + clientTop;
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
        showChild() {
          this.visible = true;
        },
        hideChild() {
          this.visible = false;
          this.pos.top = '0px';
          this.pos.bottom = 'auto';
        }
      },
      watch: {
        visible(val) {
          if (val) {
            const self = this;
            this.$nextTick(function() {
              self.changeStyle();
            });
          }
        }
      },
      created() {
      },
      mounted() {
        this.changeStyle();
      }
    };
</script>
