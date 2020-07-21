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
  <!--<template slot-scope="scope" slot="operate">
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
          {icon: 'uex-icon-resource-allocation', name: 'a', label: null, isEdit: false, isDelete: false},
          {icon: 'uex-icon-resource-allocation', name: 'o', label: '小天鹅TG100V62ADS5'},
          {icon: 'uex-icon-resource-allocation', name: 'e', label: '美的MD100V11D'},
          {icon: 'uex-icon-resource-allocation', name: 'u', label: '西门子WM12P2692W'},
          {icon: 'uex-icon-resource-allocation', name: 'b', label: '海尔XQG100-14HBD70U'},
          {icon: 'uex-icon-resource-allocation', name: 'g', label: '西门子WM12P2602W'},
          {icon: 'uex-icon-resource-allocation', name: 'h', label: '松下XQG80-NHEBL'},
          {icon: 'uex-icon-resource-allocation', name: 'm', label: '小天鹅（LittleSwan）10公斤变频 滚筒洗衣机全自动 TG100V62ADS5 纳米银离子高温除菌幻夜黑全面屏'},
          {icon: 'uex-icon-resource-allocation', name: 'm1', label: '松下(Panasonic)滚筒洗衣机全自动8公斤 稀土永磁BLDC变频电机 羽绒羊毛洗 XQG80-NHEBL'},
          {icon: 'uex-icon-resource-allocation', name: 'm2', label: '海尔洗衣机滚筒全自动洗烘一体机10公斤大容量 变频节能 蒸汽除菌空气洗全自动滚筒洗衣机 【新品上市】10公斤 蒸汽除菌 洗烘一体'},
          {icon: 'uex-icon-resource-allocation', name: 'm3', label: '海尔EG10012HB519G'},
          {icon: 'uex-icon-resource-allocation', name: 'm4', label: '海尔EG10012HB529G'},
          {icon: 'uex-icon-resource-allocation', name: 'm5', label: '海尔EG10012HB539G'},
          {icon: 'uex-icon-resource-allocation', name: 'm6', label: '小天鹅TG100V62ADS6'},
          {icon: 'uex-icon-resource-allocation', name: 'm7', label: '西门子WM12P2693W'},
          {icon: 'uex-icon-resource-allocation', name: 'm8', label: '松下XQG81-NHEBL'},
          {icon: 'uex-icon-resource-allocation', name: 'm9', label: '美的MD100V11D'},
          {icon: 'uex-icon-resource-allocation', name: 'm8', label: '小天鹅TG100V62ADS7'},
          {icon: 'uex-icon-resource-allocation', name: 'm9', label: '松下XQG82-NHEBL'},
          {icon: 'uex-icon-resource-allocation', name: 'm10', label: '西门子WM12P2612W'}
        ],
        props: {
          name: 'name',
          cnName: 'label'
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
