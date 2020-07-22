<template>
  <div
    id="sidebar"
    :class="currentMenuType == 'narrow' ? 'narrowActive' : 'outerActive'"
    @mousemove="scrollGuide"
    @mouseup="scrollStop"
    v-clickoutside="handleClose">
    <div 
      :class="currentMenuType == 'narrow' ? 'proServe narrowActive' : 'proServe outerActive'" 
      @mouseover="showFlowWindowMenus" 
      @mouseout="hideFlowWindowMenus">
      <span class="uex-icon-menu-card"></span> 
      <span :class="currentMenuType == 'narrow' ? 'text' : 'text active'">产品与服务</span> 
      <span class="uex-icon-more-col"></span> 
      <div 
        class="flowWindowMenus" 
        v-show="flowWindowMenusFlag">
          <div class="wrap">
            <ul  :style="'width:'+ flowLiWith * flowLiNum +'px'">
              <li 
                v-for="(item,index) in flowMenuData"
                :key="index"
                :style="'width:'+ flowLiWith +'px'">
                <dl>
                  <dt 
                    @click.stop.prevent="flowMenuChange(item)">
                    {{item.menuName}}
                  </dt>
                  <dd 
                    v-for="(secondMenu,idx) in item.children" 
                    @click.stop.prevent="flowMenuChange(item,secondMenu)"
                    :key="idx">
                    {{secondMenu.menuName}}
                  </dd>
                </dl>
              </li>
            </ul>  
          </div>
        </div> 
    </div>
    <div class="line"></div>
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
              :list-top="index * 40 - scrollTop"
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
    <div class="show-more">
      <div
        class="list"
        @click="showMore(currentMenuType === 'narrow' ? 'outer' : 'narrow')">
        <a href="javascript:;">
          <span :class="currentMenuType == 'narrow' ? 'uex-icon-menu-column' : 'uex-icon-menu-row'"></span>
        </a>
      </div>
    </div>
    <!-- <elx-context-menu
      :data="actionData"
      :width="90"
      :x="pos.x"
      :y="pos.y"
      :tip-show="false"
      :visible="contextMenuShow"
      @action="action">
    </elx-context-menu> -->
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
      name: 'ElxFlowMenu',
      componentName: 'ElxFlowMenu',
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
        flowLiNum: {
          type: [Number, String],
          default: '4'
        },
        flowMenuData: {
          type: Array,
          default: []
        },
        menuData: {
          type: Array,
          default: []
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
          default: function() {
            return [];
          }
        }
      },
      data: function() {
        return {
          flowLiWith: 200,
          flowWindowMenusData: [],
          flowWindowMenusFlag: false,
          currentMenuType: this.type,
          currentMenuData: [],
          currentGuideArrowShow: this.guideArrowShow,
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
        scroll: function(event) {
          if (this.currentMenuType === 'outer') {
            return;
          };
          this.scrollTop = this.$refs['narrowMenu'].scrollTop;
        },
        scrollGuide: function(event) {
          this.scroll();
        },
        scrollStop: function() {
          this.scroll();
        },
        menuChange: function(model) {
          clearTimeout(this.menuAni);
          this.$emit('menu-change', model);
          this.$emit('update:menuActive', model.modelcode);
        },
        lastChildNodeClick: function(model) {
          this.$emit('last-child-node-click', model);
        },
        showMore: function(type) {
          var self = this;
          var _type = type;
          self.currentMenuType = _type;
          this.contextMenuShow = false;
          this.$emit('sidebar-open', this.currentMenuType);
          if (_type === 'outer') {
          } else {
            self.currentGuideArrowShow = false;
          }
          var fun = function(node) {
            node.open = false;
            if (node.children.length === 0) {
              return;
            }
            for (var i = 0;i < node.children.length;i++) {
              fun(node.children[i]);
            }
          };
          for (var i = 0;i < this.currentMenuData.length;i++) {
            this.currentMenuData[i].open = false;
            fun(this.currentMenuData[i]);
          }
        },
        menuClose: function() {
          var self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            for (var i in self.currentMenuData) {
              self.operateStatus([self.currentMenuData[i]], 'open', true);
            }
          }, this.timeOut);
        },
        operateStatus: function(modelArr, type, status) {
          var _index = 0;
          var _currentModel;
          var _cancelFun = function(node) {
            node[type] = false;
            if (node.children.length === 0) {
              return false;
            }
            for (var i = 0;i < node.children.length;i++) {
              _cancelFun(node.children[i]);
            }
          };
          if (status && type === 'open') {
            _cancelFun(modelArr[modelArr.length - 1]);
            return;
          }
          var _sureFun = function(node) {
            _index++;
            node[type] = true;
            if (node.children.length === 0 || _index === modelArr.length) {
              return false;
            }
            for (var i = 0;i < node.children.length;i++) {
              if (node.children[i].modelcode === modelArr[_index].modelcode) {
                _currentModel = node.children[i];
              } else {
                _cancelFun(node.children[i]);
              }
            }
            _sureFun(_currentModel);
          };
          for (var i = 0;i < this.currentMenuData.length;i++) {
            if (this.currentMenuData[i].modelcode === modelArr[_index].modelcode) {
              _currentModel = this.currentMenuData[i];
            } else {
              _cancelFun(this.currentMenuData[i]);
            }
          }
          _sureFun(_currentModel);
        },
        emitactive: function(modelArr, status) {
          this.contextMenuShow = false;
          this.operateStatus(modelArr, 'active', status);
        },
        emitopen: function(modelArr, status, type) {
          clearTimeout(this.menuAni);
          if (type === 'narrow') {
            var self = this;
            this.menuAni = setTimeout(function() {
              self.operateStatus(modelArr, 'open', status);
            }, this.timeOut);
          } else {
            this.operateStatus(modelArr, 'open', status);
          }
        },
        getFirstChild: function(node, modelcode) {
          var activeNode;
          var i;
          var fun = function(currentNode, modelcode) {
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
            for (i = 0;i < currentNode.children.length;i++) {
              fun(currentNode.children[i], modelcode);
            }
          };
          fun(node, modelcode);
          return activeNode;
        },
        operateMenu: function(type) {
          var self = this;
          var fun = function(node) {
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
                  var activeNode = self.getFirstChild(node, node.children[0].modelcode);
                  activeNode.active = true ;
                  activeNode.open = self.currentMenuType === 'outer';
                }
                return;
              }
            }
            if (node.children.length === 0) {
              return;
            }
            for (var i = 0;i < node.children.length;i++) {
              fun(node.children[i]);
            }
            return;
          };
          for (var i = 0;i < self.currentMenuData.length;i++) {
            fun(self.currentMenuData[i]);
          }
        },
        changeMenuActive: function() {
          var self = this;
          var fun = function(node) {
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
        postMessage: function() {
          if (this.isPost) {
            cMessage.postMessage(this.message, this.locationOrigin, parent);
          }
        },
        bindPostMessage: function() {
          var self = this;
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
        getEventPos: function(e) {
          var x = e.clientX;
          var y = e.clientY;
          return { 'x': x, 'y': y };
        },
        menuContextmenu: function(model, event) {
          if (this.actionData.length === 0) {
            return;
          }
          var e = event || window.event;
          var pos = this.getEventPos(e);
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
        preventDefault: function(e) {
          e = e || window.event;
          if (e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnvalue = false;
          }
        },
        action: function(data) {
          this.$emit('contextmenu-action', data, this.contextMenuData);
          this.contextMenuShow = false;
        },
        formatData: function() {
          var self = this;
          var fun = function(node) {
            if (!('open' in node)) {
              self.$set(node, 'open', false);
            }
            if (!('active' in node)) {
              self.$set(node, 'active', false);
            }
            if (node.children.length === 0) {
              return;
            }
            for (var i = 0; i < node.children.length; i++) {
              fun(node.children[i]);
            }
          };
          for (var i = 0;i < this.currentMenuData.length; i++) {
            fun(this.currentMenuData[i]);
          }
        },
        getPrefixStyle: function(name, val) {
          var prefixs = ['', '-moz-', '-webkit-', '-o-'];
          var str = '';
          prefixs.map(function(prefix) {
            str = str + prefix + name + ': ' + val + ';';
            return;
          });
          return str;
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
        doDestroy: function() {
          this.$refs.popper && this.$refs.popper.doDestroy();
        },
        handleClose: function() {
          this.currentGuideArrowShow = false;
        },
        getElOffsetTop: function(el, parentEl) {
          var top = el.offsetTop;
          var fun = function(el) {
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
        handleScroll: function(el, scrollHeight) {
          if (el.scrollTo) {
            el.scrollTo(0, scrollHeight);
          } else {
            el.scrollTop = scrollHeight;
          }
        },
        showFlowWindowMenus: function() {
          this.flowWindowMenusFlag = true;
        },
        hideFlowWindowMenus: function() {
          this.flowWindowMenusFlag = false;
        },
        flowMenuChange: function(model, secondMenu) {
          clearTimeout(this.menuAni);
          var activeNode ;
          if (secondMenu) {
            if (secondMenu.url || secondMenu.children.length === 0) {
              activeNode = secondMenu;
            } else if (secondMenu.children.length > 0 && !secondMenu.url) {
              activeNode = this.getFirstFlowChild(secondMenu, secondMenu.children[0].menuId);
            } else {
              activeNode = secondMenu;
            }
          } else {
            if (model.url || model.children.length === 0) {
              activeNode = model;
            } else if (model.children.length > 0 && !model.url) {
              activeNode = this.getFirstFlowChild(model, model.children[0].menuId);
            }
          }
          console.log(activeNode.url);
          this.$emit('flow-menu-change', model, activeNode);
          this.flowWindowMenusFlag = false;
        },
        // 获取菜单中的第一个存在URL的子节点
        getFirstFlowChild: function(node) {
          var activeNode;
          var i;
          var flag = true;
          var fun = function(currentNode) {
            if (flag === false) {
              return;
            }
            if (currentNode.url || currentNode.children.length === 0) {
              activeNode = currentNode;
              flag = false;
              return;
            } else if (currentNode.children.length !== 0 && !currentNode.url) {
              for (i = 0;i < currentNode.children.length;i++) {
                fun(currentNode.children[i]);
              }
            }
          };
          fun(node);
          console.log('activeNode', activeNode);
          return activeNode;
        }
    
      },
    
      watch: {
        currentGuideArrowShow: function(val, oldVal) {
          if (!val) {
            this.broadcast('GuideArrow', 'destroyPopper');
          } else {
            this.broadcast('GuideArrow', 'updatePopper');
          }
        },
        'currentMenuData': function(val, oldVal) {
        },
        'menuData': function(val, oldVal) {
          this.currentMenuData = val;
          this.formatData();
          if (oldVal.length === 0 && val.length > 0) {
            this.changeMenuActive();
          }
        },
        'menuType': function(val, oldVal) {
          if (val !== this.currentMenuType) {
            this.showMore(val);
          }
        },
        'guideArrowShow': function(val, oldVal) {
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
        'menuActive': function(val, oldVal) {
          this.operateMenu('active');
        },
        'menuOpen': function(val, oldVal) {
          var self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            self.operateMenu('open');
            if (self.currentMenuType === 'outer') {
              if (self.guideArrowShow) {
                self.$nextTick(function() {
                  var time = 0;
                  var interval = setInterval(function() {
                    if (time > 500) {
                      clearInterval(interval);
                      self.currentGuideArrowShow = true;
                    }
                    time = time + 20;
                    var openDoms = document.querySelectorAll('.open');
                    var el = openDoms[openDoms.length - 1];
                    var parentEl = self.$refs['outerMenu'];
                    self.handleScroll(parentEl, 0);
                    var top = self.getElOffsetTop(el, parentEl);
                    var scrollHeight;
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
        'isPost': function(val, oldVal) {
          this.postMessage();
        }
      },
      created: function() {
        this.currentMenuData = this.menuData;
        this.formatData();
        this.postMessage();
        this.bindPostMessage();
        this.currentMenuType = this.menuType;
        if (this.currentMenuData.length > 0) {
          this.changeMenuActive();
        }
        var text = '';
        var _text;
        for (var i = 1;i < 30;i++) {
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
        var styleDoms = document.querySelectorAll('style');
        var lastStyleDom = styleDoms[styleDoms.length - 1];
        if (lastStyleDom) {
          _text = lastStyleDom.innerText;
          lastStyleDom.innerText = _text + text;
        }
      },
      mounted: function() {
        var self = this;
        this.$nextTick(function() {
          this.addEvent(document.body, 'click', function() {
            self.contextMenuShow = false;
          });
        });
      }
    };

</script>
