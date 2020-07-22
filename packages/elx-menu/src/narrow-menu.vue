<template>
  <li
    @mouseenter="menuOpen"
    @mouseleave="menuClose"
    :class="{
        'open': model.open,
        'active':  model.active,
        'hasChild': this.model.children.length !== 0
      }"
    >
    <a
      v-if="lvl < 1"
      href="javascript:;"
      @contextmenu.prevent.stop="contextmenu(model, $event)"
      @click="menuActive"
      @mouseenter="subMenuOpen">
      <span
        :class="model.images != '' && model.images && model.images != null ? model.images : 'uex-icon-default'">
      </span>
    </a>
    <div class="list" :style="{top: lvl <= 1 ? listTop + 'px' : ''}">
      <a
        href="javascript:;"
        @contextmenu.prevent.stop="contextmenu(model, $event)"
        @click="menuActive"
        @mouseenter="subMenuOpen">
        <span
          v-if="lvl <= 1"
          :class="model.images != '' && model.images && model.images != null ? model.images : 'uex-icon-default'">
        </span>
        <el-tooltip
          class="item"
          offset="0"
          effect="light"
          placement="top-end"
          :open-delay="1000"
          :content="model.modelname">
          <span>{{getCurLabel(model.modelname)}}</span>
        </el-tooltip>
        <i
          v-if="model.children.length > 0"
          class="uex-icon-arrow-right">
        </i>
      </a>
      <ul
        :class="model.open ? 'treeview-menu menu-open' : 'treeview-menu '"
        :style="{
          top: top === '' ? '' : top + 'px',
          bottom: bottom === '' ? '' : bottom + 'px'
        }">
        <narrow-menu
          v-for = "(modelChildren, index) in model.children"
          :key="index"
          :model="modelChildren"
          :lvl="lvl+1"
          @menu-contextmenu="contextmenu"
          @menu-change="menuChange"
          @last-child-node-click="lastChildNodeClick"
          @emitactive="emitactive"
          @emitopen="emitopen">
        </narrow-menu>
      </ul>
    </div>
  </li>
</template>
<script>
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
        },
        listTop: {
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
        canMenuChange: function() {
          var filterData = this.model.children.filter(function(item) {
            return item.active === true;
          });
          return this.model.children.length === 0 || (this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null && filterData.length === 0);
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
          if (this.canMenuChange()) {
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
        menuOpen: function(event) {
          this.$emit('emitopen', [this.model], false, 'narrow');
          var _e = event || window.event;
          var _target = _e.currentTarget;
          var top = this.getElOffsetTop(_target, document.body);
          var _bottom = document.body.offsetHeight -
            this.getElOffsetTop(_target, document.body) -
            40 + window.pageYOffset;
          if (top > _bottom && _bottom < this.model.children.length * 36) {
            this.bottom = 0;
            this.top = '';
          } else {
            this.bottom = '';
            this.top = 40;
          }
        },
        menuClose: function() {
          this.$emit('emitopen', [this.model], true, 'narrow');
        },
        contextmenu: function(model, e) {
          this.$emit('menu-contextmenu', model, e);
        }
      }
    };
</script>
