## 单选

单选

### 基本用法


::: demo 单选
```html
<div>
  <el-form :model="testForm" ref="testForm"  :rules="testFormRules">
    <el-form-item prop="test">
      <elx-radio-group v-model="testForm.test">
        <elx-radio
          disabled
          label="a">
          a
        </elx-radio>
        <elx-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value">
          {{option.label}}
        </elx-radio>
      </elx-radio-group>
    </el-form-item>
    <el-form-item prop="test">
      <elx-radio-group v-model="testForm.test" size="medium">
        <elx-radio
          disabled
          label="a">
          a
        </elx-radio>
        <elx-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value">
          {{option.label}}
        </elx-radio>
      </elx-radio-group>
    </el-form-item>
    <el-form-item prop="test">
      <elx-radio-group v-model="testForm.test" size="small">
        <elx-radio
          disabled
          label="a">
          a
        </elx-radio>
        <elx-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value">
          {{option.label}}
        </elx-radio>
      </elx-radio-group>
    </el-form-item>
    <el-form-item prop="test">
      <elx-radio-group v-model="testForm.test" size="mini">
        <elx-radio
          disabled
          label="a">
          a
        </elx-radio>
        <elx-radio
          v-for="option in options"
          :key="option.value"
          :label="option.value">
          {{option.label}}
        </elx-radio>
      </elx-radio-group>
    </el-form-item>
  </el-form>
</div>
<script>
  export default {
    data: function() {
      return {
        testForm: {
          test: 'dw'
        },
        testData: null,
        testFormRules: {
          test: [
            {required: true, message: '请选择数据源类目', trigger: 'change'}
          ],
        },
        options: [
          {label: 'dw1', value: 'dw'},
          {label: 'bgbg1', value: 'bgbg'},
          {label: 'btb1g', value: 'btbg'}
        ]
      }
    },
    methods: {
    },
    watch: {
      testData: function(val, oldVal) {
        console.log(val);
      }
    },
    created: function() {
      window.radioVm = this;
    }
  }
</script>

```
:::

### Radio Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| label | 选中状态的值 | string,number,boolean | — | — |
| disabled | 是否禁用 | Boolean | — | false |

### Radio-group Attributes
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 数据绑定值 | - | — | — |

### Radio-group Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值变化时触发的事件 | - |

