<template>
  <div
    id="sidebar"
    class="elx-menu"
    :class="currentMenuType == 'narrow' ? 'narrowActive' : 'outerActive'"
    @mousemove="scrollGuide"
    @mouseup="scrollStop"
    v-clickoutside="handleClose">
    <div :class="currentMenuType == 'narrow' ? 'show-title' : 'show-title'">
      <div
        >
          <span
            class="menuTitle"
            v-if="currentMenuType == 'outer' "
            v-text="currentMenuTitle.title">
          </span>
      </div>
      <div class="list">
         <span
          v-if="currentMenuType == 'narrow'"
          :class="currentMenuTitle.image != '' && currentMenuTitle.image && currentMenuTitle.image != null ? currentMenuTitle.image : 'uex-icon-default'" ></span>
      </div>
    </div>
    <div :class="currentMenuType == 'narrow' ? 'show-more' : 'show-more'">
      <div
        class="list"
        @click="showMore(currentMenuType === 'narrow' ? 'outer' : 'narrow')">
        <a href="javascript:;">
          <span :class="currentMenuType == 'narrow' ? 'uex-icon-menu-row' : 'uex-icon-menu-column'"></span>
        </a>
      </div>
    </div>
    <div
      class="menu-content">
      <div
        :class="currentMenuType == 'narrow' ? 'narrow-menu active' : 'narrow-menu'"
        @mouseleave="menuClose">
        <div
          ref="narrowMenu"
          style="height: 100%; overflow-y: auto; overflow-x: hidden"
          @mousewheel="scroll"
          @DOMMouseScroll="scroll">
          <ul>
            <narrow-menu
              v-for = "(model,index) in currentMenuData"
              :key="index"
              :model="model"
              :list-top="index * 50 - scrollTop"
              @menu-contextmenu="menuContextmenu"
              @menu-change="menuChange"
              @last-child-node-click="lastChildNodeClick"
              @emitactive="emitactive"
              @emitopen="emitopen">
            </narrow-menu>
          </ul>
        </div>
      </div>
      <div
        class="lay"
        v-show="currentMenuType == 'narrow'">
      </div>
      <div
        ref="outerMenu"
        :style="{ top: '0px', height : '100%' }"
        :class="currentMenuType == 'outer' ? 'outer-menu active' : 'outer-menu'">
        <ul>
          <outer-menu
            v-for = "(model, index) in currentMenuData"
            :key="index"
            :model="model"
            @menu-contextmenu="menuContextmenu"
            @menu-change="menuChange"
            @last-child-node-click="lastChildNodeClick"
            @emitactive="emitactive"
            @emitopen="emitopen">
          </outer-menu>
        </ul>
      </div>
    </div>
    <elx-context-menu
      :data="actionData"
      :width="90"
      :x="pos.x"
      :y="pos.y"
      :tip-show="false"
      :visible="contextMenuShow"
      @action="action">
    </elx-context-menu>
    <transition name="md-fade-bottom" @after-leave="doDestroy">
      <guide-arrow ref="popper" v-show="currentGuideArrowShow" :visible.sync="currentGuideArrowShow"></guide-arrow>
    </transition>
  </div>
