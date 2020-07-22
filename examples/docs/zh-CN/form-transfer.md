## Transfer

Transfer

### 基本用法


::: demo Transfer
```html
<elx-form
  ref="form-transfer"
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
        fields: [{
          label: 'field',
          name: 'field',
          type: 'inputTransfer',
          isShow: true,
          defaultValue: 'javascript,javascript1',
          getRequestUrl: function() {
            return '/api/data';
          },
          getOptionsUrl: function() {
            return '/api/option';
          },
          transferProps: {
            key: 'stepInst',
            search: 'stepInstLabel'
          },
          optionProps: {
            value: 'stepInst',
            label: 'stepInstLabel'
          },
          column: {
            stepInst: '指令',
            stepInstLabel: '指令名称'
          }
        },
        {
          label: 'field1',
          name: 'field1',
          type: 'remoteTransfer',
          isShow: true,
          defaultValue: [],
          getUrl: function() {
            return '/api/data';
          },
          transferProps: {
            key: 'stepInst',
            search: 'stepInstLabel'
          },
          column: {
            stepInst: '指令',
            stepInstLabel: '指令名称'
          }
        }]
      }
    }
  },
  created: function() {
    window.testVm = this;
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
| type | 表单类型 | String | ['inputTransfer', 'remoteTransfer'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |

### config>fields>inputTransfer field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| split | 分隔字符 | String | -- | ',' |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| editDisabled | 输入框是否禁用 | Boolean | true,false | false |
| getOptionsUrl | 右栏数据请求地址的回调方法（可不配置） | Function |  |  |
| getRequestUrl | 左栏数据请求地址的回调方法（可不配置） | Function |  |  |
| transferProps | 左栏配置选项，具体看下表 | object | — | — |
| optionProps | 右栏配置选项，具体看下表 | object | — | — |
| column | 所需展示的表格字段以及表头中文名对象（举例：{stepInst: '指令',stepInstLabel: '指令名称'}） | Object |  | {} |

### config>fields>remoteTransfer field 特色配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| url | [左栏]数据请求地址(该地址需支持传参，具体看下表，返回数据格式，具体看下表) | String |  | ' |
| getUrl | [左栏]数据请求地址的回调方法（可不配置） | Function |  |  |
| transferProps | 配置选项，具体看下表 | object | — | — |
| column | 所需展示的表格字段以及表头中文名对象（举例：{stepInst: '指令',stepInstLabel: '指令名称'}） | Object |  | {} |


### param([左栏]请求参数支持筛选分页)
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| xxx | 搜索框对应字段 | String | ---- | ---- |
| pageNum | 请求的页数 | Number | ---- | ---- |
| pageSize | 一页中含数据条数 | Number | ---- | ---- |

### data([左栏]请求地址返回数据格式)
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| content | 列表数据 | Array | ---- | ---- |
| totalElements | 总数据条数 | Number | ---- | ---- |

### props
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| key | 每条数据的唯一值字段 | String | ---- | ---- |
| search | 搜索框对应的字段 | String | ---- | ---- |


