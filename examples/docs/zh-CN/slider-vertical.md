## Slider 滑块

通过拖动滑块在一个固定区间内进行选择

### 基础用法

在拖动滑块时，显示当前值


### 离散值

选项可以是离散的

:::demo 改变`step`的值可以改变步长，通过设置`show-step`属性可以显示间断点
```html
<style>
  .elx-slider-demo{
    height: 400px;
  }
</style>
<div class="block">
  <span class="demonstration">显示间断点</span>
  <div class="elx-slider-demo">
    <elx-slider-vertical
      v-model="value7"
      :step="10"
      show-stops>
    </elx-slider-vertical>
  </div>
</div>
<script>
  export default {
    data: function() {
      return {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 0,
        value8: 0,
        value9: [4, 8]
      };
    },
    methods: {
      formatTooltip: function(val) {
        return val / 100;
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| min | 最小值 | number | — | 0 |
| max | 最大值 | number | — | 100 |
| disabled | 是否禁用 | boolean | — | false |
| step | 步长 | number | — | 1 |
| show-input | 是否显示输入框，仅在非范围选择时有效 | boolean | — | false |
| show-input-controls | 在显示输入框的情况下，是否显示输入框的控制按钮 | boolean | — | true|
| show-stops | 是否显示间断点 | boolean | — | false |
| show-tooltip | 是否显示 tooltip | boolean | — | true |
| format-tooltip | 格式化 tooltip message | Function(value) | — | — |
| range | 是否为范围选择 | boolean | — | false |

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| change | 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发） | 改变后的值 |
