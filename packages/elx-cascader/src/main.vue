<template>
  <div class="elx-cascader">
    <el-cascader
      v-model="currentValue"
      :options="options"
      :disabled="disabled"
      :clearable="clearable"
      :filterable="filterable"
      :expand-trigger="expandTrigger"
      :show-all-levels="showAllLevels"
      :placeholder="placeholder"
      :change-on-select="changeOnSelect"
      :props="props"
      @change="handleChange">
    </el-cascader>
  </div>
</template>

<script>
export default {
  name: 'ElxCascader',

  props: {
    options: {
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default() {
        return {
          children: 'children',
          label: 'label',
          value: 'value',
          disabled: 'disabled'
        };
      }
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    value: {
      type: String
    },
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: Boolean,
    filterable: Boolean,
    placeholder: {
      type: String,
      default: '请选择'
    },
    expandTrigger: {
      type: String,
      default: 'click'
    }
  },

  data() {
    return {
      currentValue: []
    };
  },

  watch: {
    value(val, oldVal) {
      this.getValueText(this.value, []);
    }
  },

  methods: {
    handleChange(val) {
      if (val.length > 0) {
        this.$emit('input', val[val.length - 1]);
        this.$emit('change', val[val.length - 1]);
      } else {
        this.$emit('input', null);
        this.$emit('change', null);
      }
    },
    getValueText(value, arr) {
      let currentNode = {};
      let judge = false;
      const _func = (node, parentNode) => {
        if (node[this.props.value] === value) {
          currentNode = node;
          this.currentValue = [node[this.props.value]].concat(arr);
          if (!Array.isArray(parentNode) && parentNode !== {}) {
            this.getValueText(parentNode[this.props.value], JSON.parse(JSON.stringify(this.currentValue)));
          }
          judge = true;
          return;
        }
        if (node.children === null || !('children' in node)) {
          return;
        } else if (node.children.length === 0) {
          return;
        }
        for (let i in node.children) {
          if (judge) {
            break;
          }
          _func(node.children[i], node);
        }
      };
      for (let i in this.options) {
        if (judge) {
          break;
        }
        _func(this.options[i], []);
      }
      if (!judge) {
        this.currentValue = [];
      }
      return currentNode;
    }
  },
  created() {
    this.getValueText(this.value, []);
  }
};
</script>
