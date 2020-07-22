## Radio

Radio

### 基本用法


::: demo Radio
```html
<elx-form
  ref="form-radio"
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
        fields: [
          {
            label: '请求类型',
            name: 'callType',
            type:'radio',
            options: ["GET","POST"],
            isShow: "true",
            defaultValue: 'GET'
          },
          {
            label: '请求格式',
            name: 'paramType',
            type: 'radio',
            options: [
              {label: 'JSON',value: 'json', remark: 'vfvff'},
              {label: 'FORM',value: 'form'}
            ],
            defaultValue: 'json',
            isShow: 'true',
            isRemark: true
          },
          {
            label: '是否跳过首行',
            name: 'skipHeader',
            type: 'radioCard',
            options: [
              {label: '是', value: '1', remark: '帮助信息XXXX'},
              {label: '否', value: '0'}
            ],
            isShow: true,
            isRemark: true,
            defaultValue: '0'
          },
          {
            label: 'xxx',
            name: 'skipHeader1',
            type: 'radioButton',
            options: [
              {label: '是', value: '1', isdisabled: true},
              {label: '否', value: '0', remark: '帮助信息XXXX'}
            ],
            isShow: true,
            isRemark: true,
            defaultValue: '0'
          },
        ]
      }
    }
  }
}
</script>

```
:::

### config>fields>radio field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['radio', 'radioButton', 'radioCard'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| options | 枚举项(详细配置见option详细配置表 | Array | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |

###  config>fields>radio field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

###  config>fields>radioButton field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

###  config>fields>radioCard field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

###  config>fields>field>options>option 详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | radio标签文本 | String | -- | -- |
| value | radio的值 | String | -- | -- |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| remark | 帮助信息 | String | -- | -- |

