<template>
  <div
    class="elx-item-list"
    @contextmenu.prevent.stop="blankRightClick($event)">
    <ul>
      <li
        :draggable="draggable"
        @mousedown="handleMouseDown(item, index, $event)"
        @mousemove="handleMouseMove(item, index, $event)"
        @mouseup="handleMouseUp(item, index, $event)"
        @mouseleave="handleMouseLeave(item, index, $event)"
        @dragstart="handleDragStart(item, index, $event)"
        :key="index"
        :style="{
          'margin-left': lineNum != 1 ? itemMargin + 'px' : '0px',
          'margin-right': (index + 1) % lineNum == 0 && lineNum != 1 ? itemMargin + 'px':'0px'
        }"
        v-for="(item, index) in currentData"
        :class="(item.selected?'activeItem ':' ') + getClass(item)"
        @click="handleClick(item, index, $event)"
        @dblclick="dblclickItem(item)"
        @contextmenu.prevent.stop="rightClick(item, $event)">
        <el-tooltip
          class="item"
          effect="light"
          placement="right"
          :open-delay="1000"
          :content="item[props.cnName] || '无标题'">
          <div>
            <div class="image">
              <span :class="icon || item.icon || 'uex-icon-program-developed'"></span>
            </div>
            <div class="title">
              <span v-html="getCurLabel(item[props.cnName])"></span>
            </div>
          </div>
        </el-tooltip>
        <transition name="fade">
          <div class="check" v-show="multiselect && item.selected">
            <svg class="check-bg" width="20px" height="20px" 
            viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" 
            xmlns:xlink="http://www.w3.org/1999/xlink">
              <path d="M0 0 L20 0 L0 20 Z" fill="#147BD1"></path>
            </svg>
            <span class="uex-icon-tick"></span>
          </div>
        </transition>
      </li>
    </ul>
    <transition name="fade">
      <div
        class="elx-content-menu"
        ref="blankContentMenu"
        v-show="blankContentMenuShow && isPaste"
        :style="{top: blankPos.y, left: blankPos.x}">
        <ul>
          <li
            :class="isPaste == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="pasteItem">
            <span class="uex-icon-delete"></span>
            <span>{{t('el.itemList.paste')}}</span>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fade">
      <div
        ref="contentMenu"
        class="elx-content-menu"
        v-show="contentMenuShow"
        :style="{top: pos.y, left: pos.x}">
        <slot name="operate" :data="activeData"></slot>
        <ul>
          <li
            v-show="activeData.isEdit"
            :class="activeData.isEdit == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="editItem">
            <span class="uex-icon-edit"></span>
            <span >{{t('el.itemList.edit')}}</span>
          </li>
          <li
            v-show="activeData.isDelete"
            :class="activeData.isDelete == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="deleteItem">
            <span class="uex-icon-delete"></span>
            <span >{{t('el.itemList.delete')}}</span>
          </li>
          <li
            v-show="activeData.isCopy"
            :class="activeData.isCopy == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="copyItem">
            <span class="uex-icon-copy"></span>
            <span>{{t('el.itemList.copy')}}</span>
          </li>
          <li
            v-show="activeData.isCut"
            :class="activeData.isCut == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="cutItem">
            <span class="uex-icon-cross"></span>
            <span >{{t('el.itemList.cut')}}</span>
          </li>
          <li
            v-show="isPaste"
            :class="isPaste == 'disabled' ? 'disabled' : ''"
            @click.stop.prevent="pasteItem">
            <span class="uex-icon-copy"></span>
            <span >{{t('el.itemList.paste')}}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
  import Locale from 'element-uex/src/mixins/locale';

  export default {
    mixins: [Locale],
    name: 'ElxItemList',
    componentName: 'ElxItemList',

    props: {
      icon: {
        type: String
      },
      data: {
        type: Array
      },
      draggable: Boolean,
      props: {
        default() {
          return {
            name: 'name',
            cnName: 'cnName'
          };
        }
      },
      multiselect: {
        type: Boolean,
        default: false
      },
      itemClass: Function
    },
    data: function() {
      return {
        pos: {
          x: 0,
          y: 0
        },
        blankPos: {
          x: 0,
          y: 0
        },
        blankContentMenuShow: false,
        contentMenuShow: false,
        currentData: [],
        activeData: {},
        copyData: null,
        cutData: null,
        itemWidth: 120,
        lineNum: 1,
        itemMargin: 0,
        PreDataLength: 0,
        dropDoms: [],
        dropData: [],
        originPos: {x: 0, y: 0},
        dropMousePos: {x: 0, y: 0},
        browser: null,
        dropDomList: null,
        isMouseDown: false,
        dragging: false
      };
    },
    computed: {
      isPaste: function() {
        if (!this.activeData.isCopy && !this.activeData.isCut) {
          return false;
        } else if (this.copyData === null && this.cutData === null) {
          return 'disabled';
        } else {
          return true;
        }
      }
    },
    methods: {
      getClass: function(item) {
        if (typeof this.itemClass === 'function') {
          return this.itemClass(item);
        } else {
          return '';
        }
      },
      tranformStr: function(str) {
        var strArr = str.split('-');
        for (var i = 1; i < strArr.length; i++) {
          strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
        }
        return strArr.join('');
      },
      getDomDetail: function(dom) {
        var dropDetail = {
          dom: dom,
          size: {width: dom.offsetWidth, height: dom.offsetHeight},
          innerHTML: dom.innerHTML,
          class: dom.getAttribute('class'),
          style: dom.getAttribute('style')
        };
        return dropDetail;
      },
      createDropDomList: function(e) {
        var self = this;
        var dropData = this.dropData;
        var dropDoms = this.dropDoms;
        var li;
        if (dropData.length > 0) {
          var ul = document.createElement('ul');
          ul.setAttribute('class', 'drop-dom-list');
          ul.setAttribute('style', 'position: fixed; pointer-events: none; width: 120px; height: 135px');
          if (typeof DataTransfer.prototype.setDragImage === 'function') {
            ul.style.top = e.clientY + 20 + 'px';
            ul.style.left = e.clientX + 20 + 'px';
          } else {
            ul.style.top = e.clientY - 10 + 'px';
            ul.style.left = e.clientX - 20 + 'px';
          }
          var compatible = ['-webkit-', '-moz-', '-o-', '-ms-', ''];
          var transform = '';
          dropDoms.map(function(dom, index) {
            li = document.createElement('li');
            transform = '';
            li.setAttribute('class', dom.class + ' drop-item');
            compatible.map(function(c) {
              transform = transform + c + 'transform: rotate(' + (index === dropDoms.length - 1 ? 0 : (index % 2 === 0 ? 2 : -2)) + 'deg);';
            });
            li.setAttribute('style', dom.style + ';' + transform + 'position: absolute; top: 0px; left: 0px; width: ' + dom.size.width + 'px; height: ' + dom.size.height + 'px; margin: 0px; background: #fff');
            li.innerHTML = dom.innerHTML;
            ul.appendChild(li);
          });
          var numLi = document.createElement('li');
          numLi.setAttribute('class', 'drop-dom-num');
          numLi.setAttribute('style', 'position: absolute; top: 2px; left: 5px');
          numLi.innerHTML = dropData.length;
          ul.appendChild(numLi);
          this.$el.appendChild(ul);
          this.addEvent(ul, 'dragstart', function(e) {
            self.handleDragStart(null, null, e);
          });
          this.addEvent(ul, 'dragstart', function(e) {
            self.handleDropDomMouseMove(null, null, e);
          });
          if (typeof DataTransfer.prototype.setDragImage === 'function') {
            setTimeout(function() {
              self.$el.removeChild(ul);
            });
          } else {
            this.dropDomList = ul;
          }
          return ul;
        }
        return null;
      },
      getDropDomList: function(item, index, e) {
        var self = this;
        var dropDom;
        this.dropDoms = [];
        this.dropData = [];
        this.originPos = {
          x: e.clientX,
          y: e.clientY
        };
        this.dropMousePos = {x: e.clientX, y: e.clientY};
        var selectedIdxArr = [];
        var childNodes = e.currentTarget.parentNode.childNodes;
        this.currentData.map(function(d, i) {
          if (d.selected && index !== i) {
            selectedIdxArr.push(i);
            dropDom = self.getDomDetail(childNodes[i]);
            self.dropDoms.push(dropDom);
            self.dropData.push(self.data[i]);
          }
        });
        if (selectedIdxArr.indexOf(index) < 0) {
          dropDom = this.getDomDetail(childNodes[index]);
          this.dropData.push(this.data[index]);
          this.dropDoms.push(dropDom);
        }
      },
      handleMouseDown: function(item, index, e) {
        this.isMouseDown = true;
      },
      handleMouseMove: function(item, index, e) {
        if (this.isMouseDown) {
          if (typeof DataTransfer.prototype.setDragImage !== 'function') {
            this.getDropDomList(item, index, e);
            var node = this.createDropDomList(e);
            if (node) {
              node.dragDrop();
            }
            this.isMouseDown = false;
          }
        }
      },
      handleDropDomMouseMove: function(item, index, e) {
      },
      handleMouseUp: function(item, index, e) {
        this.isMouseDown = false;
      },
      handleMouseLeave: function(item, index, e) {
        this.isMouseDown = false;
      },
      handleDragStart: function(item, index, e) {
        this.dragging = true;
        e.dataTransfer.setData('text', 'data');
        e.dataTransfer.effectAllowed = 'copy';
        if (typeof DataTransfer.prototype.setDragImage === 'function') {
          this.getDropDomList(item, index, e);
          var node = this.createDropDomList(e);
          if (node) {
            e.dataTransfer.setDragImage(node, -20, -20, e.currentTarget);
          }
        }
        this.$emit('drop-start', this.dropData);
      },
      handleDragEnter: function(e) {
        if (!this.dragging) {
          return;
        }
        if (this.dropDomList) {
          this.$el.removeChild(this.dropDomList);
          this.dropDomList = null;
        }
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
        e.stopPropagation();
      },
      handleDragOver: function(e) {
        if (!this.dragging) {
          return;
        }
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
        e.stopPropagation();
      },
      handleDrop: function(e) {
        if (!this.dragging) {
          return;
        }
        if (this.dropDomList) {
          console.log('Drop');
        }
        this.dragging = false;
        e.dataTransfer.dropEffect = 'copy';
        this.dropDoms = [];
        this.dropData = [];
        this.originPos = {x: 0, y: 0};
        if (this.dropDomList) {
          this.dropDomList.style.top = '-200px';
          this.dropDomList.style.left = '-200px';
        }
      },
      selectItems: function(items) {
        for (var i in this.currentData) {
          this.currentData[i].selected = false;
        }
        for (var j in items) {
          var _index = this.data.indexOf(items[j]);
          this.currentData[_index].selected = true;
        }
      },
      formatData: function() {
        var _fun = function(node) {
          node.isEdit = 'isEdit' in node ? node.isEdit : true;
          node.isDelete = 'isDelete' in node ? node.isDelete : true;
          node.isCopy = 'isCopy' in node ? node.isCopy : true;
          node.isCut = 'isCut' in node ? node.isCut : true;
          node.selected = 'selected' in node ? node.selected : false;
        };
        var _data = Array.isArray(this.data) ? JSON.parse(JSON.stringify(this.data)) : [];
        for (var i = 0;i < _data.length;i++) {
          _fun(_data[i]);
        }
        return _data;
      },
      changePosY: function(ref, y) {
        var gap = 5;
        var bodyClientHeight = document.body.clientHeight;
        var bodyClientTop = document.body.clientTop;
        var height = this.$refs[ref].clientHeight;
        var elBottom = height + y;
        var viewHeight = bodyClientHeight + bodyClientTop;
        if (viewHeight < elBottom) {
          y = viewHeight - height - gap;
        }
        return y;
      },
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      blankRightClick: function(event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        var self = this;
        if (e.which === 3) {
          this.contentMenuShow = false;
          this.blankContentMenuShow = false;
          this.blankPos.x = pos.x + 'px';
          this.blankPos.y = pos.y + 'px';
          this.blankContentMenuShow = true;
          this.$nextTick(function() {
            self.blankPos.y = self.changePosY('blankContentMenu', pos.y) + 'px';
          });
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      handleClick: function(item, index) {
        this.activeData = item;
        if (!this.multiselect) {
          for (var i in this.currentData) {
            this.currentData[i].selected = false;
          }
          this.activeData.selected = !this.activeData.selected;
        } else {
          this.activeData.selected = !this.activeData.selected;
        }
        this.$emit('click', this.data[index], this.activeData.selected);
      },
      rightClick: function(item, event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        var self = this;
        if (e.which === 3) {
          this.$emit('right-click', item);
          this.blankContentMenuShow = false;
          this.contentMenuShow = false;
          this.pos.x = pos.x + 'px';
          this.pos.y = pos.y + 'px';
          this.activeData = item;
          this.contentMenuShow = true;
          this.$nextTick(function() {
            self.pos.y = self.changePosY('contentMenu', pos.y) + 'px';
          });
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      dblclickItem: function(item) {
        this.$emit('dblclick', item);
      },
      editItem: function() {
        this.contentMenuShow = false;
        if (this.activeData.isEdit && this.activeData.isEdit !== 'disabled') {
          this.$emit('edit', this.activeData);
        }
      },
      deleteItem: function() {
        this.contentMenuShow = false;
        if (this.activeData.isDelete && this.activeData.isDelete !== 'disabled') {
          this.$emit('delete', this.activeData);
        }
      },
      copyItem: function() {
        this.contentMenuShow = false;
        if (this.activeData.isCopy && this.activeData.isCopy !== 'disabled') {
          this.copyData = this.activeData;
          this.cutData = null;
          this.$emit('copy', this.activeData);
        }
      },
      cutItem: function() {
        this.contentMenuShow = false;
        if (this.activeData.isCut && this.activeData.isCut !== 'disabled') {
          this.copyData = null;
          this.cutData = this.activeData;
          var _index = this.currentData.indexOf(this.activeData);
          this.currentData.splice(_index, 1);
          this.$emit('cut', this.activeData);
        }
      },
      pasteItem: function() {
        this.blankContentMenuShow = false;
        this.contentMenuShow = false;
        if (this.isPaste && this.activeData.isPaste !== 'disabled') {
          var _data = this.cutData !== null ? this.cutData : this.copyData;
          this.form = JSON.parse(JSON.stringify(_data));
          this.$emit('paste', this.form);
          this.cutData = null;
        }
      },
      preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnvalue = false;
        }
      },
      parseFloat: function(val) {
        val = window.parseFloat(val);
        return window.isNaN(val) ? 0 : val;
      },
      formatVal: function(realVal, offsetVal, gap) {
        realVal = this.parseFloat(realVal);
        if (realVal.toString().split('.').length > 1) {
          var point = this.parseFloat('0.' + realVal.toString().split('.')[1]);
          if (point >= 0.5) {
            offsetVal = offsetVal - 1 + point;
          } else {
            offsetVal = offsetVal + point;
          }
          return offsetVal;
        }
        return this.parseFloat(offsetVal);
      },
      getCss: function(el) {
        var css;
        if (window.getComputedStyle) {
          css = window.getComputedStyle(el);
        } else {
          css = el.currentStyle;
        }
        return css;
      },
      getInnerWidth: function(el) {
        var innerWidth = 0;
        var css = this.getCss(el);
        innerWidth = this.formatVal(css.width, el.clientWidth, -1) -
          this.parseFloat(css.paddingLeft) -
          this.parseFloat(css.paddingRight) -
          this.parseFloat(css.borderLeftWidth) -
          this.parseFloat(css.borderRightWidth);
        return innerWidth;
      },
      computeNum: function() {
        var _width = this.getInnerWidth(this.$el) - 1;
        var _num = window.parseInt(_width / this.itemWidth);
        for (var i = _num; i > -1; i--) {
          var _margin = window.parseInt((_width - i * this.itemWidth) / (i + 1));
          if (_margin > 9) {
            this.itemMargin = _margin;
            this.lineNum = i;
            break;
          }
        }
      },
      getCurLabel: function(str) {
        var realLength = 0;
        if (typeof str !== 'string') {
          return '';
        }
        var len = str.length;
        var charCode = -1;
        var sub = -1;
        for (var i = 0; i < len; i++) {
          charCode = str.charCodeAt(i);
          if (charCode > 0 && charCode < 129) {
            realLength += 1;
          } else {
            realLength += 2;
          }
          if (realLength > 30 && sub === -1) {
            sub = i;
          }
        }
        return sub !== -1 ? str.substring(0, sub) + '..' : str;
      },
      hideMenu: function() {
        this.contentMenuShow = false;
        this.blankContentMenuShow = false;
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
      getTarget: function(event) {
        return event.target || event.srcElement;
      }
    },
    watch: {
      data: function(val, oldVal) {
        this.blankContentMenuShow = false;
        this.contentMenuShow = false;
        this.currentData = this.formatData();
        if (val.length !== this.PreDataLength) {
          this.computeNum();
        }
        this.PreDataLength = val.length;
      },
      currentData: function(val, oldVal) {
      },
      multiselect: function(val, oldVal) {
        if (!val) {
          for (var i in this.currentData) {
            this.currentData[i].selected = false;
          }
        }
      }
    },
    created: function() {
      this.currentData = this.formatData();
      this.PreDataLength = this.currentData.length;
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        this.dropDomList = this.$refs['dropDomList'];
        _self.computeNum();
        this.addEvent(window, 'resize', _self.computeNum);
        this.addEvent(document.body, 'click', _self.hideMenu);
        this.addEvent(document.body, 'dragenter', _self.handleDragEnter);
        this.addEvent(document.body, 'dragover', _self.handleDragOver);
        this.addEvent(document.body, 'drop', function(e) {
          e.stopPropagation();
          e.preventDefault();
        });
        this.addEvent(document.body, 'dragend', function(e) {
          _self.handleDrop(e);
          e.stopPropagation();
          e.preventDefault();
        });
      });
    }
  };
</script>

