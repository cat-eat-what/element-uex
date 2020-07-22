## Cascader

Cascader

### 基本用法


::: demo Cascader
```html
<elx-form
  ref="form-cascader"
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
            label: '及联',
            name: 'cascader',
            type: 'cascader',
            isShow: true,
            defaultValue: [],
            changeOnSelect: false,
            showAllLevels: false,
            options: [
              {label: '江苏', cities: []},
              {label: '浙江', cities: []}
            ],
            props: {
              value: 'label',
              children: 'cities'
            },
            activeItemChange: function(val, form, field) {
              setTimeout(function() {
                if (val.indexOf('江苏') > -1 && !field.options[0].cities.length) {
                  field.options[0].cities = [{
                    label: '南京'
                  }];
                } else if (val.indexOf('浙江') > -1 && !field.options[1].cities.length) {
                  field.options[1].cities = [{
                    label: '杭州'
                  }];
                }
              }, 300);
            },
            change: function(self) {
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

### config>fields>cascader field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['inputNumber'] | -- |
| options | 可选项数据源，键名可通过 `props` 属性配置 | Array | -- | -- |
| props | 配置选项，具体见下表 | Object | -- | -- |
| placeholder | 输入框占位文本 | String | -- | 请选择 |
| clearable | 是否支持清空选项 | Boolean | -- | false |
| show-all-levels | 输入框中是否显示选中值的完整路径 | Boolean | -- | true |
| change-on-select | 是否允许选择任意一级的选项 | Boolean | -- | false |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| active-item-change | 当父级选项变化时触发的事件，仅在 `change-on-select` 为 `false` 时可用(返回参数：各父级选项组成的数组) | Function | -- | -- |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
