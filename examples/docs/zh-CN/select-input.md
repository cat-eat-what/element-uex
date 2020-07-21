## 选择输入框

选择输入框

### 基本用法


::: demo 选择输入框
```html
<style>
.demo-select-input .elx-select-input {
  width: 200px;
}
</style>
<div class="demo-select-input">
  <elx-select-input
    v-model="value"
    :options="options"
    :remote-method="conf.remoteMethod">
  </elx-select-input>
</div>
<script>
  export default {
    data: function() {
      return {
        conf: {
        },
        value: 'test',
        options: [
          {label: 'a', value: 'a'},
          {label: 'b', value: 'b'},
          {label: 'c', value: 'c'}
        ]
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
| value | 数据绑定值 | - | — | - |
| disabled | 是否禁用 | boolean | — | false |
| loading | 是否正在从远程获取数据 | boolean | — | false |
| clearable | 单选时是否可以清空选项 | boolean | — | false |
| root | 所需传递的组件 | Object | — | - |
| is-post-root | 是否传递组件 | Boolean | — | false |
| filterable | 是否可搜索 | boolean | — | false |
| multiple | 是否多选 | boolean | — | false |
| remote | 是否为远程搜索 | boolean | — | false |
| placeholder | 占位符 | string | — | 请选择 |
| filter-method | 自定义过滤方法 | function | — | — |
| remote-method | 远程搜索方法 | function | — | — |
| options | 下拉框可选项 | Array | - | - |
| render-content | 下拉框选项的内容区的渲染 Function | Function(h, option) | — | - |
| type | 展现形式（下拉框或者输入框） | select／input | — | 'select' |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |