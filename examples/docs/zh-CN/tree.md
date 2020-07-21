### 基本用法

::: demo
```html
<div class="main-demo">
  <elx-tree
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :expand-on-click-node="false"
    :current-node-key="currentNodeKey"
    default-expand-all
    @node-click="handleNodeClick"
    @node-dblclick="handleNodeDblClick">
    <template slot-scope="scope" slot="operate">
      <ul>
        <li @click.stop.prevent="analysisItem(scope.data)">
            <span class="uex-icon-field-blood-analyse"></span>
            <span>影响分析</span>
        </li>
      </ul>
    </template>
  </elx-tree>
</div>
<script>
  const treeData = require('examples/assets/tree.json');
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data: treeData,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: []
      };
    },
    methods: {
      handleNodeClick: function(data) {
        console.log(data);
      },
      handleNodeDblClick: function(data) {
        console.log('dblclick', data);
      },
      analysisItem: function(actionData) {
        console.log('csd');
      },
      loadNode: function(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { id: 'xxxx1', name: 'region1', label: '数据库1', icon: 'uex-icon-database'},
            { id: 'xxxx1', name: 'region2', label: '程序', icon: 'uex-icon-database'}
          ]);
        }
        if (node.level > 3) {
          return resolve([]);
        }
        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
        setTimeout(function() {
          var data;
          if (hasChild) {
            data = [
              {name: 'zone' + this.count++},
              {name: 'zone' + this.count++}
            ];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      nodeExpand: function() {

      },
      nodeCollapse: function() {

      },
      treeNodeClick: function() {

      },
      dropStart: function(data) {
        var indexArr = [];
        for (var i in data) {
          indexArr.push(this.data.indexOf(data[i]));
        }
        this.dropData = data;
        //console.log(data, indexArr);
      },
      handleDragStart: function(node, ev) {
        //console.log('drag start', node);
      },
      handleDragEnter: function(draggingNode, dropNode, ev) {
        //console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave: function(draggingNode, dropNode, ev) {
        //console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver: function(draggingNode, dropNode, ev) {
        //console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd: function(draggingNode, dropNode, dropType, ev) {
        //console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop1: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop1');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data.procnname;
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      handleDrop2: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop2');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data['de.name'];
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      allowDrop: function(draggingNode, dropNode, type) {
        return type == 'inner';
      },
      allowDrag: function(draggingNode) {
        return false;
      },
      drag: function(ev) {
        ev.dataTransfer.setData("Text", '');
      }
    },
    created: function() {
    }
  };
</script>
```
:::

### 树配置引导线

::: demo
```html
<div class="main-demo">
  <elx-tree
    class="elx-tree-1"
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :expand-on-click-node="false"
    :current-node-key="currentNodeKey"
    :line="true"
    default-expand-all
    @node-click="handleNodeClick"
    @node-dblclick="handleNodeDblClick">
    <template slot-scope="scope" slot="operate">
      <ul>
        <li @click.stop.prevent="analysisItem(scope.data)">
            <span class="uex-icon-field-blood-analyse"></span>
            <span>影响分析</span>
        </li>
      </ul>
    </template>
  </elx-tree>
</div>
<script>
  const treeData = require('examples/assets/tree.json');
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data: treeData,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: []
      };
    },
    methods: {
      handleNodeClick: function(data) {
        console.log(data);
      },
      handleNodeDblClick: function(data) {
        console.log('dblclick', data);
      },
      analysisItem: function(actionData) {
        console.log('csd');
      },
      loadNode: function(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { id: 'xxxx1', name: 'region1', label: '数据库1', icon: 'uex-icon-database'},
            { id: 'xxxx1', name: 'region2', label: '程序', icon: 'uex-icon-database'}
          ]);
        }
        if (node.level > 3) {
          return resolve([]);
        }
        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
        setTimeout(function() {
          var data;
          if (hasChild) {
            data = [
              {name: 'zone' + this.count++},
              {name: 'zone' + this.count++}
            ];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      nodeExpand: function() {

      },
      nodeCollapse: function() {

      },
      treeNodeClick: function() {

      },
      dropStart: function(data) {
        var indexArr = [];
        for (var i in data) {
          indexArr.push(this.data.indexOf(data[i]));
        }
        this.dropData = data;
        //console.log(data, indexArr);
      },
      handleDragStart: function(node, ev) {
        //console.log('drag start', node);
      },
      handleDragEnter: function(draggingNode, dropNode, ev) {
        //console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave: function(draggingNode, dropNode, ev) {
        //console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver: function(draggingNode, dropNode, ev) {
        //console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd: function(draggingNode, dropNode, dropType, ev) {
        //console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop1: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop1');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data.procnname;
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      handleDrop2: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop2');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data['de.name'];
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      allowDrop: function(draggingNode, dropNode, type) {
        return type == 'inner';
      },
      allowDrag: function(draggingNode) {
        return false;
      },
      drag: function(ev) {
        ev.dataTransfer.setData("Text", '');
      }
    },
    created: function() {
    }
  };
</script>
```
:::

### 模拟finder拖动列表元素到文件夹树

