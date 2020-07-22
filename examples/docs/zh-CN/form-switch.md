## Switch

Switch

### 基本用法


::: demo Switch
```html
<elx-form
  ref="form-switch"
  v-model="testData"
  :label-suffix="':'"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<script>
export default {
  data: function() {
    return {
      testData: {},
      config: {
        labelWidth: '90px',
        inline: false,
        fields: [
          {
            label: '开关',
            name: 'lock',
            type: 'switch',
            switchWidth: 90,
            onText: '开启配置',
            offText: '关闭配置',
            onValue: '1',
            offValue: '0',
            onColor: '#13ce66',
            offColor: 'black',
            defaultValue: false,
            isDisabled: false
          }
        ],
        rules: {}
      }
    }
  },
  watch: {
    testData: function(val) {
      console.log(val);
    },
    'testData.num': function(val) {
      console.log(val);
    }
  },
  created: function() {
    window.mkmk = this;
  }
}
</script>

```
:::

### config>fields>switch field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['switch'] | -- |
| onText | switch 打开时的文字 | String | -- | 'ON' |
| offText | switch 关闭时的文字 | String | -- | 'OFF' |
| onValue | switch 打开时的值 | [Boolean, String, Number] | -- | true |
| offValue | switch 关闭时的值 | [Boolean, String, Number] | -- | false |
| onColor | switch 打开时的背景色 | String | -- | '#20A0FF' |
| offColor | switch 关闭时的背景色  | String | -- | '#C0CCDA' |
| switchWidth| switch 的宽度  | Number | -- | 58 |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |


