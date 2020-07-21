## 页面加载

页面加载，防止闪烁

### 基本用法


::: demo 页面加载
```html
<div class="main-demo">
  <el-button @click="test">test</el-button>
  <elx-main
    :fullscreen-loading.sync="loading"
    :control-by-parent="false">
     <div id="content"></div>
  </elx-main>
</div>
<script>
  export default {
    data: function() {
      return {
        loading: true
      }
    },
    methods: {
      test: function() {
        this.loading = !this.loading;
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| controlByParent | 由父组件控制loading | Boolean | - | false |
| fullscreen-loading | 是否加载 | Boolean | - | true |
| split-type | 切分方式 | 'string' | (row：行；col:列) | 'row' |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
