## 可操作元素列表

可操作元素列表。

### 基本用法


::: demo 可操作元素列表
```html
<elx-item-list
  ref="elxItemList1"
  :data = 'testData'
  :content-menu-show="false"
  :item-class="getItemClass"
  :draggable="true"
  :props = "props"
  :multiselect="true"
  @click="handleClick"
  @right-click="rightClick"
  @dblclick="dblclickItem"
  @delete="deleteItem"
  @cut="cutItem"
  @edit="editItem"
  @paste="pasteItem"
  @copy="copyItem"
  @drop-start="dropStart"
  >
  <!--<template scope="scope" slot="operate">
    <ul>
      <li @click.stop.prevent="analysisItem(scope.data)">
        <span class="uex-icon-field-blood-analyse"></span>
        <span>影响分析</span>
      </li>
    </ul>
  </template>-->
</elx-item-list>
<script>
  export default {
    data: function() {
      return {
        testData: [
          {name: 'a', procnname: null, isEdit: false, isDelete: false},
          {name: 'o', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'e', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'u', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'b', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'g', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'h', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm1', procnname: 'TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_'},
          {name: 'm2', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm3', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm4', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm5', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm6', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm7', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm8', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm9', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm8', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm9', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name: 'm10', procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序'}
        ],
        props: {
          name: 'name',
          cnName: 'procnname'
        }
      }
    },
    methods: {
      editItem: function(data) {
        console.log(data);
      },
      deleteItem: function(data) {
        console.log(data);
      },
      copyItem: function(data) {
        console.log(data);
      },
      cutItem: function(data) {
        console.log(data);
      },
      pasteItem: function(data) {
        console.log(data);
      },
      dblclickItem: function(data) {
        console.log(data);
      },
      rightClick: function(data) {
        console.log(data);
        /*data.isCut = false;
        data.isDelete = false;
        data.isEdit = false;
        data.isCopy = false;*/
      },
      handleClick: function(data, selected) {
        console.log(data);
        console.log(selected);
      },
      dropStart: function(data) {
        var indexArr = [];
        for (var i in data) {
          indexArr.push(this.testData.indexOf(data[i]));
        }
        console.log(data, indexArr);
      },
      getItemClass: function(item) {
        return item.name;
      }
    },
    watch: {
      testData: function(val, oldVal) {
        console.log(val);
      }
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        _self.$refs['elxItemList1'].selectItems([_self.testData[0],_self.testData[2]])
      })
    },
    created: function() {
    }
  }
</script>

```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| icon | 图标 | String | — | - |
| data | 展示数据 | Array | - | - |
| draggable | 是否可拖拽 | Boolean | — | false |
| props | 配置选项具体看下表 | Object | - | - |
| multiselect | 是否可多选 | Boolean | — | false |
| item-class | className 的回调方法 | Function | — | - |
| operate | 通过 slot#operate 传入 DOM，配置自定义操作 | - | - | - |

### props
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 数据英文名属性名 | String | - | 'name' |
| cnName | 数据中文名属性名 | String | - | 'cnName' |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| drop-start | 开始拖拽触发的事件 | 传递当前对象 |
| right-click | 右键事件 | 传递当前对象 |
| dblclick | 双击事件 | 传递当前对象 |
| click | 单击事件 | 传递当前对象 |
| edit | 编辑事件 | 传递当前对象 |
| delete | 删除事件 | 传递当前对象 |
| copy | 复制事件 | 传递当前对象 |
| cut | 剪切事件 | 传递当前对象 |
| paste | 粘贴事件 | 传递之前复制过或剪切过的对象 |
