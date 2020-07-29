## context-menu

context-menu

### 通过组件配置右键菜单

::: demo context-menu
```html
<div
  id="main"
  class="main-demo">
  <elx-main>
    <div
      id="content"
      class="layout">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @row-contextmenu="rowContextmenu1">
        <el-table-column
          prop="stepInst"
          label="指令"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="stepType"
          label="所属区域"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
      <elx-context-menu
        @action="action"
        :tip-show="false"
        :data="actionData"
        :width="90"
        :visible="contentMenuShow"
        :x="pos.x"
        :y="pos.y">
      </elx-context-menu>
    </div>
  </elx-main>
</div>
<script>
  export default {
    data: function() {
      return {
        tableData: [
          {
            'stepInst': 'authVerify',
            'stepType': '输入区',
            'actions': [
              {'icon': 'uex-icon-edit', 'label': 'test1test1test1', 'action': 'aaaa'},
              {'label': 'test2', 'action': 'bbbb'}
            ]
          },
          {
            'stepInst': 'authVerify',
            'stepType': '输入区',
            'actions': [
              {'label': 'test1test1test1', 'action': 'aaaa'},
              {'label': 'test2', 'action': 'bbbb'}
            ]
          },
          {
            'stepInst': 'paramCheck',
            'stepType': '输入区',
            'actions': [
              {'label': 'test3', 'action': 'aaaa1'},
              {'label': 'test4', 'action': 'bbbb1'}
            ]
          },
          {
            'stepInst': 'paramsConvert',
            'stepType': '输入区',
            'actions': [
              {
                'label': 'test1test1test1test1',
                'action': 'action1'
              },
              {
                'label': 'test2test2test2',
                'action': 'action2',
                'children': [
                  {
                    'label': 'test21est21est21',
                    'action': 'action21',
                    'children': [
                      {
                        'label': 'test211test211test211',
                        'action': 'action211'
                      },
                      {
                        'label': 'test212test212test212',
                        'action': 'action212'
                      }
                    ]
                  },
                  {
                    'label': 'test22test22test22',
                    'action': 'action22'
                  },
                ]
              }
            ]
          }
        ],
        pos: {
          x: 0,
          y: 0
        },
        actionData: [{'label': 'test2', 'action': 'bbbb'}],
        contentMenuShow: false,
        buttonActionData1: [
          {
            'label': 'test1test1test1test1',
            'action': 'action1'
          },
          {
            'label': 'test2test2test2',
            'action': 'action2',
            'children': [
              {
                'label': 'test21est21est21',
                'action': 'action21',
                'children': [
                  {
                    'label': 'test211test211test211',
                    'action': 'action211'
                  },
                  {
                    'label': 'test212test212test212',
                    'action': 'action212'
                  }
                ]
              },
              {
                'label': 'test22test22test22',
                'action': 'action22'
              },
            ]
          }
        ],
        buttonActionData2: [],
        buttonShow: true,
        rowContextmenu: false
      }
    },
    methods: {
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      rowContextmenu1: function(row, column, event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        if (e.which === 3) {
          this.contentMenuShow = false;
          this.pos.x = pos.x;
          this.pos.y = pos.y;
          this.actionData = row.actions;
          console.log(this.actionData);
          this.contentMenuShow = true;
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      preventDefault: function(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnvalue = false;
        }
      },
      action: function(data) {
        alert(data.action);
        this.contentMenuShow = false;
      }
    },
    created: function() {
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        var el = document.body;
        var handleDisplay = function() {
          _self.contentMenuShow = false;
        }
        if (el.addEventListener) {
          el.addEventListener('click', handleDisplay);
        } else if (el.attachEvent)  {
          el.attachEvent('onclick', handleDisplay);
        }
      });
      window.buttonCVm = this;

    }
  }
</script>
```
:::

### 通过指令配置右键菜单
::: demo context-menu
```html
<div id="main" class="main-demo">
  <el-button
    ref="buttonRef"
    v-if="buttonShow"
    v-contextmenu.tip="buttonActionData1"
    :contextmenu-width="140"
    @exec-contextmenu="execContextMenu"
    @contextmenu-action="buttonAction">测试右键
  </el-button>

  <el-button v-if="buttonShow" @click="buttonShow=false">删掉button</el-button>
  <el-button v-if="!buttonShow" @click="buttonShow=true">恢复button</el-button>
</div>
<script>
  export default {
    data: function() {
      return {
        buttonShow: true,
        buttonActionData1: [
          {
            'label': 'test1test1test1test1',
            'action': 'action1'
          },
          {
            'label': 'test2test2test2',
            'action': 'action2',
            'children': [
              {
                'label': 'test21est21est21',
                'action': 'action21',
                'children': [
                  {
                    'label': 'test211test211test211',
                    'action': 'action211'
                  },
                  {
                    'label': 'test212test212test212',
                    'action': 'action212'
                  }
                ]
              },
              {
                'label': 'test22test22test22',
                'action': 'action22'
              },
            ]
          }
        ]
      }
    },
    methods: {
      buttonAction: function(data) {
        console.log(data.action);
      },
      execContextMenu: function() {
        console.log('xxxxcccc');
      }
    },
    created: function() {
    },
    mounted: function() {
    }
  }
</script>

```
:::

