<template>
  <div id="sidebar" @mousemove="scrollGuide" @mouseup="scrollStop" :class="currentMenuType=='narrow'?'narrowActive':'outerActive'">
    <div class="show-more">
      <div @click="showMore(_self.currentMenuType === 'narrow' ? 'outer' : 'narrow')" class="list">
        <a href="javascript:;">
          <span :class="currentMenuType=='narrow'?'uex-icon-menu-row':'uex-icon-menu-row'"></span>
        </a>
      </div>
    </div>
    <div class="menu-content"  @mouseenter="judgeScroll" @mousewheel="scroll" @DOMMouseScroll="scroll">
    <div :style="{ top: menuTop+'px' }"  @mouseleave="menuClose" :class="currentMenuType=='narrow'?'narrow-menu active':'narrow-menu'">
      <ul>
        <narrow-menu v-on:menu-change="menuChange" v-on:last-child-node-click="lastChildNodeClick" v-on:emitactive="emitactive" v-on:emitopen="emitopen" v-for = "(model,index) in currentMenuData" :key="index" :model="model"></narrow-menu>
      </ul>      
    </div>
    <div class="lay" v-show="currentMenuType=='narrow'"></div>
    <div :style="{ top: outerMenuTop+'px',height:outerMenuHeight }" :class="currentMenuType=='outer'?'outer-menu active':'outer-menu'">
      <ul>
        <outer-menu v-on:menu-change="menuChange" v-on:last-child-node-click="lastChildNodeClick" v-on:emitactive="emitactive"  v-on:emitopen="emitopen" v-for = "(model, index) in currentMenuData" :key="index" :model="model"></outer-menu>
      </ul>
    </div>
    <scroll v-show="currentMenuType=='narrow'&&scrollShow" @start="startMotion" :top="scrollTop" :height="scrollHeight" :scroll-start="scrollStart"></scroll>
  </div>
  <div class="guide-arrow" v-show="currentGuideArrowShow">
    <svg id="guide-arrow-svg" style="width:150px;height:60px" >
      <g transform="scale(0.8)">
        <path stroke-width="0" fill="white" d="M 0 18 L 24 0 L 136 0 A 5 5, 0, 0, 1, 141 5 L 141 31 A 5 5, 0, 0, 1, 136 36 L 24 36 "></path>
        <path stroke-width="0" fill="#116edb" d="M 10 18 L 26 6 L 132 6 A 5 5, 0, 0, 1, 137 11 L 137 25 A 5 5,0, 0, 1, 132 30 L 26 30 "></path>
        <animateMotion id="animatePath" path="M 0 10 A 2 2,0,0,1,4 10 A 2 2,0,0,1,0 10" begin="0s" dur="1.3s" repeatCount="indefinite"/>
        <animateTransform id="enlarge" attributeName="transform" begin="indefinite" dur="0.5s" type="scale" from="0.8" to="0.9" fill="freeze"/>
        <animateTransform id="narrow" attributeName="transform" begin="indefinite" dur="0.8s" type="scale" from="0.9" to="0.8" fill="freeze"/>
      </g>
    </svg>
  </div>
