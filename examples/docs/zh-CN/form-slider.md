## Slider

Slider

### 基本用法


::: demo Slider
```html
<elx-form
  ref="form-slider"
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
            label: '超时时间(秒)',
            name: 'httpTimeout',
            type: 'slider',
            isShow: true,
            change: function(form, field, val) {
              console.log(form, field, val)
            }
          }
        ]
      }
    }
  },
  watch: {
    testData: function(val) {
      console.log(val);
    }
  },
  created: function() {
  }
}
</script>

```
:::

### config>fields>slider field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['slider'] | -- |
| min | 设置计数器允许的最小值 | number | -- | 0 |
| max | 设置计数器允许的最大值 | number | -- | Infinity |
| step | 步长 | number | -- | 1 |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |


