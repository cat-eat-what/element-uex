<template>
  <div class="elx-table-form">
    <div
      class="operate-button"
      v-if="config.unabledDeleteRowKeys != 'all'">
      <el-tooltip
        class="item"
        effect="dark"
        content="添加"
        placement="top">
        <span
          class="uex-icon-plus"
          @click="addData">
        </span>
      </el-tooltip>
      <el-tooltip
        class="item"
        effect="dark"
        content="删除所有"
        placement="top">
        <span
          class="uex-icon-clear"
          @click="removeAllData">
        </span>
      </el-tooltip>
    </div>
    <elx-table
      ref="elxTable"
      highlight-current-row
      stripe
      border
      style="width: 100%"
      :height="config.height"
      :max-height="config.maxHeight || 280"
      :data="pageData"
      :expand-row-keys="expandRowKeys"
      :row-key="config.rowKey||defaultRowKey"
      :first-row-key="config.firstRowKey"
      :last-row-key="config.lastRowKey"
      v-loading.body="tableLoading"
      @expand="expandRow"
      @row-click="rowClick"
      @cell-click="cellClick">
      <elx-table-column
        v-if="config.isExpand"
        type="expand"
        width="50px">
        <template slot-scope="scope">
          <elx-form
            v-if="typeof config.rowKey == 'function' ? expandRowKeys.indexOf(config.rowKey(scope.row)) > -1 : true"
            v-model="scope.row"
            :label-width="pageConfigs[scope.$index].expandConf.labelWidth"
            :label-suffix="': '"
            :ref="'elxFormExpand'+scope.$index"
            :class="'elxFormExpand'+scope.$index"
            :index="scope.$index"
            :config="pageConfigs[scope.$index].expandConf"
            @input="setFormData">
          </elx-form>
        </template>
      </elx-table-column>
      <elx-table-column
        v-for="(item, index) in config.fields"
        v-if="'isShow' in item ? item.isShow : true"
        show-overflow-tooltip
        :column-key="item.name"
        :class-name="(config.editType == 'single' ? 'edit-single ' : 'edit-all ') + (item.type != 'string' && item.type != 'index' ? 'form' : 'string')"
        :label="item.columnLabel"
        :width="item.width"
        :key="item.name"
        :type="item.type == 'index' && item.isDraggable ? 'index' : undefined">
        <template slot-scope="scope">
          <template v-if="item.type == 'index'">
            <span :class="item.isDraggable ? 'elx-table-cell-drag' : ''">
              <span v-text="scope.$index+1"></span>
            </span>
          </template>
          <template v-if="judgeStr(scope.$index, item)">
            <cell
              :ref="'elxCell' + item.name + scope.$index"
              :cell-text="getCellText(scope.row, index, scope.$index, item)"
              :field="item.name"
              :field-show="'isShow' in item ? item.isShow : true"
              :cell-data="scope.row"
              :rules="getRules(scope.$index)"
              :fieldIndex="scope.$index"
              :activeRowIndex="activeRowIndex"
              :activeColumnKey="activeColumnKey"
              :editType="config.editType"
              :type="item.type">
            </cell>
            </cell>
          </template>
          <template v-if="judgeField(scope.$index, item)">
            <elx-form
              v-model="scope.row"
              :ref="'elxForm' + item.name+scope.$index"
              :class="'elxForm' + item.name+scope.$index"
              :index="scope.$index"
              :label-width="'0px'"
              :config="getFormConfig(index, scope.$index, item)"
              @input="setFormData">
            </elx-form>
          </template>
        </template>
      </elx-table-column>
      <elx-table-column
        v-if="config.unabledDeleteRowKeys != 'all'"
        label="操作"
        width="50px">
        <template slot-scope="scope">
          <el-tooltip
            v-if="isOper(scope.row)"
            class="item"
            effect="dark"
            content="删除"
            placement="top">
            <span
              class="uex-icon-minus"
              @click="removeData(scope.$index)">
            </span>
          </el-tooltip>
          <span></span>
        </template>
      </elx-table-column>
    </elx-table>
    <div class="pagination-container" v-show="filter.total > pageSize">
      <el-pagination
        :page-size="pageSize"
        :current-page="filter.pageNum"
        :total="filter.total"
        layout="total, prev, pager, next, jumper"
        @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import Emitter from 'element-uex/src/mixins/emitter';
  import { jsonToString, stringToJson } from 'element-uex/src/utils/json-format';
  import Cell from './cell';
  export default {
    name: 'ElxTableForm',
    componentName: 'ElxTableForm',
    mixins: [Emitter],
    components: {
      Cell
    },

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
      var options = ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm'];
      var currentData = this.validateTableData(this.value) ? this.value : [];
      this.setConfigs(currentData);
      this.getDefaultRow(options);
      currentData = this.formatCurrentData(currentData);
      return {
        currentData: currentData,
        pageSize: this.config.pageSize || 20,
        pageData: [],
        pageConfigs: [],
        defaultRow: {},
        hasIndex: false,
        indexProp: null,
        options: options,
        configs: [],
        expandRowKeys: [],
        activeRowIndex: -1,
        activeColumnKey: null,
        oldActiveColumnKey: null,
        tableLoading: false,
        filter: {
          pageNum: 1,
          total: 0
        }
      };
    },
    methods: {
      judgeStr: function(fieldIndex, field) {
        var type = field.type;
        var isStr = (type === 'string');
        if (this.config.editType === 'single') {
          return isStr || (!isStr && type !== 'index' && (fieldIndex !== this.activeRowIndex || field.name !== this.activeColumnKey));
        } else {
          return isStr || false;
        }
      },
      judgeField: function(fieldIndex, field) {
        var type = field.type;
        var judgeType = (type !== 'string' && type !== 'index');
        if (this.config.editType === 'single') {
          return judgeType && (fieldIndex === this.activeRowIndex && field.name === this.activeColumnKey);
        } else {
          return judgeType && true;
        }
      },
      getCellText: function(row, rowIndex, fieldIndex, field) {
        var config = this.pageConfigs[fieldIndex];
        var enumObj = {};
        var val = row[field.name];
        if (config) {
          enumObj = config.fields[rowIndex].enumObj;
          if (enumObj) {
            return enumObj[val];
          } else {
            return val;
          }
        } else {
          enumObj = field.enumObj;
          if (enumObj) {
            return enumObj[val];
          } else {
            return val;
          }
        }
      },
      getVisible: function(fieldIndex, field) {
        var type = field.type;
        var isStr = (type === 'string');
        if (this.config.editType === 'single') {
          return isStr || (!isStr && type !== 'index' && fieldIndex !== this.activeRowIndex);
        } else {
          return isStr || false;
        }
      },
      getRules: function(fieldIndex) {
        var pageConfig = this.pageConfigs[fieldIndex];
        if (pageConfig) {
          return pageConfig.rules;
        } else {
          return this.config.rules;
        }
      },
      getFormConfig: function(rowIndex, fieldIndex, field) {
        var pageConfig = this.pageConfigs[fieldIndex];
        return {
          fields: pageConfig ? [pageConfig.fields[rowIndex]] : [field],
          rules: pageConfig ? pageConfig.rules : this.config.rules
        };
      },
      handleCurrentChange: function(val) {
        var self = this;
        this.filter.pageNum = val;
        this.activeRowIndex = -1;
        self.pageData = [];
        self.pageConfigs = [];
        this.$nextTick(function() {
          self.pageConfigs = self.configs.slice((self.filter.pageNum - 1) * self.pageSize, self.filter.pageNum * self.pageSize);
          self.$nextTick(function() {
            self.pageData = self.currentData.slice((self.filter.pageNum - 1) * self.pageSize, self.filter.pageNum * self.pageSize);
            self.$nextTick(function() {
              this.validate();
            });
          });
        });
      },
      rowClick: function(row, event, column) {
        var index = this.pageData.indexOf(row);
        this.activeRowIndex = index;
      },
      cellClick: function(row, column, cell, event) {
        var index = this.pageData.indexOf(row);
        var activeColumnKey = this.activeColumnKey;
        var activeRowIndex = this.activeRowIndex;
        this.activeColumnKey = column.columnKey;
        this.activeRowIndex = index;
        this.$nextTick(function() {
          var cellRef = 'elxCell' + activeColumnKey + activeRowIndex;
          if (Array.isArray(this.$refs[cellRef])) {
            if (this.$refs[cellRef].length > 0) {
              this.$refs[cellRef][0].validate();
            }
          }
        });
      },
      defaultRowKey: function(row) {
        return this.currentData.indexOf(row);
      },
      expandRow: function(row, expanded) {
        if (this.validateRowKey()) {
          var key = this.config.rowKey(row);
          var index = this.expandRowKeys.indexOf(key);
          if (!expanded) {
            if (index > -1) {
              this.expandRowKeys.splice(index, 1);
            }
          } else {
            if (index < 0) {
              this.expandRowKeys.push(key);
            }
          }
        }
      },
      isOper: function(row) {
        if (this.config.unabledDeleteRowKeys && this.validateRowKey()) {
          var unabledDeleteRowKeys = this.config.unabledDeleteRowKeys;
          var rowKey = this.config.rowKey(row);
          return unabledDeleteRowKeys.indexOf(rowKey) < 0;
        }
        return true;
      },
      validateRowKey: function() {
        return this.config.rowKey && typeof this.config.rowKey === 'function';
      },
      getRowByRowKey: function(rowKey) {
        var self = this;
        return this.currentData.filter(function(item) {
          return self.config.rowKey(item) === rowKey;
        });
      },
      addData: function() {
        var lastIndex = this.currentData.length;
        if (this.config.lastRowKey && this.validateRowKey()) {
          var lastRow = this.getRowByRowKey(this.config.lastRowKey);
          if (lastRow.length === 1) {
            lastIndex = this.currentData.indexOf(lastRow[0]);
          }
        }
        this.currentData.splice(lastIndex, 0, Object.assign({}, this.defaultRow));
        var pageNum = window.parseInt(this.currentData.length / this.pageSize) + 1;
        if (pageNum !== this.filter.pageNum) {
          this.filter.pageNum = pageNum;
        }
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
      },
      removeData: function(index) {
        var removeIdx = (this.filter.pageNum - 1) * this.pageSize + index;
        var row = this.currentData[removeIdx];
        this.currentData.splice(removeIdx, 1);
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
        this.$emit('remove', row);
      },
      removeAllData: function() {
        this.currentData.splice(0, this.currentData.length);
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
        this.$emit('remove-all');
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
            if (this.config.fields[i].type !== 'string' && this.config.fields[i].type !== 'index') {
              var isForm = false;
              if (Array.isArray(this.$refs[_ref])) {
                if (this.$refs[_ref].length > 0) {
                  _itemValid = this.$refs[_ref][0].validate();
                  _valid = _valid && _itemValid;
                  isForm = true;
                }
              }
              if (!isForm) {
                var cellRef = 'elxCell' + this.config.fields[i].name + j;
                if (Array.isArray(this.$refs[cellRef])) {
                  if (this.$refs[cellRef].length > 0) {
                    _itemValid = this.$refs[cellRef][0].validate();
                    _valid = _valid && _itemValid;
                  }
                }
              }
            }
          }
        }
        return _valid;
      },
      setDefaultValue: function(obj, field, options) {
        options = this.options || options;
        if (options.indexOf(field.type) > -1) {
          obj[field.name] = field.defaultValue ? field.defaultValue : [];
        } else if (field.type === 'switch') {
          obj[field.name] = typeof field.defaultValue === 'boolean' ? field.defaultValue : (field.defaultValue ? field.defaultValue : null);
        } else {
          obj[field.name] = field.defaultValue ? field.defaultValue : null;
        }
        return obj;
      },
      getDefaultRow: function(options) {
        var _obj = {};
        for (var i in this.config.fields) {
          if (!(this.config.fields[i].name in _obj) && 'name' in this.config.fields[i]) {
            _obj = this.setDefaultValue(_obj, this.config.fields[i], options);
          }
        }
        this.defaultRow = _obj;
      },
      setFormData: function(formData, index) {
        this.pageData[index] = Object.assign(this.pageData[index], formData);
        this.formatData();
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
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
      },
      setConfigByIndex: function(currentIndex, currentData) {
        var self = this;
        var enumObj = {};
        var config;
        var enumTypes = ['select', 'radio', 'radioButton', 'radioCard', 'checkbox', 'multipleSelect', 'switch'];
        if (currentData) {
          if (typeof self.config.relConfig === 'function') {
            config = self.config.relConfig(currentData, stringToJson(jsonToString(self.config)));
          } else {
            config = stringToJson(jsonToString(self.config));
          }
          config.fields.map(function(field) {
            if (enumTypes.indexOf(field.type) > -1) {
              enumObj = {};
              if (field.type === 'switch') {
                if ('onValue' in field) {
                  enumObj.onValue = enumObj.onText || '是';
                } else {
                  enumObj[true] = enumObj.onText || '是';
                }
                if ('offValue' in field) {
                  enumObj.onValue = enumObj.offText || '否';
                } else {
                  enumObj[false] = enumObj.offText || '否';
                }
                field.enumObj = enumObj;
              } else {
                field.options.map(function(option) {
                  enumObj[option.value] = option.label;
                  return;
                });
                field.enumObj = enumObj;
              }
              if (JSON.stringify(enumObj) === '{}') {
                delete field.enumObj;
              }
            } else {
              delete field.enumObj;
            }
          });
          return config;
        }
      },
      setConfigs: function(currentData, callback) {
        var self = this;
        var configs = [];
        var config;
        if (!this.filter) {
          return;
        }
        if (Array.isArray(currentData)) {
          var currentIndex = (this.filter.pageNum - 1) * this.pageSize + this.activeRowIndex;
          currentData.map(function(item, i) {
            if (i === currentIndex) {
              config = self.setConfigByIndex(currentIndex, item);
            } else {
              if (self.configs[i]) {
                config = self.configs[i];
              } else {
                config = self.setConfigByIndex(i, item);
              }
            }
            configs.push(config);
            return;
          });
          this.configs = configs;
          this.$nextTick(function() {
            if (typeof callback === 'function') {
              callback();
            }
          });
        }
      },
      formatCurrentData: function(data) {
        var self = this;
        var currentData = data.map(function(item) {
          return Object.assign({}, self.defaultRow, item);
        });
        return currentData;
      },
      getPage: function() {
        var self = this;
        this.filter.total = this.currentData.length;
        this.pageConfigs = this.configs.slice((this.filter.pageNum - 1) * this.pageSize, this.filter.pageNum * this.pageSize);
        this.$nextTick(function() {
          self.pageData = self.currentData.slice((self.filter.pageNum - 1) * self.pageSize, self.filter.pageNum * self.pageSize);
        });
      }
    },
    watch: {
      value: {
        deep: true,
        handler(val, oldVal) {
          var self = this;
          var currentData = this.validateTableData(val) ? self.formatCurrentData(val) : [];
          this.setConfigs(currentData, function() {
            try {
              if (JSON.stringify(self.value) !== JSON.stringify(self.currentData)) {
                self.$emit('input', currentData);
                self.$emit('change', currentData, self);
                self.dispatch('ElFormItem', 'el.form.change', currentData);
                self.currentData = currentData;
              }
            } catch (e) {
            }
          });
        }
      },
      pageData: {
        deep: true,
        handler(val, oldVal) {
          var self = this;
          this.$nextTick(function() {
            if (val.length > 0) {
              var oldPageData = self.currentData.slice((self.filter.pageNum - 1) * self.pageSize, self.filter.pageNum * self.pageSize);
              if (JSON.stringify(oldPageData) !== JSON.stringify(val)) {
                var beforeData = [];
                var afterData = [];
                if ((self.filter.pageNum - 1) * self.pageSize - 1 > 0) {
                  beforeData = self.currentData.slice(0, (self.filter.pageNum - 1) * self.pageSize - 1);
                }
                if (self.currentData.length - 1 > self.filter.pageNum * self.pageSize + 1) {
                  afterData = self.currentData.slice(self.filter.pageNum * self.pageSize + 1, self.currentData.length - 1);
                }
                self.currentData = beforeData.concat(val).concat(afterData);
                try {
                  if (JSON.stringify(self.value) !== JSON.stringify(self.currentData)) {
                    self.$emit('input', self.currentData);
                    self.$emit('change', self.currentData, self);
                    self.dispatch('ElFormItem', 'el.form.change', self.currentData);
                  }
                } catch (e) {
                }
              }
            }
          });
        }
      },
      currentData: {
        deep: true,
        handler(val, oldVal) {
          this.expandRowKeys = this.expandRowKeys.map(function(key) {
            return key;
          });
          this.getPage();
        }
      },
      activeColumnKey: function(val, oldVal) {
        if (!oldVal) {
          this.oldActiveColumnKey = val;
        } else {
          this.oldActiveColumnKey = oldVal;
        }
      }
    },
    created: function() {
      var self = this;
      this.getDefaultRow();
      this.judgeIndex();
      var currentData = this.validateTableData(this.value) ? this.value : [];
      this.setConfigs(currentData, function() {
        self.currentData = self.formatCurrentData(currentData);
        if (self.config.afterRender) {
          self.config.afterRender(self);
        }
      });
    }
  };
</script>

