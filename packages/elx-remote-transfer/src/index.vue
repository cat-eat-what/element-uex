<template>
  <div class="elx-remote-transfer">
    <div class="elx-remote-transfer-left">
      <el-input
        v-model="transferLeftFilter.search"
        placeholder="请输入搜索内容"
        icon="search"
        :on-icon-click="transferLeftSearch"
        @keyup.enter.native="transferLeftSearch">
      </el-input>
      <el-table
        ref="leftMultipleTable"
        stripe
        height="100%"
        style="width: 100%"
        :data="transferLeftData"
        @selection-change="handleLeftSelectionChange">
        <el-table-column
          type="selection"
          width="55"
          :selectable="leftSelectable"
          >
        </el-table-column>
        <el-table-column
          v-for="(label, $index) in column"
          show-overflow-tooltip
          :prop="$index"
          :label="label">
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          small
          class="transfer-footer"
          layout="total, prev, pager, next"
          :current-page="transferLeftFilter.pageNum"
          :page-size="transferLeftFilter.pageSize"
          :total="transferLeftFilter.total"
          @size-change="handleLeftSizeChange"
          @current-change="handleLeftCurrentChange">
        </el-pagination>
      </div>
    </div>
    <div class="elx-remote-transfer-operate">
      <div class="button-group">
        <el-button @click.native="transferLeft" :disabled="transferRightSelected.length == 0">
          <span class="uex-icon-arrow-left"></span>
        </el-button>
        <el-button @click.native="transferRight"  :disabled="transferLeftSelected.length == 0">
          <span class="uex-icon-arrow-right"></span>
        </el-button>
      </div>
    </div>
    <div class="elx-remote-transfer-right">
      <el-input
        v-model="transferRightFilter.search"
        placeholder="请输入搜索内容"
        icon="search"
        :on-icon-click="transferRightSearch"
        @keyup.enter.native="transferRightSearch">
      </el-input>
      <el-table
        ref="rightMultipleTable"
        stripe
        height="100%"
        style="width: 100%"
        :data="transferRightData"
        @selection-change="handleRightSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          v-for="(label, $index) in column"
          show-overflow-tooltip
          :prop="$index"
          :label="label">
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          small
          class="transfer-footer"
          layout="total, prev, pager, next"
          :current-page="transferRightFilter.pageNum"
          :page-size="transferRightFilter.pageSize"
          :total="transferRightFilter.total"
          @size-change="handleRightSizeChange"
          @current-change="handleRightCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'Axios';

  export default {
    name: 'ElxRemoteTransfer',
    componentName: 'ElxRemoteTransfer',

    props: {
      requestUrl: {
        type: String,
        default: ''
      },
      getRequestUrl: {
        type: Function,
        default: function() {
          return '';
        }
      },
      transferValue: {
        type: Array,
        default: []
      },
      props: {
        type: Object,
        default: function() {
          return {
            key: 'key',
            search: 'search'
          };
        }
      },
      column: {
        type: Object,
        default: function() {
          return {};
        }
      }
    },
    data: function() {
      return {
        transferLeftData: [],
        transferRightData: [],
        currentTransferValue: this.transferValue,
        transferLeftSelected: [],
        transferRightSelected: [],
        transferLeftFilter: {
          search: '',
          pageNum: 1,
          pageSize: 50,
          total: 0
        },
        transferRightFilter: {
          search: '',
          pageNum: 1,
          pageSize: 50,
          total: 0
        },
        leftPageChange: false,
        rightPageChange: false
      };
    },
    methods: {
      testKeycode: function() {
        console.log('test-Keycode');
      },
      testEnter: function() {
        console.log('test-enter');
      },
      getTransferLeftData: function() {
        var self = this;
        var url;
        var filterData = Object.assign({}, self.transferLeftFilter);
        if (self.props.search) {
          if (Array.isArray(self.props.search)) {
            self.props.search.map(function(field) {
              filterData[field] = self.transferLeftFilter.search;
            });
          } else {
            filterData[self.props.search] = self.transferLeftFilter.search;
          }
        }
        filterData.pageNum = self.transferLeftFilter.pageNum - 1;
        if (typeof this.getRequestUrl() === 'string' && this.getRequestUrl() !== '') {
          url = this.getRequestUrl();
        } else {
          url = this.requestUrl;
        }
        axios.get(url, {
          params: filterData
        }).then(function(response) {
          var data = response.data;
          if (data) {
            self.transferLeftData = data.content;
            self.transferLeftFilter.total = data.totalElements;
            self.initMutltiData(self.transferLeftData, self.transferLeftSelected, 'leftMultipleTable', 'left');
            self.leftPageChange = false;
          }
        });
      },
      getTransferRightData: function() {
        var self = this;
        var filterData = this.currentTransferValue.filter(function(item) {
          if (Array.isArray(self.props.search)) {
            var judge = false;
            self.props.search.map(function(field) {
              judge = judge || (String(item[field]).toLowerCase().indexOf(String(self.transferRightFilter.search).toLowerCase()) > -1);
            });
            return judge;
          } else {
            return String(item[self.props.search]).toLowerCase().indexOf(String(self.transferRightFilter.search).toLowerCase()) > -1;
          }
        });
        var arr = filterData.slice((this.transferRightFilter.pageNum - 1) * this.transferRightFilter.pageSize, this.transferRightFilter.pageNum * this.transferRightFilter.pageSize);
        this.transferRightData = arr;
        this.transferRightFilter.total = filterData.length;
        this.initMutltiData(this.transferRightData, this.transferRightSelected, 'rightMultipleTable', 'right');
        this.rightPageChange = false;
      },
      initMutltiData: function(tableData, selectedData, tableRef, type) {
        var self = this;
        var i;
        var filterData = tableData.filter(function(item) {
          if (type === 'left') {
            for (i in self.currentTransferValue) {
              if (self.currentTransferValue[i][self.props.key] === item[self.props.key]) {
                return false;
              }
            }
          }
          for (i in selectedData) {
            if (selectedData[i][self.props.key] === item[self.props.key]) {
              return true;
            }
          }
          return false;
        });
        this.$nextTick(function() {
          for (i in filterData) {
            this.$refs[tableRef].toggleRowSelection(filterData[i]);
          }
        });
      },
      getFilterData: function(tableData, selectedData) {
        var self = this;
        var i;
        var filterData = selectedData.filter(function(item) {
          for (i in tableData) {
            if (tableData[i][self.props.key] === item[self.props.key]) {
              return false;
            }
          }
          return true;
        });
        return filterData;
      },
      getExceptFilterData: function(tableData, selectedData) {
        var self = this;
        var i;
        var filterData = selectedData.filter(function(item) {
          for (i in tableData) {
            if (tableData[i][self.props.key] === item[self.props.key]) {
              return true;
            }
          }
          return false;
        });
        return filterData;
      },
      handleLeftSizeChange: function(val) {
        this.transferLeftFilter.pageSize = val;
        this.leftPageChange = true;
        this.getTransferLeftData();
      },
      handleLeftCurrentChange: function(val) {
        this.transferLeftFilter.pageNum = val;
        this.leftPageChange = true;
        this.getTransferLeftData();
      },
      handleRightSizeChange: function(val) {
        this.transferRightFilter.pageSize = val;
        this.rightPageChange = true;
        this.getTransferRightData();
      },
      handleRightCurrentChange: function(val) {
        this.transferRightFilter.pageNum = val;
        this.rightPageChange = true;
        this.getTransferRightData();
      },
      handleLeftSelectionChange: function(val) {
        if (!this.leftPageChange) {
          var filterData = this.getFilterData(this.transferLeftData, this.transferLeftSelected);
          this.transferLeftSelected = filterData.concat(val);
        }
      },
      handleRightSelectionChange: function(val) {
        if (!this.rightPageChange) {
          var filterData = this.getFilterData(this.transferRightData, this.transferRightSelected);
          this.transferRightSelected = filterData.concat(val);
        }
      },
      transferLeft: function() {
        var self = this;
        var i;
        var filterData = self.currentTransferValue.filter(function(item) {
          for (i in self.transferRightSelected) {
            if (self.transferRightSelected[i][self.props.key] === item[self.props.key]) {
              return false;
            }
          }
          return true;
        });
        this.currentTransferValue = filterData;
        this.$refs['rightMultipleTable'].clearSelection();
        this.transferLeftSelected = [];
        this.getTransferRightData();
      },
      transferRight: function() {
        var self = this;
        this.currentTransferValue = this.currentTransferValue.concat(this.transferLeftSelected);
        this.getTransferRightData();
        this.$refs['leftMultipleTable'].clearSelection();
        this.transferRightSelected = [];
        this.$nextTick(function() {
          self.transferLeftSelected = [];
        });
      },
      leftSelectable: function(row, index) {
        var i;
        for (i in this.currentTransferValue) {
          if (row[this.props.key] === this.currentTransferValue[i][this.props.key]) {
            return false;
          }
        }
        return true;
      },
      transferLeftSearch: function() {
        this.getTransferLeftData();
      },
      transferRightSearch: function() {
        this.getTransferRightData();
      }
    },
    watch: {
      'transferValue': function() {
        if (JSON.stringify(this.currentTransferValue) !== JSON.stringify(this.transferValue)) {
          this.currentTransferValue = this.transferValue;
          this.getTransferLeftData();
          this.getTransferRightData();
        }
      },
      'currentTransferValue': function() {
        this.$emit('update:transferValue', this.currentTransferValue);
        this.$emit('change', this.currentTransferValue);
      }
    },
    created: function() {
      this.getTransferLeftData();
      this.getTransferRightData();
    }
  };
</script>

