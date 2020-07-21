## Checkbox

Checkbox

### 基本用法


::: demo Checkbox
```html
<elx-form
  ref="form-checkbox"
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
        labelWidth: '120px',
        inline: false,
        fields: [{
          label: '是否跳过首行1',
          name: 'skipHeader1',
          type: 'checkbox',
          options: [
            {label: 'label0', value: '0'},
            {label: 'label1', value: '1'},
            {label: 'label2', value: '3'}
          ],
          isShow: true,
          defaultValue: ['0']
        }, {
          label: '是否跳过首行2',
          name: 'skipHeader2',
          type: 'checkboxButton',
          options: [
            {label: 'label0', value: '0'},
            {label: 'label1', value: '1'},
            {label: 'label2', value: '3'}
          ],
          isShow: true,
          defaultValue: ['1']
        }, {
          label: '是否跳过首行3',
          name: 'skipHeader3',
          type: 'checkboxCard',
          options: [
            {label: 'label0', value: '0'},
            {label: 'label1', value: '1'},
            {label: 'label2', value: '3'}
          ],
          isShow: true,
          defaultValue: ['0']
        }]
      }
    }
  }
}
</script>

```
:::

### config>fields>checkbox field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['checkbox', 'checkboxButton', 'checkboxCard'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| options | 枚举项(详细配置见option详细配置表 | Array | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |

###  config>fields>field>options>option 详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | checkbox标签文本 | String | -- | -- |
| value | checkbox的值 | String | -- | -- |
| isdisabled | 是否禁用 | Boolean | true,false | false |