</template>
<script>
    import NarrowMenu from './narrow-menu';
    import OuterMenu from './outer-menu';
    import GuideArrow from './guide-arrow';
    import { cMessage } from './util';
    import Emitter from 'element-uex/src/mixins/emitter';
    import Migrating from 'element-uex/src/mixins/migrating';
    import Clickoutside from 'element-uex/src/utils/clickoutside';

    export default {
      name: 'ElxMenu',

      componentName: 'ElxMenu',
      mixins: [Emitter, Migrating],
      directives: { Clickoutside },

      components: {
        NarrowMenu, OuterMenu, GuideArrow
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
        menuData: {
          type: Array,
          default() {
            return [];
          }
        },
        menuType: {
          type: String,
          default: 'outer'
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
        actionData: {
          type: Array,
          default() {
            return [];
          }
        },
        menuTitle: {
          type: Object,
          default() {
            return {};
          }
        }
      },
      data() {
        return {
          currentMenuType: this.type,
          currentMenuData: [],
          currentGuideArrowShow: this.guideArrowShow,
          currentMenuTitle: {},
          scrollTop: 0,
          menuAni: null,
          timeOut: 400,
          pos: {
            x: 0,
            y: 0
          },
          contextMenuShow: false,
          contextMenuData: null
        };
      },
      methods: {
        scroll(event) {
          if (this.currentMenuType === 'outer') {
            return;
          };
          this.scrollTop = this.$refs['narrowMenu'].scrollTop;
        },
        scrollGuide(event) {
          this.scroll();
        },
        scrollStop() {
          this.scroll();
        },
        menuChange(model) {
          clearTimeout(this.menuAni);
          this.$emit('menu-change', model);
          this.$emit('update:menuActive', model.modelcode);
        },
        lastChildNodeClick(model) {
          this.$emit('last-child-node-click', model);
        },
        showMore(type) {
          const self = this;
          const _type = type;
          self.currentMenuType = _type;
          this.contextMenuShow = false;
          this.$emit('sidebar-open', this.currentMenuType);
          if (_type === 'outer') {
          } else {
            self.currentGuideArrowShow = false;
          }
          const fun = function(node) {
            node.open = false;
            if (node.children.length === 0) {
              return;
            }
            for (let i = 0;i < node.children.length;i++) {
              fun(node.children[i]);
            }
          };
          for (let i = 0;i < this.currentMenuData.length;i++) {
            this.currentMenuData[i].open = false;
            fun(this.currentMenuData[i]);
          }
        },
        menuClose() {
          const self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            for (let i in self.currentMenuData) {
              self.operateStatus([self.currentMenuData[i]], 'open', true);
            }
          }, this.timeOut);
        },
        operateStatus(modelArr, type, status) {
          let _index = 0;
          let _currentModel;
          const _cancelFun = function(node) {
            node[type] = false;
            if (node.children.length === 0) {
              return false;
            }
            for (let i = 0;i < node.children.length;i++) {
              _cancelFun(node.children[i]);
            }
          };
          if (status && type === 'open') {
            _cancelFun(modelArr[modelArr.length - 1]);
            return;
          }
          const _sureFun = function(node) {
            _index++;
            node[type] = true;
            if (node.children.length === 0 || _index === modelArr.length) {
              return false;
            }
            for (let i = 0;i < node.children.length;i++) {
              if (node.children[i].modelcode === modelArr[_index].modelcode) {
                _currentModel = node.children[i];
              } else {
                _cancelFun(node.children[i]);
              }
            }
            _sureFun(_currentModel);
          };
          for (let i = 0;i < this.currentMenuData.length;i++) {
            if (this.currentMenuData[i].modelcode === modelArr[_index].modelcode) {
              _currentModel = this.currentMenuData[i];
            } else {
              _cancelFun(this.currentMenuData[i]);
            }
          }
          _sureFun(_currentModel);
        },
        emitactive(modelArr, status) {
          this.contextMenuShow = false;
          this.operateStatus(modelArr, 'active', status);
        },
        emitopen(modelArr, status, type) {
          clearTimeout(this.menuAni);
          if (type === 'narrow') {
            const self = this;
            this.menuAni = setTimeout(function() {
              self.operateStatus(modelArr, 'open', status);
            }, this.timeOut);
          } else {
            this.operateStatus(modelArr, 'open', status);
          }
        },
        getFirstChild(node, modelcode) {
          let activeNode;
          const fun = function(currentNode, modelcode) {
            if (currentNode.modelcode === modelcode) {
              if (currentNode.url || currentNode.children.length === 0) {
                activeNode = currentNode;
                return;
              } else if (currentNode.children.length !== 0 && !currentNode.url) {
                modelcode = currentNode.children[0].modelcode;
                activeNode = currentNode.children[0];
              }
            }
            if (currentNode.children.length === 0) {
              return;
            }
            for (let i = 0;i < currentNode.children.length;i++) {
              fun(currentNode.children[i], modelcode);
            }
          };
          fun(node, modelcode);
          return activeNode;
        },
        operateMenu(type) {
          const self = this;
          const fun = function(node) {
            if (type === 'open') {
              if (node.modelcode === self.menuOpen) {
                node.open = self.currentMenuType === 'outer';
                return;
              }
            }
            if (type === 'active') {
              if (node.modelcode === self.menuActive) {
                if (node.url || node.children.length === 0) {
                  node.active = true ;
                  node.open = self.currentMenuType === 'outer';
                } else if (node.children.length !== 0 && !node.url) {
                  const activeNode = self.getFirstChild(node, node.children[0].modelcode);
                  activeNode.active = true ;
                  activeNode.open = self.currentMenuType === 'outer';
                }
                return;
              }
            }
            if (node.children.length === 0) {
              return;
            }
            for (let i = 0;i < node.children.length;i++) {
              fun(node.children[i]);
            }
            return;
          };
          for (let i = 0;i < self.currentMenuData.length;i++) {
            fun(self.currentMenuData[i]);
          }
        },
        changeMenuActive() {
          const self = this;
          const fun = function(node) {
            node.active = true;
            node.open = self.currentMenuType === 'outer';
            if (node.children.length > 0) {
              fun(node.children[0]);
            }
            return;
          };
          if (self.menuActive === '') {
            fun(self.currentMenuData[0]);
          } else {
            this.operateMenu('active');
          }
        },
        postMessage() {
          if (this.isPost) {
            cMessage.postMessage(this.message, this.locationOrigin, parent);
          }
        },
        bindPostMessage() {
          const self = this;
          cMessage.receiveMessage(function(message) {
            if (typeof message.data === 'object' && !Array.isArray(message.data)) {
              if ('menuType' in message.data) {
                if (window.top !== window.self) {
                  cMessage.postMessage(message.data, self.locationOrigin, parent);
                }
                if (message.data.menuType === 'narrow') {
                  clearTimeout(self.menuAni);
                  self.menuAni = setTimeout(function() {
                    self.showMore('narrow');
                  }, 1000);
                }
              } else if ('menuActive' in message.data) {
                self.$emit('update:menuActive', message.data.menuActive);
              }
            }
            self.$emit('receive-message', message);
          }, self.locationOrigin);
        },
        getEventPos(e) {
          const x = e.clientX;
          const y = e.clientY;
          return { 'x': x, 'y': y };
        },
        menuContextmenu(model, event) {
          if (this.actionData.length === 0) {
            return;
          }
          const e = event || window.event;
          const pos = this.getEventPos(e);
          if (e.which === 3) {
            this.contextMenuShow = false;
            this.pos.x = pos.x;
            this.pos.y = pos.y;
            this.contextMenuData = model;
            this.contextMenuShow = true;
          }
          this.preventDefault(e);
          e.returnValue = false;
          return false;
        },
        preventDefault(e) {
          e = e || window.event;
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnvalue = false;
          }
        },
        action(data) {
          this.$emit('contextmenu-action', data, this.contextMenuData);
          this.contextMenuShow = false;
        },
        formatData() {
          const self = this;
          const fun = function(node) {
            if (!('open' in node)) {
              self.$set(node, 'open', false);
            }
            if (!('active' in node)) {
              self.$set(node, 'active', false);
            }
            if (node.children.length === 0) {
              return;
            }
            for (let i = 0; i < node.children.length; i++) {
              fun(node.children[i]);
            }
          };
          for (let i = 0;i < this.currentMenuData.length; i++) {
            fun(this.currentMenuData[i]);
          }
        },
        getPrefixStyle(name, val) {
          const prefixs = ['', '-moz-', '-webkit-', '-o-'];
          let str = '';
          prefixs.map(function(prefix) {
            str = str + prefix + name + ': ' + val + ';';
            return;
          });
          return str;
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
        },
        doDestroy() {
          this.$refs.popper && this.$refs.popper.doDestroy();
        },
        handleClose() {
          this.currentGuideArrowShow = false;
        },
        getElOffsetTop(el, parentEl) {
          let top = el.offsetTop;
          const fun = function(el) {
            if (window.getComputedStyle(el).position !== 'static') {
              top = top + el.offsetTop;
            }
            if (el === parentEl) {
              return;
            }
            fun(el.parentNode);
          };
          fun(el.parentNode);
          return top;
        },
        handleScroll(el, scrollHeight) {
          if (el.scrollTo) {
            el.scrollTo(0, scrollHeight);
          } else {
            el.scrollTop = scrollHeight;
          }
        }
      },
      watch: {
        currentGuideArrowShow(val, oldVal) {
          if (!val) {
            this.broadcast('GuideArrow', 'destroyPopper');
          } else {
            this.broadcast('GuideArrow', 'updatePopper');
          }
        },
        currentMenuData(val, oldVal) {
        },
        menuData(val, oldVal) {
          this.currentMenuData = val;
          this.formatData();
          if (oldVal.length === 0 && val.length > 0) {
            this.changeMenuActive();
          }
        },
        menuTitle(val) {
          this.currentMenuTitle = val;
        },
        menuType(val, oldVal) {
          if (val !== this.currentMenuType) {
            this.showMore(val);
          }
        },
        guideArrowShow(val, oldVal) {
          if (val !== this.currentGuideArrowShow) {
            if (val) {
              if (this.$refs['popper'].referenceElm) {
                this.currentGuideArrowShow = val;
              }
            } else {
              this.currentGuideArrowShow = val;
            }
          }
        },
        menuActive(val, oldVal) {
          this.operateMenu('active');
        },
        menuOpen(val, oldVal) {
          const self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            self.operateMenu('open');
            if (self.currentMenuType === 'outer') {
              if (self.guideArrowShow) {
                self.$nextTick(function() {
                  let time = 0;
                  const interval = setInterval(function() {
                    if (time > 500) {
                      clearInterval(interval);
                      self.currentGuideArrowShow = true;
                    }
                    time = time + 20;
                    const openDoms = document.querySelectorAll('.open');
                    const el = openDoms[openDoms.length - 1];
                    const parentEl = self.$refs['outerMenu'];
                    self.handleScroll(parentEl, 0);
                    const top = self.getElOffsetTop(el, parentEl);
                    let scrollHeight;
                    if (parentEl.offsetHeight + parentEl.scrollTop < top || parentEl.scrollTop > top) {
                      scrollHeight = top - parentEl.offsetHeight * 3 / 4;
                      self.handleScroll(parentEl, scrollHeight);
                    }
                    self.$refs['popper'].setReferenceElm(openDoms[openDoms.length - 1]);
                  }, 20);
                });
              }
            } else {
              self.currentGuideArrowShow = false;
            }
          }, this.timeOut);
        },
        isPost(val, oldVal) {
          this.postMessage();
        }
      },
      created() {
        this.currentMenuData = this.menuData;
        this.currentMenuTitle = this.menuTitle;
        this.formatData();
        this.postMessage();
        this.bindPostMessage();
        this.currentMenuType = this.menuType;
        if (this.currentMenuData.length > 0) {
          this.changeMenuActive();
        }
        let text = '';
        let _text;
        for (let i = 1;i < 30;i++) {
          text = text +
            '.treeview-menu.menu-open li:nth-child(' + i + '){' +
            this.getPrefixStyle(
              'transition',
              'opacity 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's, ' +
              'height 200ms linear, ' +
              'line-height 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's'
            ) +
          '}';
          text = text + '.narrow-menu .treeview-menu.menu-open li:nth-child(' + i + '){' +
            this.getPrefixStyle(
              'transition',
              'opacity 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's, ' +
              'height 200ms linear 200ms, ' +
              'width 200ms linear, ' +
              'line-height 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's, ' +
              'padding-left 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's'
            ) +
          '}';
          text = text + '.outer-menu .treeview-menu.menu-open li:nth-child(' + i + ') a{' +
            this.getPrefixStyle(
              'transition',
              'padding-left 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's'
            ) +
          '}';
        }
        const styleDoms = document.querySelectorAll('style');
        const lastStyleDom = styleDoms[styleDoms.length - 1];
        if (lastStyleDom) {
          _text = lastStyleDom.innerText;
          lastStyleDom.innerText = _text + text;
        }
      },
      mounted() {
        const self = this;
        this.$nextTick(function() {
          this.addEvent(document.body, 'click', function() {
            self.contextMenuShow = false;
          });
        });
      }
    };
</script>