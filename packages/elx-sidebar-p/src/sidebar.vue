<template>
  <div
    class="elx-siderbar-p"
    :class="[(currentShow?'show':'hide'), 'elx-siderbar-p-' + type]">
    <div class="elx-siderbar-content">
      <div class="elx-sidebar-intro">
        <div
          class="elx-siderbar-title"
          @click="operateSidebar">
          <span
            v-show="!currentShow"
            class="uex-icon uex-icon-d-arrow-right">
          </span>
          <span v-html="title"></span>
        </div>
        <el-tooltip
          class="item"
          effect="light"
          placement="right"
          :open-delay="1000"
          :content="descr">
          <div
            class="elx-siderbar-descr"
            v-show="descr != ''"
            v-html="getCurDesc(descr)">
          </div>
        </el-tooltip>
        <div class="separate"></div>
      </div>
      <elx-menu
        :style="{height: height}"
        :menu-data="menuData"
        :menu-active="menuActive"
        :menu-open="menuOpen"
        :menu-type="menuType"
        :guide-arrow-show="guideArrowShow"
        :action-data="actionData"
        @contextmenu-action="contextmenuAction"
        @menu-change="menuChange">
      </elx-menu>
      <div class="elx-narrow-sidebar">
        <ul>
          <narrow-sidebar
            @menu-change="menuChange"
            v-for = "(model, index) in menuData"
            :key="index"
            :model="model">
          </narrow-sidebar>
        </ul>
      </div>
    </div>
    <div class="elx-sidebar-operate" @click="operateSidebar">
      <div class="elx-sidebar-operate-back"></div>
      <span class="uex-icon-d-arrow-left"></span>
    </div>
  </div>
</template>

<script>
  import { cMessage } from 'packages/elx-menu/src/util';
  import NarrowSidebar from './narrow-sidebar';

  export default {
    name: 'ElxSidebarP',
    componentName: 'ElxSidebarP',
    components: {
      NarrowSidebar
    },
    props: {
      isPost: {
        type: Boolean,
        default: false
      },
      message: {
        type: [Array, Object, Number, String],
        default: ''
      },
      locationOrigin: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '暂无'
      },
      descr: {
        type: String,
        default: '暂无'
      },
      menuData: {
        type: Array,
        default: []
      },
      menuActive: {
        type: String,
        default: ''
      },
      menuOpen: {
        type: String,
        default: ''
      },
      guideArrowShow: {
        type: Boolean,
        default: false
      },
      show: {
        type: Boolean,
        default: true
      },
      type: {
        type: String,
        default: 'full'
      },
      actionData: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    data() {
      return {
        currentShow: this.show,
        menuType: 'outer',
        height: '0px'
      };
    },
    methods: {
      getCurDesc(str) {
        let realLength = 0;
        const len = str.length;
        let charCode = -1;
        let sub = -1;
        for (let i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode > 0 && charCode < 129) {
            realLength += 1;
          } else {
            realLength += 2;
          }
          if (realLength > 68 && sub === -1) {
            sub = i;
          }
        }
        return sub !== -1 ? this.descr.substring(0, sub) + '..' : this.descr;
      },
      menuChange(model) {
        this.$emit('menu-change', model);
        this.$emit('update:menuActive', model.modelcode);
      },
      operateSidebar(judge) {
        const _self = this;
        this.currentShow = typeof judge === 'boolean' ? judge : !this.currentShow;
        setTimeout(function() {
          _self.changeSidebarHeight();
        }, 200);
        this.$emit('sidebar-open', this.currentShow);
      },
      postMessage() {
        if (this.isPost) {
          cMessage.postMessage(this.message, this.locationOrigin, parent);
        }
      },
      bindPostMessage() {
        const _self = this;
        cMessage.receiveMessage(function(message) {
          if (typeof message.data === 'object' && !Array.isArray(message.data)) {
            if ('menuType' in message.data) {
              if (window.top !== window.self) {
                cMessage.postMessage(message.data, _self.locationOrigin, parent);
              }
              if (message.data.menuType === 'narrow') {
                _self.operateSidebar(false);
              }
            } else if ('menuActive' in message.data) {
              _self.$emit('update:menuActive', message.data.menuActive);
            }
          }
          _self.$emit('receive-message', message);
        }, _self.locationOrigin);
      },
      changeSidebarHeight() {
        const el = document.querySelector('.elx-siderbar-p');
        const introEl = document.querySelector('.elx-siderbar-p .elx-sidebar-intro');
        this.height = (window.parseFloat(el.offsetHeight) - window.parseFloat(introEl.offsetHeight) - 10) + 'px';
      },
      contextmenuAction(action, model) {
        this.$emit('contextmenu-action', action, model);
      },
      addEvent(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
            handler.call(element);
          });
        } else {
          element['on' + type] = handler;
        }
      }
    },
    watch: {
      isPost(val, oldVal) {
        this.postMessage();
      },
      currentShow(val, oldVal) {
        this.$emit('update:show', val);
      },
      show(val, oldVal) {
        this.currentShow = val;
      },
      descr() {
        this.changeSidebarHeight();
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.changeSidebarHeight();
        window.addEventListener('resize', this.changeSidebarHeight);
      });
    },
    created() {
      this.postMessage();
      this.bindPostMessage();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.changeSidebarHeight);
    }
  };
</script>
