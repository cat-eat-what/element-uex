<template>
    <div class="elx-item-list" @contextmenu.prevent.stop="blankRightClick($event)">
        <ul>
            <li key="index" :style="{'margin-left': lineNum != 1 ? itemMargin + 'px' : '0px', 'margin-right': (index + 1) % lineNum == 0 && lineNum != 1 ? itemMargin + 'px':'0px'}" v-for="(item, index) in currentData" :class="item.selected?'activeItem':''" @click="handleClick(item, index)" @dblclick="dblclickItem(item)" @contextmenu.prevent.stop="rightClick(item, $event)">
                <el-tooltip class="item" :open-delay="1000" effect="light" :content="item[props.cnName]" placement="right">
                    <div>
                      <div class="image">
                          <span :class="icon||item.icon||'uex-icon-program-developed'"></span>
                      </div>
                      <div class="title">
                          <span v-html="getCurLabel(item[props.cnName])"></span>
                      </div>
                    </div>
                </el-tooltip>
                <transition name="fade">
                  <div class="check" v-show="multiselect&&item.selected">
                      <span class="uex-icon-tick"></span>
                  </div>
                </transition>
            </li>
        </ul>
        <transition name="fade">
        <div class="elx-content-menu" v-show="blankContentMenuShow&&isPaste" :style="{top: blankPos.y, left: blankPos.x}">
            <ul>
                <li :class="isPaste=='disabled'?'disabled':''" @click.stop.prevent="pasteItem">
                    <span class="uex-icon-delete"></span>
                    <span>{{t('el.itemList.paste')}}</span>
                </li>
            </ul>
        </div>
        </transition>
        <transition name="fade">
        <div class="elx-content-menu" v-show="contentMenuShow" :style="{top: pos.y, left: pos.x}">
            <slot name="operate" :data="activeData"></slot>
            <ul>
                <li v-show="activeData.isEdit" :class="activeData.isEdit=='disabled'?'disabled':''" @click.stop.prevent="editItem">
                    <span class="uex-icon-edit"></span>
                    <span >{{t('el.itemList.edit')}}</span>
                </li>
                <li v-show="activeData.isDelete" :class="activeData.isDelete=='disabled'?'disabled':''" @click.stop.prevent="deleteItem">
                    <span class="uex-icon-delete"></span>
                    <span >{{t('el.itemList.delete')}}</span>
                </li>
                <li v-show="activeData.isCopy" :class="activeData.isCopy=='disabled'?'disabled':''" @click.stop.prevent="copyItem">
                    <span class="uex-icon-copy"></span>
                    <span>{{t('el.itemList.copy')}}</span>
                </li>
                <li v-show="activeData.isCut" :class="activeData.isCut=='disabled'?'disabled':''" @click.stop.prevent="cutItem">
                    <span class="uex-icon-cross"></span>
                    <span >{{t('el.itemList.cut')}}</span>
                </li>
                <li v-show="isPaste" :class="isPaste=='disabled'?'disabled':''" @click.stop.prevent="pasteItem">
                    <span class="uex-icon-copy"></span>
                    <span >{{t('el.itemList.paste')}}</span>
                </li>
            </ul>
        </div>
        </transition>
    </div>
</template>

<script>
  var $ = require('jquery');
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
      }
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
        PreDataLength: 0
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
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      blankRightClick: function(event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        if (e.which === 3) {
          this.contentMenuShow = false;
          this.blankContentMenuShow = false;
          this.blankPos.x = pos.x + 'px';
          this.blankPos.y = pos.y + 'px';
          this.blankContentMenuShow = true;
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
        if (e.which === 3) {
          this.$emit('right-click', item);
          this.blankContentMenuShow = false;
          this.contentMenuShow = false;
          this.pos.x = pos.x + 'px';
          this.pos.y = pos.y + 'px';
          this.activeData = item;
          this.contentMenuShow = true;
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
      computeNum: function() {
        var _width = $(this.$el).width() - 1;
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
        this.$emit('update: data', val);
      },
      multiselect: function(val, oldVal) {
        if (!val) {
          for (var i in this.currentData) {
            this.currentData[i].selected = false;
          }
        }
      }
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        _self.computeNum();
        $('body').on('click', function(event) {
          _self.contentMenuShow = false;
          _self.blankContentMenuShow = false;
        });
        $(window).on('resize', function(event) {
          _self.computeNum();
        });
      });
    },
    created: function() {
      this.currentData = this.formatData();
      this.PreDataLength = this.currentData.length;
    }
  };
</script>

