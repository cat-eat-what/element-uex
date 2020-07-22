<template>
  <div class="elx-card-form">
    <div class="header">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加"
        placement="top">
        <span class="uex-icon-plus" @click="addData"></span>
      </el-tooltip>
    </div>
    <div class="form"
      v-for="(cardData, $index) in currentData"
      :key="$index">
      <elx-form
        v-model="currentData[$index]"
        :ref="'elxForm'+$index"
        :label-suffix="':'"
        :label-width="config.labelWidth"
        :config="config">
      </elx-form>
      <div class="operate">
        <el-tooltip
          class="item"
          effect="dark"
          content="删除"
          placement="top">
          <span class="uex-icon-minus" @click="removeData($index)"></span>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxCardForm',
    componentName: 'ElxCardForm',

    props: {
      value: {
        type: Array,
        default: function() {
          return [];
        }
      },
      config: {
        type: Object,
        default: {}
      }
    },
    data: function() {
      return {
        currentData: [],
        defaultRow: {},
        options: ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm', 'cardForm']
      };
    },
    methods: {
      addData: function() {
        this.currentData.push(Object.assign({}, this.defaultRow));
      },
      removeData: function(index) {
        this.currentData.splice(index, 1);
      },
      validateTableData: function(data) {
        var judge = true;
        var i;
        for (i in data) {
          if (typeof data[i] !== 'object') {
            judge = false;
          }
        }
        return judge;
      },
      validate: function() {
        var _valid = true;
        var _itemValid = true;
        for (var i in this.currentData) {
          var _ref = 'elxForm' + i;
          if (this.$refs[_ref].length > 0) {
            _itemValid = this.$refs[_ref][0].validate();
            _valid = _valid && _itemValid;
          }
        }
        return _valid;
      },
      setDefaultValue: function(obj, field) {
        if (this.options.indexOf(field.type) > -1) {
          obj[field.name] = field.defaultValue ? field.defaultValue : [];
        } else if (field.type === 'switch') {
          obj[field.name] = typeof field.defaultValue === 'boolean' ? field.defaultValue : (field.defaultValue ? field.defaultValue : null);
        } else {
          obj[field.name] = field.defaultValue ? field.defaultValue : null;
        }
        return obj;
      },
      getDefaultRow: function() {
        var _obj = {};
        for (var i in this.config.fields) {
          if (!(this.config.fields[i].name in _obj) && 'name' in this.config.fields[i]) {
            _obj = this.setDefaultValue(_obj, this.config.fields[i]);
          }
        }
        this.defaultRow = _obj;
      }
    },
    watch: {
      value: {
        deep: true,
        handler(val) {
          this.currentData = this.validateTableData(val) ? val : [];
        }
      }
    },
    created: function() {
      this.getDefaultRow();
      this.currentData = this.validateTableData(this.value) ? this.value : [];
    }
  };
</script>

