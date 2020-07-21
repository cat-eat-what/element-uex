## 远程穿梭框

远程穿梭框

### 基本用法

::: demo 远程穿梭框
```html
<div class="remote-transfer-demo">
  <elx-remote-transfer
    v-show="dialogVisible"
    ref="remoteTransfer"
    :get-request-url="getRequestUrl"
    :transfer-value.sync="tabs"
    :props="transferProps"
    :page-size="200"
    :column="column"
    :process-data="processData">
   </elx-remote-transfer>
</div>
<script>
  export default {
    data: function() {
      return {
        dialogVisible: true,
        tabs: [
          {
            'stepInst': 'javascript',
            'stepInstLabel': '脚本',
            'stepType': 'dp'
          }
        ],
        transferProps: {
          key: 'stepInst',
          search: 'stepInst'
        },
        column: {
          stepInst: '指令',
          stepInstLabel: '指令名称'
        }
      }
    },
    watch: {
      tabs: function(val, oldVal) {
      }
    },
    methods: {
      getRequestUrl: function() {
        // return '/api/data';
        return 'http://10.5.8.25:3000/mock/41/_api/code/proc/stepDefine/search';
      },
      processData:function(data) {
        return data.data;
      },
    }
  }
</script>
```
:::

### 基本用法二

::: demo 远程穿梭框
```html
<div class="remote-transfer-demo">
  <elx-remote-transfer
    :request-url="url"
    :transfer-value.sync="tabs"
    :props="transferProps"
    :page-size="50"
    :column="column">
   </elx-remote-transfer>
</div>
<script>
  export default {
    data: function() {
      return {
        url: '/api/data',
        tabs: [
          {
            'stepInst': 'javascript',
            'stepInstLabel': '脚本',
            'stepType': 'dp'
          }
        ],
        transferProps: {
          key: 'stepInst',
          search: 'stepInst'
        },
        column: {
          stepInst: '指令',
          stepInstLabel: '指令名称'
        }
      }
    },
    watch: {
      tabs: function(val, oldVal) {
      }
    },
    methods: {
    }
  }
</script>
```
:::


### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| request-url | [左栏]数据请求地址(该地址需支持传参，具体看下表，返回数据格式，具体看下表) | String |  | ' |
| get-request-url | [左栏]数据请求地址的回调方法（可不配置） | Function |  |  |
| transfer-value | 远程穿梭框的value | Array |  | [] |
| props | 配置选项，具体看下表 | object | — | — |
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


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值变化时触发的事件 | 选中的列表数组 |