::: demo
```html
<div class="drag-tree main-demo">
  <elx-tree
    class="elx-tree-1"
    ref="elxTreeDragList"
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :expand-on-click-node="false"
    :current-node-key="currentNodeKey"
    :line="true"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :drop-by-outside="true"
    draggable
    default-expand-all
    @node-click="handleNodeClick"
    @node-dblclick="handleNodeDblClick"
    @node-drop="handleDrop1">
    <template slot-scope="scope" slot="operate">
      <ul>
        <li @click.stop.prevent="analysisItem(scope.data)">
            <span class="uex-icon-field-blood-analyse"></span>
            <span>影响分析</span>
        </li>
      </ul>
    </template>
  </elx-tree>
  <elx-item-list
    :data="data"
    :draggable="true"
    :props="props"
    :multiselect="true"
    @drop-start="dropStart">
  </elx-item-list>
</div>
<script>
  const treeData = require('examples/assets/tree.json');
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data: treeData,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        data: [
          {icon: 'uex-icon-resource-allocation', name: 'a', label: '美的MD200V11D', isEdit: false, isDelete: false},
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
      };
    },
    methods: {
      handleNodeClick: function(data) {
        console.log(data);
      },
      handleNodeDblClick: function(data) {
        console.log('dblclick', data);
      },
      analysisItem: function(actionData) {
        console.log('csd');
      },
      loadNode: function(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { id: 'xxxx1', name: 'region1', label: '数据库1', icon: 'uex-icon-database'},
            { id: 'xxxx1', name: 'region2', label: '程序', icon: 'uex-icon-database'}
          ]);
        }
        if (node.level > 3) {
          return resolve([]);
        }
        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
        setTimeout(function() {
          var data;
          if (hasChild) {
            data = [
              {name: 'zone' + this.count++},
              {name: 'zone' + this.count++}
            ];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      nodeExpand: function() {

      },
      nodeCollapse: function() {

      },
      treeNodeClick: function() {

      },
      dropStart: function(data) {
        var indexArr = [];
        for (var i in data) {
          indexArr.push(this.data.indexOf(data[i]));
        }
        this.dropData = data;
        //console.log(data, indexArr);
      },
      handleDragStart: function(node, ev) {
        //console.log('drag start', node);
      },
      handleDragEnter: function(draggingNode, dropNode, ev) {
        //console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave: function(draggingNode, dropNode, ev) {
        //console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver: function(draggingNode, dropNode, ev) {
        //console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd: function(draggingNode, dropNode, dropType, ev) {
        //console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop1: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop1');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data.procnname;
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      handleDrop2: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop2');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data['de.name'];
          self.$refs['elxTreeDragList'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      allowDrop: function(draggingNode, dropNode, type) {
        return type == 'inner';
      },
      allowDrag: function(draggingNode) {
        return false;
      },
      drag: function(ev) {
        ev.dataTransfer.setData("Text", '');
      }
    },
    created: function() {
    }
  };
</script>
```
:::

### 模拟finder拖动表格数据到文件夹树

