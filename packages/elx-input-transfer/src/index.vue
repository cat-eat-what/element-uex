<template>
  <div class="elx-input-transfer">
    <el-input
      v-model="selected"
      :disabled="disabled || editDisabled">
      <el-button
        slot="append"
        @click="getTransfer"
        :disabled="disabled">
        <span class="uex-icon-enlarge"></span>
      </el-button>
    </el-input>
    <el-dialog
      title="选择数据"
      custom-class="elx-input-transfer"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible">
      <elx-remote-transfer
        v-if="dialogVisible"
        :get-request-url="getRequestUrl"
        :transfer-value.sync="currentTransferValue"
        :props="props"
        :column="column">
      </elx-remote-transfer>
      <div slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveTransfer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'Axios';
  import emitter from 'element-uex/src/mixins/emitter';
  import Migrating from 'element-uex/src/mixins/migrating';

  export default {
    name: 'ElxInputTransfer',
    componentName: 'ElxInputTransfer',
    mixins: [emitter, Migrating],

    props: {
      value: String,
      split: {
        type: String,
        default: ','
      },
      requestUrl: {
        type: String,
        default: ''
      },
      optionsUrl: {
        type: String,
        default: ''
      },
      getRequestUrl: Function,
      getOptionsUrl: Function,
      props: {
        type: Object,
        default: function() {
          return {
            key: 'key',
            search: 'search'
          };
        }
      },
      optionProps: {
        type: Object,
        default: function() {
          return {
            label: 'label',
            value: 'value'
          };
        }
      },
      column: {
        type: Object,
        default: function() {
          return {};
        }
      },
      disabled: Boolean,
      editDisabled: Boolean
    },
    data: function() {
      return {
        selected: null,
        dialogVisible: false,
        transferValue: [],
        currentTransferValue: []
      };
    },
    methods: {
      getOptions: function() {
        var self = this;
        var url;
        if (typeof this.getOptionsUrl() === 'string' && this.getOptionsUrl() !== '') {
          url = this.getOptionsUrl();
        } else {
          url = this.optionsUrl;
        }
        axios.get(url).then(function(response) {
          var data = response.data;
          if (data) {
            self.transferValue = data;
            if (!Array.isArray(data)) {
              self.transferValue = [];
            }
            self.setSelectedByValue();
          }
        });
      },
      getTransfer: function() {
        this.currentTransferValue = this.transferValue;
        this.dialogVisible = true;
      },
      saveTransfer: function() {
        this.transferValue = this.currentTransferValue;
        this.setValueByTransfer();
        this.dialogVisible = false;
      },
      judgeReq: function() {
        var judge = true;
        var valArr = this.value.split(this.split);
        var transferObj = {};
        var i;
        var j;
        for (i in this.transferValue) {
          transferObj[this.transferValue[i][this.optionProps.value]] = this.transferValue[i];
        }
        for (j in valArr) {
          if (!(valArr[j] in transferObj)) {
            judge = false;
          }
        }
        return judge;
      },
      setSelectedByValue: function() {
        var valArr = this.value.split(this.split);
        var selectedArr = [];
        var transferObj = {};
        var i;
        var j;
        for (i in this.transferValue) {
          transferObj[this.transferValue[i][this.optionProps.value]] = this.transferValue[i];
        }
        for (j in valArr) {
          if (transferObj[valArr[j]]) {
            selectedArr.push(transferObj[valArr[j]][this.optionProps.label]);
          }
        }
        this.selected = selectedArr.join(',');
      },
      setValueByTransfer: function() {
        var strArr = [];
        for (var i in this.transferValue) {
          strArr.push(this.transferValue[i][this.optionProps.value]);
        }
        this.$emit('input', strArr.join(','));
      },
      formaterValue: function() {
        if (this.judgeReq()) {
          this.setSelectedByValue();
        } else {
          this.getOptions();
        }
      }
    },
    watch: {
      value: function(val) {
        if (typeof this.value === 'string') {
          this.formaterValue();
          this.$emit('change', val);
          this.dispatch('ElFormItem', 'el.form.change', val);
        }
      }
    },
    created: function() {
      if (typeof this.value === 'string') {
        this.formaterValue();
      }
    }
  };
</script>

