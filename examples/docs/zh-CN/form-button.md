## Button

Button

### 基本用法


::: demo Button
```html
<elx-form
  ref="form-button"
  v-model="testData"
  :label-suffix="':'"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<script>
export default {
  data: function(){
    return {
      testData: {},
      config: {
        labelWidth: '90px',
        inline: false,
        fields: [
          {
            type: 'button',
            labelWidth: '0px',
            text: '测试',
            click: function(self) {
              console.log(self);
            },
            isdisabled: false,
            isShow: true
          }
        ]
      }
    }
  }
}
</script>

```
:::

### config>fields>input field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| type | 表单类型 | String | 'button' | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| text | 按钮文本 | - | - | - |
| click | 当单击按钮时调用的方法（返回参数：form组件对象） | - | - | - |

