## Cron

Cron

### 基本用法


::: demo Cron
```html
<elx-form
  ref="form-cron"
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
            label: 'cron',
            name: 'cron',
            type: 'cron',
            runTimeUrl: '/calc/runTime',
            placeholder: 'xxxx',
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

### config>fields>cron field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段 | String | -- | -- |
| type | 表单类型 | String | ['cron'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| placeholder | 输入框占位文本 | String | -- | -- |
| run-time-url | 获取最近五次运行时间url(返回数据格式{state: 'success', date: ['2018-01-05 11:11:11', 'xxx']}) | String | — | - |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