### 基本用法

::: demo
```html
<el-tree
  :data="data2"
  default-expand-all
  v-contextmenu.tip="buttonActionData1"
  :contextmenu-width="140"
  @exec-contextmenu="execContextMenu"
  @contextmenu-action="buttonAction"
  @node-contextmenu="handleNodeContextmenu">
</el-tree>
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
        buttonActionData1: []
      };
    },
    methods: {
      handleNodeContextmenu: function() {
        console.log('handleNodeContextmenu');
      },
      buttonAction: function(data) {
        console.log(data.action);
      },
      execContextMenu: function() {
        console.log('execContextMenu');
        this.buttonActionData1 = [
          {
            'label': 'test1test1test1test1',
            'action': 'action1'
          },
          {
            'label': 'test2test2test2',
            'action': 'action2',
            'children': [
              {
                'label': 'test21est21est21',
                'action': 'action21',
                'children': [
                  {
                    'label': 'test211test211test211',
                    'action': 'action211'
                  },
                  {
                    'label': 'test212test212test212',
                    'action': 'action212'
                  }
                ]
              },
              {
                'label': 'test22test22test22',
                'action': 'action22'
              },
            ]
          }
        ]
      }
    },
    created: function() {
    }
  };
</script>
```
:::

### 通过指令配置右键菜单
::: demo context-menu
```html
<div id="main" class="main-demo">
  <elx-main>
    <div id="content" class="layout">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @contextmenu.native="handleContextMenu"
        @row-contextmenu="rowContextmenu2"

        v-contextmenu="buttonActionData2"
        @contextmenu-action="buttonAction"
        >
        <el-table-column prop="stepInst" label="指令" show-overflow-tooltip></el-table-column>
        <el-table-column prop="stepType" label="所属区域" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </elx-main>
</div>
<script>
  export default {
    data: function() {
      return {
        tableData: [
          {
            'stepInst': 'authVerify',
            'stepType': '输入区',
            'actions': [
              {'icon': 'uex-icon-edit', 'label': 'test1test1test1', 'action': 'aaaa'},
              {'label': 'test2', 'action': 'bbbb'}
            ]
          },
          {
            'stepInst': 'authVerify',
            'stepType': '输入区',
            'actions': [
              {'label': 'test1test1test1', 'action': 'aaaa'},
              {'label': 'test2', 'action': 'bbbb'}
            ]
          },
          {
            'stepInst': 'paramCheck',
            'stepType': '输入区',
            'actions': [
              {'label': 'test3', 'action': 'aaaa1'},
              {'label': 'test4', 'action': 'bbbb1'}
            ]
          },
          {
            'stepInst': 'paramsConvert',
            'stepType': '输入区',
            'actions': [
              {
                'label': 'test1test1test1test1',
                'action': 'action1'
              },
              {
                'label': 'test2test2test2',
                'action': 'action2',
                'children': [
                  {
                    'label': 'test21est21est21',
                    'action': 'action21',
                    'children': [
                      {
                        'label': 'test211test211test211',
                        'action': 'action211'
                      },
                      {
                        'label': 'test212test212test212',
                        'action': 'action212'
                      }
                    ]
                  },
                  {
                    'label': 'test22test22test22',
                    'action': 'action22'
                  },
                ]
              }
            ]
          }
        ],
        buttonActionData2: [],
        rowContextmenu: false
      }
    },
    methods: {
      buttonAction: function(data) {
        console.log(data.action);
      },
      rowContextmenu2: function(row, event) {
        this.rowContextmenu = true;
        this.activeRow = row;
      },
      handleContextMenu: function() {
        if (this.rowContextmenu) {
          this.buttonActionData2 = this.activeRow.actions;
        } else {
          this.buttonActionData2 = [];
        }
        this.rowContextmenu = false
      }
    },
    created: function() {
    },
    mounted: function() {
    }
  }
</script>

```
:::


### 通过组件配置右键菜单 Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| width | 宽度 | Number | — | 80 |
| x | top值，x坐标 | Number | — | 0 |
| y | left值，y坐标 | Number | — | 0 |
| data | 菜单数据 | Array | — | ［］ |
| visible | 是否显示右键菜单 | Boolean | — | false |
| tip-show | 是否显示文字提示 | Boolean | — | false |

### 通过组件配置右键菜单 Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| action | 点击右键菜单项时触发的事件 | 菜单项 |


### 通过指令右键菜单 Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-contextmenu | 绑定右键菜单数据 | Array | - | - |
| v-contextmenu.tip | 在指令后面加tip修饰符，将显示文字提示，否则将不显示 | - | - | - |
| contextmenu-width | 宽度 | Number | — | 80 |

### 通过指令配置右键菜单 Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| contextmenu-action | 点击右键菜单项时触发的事件 | 菜单项 |
