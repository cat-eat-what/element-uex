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
  <div
    slot="cardOperate"
    class="operate-group">
    <el-tooltip
      class="item"
      effect="light"
      content="编辑"
      placement="top">
        <span class="key">
          <i class="uex-icon-edit"></i>
        </span>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="查看"
      placement="top">
        <span>
          <i class="uex-icon-view"></i>
        </span>
    </el-tooltip>
    <el-tooltip
      class="item"
      effect="light"
      content="删除"
      placement="top">
        <span>
          <a target="_blank">
            <i class="uex-icon-delete"></i>
          </a>
        </span>
    </el-tooltip>
  </div>
  <template
    slot="cardState"
    slot-scope="props">
      <span
        class="circle-icon"
        v-html="props.state">
      </span>
  </template>
</elx-card-list>
<script>
  export default {
    data: function() {
      return {
        formateTaskData: [
          {
            cardTitle: '小天鹅TG100V62ADS5',
            cardDesc: '10公斤变频 滚筒洗衣机全自动 纳米银离子高温除菌幻夜黑全面屏',
            cardState: 'xxx',
            cardId: '7243108',
            cardCreator: {label:'选购指数: ',value:'8.1'}  ,
            baseData: [
              {label: '商品毛重 : ', value: '70.1kg'},
              {label: '商品产地 : ', value: '中国大陆'},
              {label: '能效等级 :', value: '一级能效'},
              {label: '排水类型 : ', value: '上排水'},
              {label: '产品类型 : ', value: '滚筒'},
              {label: '电机类型 :', value: '变频（节能）'}
            ]
          },
          {
            cardTitle: '小天鹅TG100V62ADS6',
            cardDesc: '10公斤变频 滚筒洗衣机全自动 纳米银离子高温除菌幻夜黑全面屏',
            cardState: 'xxx',
            cardId: '7243109',
            cardCreator: {label:'选购指数: ',value:'8.1'}  ,
            baseData: [
              {label: '商品毛重 : ', value: '70.1kg'},
              {label: '商品产地 : ', value: '中国大陆'},
              {label: '能效等级 :', value: '一级能效'},
              {label: '排水类型 : ', value: '上排水'},
              {label: '产品类型 : ', value: '滚筒'},
              {label: '电机类型 :', value: '变频（节能）'}
            ]
          },
          {
            cardTitle: '小天鹅TG100V62ADS7',
            cardDesc: '10公斤变频 滚筒洗衣机全自动 纳米银离子高温除菌幻夜黑全面屏',
            cardState: 'xxx',
            cardId: '7243107',
            cardCreator: {label:'选购指数: ',value:'8.1'}  ,
            baseData: [
              {label: '商品毛重 : ', value: '70.1kg'},
              {label: '商品产地 : ', value: '中国大陆'},
              {label: '能效等级 :', value: '一级能效'},
              {label: '排水类型 : ', value: '上排水'},
              {label: '产品类型 : ', value: '滚筒'},
              {label: '电机类型 :', value: '变频（节能）'}
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