</div>
</template>
<script>
    import NarrowMenu from './narrow-menu';
    import OuterMenu from './outer-menu';
    import Scroll from './scroll';
    import { cMessage } from './util';
    var $ = require('jquery');

    export default {
      name: 'ElxMenu',

      componentName: 'ElxMenu',

      components: {
        NarrowMenu, OuterMenu, Scroll
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
        }
      },
      data: function() {
        return {
          currentMenuType: this.type,
          currentMenuData: this.menuData,
          currentGuideArrowShow: this.guideArrowShow,
          scrollTop: 0,
          scrollHeight: 30,
          scrollStart: false,
          menuTop: 0,
          outerMenuTop: 0,
          outerMenuHeight: '100%',
          scrollRate: 10,
          scrollGap: 0,
          mouseY: 0,
          scrollShow: false,
          windowHeight: $(window).height(),
          maxHeight: 0,
          menuHeight: 0,
          menuTotalGap: 0,
          scrollTotalGap: 0,
          scrollActiveGap: 0,
          menuActiveGap: 0,
          menuScrollRate: 0,
          menuAni: null,
          timeOut: 400
        };
      },
      methods: {
        refreshSizeData: function(self) {
          self.maxHeight = $('.menu-content').height();
          self.menuHeight = self.currentMenuType === 'narrow' ? $('.narrow-menu ul').height() : $('.outer-menu ul').height();
          self.menuTotalGap = self.menuHeight - self.maxHeight;
          self.scrollHeight = self.maxHeight * (self.maxHeight / self.menuHeight);
          self.scrollTotalGap = self.maxHeight - self.scrollHeight;
          self.scrollActiveGap = self.scrollTotalGap - self.scrollTop;
          self.menuActiveGap = self.menuTotalGap + self.menuTop;
        },
        scrollDown: function() {
          if (this.scrollActiveGap < this.scrollRate || this.menuActiveGap < this.menuScrollRate) {
            this.scrollTop = this.scrollTop + this.scrollActiveGap;
            this.menuTop = this.menuTop - this.menuActiveGap;
          } else {
            this.scrollTop = this.scrollTop + this.scrollRate;
            this.menuTop = this.menuTop - this.menuScrollRate;
          };
        },
        scrollUp: function() {
          if (this.scrollTotalGap - this.scrollActiveGap < this.scrollRate || this.menuTotalGap - this.menuActiveGap < this.menuScrollRate) {
            this.scrollTop = this.scrollTop - (this.scrollTotalGap - this.scrollActiveGap);
            this.menuTop = this.menuTop + (this.menuTotalGap - this.menuActiveGap);
          } else {
            this.scrollTop = this.scrollTop - this.scrollRate;
            this.menuTop = this.menuTop + this.menuScrollRate;
          };
        },
        scroll: function(event) {
          if (this.currentMenuType === 'outer') {
            return;
          };
          var _e = event || window.event;
          var _dir = _e.wheelDelta ? _e.wheelDelta : -_e.detail;
          this.scrollRate = 10;
          this.menuScrollRate = 40;
          this.refreshSizeData(this);
          this.menuScrollRate = this.menuTotalGap * (this.scrollRate / this.scrollTotalGap);
          if (this.menuTotalGap < 0) {
            this.scrollShow = false;
            return;
          };
          this.scrollShow = true;
          var _self = this;
          var _ratio;
          if (this.scrollActiveGap > 0 && _dir < 0) {
            _ratio = this.scrollActiveGap / this.menuActiveGap;
            this.scrollRate = this.menuScrollRate * _ratio;
            this.scrollDown();
          } else if (this.scrollTotalGap - this.scrollActiveGap > 0 && _dir > 0) {
            _ratio = _self.scrollTop / (-_self.menuTop);
            this.scrollRate = this.menuScrollRate * _ratio;
            this.scrollUp();
          };
        },
        startMotion: function(y, gap) {
          this.scrollStart = true;
          this.scrollGap = gap;
          this.mouseY = y;
        },
        judgeScroll: function(judge) {
          this.refreshSizeData(this);
          if (this.menuTotalGap < 0 || !judge) {
            this.scrollShow = false;
            return;
          }
          this.scrollShow = true;
          this.scrollHeight = this.maxHeight * (this.maxHeight / this.menuHeight);
          if (this.scrollHeight + this.scrollTop > this.maxHeight) {
            this.scrollTop = 80;
          }
        },
        scrollGuide: function(event) {
          if (this.currentMenuType === 'outer') {
            return;
          }
          var _e = event || window.event;
          window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
          if (this.scrollStart) {
            var _mouseGap = _e.pageY - this.mouseY;
            this.mouseY = _e.pageY;
            this.scrollRate = _mouseGap < 0 ? -_mouseGap : _mouseGap;
            this.refreshSizeData(this);
            this.menuScrollRate = this.menuTotalGap * (this.scrollRate / this.scrollTotalGap);
            if (this.menuTotalGap < 0) {
              this.scrollShow = false;
              return;
            }
            this.scrollShow = true;
            var _self = this;
            var _ratio;
            if (this.scrollActiveGap > 0 && _mouseGap > 0) {
              _ratio = this.menuActiveGap / this.scrollActiveGap;
              this.menuScrollRate = this.scrollRate * _ratio;
              this.scrollDown();
            } else if (this.scrollTotalGap - this.scrollActiveGap > 0 && _mouseGap < 0) {
              _ratio = -_self.menuTop / _self.scrollTop;
              this.menuScrollRate = this.scrollRate * _ratio;
              this.scrollUp();
            }
          }
        },
        scrollStop: function() {
          this.scrollStart = false;
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
          var _self = this;
          var _type = type;
          _self.currentMenuType = _type;
          this.$emit('sidebar-open', this.currentMenuType);
          if (_type === 'outer') {
            setTimeout(function() {
              _self.outerMenuHeight = '100%';
            }, 300);
          } else {
            _self.outerMenuTop = 0;
            _self.outerMenuHeight = '100%';
            _self.currentGuideArrowShow = false;
          }
          this.scrollShow = false;
          setTimeout(function() {
            _self.refreshSizeData(_self);
            if (_self.menuTop < 0) {
              if (-_self.menuTop > _self.menuTotalGap) {
                _self.menuTop = -_self.menuTotalGap;
                _self.scrollTop = _self.scrollTotalGap;
              }
            }
          }, 200);
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
          var _self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            for (var i in _self.currentMenuData) {
              _self.operateStatus([_self.currentMenuData[i]], 'open', true);
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
          this.operateStatus(modelArr, 'active', status);
        },
        emitopen: function(modelArr, status, type) {
          clearTimeout(this.menuAni);
          if (type === 'narrow') {
            var _self = this;
            this.menuAni = setTimeout(function() {
              _self.operateStatus(modelArr, 'open', status);
            }, this.timeOut);
          } else {
            this.operateStatus(modelArr, 'open', status);
          }
        },
        operateMenu: function(type) {
          var _self = this;
          var fun = function(node) {
            if (type === 'open') {
              if (node.modelcode === _self.menuOpen) {
                node.open = _self.currentMenuType === 'outer';
                return;
              }
            }
            if (node.children.length === 0) {
              if (type === 'active') {
                if (node.modelcode === _self.menuActive) {
                  node.active = true ;
                  node.open = _self.currentMenuType === 'outer';
                }
              }
              return;
            }
            for (var i = 0;i < node.children.length;i++) {
              fun(node.children[i]);
            }
            return;
          };
          for (var i = 0;i < _self.currentMenuData.length;i++) {
            fun(_self.currentMenuData[i]);
          }
        },
        changeMenuActive: function() {
          var _self = this;
          var fun = function(node) {
            node.active = true;
            node.open = _self.currentMenuType === 'outer';
            if (node.children.length > 0) {
              fun(node.children[0]);
            }
            return;
          };
          if (_self.menuActive === '') {
            fun(_self.currentMenuData[0]);
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
          var _self = this;
          cMessage.receiveMessage(function(message) {
            if (typeof message.data === 'object' && !Array.isArray(message.data)) {
              if ('menuType' in message.data) {
                if (window.top !== window.self) {
                  cMessage.postMessage(message.data, _self.locationOrigin, parent);
                }
                if (message.data.menuType === 'narrow') {
                  clearTimeout(_self.menuAni);
                  _self.menuAni = setTimeout(function() {
                    _self.showMore('narrow');
                  }, 1000);
                }
              } else if ('menuActive' in message.data) {
                _self.$emit('update:menuActive', message.data.menuActive);
              }
            }
            _self.$emit('receive-message', message);
          }, _self.locationOrigin);
        }
      },
      watch: {
        'currentMenuData': function(val, oldVal) {
        },
        'menuData': function(val, oldVal) {
          this.currentMenuData = val;
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
            this.currentGuideArrowShow = val;
          }
        },
        'menuActive': function(val, oldVal) {
          this.operateMenu('active');
        },
        'menuOpen': function(val, oldVal) {
          var _self = this;
          clearTimeout(this.menuAni);
          this.menuAni = setTimeout(function() {
            _self.operateMenu('open');
          }, this.timeOut);
          if (_self.currentMenuType === 'outer') {
            setTimeout(function() {
              _self.currentGuideArrowShow = true;
              var _top = $($('.open')[$('.open').length - 1]).offset().top - $('#sidebar').offset().top;
              var _left = $($('.open')[$('.open').length - 1]).offset().left - $('#sidebar').offset().left;
              var _width = $($('.open')[$('.open').length - 1]).width();
              $('.guide-arrow').css({'top': _top, 'left': _left + _width});
              var _enlargeAni = document.getElementById('enlarge');
              _enlargeAni.beginElement();
              setTimeout(function() {
                var narrowAni = document.getElementById('narrow');
                narrowAni.beginElement();
              }, 100);
            }, 300);
          } else {
            _self.currentGuideArrowShow = false;
          }
        },
        'isPost': function(val, oldVal) {
          this.postMessage();
        }
      },
      created: function() {
        this.postMessage();
        this.bindPostMessage();
        this.currentMenuType = this.menuType;
        if (this.currentMenuData.length > 0) {
          this.changeMenuActive();
        }
        var text, _text;
        for (var i = 1;i < 30;i++) {
          text = text + '.treeview-menu.menu-open li:nth-child(' + i + '){' +
            'transition:opacity 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's,height 200ms linear ,line-height 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-moz-transition:opacity 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's,height 200ms linear ,line-height 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-webkit-transition:opacity 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's,height 200ms linear ,line-height 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-o-transition:opacity 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's,height 200ms linear ,line-height 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '}';
          text = text + '.narrow-menu .treeview-menu.menu-open li:nth-child(' + i + '){' +
            'transition:opacity 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,height 200ms linear 200ms, width 200ms linear, line-height 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,padding-left 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's;' +
            '-moz-transition:opacity 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,height 200ms linear 200ms, width 200ms linear, line-height 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,padding-left 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's;' +
            '-webkit-transition:opacity 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,height 200ms linear 200ms, width 200ms linear, line-height 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,padding-left 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's;' +
            '-o-transition:opacity 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,height 200ms linear 200ms, width 200ms linear, line-height 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's,padding-left 200ms linear ' + ((20 + 8 + 3 * (i - 1)) / 100) + 's;' +
            '}';
          text = text + '.outer-menu .treeview-menu.menu-open li:nth-child(' + i + ') a{' +
            'transition:padding-left 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-moz-transition:padding-left 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-webkit-transition:padding-left 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '-o-transition:padding-left 200ms linear ' + ((8 + 3 * (i - 1)) / 100) + 's;' +
            '}';
        }
        _text = $($('style')[$('style').length - 1]).text();
        $($('style')[$('style').length - 1]).text(_text + text);
        var _self = this;
        $(window).on('resize', function() {
          if (this.currentMenuType === 'outer') {
            return;
          }
          var _originHeight = _self.windowHeight;
          _self.windowHeight = $(window).height();
          var _windowGap = _self.windowHeight - _originHeight;
          _self.refreshSizeData(_self);
          _self.scrollShow = false;
          if (_windowGap > 0) {
            if (_self.menuTop < 0) {
              if (_self.menuTotalGap < -_self.menuTop) {
                _self.menuTop = _self.menuTop + _windowGap > 0 ? 0 : _self.menuTop + _windowGap;
              }
              if (_self.menuHeight + _self.menuTop < _self.menuHeight) {
                if (_self.menuTop + _windowGap > 0) {
                  _self.menuTop = 0;
                } else {
                  _self.menuTop = _self.menuTop + _windowGap > 0 ? 0 : _self.menuTop + _windowGap;
                }
              }
            }
          }
        });
      }
    };
</script>