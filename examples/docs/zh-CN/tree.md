### 基本用法

::: demo
```html
<elx-tree
  :data="data2"
  :default-expanded-keys="defaultExpandedKeys"
  :expand-on-click-node="false"
  :current-node-key="currentNodeKey"
  default-expand-all
  @node-click="handleNodeClick"
  @node-dblclick="handleNodeDblClick">
  <template scope="scope" slot="operate">
    <ul>
      <li @click.stop.prevent="analysisItem(scope.data)">
          <span class="uex-icon-field-blood-analyse"></span>
          <span>影响分析</span>
      </li>
    </ul>
  </template>
</elx-tree>
<script>
  const data2 = [
{
    "id": "paas_proc",
    "label": "程序",
    "children": [
        {
            "id": "paas_proc_2",
            "label": "流量经营",
            "children": [
                {
                    "id": "paas_proc_21",
                    "label": "流量经营3",
                    "children": null,
                    "icon": "uex-icon-database pink"
                }
            ]
        },
        {
            "id": "paas_proc_3",
            "label": "一经程序",
            "children": null
        },
        {
            "id": "paas_proc_4",
            "label": "话单统计",
            "children": []
        },
        {
            "id": "paas_proc_5",
            "label": "短彩信",
            "children": []
        },
        {
            "id": "paas_proc_6",
            "label": "营销活动",
            "children": []
        },
        {
            "id": "paas_proc_7",
            "label": "人均收入",
            "children": []
        },
        {
            "id": "paas_proc_tmp",
            "label": "临时文件夹",
            "children": []
        }
    ]
}
];
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data2: data2,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        testData: [
          {name:'a',procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序',isEdit: false,isDelete: false},
          {name:'o',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'e',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'u',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'b',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'g',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'h',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m1',procnname:'TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_'},
          {name:'m2',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m3',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m4',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m5',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m6',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m7',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m10',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'}
        ],
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
        ],
        props: {
          name: 'name',
          cnName: 'procnname'
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
          indexArr.push(this.testData.indexOf(data[i]));
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
<elx-tree
  class="elx-tree-1"
  :data="data2"
  :default-expanded-keys="defaultExpandedKeys"
  :expand-on-click-node="false"
  :current-node-key="currentNodeKey"
  :line="true"
  default-expand-all
  @node-click="handleNodeClick"
  @node-dblclick="handleNodeDblClick">
  <template scope="scope" slot="operate">
    <ul>
      <li @click.stop.prevent="analysisItem(scope.data)">
          <span class="uex-icon-field-blood-analyse"></span>
          <span>影响分析</span>
      </li>
    </ul>
  </template>
</elx-tree>
<script>
  const data2 = [
{
    "id": "paas_proc",
    "label": "程序",
    "children": [
        {
            "id": "paas_proc_2",
            "label": "流量经营",
            "children": [
                {
                    "id": "paas_proc_21",
                    "label": "流量经营3",
                    "children": null
                }
            ]
        },
        {
            "id": "paas_proc_3",
            "label": "一经程序",
            "children": null
        },
        {
            "id": "paas_proc_4",
            "label": "话单统计",
            "children": []
        },
        {
            "id": "paas_proc_5",
            "label": "短彩信",
            "children": []
        },
        {
            "id": "paas_proc_6",
            "label": "营销活动",
            "children": []
        },
        {
            "id": "paas_proc_7",
            "label": "人均收入",
            "children": []
        },
        {
            "id": "paas_proc_tmp",
            "label": "临时文件夹",
            "children": []
        }
    ]
}
];
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data2: data2,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        testData: [
          {name:'a',procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序',isEdit: false,isDelete: false},
          {name:'o',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'e',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'u',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'b',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'g',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'h',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m1',procnname:'TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_'},
          {name:'m2',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m3',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m4',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m5',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m6',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m7',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m10',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'}
        ],
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
        ],
        props: {
          name: 'name',
          cnName: 'procnname'
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
          indexArr.push(this.testData.indexOf(data[i]));
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
<div class="drag-tree">
  <elx-tree
    class="elx-tree-1"
    ref="elxTreeDragList"
    :data="data2"
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
    <template scope="scope" slot="operate">
      <ul>
        <li @click.stop.prevent="analysisItem(scope.data)">
            <span class="uex-icon-field-blood-analyse"></span>
            <span>影响分析</span>
        </li>
      </ul>
    </template>
  </elx-tree>
  <elx-item-list
    :data="testData"
    :draggable="true"
    :props="props"
    :multiselect="true"
    @drop-start="dropStart">
  </elx-item-list>
</div>
<script>
  const data2 = [
{
    "id": "paas_proc",
    "label": "程序",
    "children": [
        {
            "id": "paas_proc_2",
            "label": "流量经营",
            "children": [
                {
                    "id": "paas_proc_21",
                    "label": "流量经营3",
                    "children": null
                }
            ]
        },
        {
            "id": "paas_proc_3",
            "label": "一经程序",
            "children": null
        },
        {
            "id": "paas_proc_4",
            "label": "话单统计",
            "children": []
        },
        {
            "id": "paas_proc_5",
            "label": "短彩信",
            "children": []
        },
        {
            "id": "paas_proc_6",
            "label": "营销活动",
            "children": []
        },
        {
            "id": "paas_proc_7",
            "label": "人均收入",
            "children": []
        },
        {
            "id": "paas_proc_tmp",
            "label": "临时文件夹",
            "children": []
        }
    ]
}
];
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data2: data2,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        testData: [
          {name:'a',procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序',isEdit: false,isDelete: false},
          {name:'o',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'e',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'u',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'b',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'g',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'h',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m1',procnname:'TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_'},
          {name:'m2',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m3',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m4',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m5',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m6',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m7',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m10',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'}
        ],
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
        ],
        props: {
          name: 'name',
          cnName: 'procnname'
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
          indexArr.push(this.testData.indexOf(data[i]));
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
<div class="drag-tree">
  <elx-tree
    class="elx-tree-1"
    ref="elxTreeDragTable"
    :data="data2"
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
    <template scope="scope" slot="operate">
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
        <template scope="props">
          {{props.$index!=null?props.$index+1:''}}
        </template>
      </elx-table-column>
      <elx-table-column
        show-overflow-tooltip
        label="日期"
        width="180">
        <template scope="props">
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
        <template scope="props">
          xxx
        </template>
      </el-table-column>
    </elx-table>
</div>
<script>
  const data2 = [
{
    "id": "paas_proc",
    "label": "程序",
    "children": [
        {
            "id": "paas_proc_2",
            "label": "流量经营",
            "children": [
                {
                    "id": "paas_proc_21",
                    "label": "流量经营3",
                    "children": null
                }
            ]
        },
        {
            "id": "paas_proc_3",
            "label": "一经程序",
            "children": null
        },
        {
            "id": "paas_proc_4",
            "label": "话单统计",
            "children": []
        },
        {
            "id": "paas_proc_5",
            "label": "短彩信",
            "children": []
        },
        {
            "id": "paas_proc_6",
            "label": "营销活动",
            "children": []
        },
        {
            "id": "paas_proc_7",
            "label": "人均收入",
            "children": []
        },
        {
            "id": "paas_proc_tmp",
            "label": "临时文件夹",
            "children": []
        }
    ]
}
];
  export default {
    data() {
      return {
        a: {a: 1, b: 2},
        b: {a: 2, b: 3},
        data2: data2,
        defaultExpandedKeys: ['paas_proc_21'],
        currentNodeKey: 'paas_proc_21',
        dropData: [],
        testData: [
          {name:'a',procnname: 'TAS_内容分类访问分析终端定制分析日汇总程序',isEdit: false,isDelete: false},
          {name:'o',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'e',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'u',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'b',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'g',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'h',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m1',procnname:'TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_TAS_'},
          {name:'m2',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m3',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m4',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m5',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m6',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m7',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m8',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m9',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'},
          {name:'m10',procnname:'TAS_内容分类访问分析终端定制分析日汇总程序'}
        ],
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
        ],
        props: {
          name: 'name',
          cnName: 'procnname'
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
          indexArr.push(this.testData.indexOf(data[i]));
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

