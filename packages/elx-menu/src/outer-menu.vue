<template>
  <li @click.stop.prevent="menuOpen" :class="liClass" >
        <el-tooltip class="item" :open-delay="1000" effect="light" :content="model.modelname" placement="right">
          <a href="javascript:;" @click.prevent="menuActive">
              <span v-if="lvl<=1" :class="model.images!=''&&model.images&&model.images!=null?model.images:'uex-icon-default'"></span>
              <span>{{getCurLabel(model.modelname)}}</span>
              <i v-if="model.children.length>0" class="el-icon-arrow-right"></i>
          </a>
        </el-tooltip>
        <ul :class="model.open?'treeview-menu menu-open':'treeview-menu '">
             <outer-menu  v-on:menu-change="menuChange" v-on:last-child-node-click="lastChildNodeClick" v-on:emitactive="emitactive" v-on:emitopen="emitopen" v-for = "(modelChildren, index) in model.children" :key="index" :model="modelChildren" :lvl="lvl+1"></outer-menu>        
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
            if (realLength > 14 && sub === -1) {
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
            if (this.model.children.length === 0 || (this.model.children.length !== 0 && this.model.url !== '' && this.model.url !== null)) {
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
