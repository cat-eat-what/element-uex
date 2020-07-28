<template>
  <el-tooltip
    class="item"
    effect="dark"
    placement="right"
    :content="model.modelname">
    <li
      @click.stop.prevent="menuChange"
      :class="liClass" >
      <a href="javascript:;">
        <span
          v-for="(item, index) in formatName"
          :key="index" >
          <span v-html="item"></span>
          <br/>
        </span>
      </a>
    </li>
  </el-tooltip>
</template>
<script>
    export default {
      name: 'NarrowSidebar',
      componentName: 'NarrowSiderbar',

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
      data() {
        return {
          liClass: this.model.children.length !== 0 ? 'hasChild' : '',
          formatName: (this.model.modelname.length > 4 ? this.model.modelname.substring(0, 3) + '..' : this.model.modelname).split('')
        };
      },
      methods: {
        menuChange() {
          this.$emit('menu-change', this.model);
        },
        changeClass() {
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
        'model.open'(val, oldVal) {
          this.changeClass();
          if (val) {
            this.$emit('emitopen', [this.model], false);
          }
        },
        'model.active'(val, oldVal) {
          this.changeClass();
          if (val) {
            if (this.model.children.length === 0) {
              this.$emit('emitactive', [this.model], false);
              this.$emit('menu-change', this.model);
            }
          }
        }
      },
      created() {
        this.changeClass();
        if (this.model.open) {
          this.$emit('emitopen', [this.model], false);
        }
        if (this.model.active) {
          this.$emit('menu-change', this.model);
        }
      }
    };
</script>
