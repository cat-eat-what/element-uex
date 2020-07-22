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
    value: function(val, oldVal) {
      this.getValueText(this.value, []);
    }
  },

  methods: {
    'handleChange': function(val) {
      if (val.length > 0) {
        this.$emit('input', val[val.length - 1]);
        this.$emit('change', val[val.length - 1]);
      } else {
        this.$emit('input', null);
        this.$emit('change', null);
      }
    },
    'getValueText': function(value, arr) {
      var currentNode = {};
      var judge = false;
      var _self = this;
      var _func = function(node, parentNode) {
        if (node[_self.props.value] === value) {
          currentNode = node;
          _self.currentValue = [node[_self.props.value]].concat(arr);
          if (!Array.isArray(parentNode) && parentNode !== {}) {
            _self.getValueText(parentNode[_self.props.value], JSON.parse(JSON.stringify(_self.currentValue)));
          }
          judge = true;
          return;
        }
        if (node.children === null || !('children' in node)) {
          return;
        } else if (node.children.length === 0) {
          return;
        }
        for (var i in node.children) {
          if (judge) {
            break;
          }
          _func(node.children[i], node);
        }
      };
      for (var i in this.options) {
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
  created: function() {
    this.getValueText(this.value, []);
  }
};
</script>
