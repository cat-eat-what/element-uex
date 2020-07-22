<style>
  .demo-box.demo-progress {
    .el-progress--line {
      margin-bottom: 15px;
      width: 350px;
    }
    .el-progress--circle {
      margin-right: 15px;
    }
  }
</style>

## Progress 进度条

用于展示操作进度，告知用户当前状态和预期。

### 环形进度条

:::demo Progress 组件可通过 `type` 属性来指定使用环形进度条，在环形进度条中，还可以通过 `width` 属性来设置其大小。

```html
<elx-progress type="circle" :percentage="0"></elx-progress>
<elx-progress type="circle" :stroke="'red'" :percentage="25"></elx-progress>
<elx-progress type="circle" :percentage="100" status="success"></elx-progress>
<elx-progress type="circle" :percentage="50" status="exception"></elx-progress>
```
:::

### Attributes
| 参数          | 说明            | 类型            | 可选值                 | 默认值   |
|-------------  |---------------- |---------------- |---------------------- |-------- |
| **percentage** | **百分比（必填）**   | number          |     0-100          |     0    |
| type          | 进度条类型           | string         | line/circle | line |
| stroke-width  | 进度条的宽度，单位 px | number          | — | 6 |
| text-inside  | 进度条显示文字内置在进度条内（只在 type=line 时可用） | Boolean | — | false |
| status  | 进度条当前状态 | string | success/exception | — |
| width  | 环形进度条画布宽度（只在 type=circle 时可用） | number |  | 126 |
| show-text  | 是否显示进度条文字内容 | boolean | — | true |
