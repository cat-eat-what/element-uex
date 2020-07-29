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
        default() {
          return [];
        }
      },
      config: {
        type: Object,
        default: {}
      }
    },
    data() {
      const options = ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm'];
      let currentData = this.validateTableData(this.value) ? this.value : [];
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
      judgeStr(fieldIndex, field) {
        const type = field.type;
        const isStr = (type === 'string');
        if (this.config.editType === 'single') {
          return isStr || (!isStr && type !== 'index' && (fieldIndex !== this.activeRowIndex || field.name !== this.activeColumnKey));
        } else {
          return isStr || false;
        }
      },
      judgeField(fieldIndex, field) {
        const type = field.type;
        const judgeType = (type !== 'string' && type !== 'index');
        if (this.config.editType === 'single') {
          return judgeType && (fieldIndex === this.activeRowIndex && field.name === this.activeColumnKey);
        } else {
          return judgeType && true;
        }
      },
      getCellText(row, rowIndex, fieldIndex, field) {
        const config = this.pageConfigs[fieldIndex];
        let enumObj = {};
        const val = row[field.name];
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
      getVisible(fieldIndex, field) {
        const type = field.type;
        const isStr = (type === 'string');
        if (this.config.editType === 'single') {
          return isStr || (!isStr && type !== 'index' && fieldIndex !== this.activeRowIndex);
        } else {
          return isStr || false;
        }
      },
      getRules(fieldIndex) {
        const pageConfig = this.pageConfigs[fieldIndex];
        if (pageConfig) {
          return pageConfig.rules;
        } else {
          return this.config.rules;
        }
      },
      getFormConfig(rowIndex, fieldIndex, field) {
        const pageConfig = this.pageConfigs[fieldIndex];
        return {
          fields: pageConfig ? [pageConfig.fields[rowIndex]] : [field],
          rules: pageConfig ? pageConfig.rules : this.config.rules
        };
      },
      handleCurrentChange(val) {
        const self = this;
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
      rowClick(row, event, column) {
        const index = this.pageData.indexOf(row);
        this.activeRowIndex = index;
      },
      cellClick(row, column, cell, event) {
        const index = this.pageData.indexOf(row);
        const activeColumnKey = this.activeColumnKey;
        const activeRowIndex = this.activeRowIndex;
        this.activeColumnKey = column.columnKey;
        this.activeRowIndex = index;
        this.$nextTick(function() {
          const cellRef = 'elxCell' + activeColumnKey + activeRowIndex;
          if (Array.isArray(this.$refs[cellRef])) {
            if (this.$refs[cellRef].length > 0) {
              this.$refs[cellRef][0].validate();
            }
          }
        });
      },
      defaultRowKey(row) {
        return this.currentData.indexOf(row);
      },
      expandRow(row, expanded) {
        if (this.validateRowKey()) {
          const key = this.config.rowKey(row);
          const index = this.expandRowKeys.indexOf(key);
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
      isOper(row) {
        if (this.config.unabledDeleteRowKeys && this.validateRowKey()) {
          const unabledDeleteRowKeys = this.config.unabledDeleteRowKeys;
          const rowKey = this.config.rowKey(row);
          return unabledDeleteRowKeys.indexOf(rowKey) < 0;
        }
        return true;
      },
      validateRowKey() {
        return this.config.rowKey && typeof this.config.rowKey === 'function';
      },
      getRowByRowKey(rowKey) {
        const self = this;
        return this.currentData.filter(function(item) {
          return self.config.rowKey(item) === rowKey;
        });
      },
      addData() {
        let lastIndex = this.currentData.length;
        if (this.config.lastRowKey && this.validateRowKey()) {
          const lastRow = this.getRowByRowKey(this.config.lastRowKey);
          if (lastRow.length === 1) {
            lastIndex = this.currentData.indexOf(lastRow[0]);
          }
        }
        this.currentData.splice(lastIndex, 0, Object.assign({}, this.defaultRow));
        const pageNum = window.parseInt(this.currentData.length / this.pageSize) + 1;
        if (pageNum !== this.filter.pageNum) {
          this.filter.pageNum = pageNum;
        }
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
      },
      removeData(index) {
        const removeIdx = (this.filter.pageNum - 1) * this.pageSize + index;
        const row = this.currentData[removeIdx];
        this.currentData.splice(removeIdx, 1);
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
        this.$emit('remove', row);
      },
      removeAllData() {
        this.currentData.splice(0, this.currentData.length);
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
        this.$emit('remove-all');
      },
      validateTableData(data) {
        let judge = true;
        for (let i in data) {
          if (typeof data[i] !== 'object') {
            judge = false;
          }
        }
        return judge;
      },
      validate() {
        let _valid = true;
        let _itemValid = true;
        for (let i in this.config.fields) {
          for (let j in this.currentData) {
            const _ref = 'elxForm' + this.config.fields[i].name + j;
            if (this.config.fields[i].type !== 'string' && this.config.fields[i].type !== 'index') {
              let isForm = false;
              if (Array.isArray(this.$refs[_ref])) {
                if (this.$refs[_ref].length > 0) {
                  _itemValid = this.$refs[_ref][0].validate();
                  _valid = _valid && _itemValid;
                  isForm = true;
                }
              }
              if (!isForm) {
                const cellRef = 'elxCell' + this.config.fields[i].name + j;
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
      setDefaultValue(obj, field, options) {
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
      getDefaultRow(options) {
        let _obj = {};
        for (let i in this.config.fields) {
          if (!(this.config.fields[i].name in _obj) && 'name' in this.config.fields[i]) {
            _obj = this.setDefaultValue(_obj, this.config.fields[i], options);
          }
        }
        this.defaultRow = _obj;
      },
      setFormData(formData, index) {
        this.pageData[index] = Object.assign(this.pageData[index], formData);
        this.formatData();
        this.$emit('input', this.currentData);
        this.$emit('change', this.currentData, this);
        this.dispatch('ElFormItem', 'el.form.change', this.currentData);
      },
      formatData() {
        if (this.hasIndex) {
          this.setIndex();
        }
      },
      setIndex() {
        for (let i in this.currentData) {
          this.currentData[i][this.indexProp] = Number(i) + 1;
        }
      },
      judgeIndex() {
        for (let i in this.config.fields) {
          if (this.config.fields[i].type === 'index') {
            this.hasIndex = true;
            this.indexProp = this.config.fields[i].name;
            return;
          }
        }
      },
      setConfigByIndex(currentIndex, currentData) {
        const self = this;
        let enumObj = {};
        let config;
        const enumTypes = ['select', 'radio', 'radioButton', 'radioCard', 'checkbox', 'multipleSelect', 'switch'];
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
      setConfigs(currentData, callback) {
        const self = this;
        const configs = [];
        let config;
        if (!this.filter) {
          return;
        }
        if (Array.isArray(currentData)) {
          const currentIndex = (this.filter.pageNum - 1) * this.pageSize + this.activeRowIndex;
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
      formatCurrentData(data) {
        const self = this;
        const currentData = data.map(function(item) {
          return Object.assign({}, self.defaultRow, item);
        });
        return currentData;
      },
      getPage() {
        const self = this;
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
          const self = this;
          const currentData = this.validateTableData(val) ? self.formatCurrentData(val) : [];
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
          const self = this;
          this.$nextTick(function() {
            if (val.length > 0) {
              const oldPageData = self.currentData.slice((self.filter.pageNum - 1) * self.pageSize, self.filter.pageNum * self.pageSize);
              if (JSON.stringify(oldPageData) !== JSON.stringify(val)) {
                let beforeData = [];
                let afterData = [];
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
      activeColumnKey(val, oldVal) {
        if (!oldVal) {
          this.oldActiveColumnKey = val;
        } else {
          this.oldActiveColumnKey = oldVal;
        }
      }
    },
    created() {
      const self = this;
      this.getDefaultRow();
      this.judgeIndex();
      const currentData = this.validateTableData(this.value) ? this.value : [];
      this.setConfigs(currentData, function() {
        self.currentData = self.formatCurrentData(currentData);
        if (self.config.afterRender) {
          self.config.afterRender(self);
        }
      });
    }
  };
</script>
