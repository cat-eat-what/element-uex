## Input 输入框

Input 输入框

### 基本用法


::: demo Input 输入框
```html
<elx-form
  ref="form-input"
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
            label: '文件名',
            name: 'sourceFiles',
            type: 'inputText',
            isShow: true,
            defaultValue: '',
            change: function(form, field, val) {
              console.log('change', form, field, val);
            }
          },
          {
            label: '数值',
            name: 'num',
            type: 'inputText',
            valueType: 'number',
            isShow: true
          },
          {
            label: 'key值',
            name: 'key',
            type: 'inputText',
            isShow: true,
            isdisabled: true
          },
          {
            label: 'icon-input',
            name: 'icon',
            type: 'inputIcon',
            isShow: true,
            isdisabled: false,
            icon: 'edit',
            iconClickHandler: function(form, field, val) {
              console.log('icon-click', form, field, val);
            }
          },
          {
            label: 'URL',
            name: 'requestUrl',
            type: 'inputCompound',
            isShow: true,
            compoundType: 'prepend',
            compoundContent: 'Http://',
          },
          {
            label: '描述',
            name: 'descr',
            type: 'inputTextarea',
            row: 4,
            isShow: true
          },
        ],
        rules: {}
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
### config>fields>input field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段 | String | -- | -- |
| type | 表单类型 | String | ['inputText', 'inputIcon', 'inputTextarea', 'inputCompound'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| placeholder | 输入框占位文本 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| valueType | 数据类型 | String | 'number' | -- |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |

###  config>fields>inputText field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

###  config>fields>inputIcon field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon | (el-icon-xx)图标class中的后缀xx | String | -- | -- |
| iconClickHandler | 点击图标按钮调用方法（返回参数：form组件对象、 field组件对象、 值） | Function| -- | -- |

###  config>fields>inputTextarea field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| rows | 输入框行数 | Number | -- | 2 |

###  config>fields>inputCompound field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| compoundType | 指定在input中前置或者后置内容 | String | ['prepend', 'append']] | -- |
| compoundContent | 前置或者后置文字内容 | String | -- | -- |


