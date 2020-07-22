<template>
  <li @mouseenter="menuOpen" @mouseleave="menuClose" :class="model.open&&model.active?'open active':(!model.open&&!model.active?'':(model.open?'open':'active'))">
    <div class="list">
      <a href="javascript:;" @click="menuActive" @mouseenter="subMenuOpen">
        <span v-if="lvl<=1" :class="model.images!=''&&model.images&&model.images!=null?model.images:'uex-icon-default'"></span>
        <el-tooltip class="item" :open-delay="1000" offset="0" effect="light" :content="model.modelname" placement="top-end">
          <span>{{getCurLabel(model.modelname)}}</span>
        </el-tooltip>
        <i v-if="model.children.length>0" class="el-icon-arrow-right"></i>
      </a>
      <ul :class="model.open?'treeview-menu menu-open':'treeview-menu '" :style="{ top:top==''?'':top+'px',bottom: bottom==''?'':bottom+'px'}">
          <narrow-menu  v-on:menu-change="menuChange" v-on:last-child-node-click="lastChildNodeClick" v-on:emitactive="emitactive" v-on:emitopen="emitopen" v-for = "(modelChildren, index) in model.children" :key="index" :model="modelChildren" :lvl="lvl+1"></narrow-menu>        
      </ul>
    </div>
  </li>
</template>
<script>
    var $ = require('jquery');
    export default {
      name: 'NarrowMenu',

      componentName: 'NarrowMenu',

      props: {
        model: {
          type: Object,
          default: {}
        },
        lvl: {
          type: Number,
          default: 0
        }
      },
      data: function() {
        return {
          top: 0,
          bottom: ''
        };
      },
      methods: {
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
            if (realLength > 10 && sub === -1) {
              sub = i;
            }
          }
          return sub !== -1 ? str.substring(0, sub) + '..' : str;
        },
        menuChange: function(model) {
          this.$emit('menu-change', model);
        },
        lastChildNodeClick: function(model) {
          this.$emit('last-child-node-click', model);
        },
        emitactive: function(modelArr, status) {
          var _arr = [this.model].concat(modelArr);
          this.$emit('emitactive', _arr, status);
        },
        emitopen: function(modelArr, status) {
          var _arr = [this.model].concat(modelArr);
          this.$emit('emitopen', _arr, status, 'narrow');
        },
        menuActive: function() {
          if (this.model.children.length === 0 || (this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null)) {
            if (this.model.active) {
              this.$emit('menu-change', this.model);
            }
            this.$emit('emitactive', [this.model], this.model.active);
          }
          if (this.model.children.length === 0) {
            this.$emit('last-child-node-click', this.model);
          }
        },
        subMenuOpen: function() {
          var _arr = [this.model];
          if (this.model.active) {
            var fun = function(node) {
              if (node.active) {
                _arr.push(node);
              }
              if (node.children.length === 0) {
                return;
              }
              for (var i = 0;i < node.children.length;i++) {
                fun(node.children[i]);
              }
            };
            if (this.model.children.length > 0) {
              for (var i = 0;i < this.model.children.length;i++) {
                if (this.model.children[i].active) {
                  fun(this.model.children[i]);
                }
              }
              this.$emit('emitopen', _arr, _arr[_arr.length - 1].open, 'narrow');
            }
          }
        },
        menuOpen: function(event) {
          this.$emit('emitopen', [this.model], false, 'narrow');
          var _e = event || window.event;
          var _target = _e.currentTarget;
          var _item = $($(_target));
          var _self = this;
          var _bottom = $('body').height() - _item.offset().top - 50 + $(window).scrollTop();
          if (_item.offset().top > _bottom && _bottom < _self.model.children.length * 36) {
            _self.bottom = 50;
            _self.top = '';
          } else {
            _self.bottom = '';
            _self.top = 50;
          }
        },
        menuClose: function() {
          this.$emit('emitopen', [this.model], true, 'narrow');
        }
      }
    };
</script>
