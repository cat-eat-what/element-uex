<template>
  <li
    :class="liClass"
    @click.stop.prevent="menuOpen">
    <el-tooltip
      class="item"
      effect="light"
      placement="right"
      :open-delay="1000"
      :content="model.modelname">
      <a
        href="javascript:;"
        :style="{'padding-left': lvl == 0 ? '17px' : 44 + (lvl - 1) * 20 + 'px'}"
        @contextmenu.prevent.stop="contextmenu(model, $event)"
        @click.prevent="menuActive">
          <span
            v-if="lvl <= 1"
            :class="model.images != '' && model.images && model.images != null ? model.images : 'uex-icon-default'"></span>
          <span
            :class="'name lvl' + lvl"
            :style="{
              'width': lvl <= 1 ? (model.children.length > 0 ? 'calc(100% - 24px - 26px)' : 'calc(100% - 28px)') :  (model.children.length > 0 ? 'calc(100% - 26px)' : 'calc(100%)'),
              'margin-right': model.open ? (lvl < 1 ? '-24px' : '-14px') : '0px'
            }"
            v-text="model.modelname">
          </span>
          <i
            v-if="model.children.length > 0"
            class="uex-icon-arrow-right">
          </i>
      </a>
    </el-tooltip>
    <ul
      :class="model.open ? 'treeview-menu menu-open' : 'treeview-menu '">
      <outer-menu
        v-for = "(modelChildren, index) in model.children"
        :key="index"
        :model="modelChildren"
        :lvl="lvl + 1"
        @menu-contextmenu="contextmenu"
        @menu-change="menuChange"
        @last-child-node-click="lastChildNodeClick"
        @emitactive="emitactive"
        @emitopen="emitopen">
      </outer-menu>
    </ul>
  </li>
</template>
<script>
    export default {
      name: 'OuterMenu',
      componentName: 'OuterMenu',

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
          liClass: this.model.children.length !== 0 ? 'hasChild' : ''
        };
      },
      methods: {
        menuChange: function(model) {
          this.$emit('menu-change', model);
        },
        lastChildNodeClick: function(model) {
          this.$emit('last-child-node-click', model);
        },
        canMenuChange: function() {
          var filterData = this.model.children.filter(function(item) {
            return item.active === true;
          });
          return this.model.children.length === 0 || (this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null && filterData.length === 0);
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
        menuOpen: function() {
          this.$emit('emitopen', [this.model], this.model.open, 'outer');
        },
        emitactive: function(modelArr, status) {
          var _arr = [this.model].concat(modelArr);
          this.$emit('emitactive', _arr, status);
        },
        emitopen: function(modelArr, status) {
          var _arr = [this.model].concat(modelArr);
          this.$emit('emitopen', _arr, status, 'outer');
        },
        changeClass: function() {
          var _str = '';
          if (this.model.open) {
            _str = _str + ' open';
          }
          if (this.model.active) {
            _str = _str + ' active';
          }
          if (this.model.children.length !== 0) {
            _str = _str + ' hasChild';
          }
          this.liClass = _str;
        },
        contextmenu: function(model, e) {
          this.$emit('menu-contextmenu', model, e);
        }
      },
      watch: {
        'model.open': function(val, oldVal) {
          this.changeClass();
          if (val) {
            this.$emit('emitopen', [this.model], false, 'outer');
          }
        },
        'model.active': function(val, oldVal) {
          this.changeClass();
          if (val) {
            if (this.canMenuChange()) {
              this.$emit('menu-change', this.model);
              this.$emit('emitactive', [this.model], false);
            }
            if (this.model.children.length === 0) {
              this.$emit('last-child-node-click', this.model);
            }
          }
        }
      },
      created: function() {
        this.changeClass();
        if (this.model.open) {
          this.$emit('emitopen', [this.model], false, 'outer');
        }
        if (this.model.active) {
          if (this.model.children.length === 0 || (this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null)) {
            this.$emit('menu-change', this.model);
            this.$emit('emitactive', [this.model], false);
          }
          if (this.model.children.length === 0) {
            this.$emit('last-child-node-click', this.model);
          }
        }
      }
    };
</script>
