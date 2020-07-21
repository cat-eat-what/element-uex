## Card-form

Card-form

### 基本用法


::: demo Card-form
```html
<elx-form
  ref="form-card"
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
            label: 'cardForm',
            type: 'cardForm',
            name: 'cardForm',
            config: {
              labelWidth: '60px',
              fields: [
                {
                  name: 'type',
                  label: '类型',
                  type: 'select',
                  options: [
                    {label: 'string', value: 'string'},
                    {label: 'long', value: 'long'},
                    {label: 'boolean', value: 'boolean'},
                    {label: 'double', value: 'double'},
                    {label: 'date', value: 'date'}
                  ],
                  isShow: true,
                  defaultValue: 'string'
                },
                {
                  name: 'format',
                  label: '格式',
                  type: 'inputText',
                  isShow: true,
                  defaultValue: ''
                }
              ],
              rules: {
                type: [
                  { required: true, message: '请输入类型'}
                ],
                format: [
                  { required: true, message: '请输入格式'}
                ]
              }
            }
          }
        ]
      }
    }
  }
}
</script>

```
:::

### config>fields>transfer field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['cron'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
| config | 配置表单元素，详情见card-form文档 | - | - | - |
