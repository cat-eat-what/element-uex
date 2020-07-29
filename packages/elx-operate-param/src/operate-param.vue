<template>
  <div class="elx-operate-param">
    <div class="operate-param-content">
      <div class="operate">
        <el-button
          v-if="isAdd"
          class="add-button"
          @click.native="add">
          <i class="uex-icon-add"></i>
        </el-button>
      </div>
      <div v-for="(data,index) in currentData" >
        <label>{{t('el.opetateParam.paraName')}} :&nbsp;</label>
        <el-input
          v-model="data.paramId"
          :placeholder="t('el.opetateParam.paraNamePlaceholder')"
          :disabled="paramIdDisable">
        </el-input>
        <label>&nbsp;&nbsp;{{t('el.opetateParam.paraValue')}} :&nbsp;</label>
        <el-input
          v-model="data.paramValue"
          :placeholder="t('el.opetateParam.paraValuePlaceholder')">
        </el-input>
        <el-button
          v-if="isRemove"
          class="delete-button"
          @click.native="remove(index)">
          <i class="uex-icon-lessen"></i>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Locale from 'element-uex/src/mixins/locale';
  export default {
    name: 'ElxOperateParam',
    componentName: 'ElxOperateParam',
    mixins: [Locale],

    props: {
      value: {
        type: Array,
        default: []
      },
      isAdd: {
        type: Boolean,
        default: true
      },
      isRemove: {
        type: Boolean,
        default: true
      },
      paramIdDisable: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        currentData: this.value
      };
    },
    methods: {
      add() {
        const obj = {paramId: '', paramValue: ''};
        this.currentData.push(obj);
      },
      remove(index) {
        this.currentData.splice(index, 1);
      }
    },
    watch: {
      currentData: {
        deep: true,
        handler(val, oldVal) {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      },
      value: {
        deep: true,
        handler(val, oldVal) {
          this.currentData = val;
        }
      }
    }
  };
</script>
