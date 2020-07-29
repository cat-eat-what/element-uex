## 多选

多选

### 基本用法


::: demo 多选
```html
<div>
  <el-form
    ref="ruleForm"
    v-model="ruleForm"
    class="demo-ruleForm"
    label-width="100px"
    :rules="rules">
    <el-form-item
      label="活动性质"
      prop="type">
      <elx-checkbox-group v-model="ruleForm.type">
        <elx-checkbox
          disabled
          label="a">
          a
        </elx-checkbox>
        <elx-checkbox
          :key="option.value"
          v-for="option in options"
          :label="option.value">
          {{option.label}}
        </elx-checkbox>
      </elx-checkbox-group>
    </el-form-item>
    <el-form-item
      label="活动性质"
      prop="type">
      <elx-checkbox-group
        v-model="ruleForm.type"
        size="medium">
        <elx-checkbox
          disabled
          label="a">
          a
        </elx-checkbox>
        <elx-checkbox
          :key="option.value"
          v-for="option in options"
          :label="option.value">
          {{option.label}}
        </elx-checkbox>
      </elx-checkbox-group>
    </el-form-item>
    <el-form-item
      label="活动性质"
      prop="type">
      <elx-checkbox-group
        v-model="ruleForm.type"
        size="small">
        <elx-checkbox
          disabled
          label="a">
          a
        </elx-checkbox>
        <elx-checkbox
          :key="option.value"
          v-for="option in options"
          :label="option.value">
          {{option.label}}
        </elx-checkbox>
      </elx-checkbox-group>
    </el-form-item>
    <el-form-item
      label="活动性质"
      prop="type">
      <elx-checkbox-group
        v-model="ruleForm.type"
        size="mini">
        <elx-checkbox
          disabled
          label="a">
          a
        </elx-checkbox>
        <elx-checkbox
          :key="option.value"
          v-for="option in options"
          :label="option.value">
          {{option.label}}
        </elx-checkbox>
      </elx-checkbox-group>
    </el-form-item>
  </el-form>
</div>
<script>
  export default {
    data: function() {
      return {
        ruleForm: {
          type: ['a', 'dw', 'bgbg'],
        },
        rules: {
          type: [
            {
              type: 'array',
              required: true,
              message: '请至少选择一个活动性质',
              trigger: 'change'
            }
          ]
        },
        options: [
          { label: 'dwndghnmk', value: 'dw' },
          { label: 'bgbgngh', value: 'bgbg' },
          { label: 'btbghyhy', value: 'btbg' }
        ]
      };
    },
    methods: {
      submitForm: function(formName) {
        this.$refs[formName].validate(function(valid) {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm: function(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

```
:::

### Checkbox Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label | 选中状态的值 | string,number,boolean | — | — |
| disabled | 是否禁用 | Boolean | — | false |

### Checkbox-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 数据绑定值 | Array | — | — |

### Checkbox-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值变化时触发的事件 | - |

