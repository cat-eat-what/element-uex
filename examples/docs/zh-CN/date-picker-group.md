## 日期组合

日期组合。

### 基本用法


::: demo 日期组合
```html
<elx-date-picker-group
  v-model="testData"
  @change="changeData">
</elx-date-picker-group>
<script>
  export default {
    data: function() {
      return {
        testData: new Date()
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
| value | 数据绑定值 | [String, Array, Object, Date] | — | {} |
| active-date | 当前日期类型 | String | 'date', 'month', 'year', 'daterange'| date |
| separate | 分隔符 | String | - | '' |
| operate-type | 显示按钮组类型 | Array | - | ['year', 'month', 'date', 'daterange'] |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值发生变化时触发 | 当前值 |
