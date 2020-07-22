## 卡片列表

卡片列表。

### 基本用法


::: demo 卡片列表
```html
<elx-card-list
  v-for="(data, index) in formateTaskData"
  :key="data.cardId"
  :card-title="data.cardTitle"
  :card-desc="data.cardDesc"
  :card-creator="data.cardCreator"
  :card-state="data.cardState"
  :base-data="data.baseData">
  <div slot="cardOperate" class="operate-group">
    <el-tooltip class="item" effect="light" content="编辑任务" placement="top">
        <span class="key" ><i class="uex-icon-edit"></i></span>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="查看任务" placement="top">
        <span ><i class="uex-icon-view"></i></span>
    </el-tooltip>
    <el-tooltip class="item" effect="light" content="删除任务" placement="top">
        <span><a target="_blank"><i class="uex-icon-delete"></i></a></span>
    </el-tooltip>
  </div>
  <template slot="cardState" slot-scope="props">
      <span class="circle-icon" v-html="props.state" ></span>
  </template>
</elx-card-list>
<script>
  export default {
    data: function() {
      return {
        formateTaskData: [
          {
            cardTitle: 'xxx',
            cardDesc: 'xxx',
            cardState: 'xxx',
            cardId: 'xxx',
            cardCreator: {label:'发起人: ',value:'xxx'}  ,
            baseData: [
              {label: '任务类型 : ', value: 'xxx'},
              {label: '运行主机 : ', value: 'xxx'},
              {label: '运行进程编号 :', value: 'xxx'},
              {label: '创建时间 : ', value: 'xxx'},
              {label: '开始时间 : ', value: 'xxx'},
              {label: '结束时间 :', value: 'xxx'}
            ]
          }
        ]
      }
    },
    methods: {
      changeData: function(val) {
        //console.log(val)
      }
    },
    watch: {
      testData: function(val, oldVal) {
        console.log(val);
      }
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| cardTitle | 标题 | String | －| '未知标题' |
| cardDesc | 描述 | String | － | '未知描述' |
| cardCreator | Object | Object | －| {label: '提供者', value: '未知提供者'} |
| baseData | Array | Array | － | [] |
| cardIcon | String | String | － | 'uex-icon-default' |
| cardState | 通过 slot#cardState 传入 卡片状态 | － | － | － |
| cardOperate | 通过 slot#cardOperate 传入 卡片操作 | － | － | － |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| card-dblclick | 卡片双击事件 | cardTitle |
