<script>
  export default {
  	data: function(){
  		return {
        testForm: {
          test: 'dw'
        },
  			testData: null,
        testFormRules: {
          test: [{required: true, message: '请选择数据源类目', trigger: 'change'}],
        },
  			options: [{label:"dw", value: "dw"}, {label:"bgbg", value: "bgbg"}, {label:"btbg", value: "btbg"}]
  		}
  	},
  	methods: {
  	},
  	watch: {
  		testData: function(val, oldVal){
  			console.log(val);
  		}
  	},
    created: function() {
      window.radioVm = this;
    }
  }
</script>

## 单选

单选

### 基本用法


::: demo 单选
```html
<template>
  <div>
    <el-form :model="testForm" ref="testForm"  :rules="testFormRules">
      <el-form-item prop="test">
        <elx-radio-group v-model="testForm.test">
          <elx-radio disabled label="a">a</elx-radio>
          <elx-radio :key="option.value" v-for="option in options" :label="option.value">{{option.label}}</elx-radio>
        </elx-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data: function(){
      return {
        testData: null,
        options: [{label:"dw", value: "dw"}, {label:"bgbg", value: "bgbg"}, {label:"btbg", value: "btbg"}]
      }
    },
    methods: {
    },
    watch: {
      testData: function(val, oldVal){
        console.log(val);
      }
    }
  }
</script>

```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | Radio 的 value   | string,number,boolean    |       —        |      —   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

