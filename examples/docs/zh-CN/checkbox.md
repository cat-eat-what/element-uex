<script>
  export default {
  	data() {
      return {
        ruleForm: {
          type: ['a', 'dw', 'bgbg'],
        },
        rules: {
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ]
        },
        options: [{label:"dw", value: "dw"}, {label:"bgbg", value: "bgbg"}, {label:"btbg", value: "btbg"}]
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

## 多选

多选

### 基本用法


::: demo 多选
```html
<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="活动性质" prop="type">
        <elx-checkbox-group v-model="ruleForm.type">
          <elx-checkbox disabled label="a">a</elx-checkbox>
          <elx-checkbox :key="option.value" v-for="option in options" :label="option.value">{{option.label}}</elx-checkbox>
        </elx-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
  }
</script>

```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label     | checkbox 的 value   | string,number,boolean    |       —        |      —   |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change  | 绑定值变化时触发的事件 |  选中的 Radio label 值  |

