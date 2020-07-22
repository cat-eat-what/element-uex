<script>
  import testTreeData from '../../../examples/assets/tree.json';
  export default {
    data: function(){
      return {
        treeData: [],
        tabData: [],
        tabActiveIndex: "nothing",
        title: '测试'
      }
    },
    methods: {
    },
    created: function(){
      this.treeData = testTreeData;
    }
  }
</script>
<style>
.demoTab {
    overflow: hidden;
}
.demoTab .elx-tab-frame {
    width: 100%;
    height: 300px;
}
</style>

## tab标签页

tab标签页

### 基本用法


::: demo tab标签页
```html
<template>
  <div class="demoTab">
    <elx-tab-frame :title="title" :tree-data.sync="treeData" :tab-data.sync="tabData" :tab-active-index.sync="tabActiveIndex"></elx-tab-frame>
  </div>
</template>
```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
