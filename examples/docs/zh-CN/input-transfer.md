## 远程穿梭框

远程穿梭框

### 基本用法


::: demo 远程穿梭框
```html
<div class="main-demo">
  <elx-input-transfer
    v-model="value"
    :get-options-url="getOptionsUrl"
    :get-request-url="getRequestUrl"
    :props="transferProps"
    :disabled="disabled"
    :option-props="optionProps"
    :column="column">
   </elx-input-transfer>
   <el-button @click="test">改变url</el-button>
</div>
<script>
  export default {
    data: function() {
      return {
        value: 'javascript,javascript1',
        disabled: false,
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
      }
    },
    watch: {
    },
    methods: {
      test: function() {
        this.getRequestUrl = function() {
          return '/api/data';
        };
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | input-transfer的值 | String | -- | -- |
| split | 分隔字符 | String | -- | ',' |
| request-url | 左栏数据请求地址(该地址需支持传参，具体看下表，返回数据格式，具体看下表) |  |  |  |
| options-url | 右栏数据请求地址 |  |  |  |
| get-request-url | 左栏数据请求地址的回调方法（可不配置） | Function |  |  |
| get-options-url | 右栏数据请求地址的回调方法（可不配置） | Function |  |  |
| props | 左栏配置选项，具体看下表 | object | — | — |
| option-props | 右栏配置选项，具体看下表 | object | — | — |
| column | 所需展示的表格字段以及表头中文名对象（举例：{stepInst: '指令',stepInstLabel: '指令名称'}） | Object |  | {} |
| disabled | 是否禁用 | Boolean | true,false | false |
| edit-disabled | 输入框是否禁用 | Boolean | true,false | false |

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


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值变化时触发的事件 | 选中的列表数组 |
