## 菜单

可收缩菜单。

### 基本用法


::: demo
```html
<div class="flow-menu-demo">
  <elx-flow-menu
    :flow-li-num="flowLiNum"
    :flow-menu-data="flowMenuData"
    :menu-data="flowMenuSideData"
    :menu-open='menuOpen'
    :menu-active.sync="menuActive"
    :menu-type="menuType"
    :action-data="actionData"
    :guide-arrow-show="guideArrowShow"
    :location-source="'http://0.0.0.0:8085/'"
    :is-post="true"
    :post-message="'hide'"
    @contextmenu-action="contextmenuAction"
    @menu-change="menuChange"
    @flow-menu-change="flowMenuChange"
    @sidebar-open="sidebarOpen"
    @last-child-node-click="lastChildNodeClick"
  >
  </elx-flow-menu>
  <iframe :src="src"></iframe>
</div>
<script>
  var testflowMenuData = require('examples/assets/flowMenu.json');
//   var testflowMenuSideData = require('examples/assets/flowMenuSide.json');
  export default {
    data: function() {
      return {
        flowLiNum:4,
        flowMenuData:testflowMenuData,
        // flowMenuSideData:[
        //     {
        //         "url": null,
        //         "children": [
        //             {
        //                 "url": "metamodel/team",
        //                 "children": [],
        //                 "modelcode": "1020158",
        //                 "parentId": "platform-team-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "团队管理"
        //             },
        //             {
        //                 "url": "metamodel/teamMemberRole",
        //                 "children": [],
        //                 "modelcode": "1020159",
        //                 "parentId": "platform-team-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "团队角色管理"
        //             }
        //         ],
        //         "modelcode": "platform-team-mgr",
        //         "parentId": "platform",
        //         "menuType": "1",
        //         "hasright": "1",
        //         "menuIcon": "uex-icon-data-allocation",
        //         "sidebarType": null,
        //         "descr": null,
        //         "extendConf": null,
        //         "modelname": "团队管理"
        //     },
        //     {
        //         "url": null,
        //         "children": [
        //             {
        //                 "url": "metamodel/tenant",
        //                 "children": [],
        //                 "modelcode": "1020138",
        //                 "parentId": "platform-resource-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "物理租户管理"
        //             },
        //             {
        //                 "url": "metamodel/datasource",
        //                 "children": [],
        //                 "modelcode": "1020136",
        //                 "parentId": "platform-resource-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "数据源管理"
        //             },
        //             {
        //                 "url": "dataps/cluster",
        //                 "children": [],
        //                 "modelcode": "1020008",
        //                 "parentId": "platform-resource-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "集群配置"
        //             }
        //         ],
        //         "modelcode": "platform-resource-mgr",
        //         "parentId": "platform",
        //         "menuType": "1",
        //         "hasright": "1",
        //         "menuIcon": "uex-icon-data-allocation",
        //         "sidebarType": null,
        //         "descr": null,
        //         "extendConf": null,
        //         "modelname": "资源管理"
        //     },
        //     {
        //         "url": "metamodel/project/teamProList",
        //         "children": [],
        //         "modelcode": "1020141",
        //         "parentId": "platform",
        //         "menuType": "1",
        //         "hasright": "1",
        //         "menuIcon": "uex-icon-data-allocation",
        //         "sidebarType": null,
        //         "descr": null,
        //         "extendConf": null,
        //         "modelname": "项目管理"
        //     },
        //     {
        //         "url": null,
        //         "children": [
        //             {
        //                 "url": "metamodel/user",
        //                 "children": [],
        //                 "modelcode": "1020146",
        //                 "parentId": "sys-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "用户管理"
        //             },
        //             {
        //                 "url": "metamodel/role",
        //                 "children": [],
        //                 "modelcode": "1020145",
        //                 "parentId": "sys-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "角色管理"
        //             },
        //             {
        //                 "url": "ftl/stdmgr/std_public_dimension",
        //                 "children": [
        //                     {
        //                         "url": "metamodel/property",
        //                         "children": [],
        //                         "modelcode": "1020144",
        //                         "parentId": "1020181",
        //                         "menuType": "1",
        //                         "hasright": "1",
        //                         "menuIcon": "uex-icon-data-allocation",
        //                         "sidebarType": null,
        //                         "descr": null,
        //                         "extendConf": null,
        //                         "modelname": "参数管理"
        //                     }
        //                 ],
        //                 "modelcode": "1020181",
        //                 "parentId": "sys-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": "extend",
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "系统配置"
        //             },
        //             {
        //                 "url": null,
        //                 "children": [
        //                     {
        //                         "url": "tracelog",
        //                         "children": [],
        //                         "modelcode": "1020185",
        //                         "parentId": "sys-monitor",
        //                         "menuType": "1",
        //                         "hasright": "1",
        //                         "menuIcon": "uex-icon-data-allocation",
        //                         "sidebarType": null,
        //                         "descr": null,
        //                         "extendConf": null,
        //                         "modelname": "日志管理"
        //                     },
        //                     {
        //                         "url": "dataps/devops/procStepDefine",
        //                         "children": [],
        //                         "modelcode": "1020180",
        //                         "parentId": "sys-monitor",
        //                         "menuType": "1",
        //                         "hasright": "1",
        //                         "menuIcon": "uex-icon-data-allocation",
        //                         "sidebarType": null,
        //                         "descr": null,
        //                         "extendConf": null,
        //                         "modelname": "节点管理"
        //                     }
        //                 ],
        //                 "modelcode": "sys-monitor",
        //                 "parentId": "sys-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": "extend",
        //                 "descr": null,
        //                 "extendConf": null,
        //                 "modelname": "系统监控"
        //             },
        //             {
        //                 "url": "metamodel/func_arch",
        //                 "children": [],
        //                 "modelcode": "1020017",
        //                 "parentId": "sys-mgr",
        //                 "menuType": "1",
        //                 "hasright": "1",
        //                 "menuIcon": "uex-icon-data-allocation",
        //                 "sidebarType": null,
        //                 "descr": null,
        //                 "extendConf": "{\"menuOpen\":null,\"isPost\":null,\"type\":null,\"isBlank\":\"0\",\"isDesktop\":null,\"desktopSeq\":null}",
        //                 "modelname": "菜单管理"
        //             }
        //         ],
        //         "modelcode": "sys-mgr",
        //         "parentId": "platform",
        //         "menuType": "1",
        //         "hasright": "1",
        //         "menuIcon": "uex-icon-data-allocation",
        //         "sidebarType": null,
        //         "descr": null,
        //         "extendConf": null,
        //         "modelname": "系统管理"
        //     }
        // ],
        flowMenuSideData:[
            {
                "url": null,
                "children": [
                    {
                        "url": null,
                        "children": [
                            {
                                "url": "metaflow/flow/inst/creator",
                                "children": [],
                                "modelcode": "flow-creator",
                                "parentId": "dev-flow",
                                "menuType": "1",
                                "hasright": "1",
                                "menuIcon": null,
                                "sidebarType": "drop-down",
                                "descr": null,
                                "extendConf": null,
                                "modelname": "发起需求"
                            },
                            {
                                "url": "metaflow/flow/handle/inst",
                                "children": [],
                                "modelcode": "my-task",
                                "parentId": "dev-flow",
                                "menuType": "1",
                                "hasright": "1",
                                "menuIcon": null,
                                "sidebarType": "drop-down",
                                "descr": null,
                                "extendConf": null,
                                "modelname": "我的待办"
                            },
                            {
                                "url": "metaflow/flow/inst",
                                "children": [],
                                "modelcode": "task-list",
                                "parentId": "dev-flow",
                                "menuType": "1",
                                "hasright": "1",
                                "menuIcon": null,
                                "sidebarType": "drop-down",
                                "descr": null,
                                "extendConf": null,
                                "modelname": "任务查询"
                            }
                        ],
                        "modelcode": "dev-flow",
                        "parentId": "developer-center",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": "uex-icon-command-config",
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "开发流程"
                    },
                    {
                        "url": "dataps/data/res",
                        "children": [],
                        "modelcode": "developer-center-my-data",
                        "parentId": "developer-center",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "我的数据"
                    }
                ],
                "modelcode": "developer-center",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": "uex-icon-command-config",
                "sidebarType": "drop-down",
                "descr": null,
                "extendConf": null,
                "modelname": "开发者中心"
            },
            {
                "url": null,
                "children": [
                    {
                        "url": "metamodel/devops/model",
                        "children": [],
                        "modelcode": "model-dev",
                        "parentId": "data-dev",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "模型开发"
                    },
                    {
                        "url": "dataps/devops/proc",
                        "children": [],
                        "modelcode": "proc-dev",
                        "parentId": "data-dev",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "程序开发"
                    }
                ],
                "modelcode": "data-dev",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": "uex-icon-data-developed",
                "sidebarType": "drop-down",
                "descr": "数据开发模块参考DevOps理念面向开发者集成开发环境，开发者可以完成从建模、开发、测试、发布调度、数据查询、任务监控等完整操作",
                "extendConf": null,
                "modelname": "数据开发"
            },
            {
                "url": null,
                "children": [
                    {
                        "url": "dataaccess/access_tool",
                        "children": [],
                        "modelcode": "access-tool",
                        "parentId": "data-query-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "数据操作IDE"
                    },
                    {
                        "url": "dataquery/dataQueryLog",
                        "children": [],
                        "modelcode": "sql-query-log",
                        "parentId": "data-query-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "SQL查询日志"
                    },
                    {
                        "url": "dataps/offline/offlineQueryList",
                        "children": [],
                        "modelcode": "offline-data-query",
                        "parentId": "data-query-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "离线查询"
                    }
                ],
                "modelcode": "data-query-mgr",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": null,
                "sidebarType": "drop-down",
                "descr": null,
                "extendConf": null,
                "modelname": "数据查询"
            },
            {
                "url": null,
                "children": [
                    {
                        "url": "dataflow/jobs",
                        "children": [],
                        "modelcode": "task-dispatch-conf",
                        "parentId": "task-dispatch",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "任务编辑"
                    },
                    {
                        "url": "dataflow/jobMonitor",
                        "children": [],
                        "modelcode": "task-dispatch-monitor",
                        "parentId": "task-dispatch",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "任务监控"
                    }
                ],
                "modelcode": "task-dispatch",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": null,
                "sidebarType": "drop-down",
                "descr": null,
                "extendConf": null,
                "modelname": "任务调度"
            },
            {
                "url": null,
                "children": [
                    {
                        "url": "dataps/task/procGeneralView",
                        "children": [],
                        "modelcode": "proc-overview",
                        "parentId": "program-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": "",
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "程序总览(系统)"
                    },
                    {
                        "url": "dataps/task/teamProcGeneralView",
                        "children": [],
                        "modelcode": "proc-overview-team",
                        "parentId": "program-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": "",
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "程序总览（团队）"
                    },
                    {
                        "url": "dataps/devops/procTransfer",
                        "children": [],
                        "modelcode": "proc-transfer",
                        "parentId": "program-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "跨团队移交"
                    },
                    {
                        "url": "dataps/devops/procGlobalVar",
                        "children": [],
                        "modelcode": "proc-dev-global-var",
                        "parentId": "program-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": null,
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "程序开发全局变量"
                    }
                ],
                "modelcode": "program-mgr",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": "uex-icon-command-config",
                "sidebarType": "drop-down",
                "descr": null,
                "extendConf": null,
                "modelname": "程序管理"
            },
            {
                "url": null,
                "children": [
                    {
                        "url": "dataps/team/team_resource/sys_team_resource",
                        "children": [],
                        "modelcode": "dev-team-res-sys",
                        "parentId": "my-team-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": "",
                        "sidebarType": "drop-down",
                        "descr": null,
                        "extendConf": null,
                        "modelname": "团队资源监控(系统)"
                    },
                    {
                        "url": "metamodel/myteam",
                        "children": [],
                        "modelcode": "dev-team-mgr",
                        "parentId": "my-team-mgr",
                        "menuType": "1",
                        "hasright": "1",
                        "menuIcon": "uex-icon-find-group",
                        "sidebarType": "drop-down",
                        "descr": "适用于本团队的成员、租户账号、数据资源管理",
                        "extendConf": null,
                        "modelname": "团队管理"
                    }
                ],
                "modelcode": "my-team-mgr",
                "parentId": "dev-home",
                "menuType": "1",
                "hasright": "1",
                "menuIcon": "uex-icon-find-group",
                "sidebarType": "drop-down",
                "descr": "适用于本团队的成员、租户账号、数据资源管理",
                "extendConf": null,
                "modelname": "我的团队"
            }
        ],
        refresh:0,
        focusMenu: '',
        // menuActive: 'arch-design',
        menuActive: '1020093',
        menuOpen: '',
        menuType: 'outer',
        filter: null,
        searchFocus: false,
        guideArrowShow: false,
        refresh: 0,
        showOptions: [
          {value: 'narrow', label: 'narrow'},
          {value: 'outer', label: 'outer'}
        ],
        options: [
          {value: 'data-dev', label: '数据开发'},
          {value: 'cert_mgr', label: '证书管理'},
          {value: 'add_data', label: '数据注册'},
          {value: 'multi-tenant-mgr-team', label: '团队管理'}
        ],
        openValue: '',
        activeValue: '',
        actionData: [
          {label: '刷新', action: 'refresh'},
          {label: '收藏', action: 'collect'}
        ],
        src: ''
      }
    },
    methods: {
      menuChange: function(model) {
        console.log(model);
        if (model.url) {
          console.log(model.url);
          this.src = `http://192.168.11.218:38898/dacp/${model.url}`
        }
      },
      flowMenuChange: function(model,activeNode) {
        console.log(model);
        this.menuActive = activeNode.menuId;
        if (activeNode.url || activeNode.children.length === 0) {
          console.log(activeNode.url);
          this.src = `http://192.168.11.218:38898/dacp/${model.url}`
        }
      },
 
      sidebarOpen: function(type) {
        this.menuType = type;
          if (type === 'narrow') {
            $('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","52px");
          } else {
            $('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","182px");
          }
      },
      lastChildNodeClick: function(model) {
        console.log("lastChildNodeClick");
      },
      contextmenuAction: function(action, model) {
        console.log(action, model);
      },
	// 格式化浮游框数据 二级菜单个数 secondMenuNum
		formatFlowData: function (data, secondMenuNum) {
			for (var i = 0; i < data.length; i++) {
				var nodeChild = []
				console.log(nodeChild, 'nodeChild')
				if (data[i].children && data[i].children.length > (secondMenuNum - 1)) {
					nodeChild = data[i].children.slice(0, 4);
					data[i].children = nodeChild
				}
			}
			console.log('data', data)
			return data;
		}
    
    },
    watch: {
      openValue: function(val, oldVal) {
        this.menuOpen = val;
      },
      activeValue: function(val, oldVal) {
        this.menuActive = val;
      },
    },
    created: function() {
        this.flowMenuData = this.formatFlowData(this.flowMenuData,4)
    }
  }
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is-post | 是否向上层容器传递消息 | Boolean | - | false |
| message | 传递的消息内容 | Array, Object, Number, String | - | '' |
| location-origin | ip+port | String | - | '' |
| menu-data | 菜单数据 | Array    | — | [] |
| menu-type     | 当前菜单类型   | string    | outer,narrow | 'outer' |
| menu-active     | 当前选中菜单项   | string  |   －   | '' |
| menu－open | 当前展开菜单项 | String    | — | '' |
| guide-arrow-show | 是否出现向导箭头 | Boolean    | — | false |
| action-data | 右键菜单数据 | Array | - | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| sidebar-open  | 菜单形式切换时触发的事件 | type: 菜单类型  |
| menu-change  | 选中菜单项发生改变时触发的事件 | model: 当前选中菜单数据  |
| last-child-node-click  | 点击分支最后子节点触发的事件 | model: 当前子菜单数据  |
| receive-message | 获取容器发送过来的消息 | 消息message |
| contextmenu-action | 选中右键菜单项所触发的事件 | 右键选中菜单项 |

### menu-data 数据项格式
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 链接地址 | String | - | - |
| children | 子菜单 | Array | - | [] |
| modelcode | 菜单英文名 | String | - | - |
| modelname | 菜单中文名 | String | - | - |
| images | 图标 | String | - | - |
