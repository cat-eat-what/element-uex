<template>
  <div class="elx-table-form">
      <el-tooltip class="item" effect="dark" content="添加" placement="top">
        <span class="uex-icon-plus" @click="addData"></span>
      </el-tooltip>
      <el-table :data="currentData" stripe border style="width: 100%" max-height="280">
        <el-table-column :label="item.columnLabel" :width="item.width" v-for="item in config.fields" :key="item.name">
          <template scope="scope">
            <template v-if="item.type=='index'">
              <span v-html="scope.$index+1"></span>
            </template>
            <template v-if="item.type=='string'">
              <span v-html="scope.row[item.name]"></span>
            </template>
            <template v-if="item.type!='string'">
              <elx-form :ref="'elxForm'+item.name+scope.$index" :class="'elxForm'+item.name+scope.$index" @input="setFormData" :index="scope.$index" v-model="scope.row" :label-width="'0px'" :config="{fields: [item], rules: config.rules}"></elx-form>
            </template>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="50px">
          <template scope="scope">
            <el-tooltip class="item" effect="dark" content="删除" placement="top">
              <span class="uex-icon-minus" @click="removeData(scope.$index)"></span>
            </el-tooltip>
            <span></span>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
  import _ from 'underscore';
  export default {
    name: 'ElxTableForm',
    componentName: 'ElxTableForm',

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
        hasIndex: false,
        indexProp: null,
        options: ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm']
      };
    },
    methods: {
      addData: function() {
        this.currentData.push(_.extend({}, this.defaultRow));
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

        for (var i in this.config.fields) {
          for (var j in this.currentData) {
            var _ref = 'elxForm' + this.config.fields[i].name + j;
            if (this.$refs[_ref].length > 0) {
              _itemValid = this.$refs[_ref][0].validate();
              _valid = _valid && _itemValid;
            }
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
      },
      setFormData: function(formData, index) {
        this.currentData[index] = _.extend(this.currentData[index], formData);
        this.formatData();
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData);
      },
      formatData: function() {
        if (this.hasIndex) {
          this.setIndex();
        }
      },
      setIndex: function() {
        for (var i in this.currentData) {
          this.currentData[i][this.indexProp] = Number(i) + 1;
        }
      },
      judgeIndex: function() {
        for (var i in this.config.fields) {
          if (this.config.fields[i].type === 'index') {
            this.hasIndex = true;
            this.indexProp = this.config.fields[i].name;
            return;
          }
        }
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
      this.judgeIndex();
      this.currentData = this.validateTableData(this.value) ? this.value : [];
    }
  };
</script>

