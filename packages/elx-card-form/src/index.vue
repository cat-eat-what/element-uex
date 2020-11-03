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
      return {
        currentData: [],
        defaultRow: {},
        options: ['operateParam', 'multipleSelect', 'checkbox', 'checkboxButton', 'tableForm', 'cardForm']
      };
    },
    methods: {
      addData() {
        this.currentData.push(Object.assign({}, this.defaultRow));
      },
      removeData(index) {
        this.currentData.splice(index, 1);
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
        let valid = true;
        let itemValid = true;
        for (let i in this.currentData) {
          const ref = 'elxForm' + i;
          if (this.$refs[ref].length > 0) {
            itemValid = this.$refs[ref][0].validate();
            valid = valid && itemValid;
          }
        }
        return valid;
      },
      setDefaultValue(obj, field) {
        if (this.options.indexOf(field.type) > -1) {
          obj[field.name] = field.defaultValue ? field.defaultValue : [];
        } else if (field.type === 'switch') {
          obj[field.name] = typeof field.defaultValue === 'boolean' ? field.defaultValue : (field.defaultValue ? field.defaultValue : null);
        } else {
          obj[field.name] = field.defaultValue ? field.defaultValue : null;
        }
        return obj;
      },
      getDefaultRow() {
        let obj = {};
        for (let i in this.config.fields) {
          if (!(this.config.fields[i].name in obj) && 'name' in this.config.fields[i]) {
            obj = this.setDefaultValue(obj, this.config.fields[i]);
          }
        }
        this.defaultRow = obj;
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
    created() {
      this.getDefaultRow();
      this.currentData = this.validateTableData(this.value) ? this.value : [];
    }
  };
</script>