::: demo
```html
<div class="drag-tree main-demo">
  <elx-tree
    class="elx-tree-1"
    ref="elxTreeDragTable"
    :data="data"
    :default-expanded-keys="defaultExpandedKeys"
    :expand-on-click-node="false"
    :current-node-key="currentNodeKey"
    :line="true"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    :drop-by-outside="true"
    draggable
    @node-click="handleNodeClick"
    @node-dblclick="handleNodeDblClick"
    @node-drop="handleDrop2">
    <template slot-scope="scope" slot="operate">
      <ul>
        <li @click.stop.prevent="analysisItem(scope.data)">
            <span class="uex-icon-field-blood-analyse"></span>
            <span>影响分析</span>
        </li>
      </ul>
    </template>
  </elx-tree>
  <elx-table
      style="width: 100%"
      border
      :data="tableData"
      :draggable="true"
      :sort-by-drag="false"
      @drop-start="dropStart">
      <elx-table-column type="selection" width="50"></elx-table-column>
      <elx-table-column type="index" width="50" label="序号">
        <template slot-scope="props">
          {{props.$index!=null?props.$index+1:''}}
        </template>
      </elx-table-column>
      <elx-table-column
        show-overflow-tooltip
        label="日期"
        width="180">
        <template slot-scope="props">
          <el-input v-model = "props.row.date"></el-input>
        </template>
      </elx-table-column>
      <elx-table-column
        show-overflow-tooltip
        prop="de.name"
        label="姓名"
        width="180">
      </elx-table-column>
      <elx-table-column
        show-overflow-tooltip
        prop="address"
        label="地址">
      </elx-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          xxx
        </template>
      </el-table-column>
    </elx-table>
</div>
<script>
  const treeData = require('examples/assets/tree.json');
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data: treeData,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        tableData: [
          {
            date: '2016-05-03',
            'de.name': '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
            tag: '家'
          },
          {
            date: '2016-05-02',
            'de.name': '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
            tag: '公司'
          },
          {
            date: '2016-05-04',
            'de.name': '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
            tag: '家'
          },
          {
            date: '2016-05-01',
            'de.name': '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
            tag: '公司'
          }
        ]
      };
    },
    methods: {
      handleNodeClick: function(data) {
        console.log(data);
      },
      handleNodeDblClick: function(data) {
        console.log('dblclick', data);
      },
      analysisItem: function(actionData) {
        console.log('csd');
      },
      loadNode: function(node, resolve) {
        if (node.level === 0) {
          return resolve([
            { id: 'xxxx1', name: 'region1', label: '数据库1', icon: 'uex-icon-database'},
            { id: 'xxxx1', name: 'region2', label: '程序', icon: 'uex-icon-database'}
          ]);
        }
        if (node.level > 3) {
          return resolve([]);
        }
        var hasChild;
        if (node.data.name === 'region1') {
          hasChild = true;
        } else if (node.data.name === 'region2') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
        setTimeout(function() {
          var data;
          if (hasChild) {
            data = [
              {name: 'zone' + this.count++},
              {name: 'zone' + this.count++}
            ];
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
      },
      nodeExpand: function() {

      },
      nodeCollapse: function() {

      },
      treeNodeClick: function() {

      },
      dropStart: function(data) {
        var indexArr = [];
        for (var i in data) {
          indexArr.push(this.data.indexOf(data[i]));
        }
        this.dropData = data;
        //console.log(data, indexArr);
      },
      handleDragStart: function(node, ev) {
        //console.log('drag start', node);
      },
      handleDragEnter: function(draggingNode, dropNode, ev) {
        //console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave: function(draggingNode, dropNode, ev) {
        //console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver: function(draggingNode, dropNode, ev) {
        //console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd: function(draggingNode, dropNode, dropType, ev) {
        //console.log('tree drag end: ', dropNode && dropNode.label, dropType);
      },
      handleDrop1: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop1');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data.procnname;
          self.$refs['elxTreeDragTable'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      handleDrop2: function(draggingNode, dropNode, dropType, ev) {
        console.log('drop2');
        var self = this;
        _.map(this.dropData, function(data) {
          data = JSON.parse(JSON.stringify(data));
          data.id = data.name;
          data.label = data['de.name'];
          self.$refs['elxTreeDragTable'].appendTree(data, dropNode);
          dropNode.expand();
          dropNode.data.isExpand = true;
        })
        console.log('tree drop: ', dropNode, dropType, this.dropData);
      },
      allowDrop: function(draggingNode, dropNode, type) {
        return type == 'inner';
      },
      allowDrag: function(draggingNode) {
        return false;
      },
      drag: function(ev) {
        ev.dataTransfer.setData("Text", '');
      }
    },
    created: function() {
    }
  };
</script>
```
:::

### Attributes
| 参数                    | 说明                                       | 类型                          | 可选值  | 默认值   |
| --------------------- | ---------------------------------------- | --------------------------- | ---- | ----- |
| data | 展示数据 | array | — | — |
| default-expanded-keys | 默认展开的节点的 key 的数组 | array | — | — |
| current-node-key | 当前选中节点的 key，只写属性 | string, number | — | — |
| props | 配置选项，具体看下表 | object | - | - |
| expand-on-click-node | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。 | Boolean | - | true |
| default-expand-all | 是否默认展开所有节点 | Boolean | - | false |
| lazy | 是否懒加载子节点，需与 load 方法结合使用 | Boolean | - | false |
| load | 加载子树数据的方法，仅当 lazy 属性为true 时生效 | function(node, resolve) | - | - |
| line | 是否配置引导线 | Boolean | - | false |
| draggable | 是否开启拖拽节点功能 | object | - | - |
| allow-drop | 拖拽时判定目标节点能否被放置。type 参数有三种情况：'prev'、'inner' 和 'next'| Function(draggingNode, dropNode, type) | - | - |
| allow-drag | 判断节点能否被拖拽 | Function(node) | — | — |
| drop-by-outside | 配置选项，具体看下表 | object | — | — |

### props
| 参数       | 说明                | 类型     | 可选值  | 默认值  |
| -------- | ----------------- | ------ | ---- | ---- |
| children | 子树属性名 | - | - | - |
| label | 节点标签属性名 | - | - | - |

### Events
| 事件名称           | 说明             | 回调参数                                     |
| -------------- | -------------- | ---------------------------------------- |
| node-click | 节点点击事件 | 返回节点node |
| node-dblclick | 节点双击事件 | 返回节点node |
| right-click | 节点右键点击事件 | 返回节点node |
| add | 节点添加事件 | 返回节点node |
| remove | 节点删除事件 | 返回节点node |
| rename | 节点重命名事件 | 返回节点node |
| node-drop | 拖拽成功完成时触发的事件 | draggingNode, dropNode, dropType, ev|
| node-drag-start | 节点开始拖拽时触发的事件 | 共两个参数，依次为：被拖拽节点对应的 Node、event |
| node-drag-enter | 拖拽进入其他节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event |
| node-drag-leave | 拖拽离开某个节点时触发的事件 | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event |
| node-drag-over | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event |
| node-drag-end | 拖拽结束时（可能未成功）触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event |
| node-drop | 拖拽成功完成时触发的事件 | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event |

