
## cron

cron

### 基本用法

::: demo cron
```html
<style>
  .cron-demo {
    width: 200px;
  }
</style>
<div class="cron-demo">
  <elx-cron
    v-model="cronValue"
    :run-time-url="runTimeUrl"
    :cycle="cycle"
    :visible-types="visibleTypes"
    @change="change">
  </elx-cron>
</div>
<script>
  export default {
    data: function() {
      return {
        cronValue: null,
        //cronValue: '7,33 1/2 ? 1W * ? 2003-2004',
        //cronValue: '7,3-3'
        //cronValue: '* * * * * ?  '
        runTimeUrl: '/calc/runTime',
        cycle: 'daily',
        visibleTypes: ['monthly','daily','hourly','minutely'],
      }
    },
    methods: {
      change: function(val) {
        console.log(val);
      }
    },
    created: function() {
      console.log(this.runTimeUrl);
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 数据绑定值 | String | — | '* * * * * ?' |
| run-time-url | 获取最近五次运行时间url(返回数据格式{state: 'success', date: ['2018-01-05 11:11:11', 'xxx']}) | String | — | - |
| disabled | 是否禁用 | Boolean | — | false |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值变化时触发的事件 | val |
