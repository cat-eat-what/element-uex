<template>
  <div class="elx-operate-param">
    <el-button type="success" class="main-control" @click.native="add" v-if="isAdd">
      <i class="el-icon-plus"></i></span>{{t('el.opetateParam.addPara')}}
    </el-button>
    <div v-for="(data,index) in currentData" >
      <label>{{t('el.opetateParam.paraName')}} :&nbsp</label>
      <el-input :placeholder="t('el.opetateParam.paraNamePlaceholder')" v-model="data.paramId" :disabled="paramIdDisable"></el-input>
      <label>&nbsp&nbsp{{t('el.opetateParam.paraValue')}} :&nbsp</label>
      <el-input :placeholder="t('el.opetateParam.paraValuePlaceholder')" v-model="data.paramValue"></el-input>
      <el-button type="danger" @click.native="remove(index)" v-if="isRemove">
        <i class="el-icon-minus"></i></span>{{t('el.opetateParam.deletePara')}}
      </el-button>  
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
    data: function() {
      return {
        currentData: this.value
      };
    },
    methods: {
      add: function() {
        var obj = {paramId: '', paramValue: ''};
        this.currentData.push(obj);
      },
      remove: function(index) {
        this.currentData.splice(index, 1);
      }
    },
    watch: {
      currentData: {
        deep: true,
        handler: function(val, oldVal) {
          this.$emit('input', val);
          this.$emit('change', val);
        }
      },
      value: {
        deep: true,
        handler: function(val, oldVal) {
          this.currentData = val;
        }
      }
    }
  };
</script>

