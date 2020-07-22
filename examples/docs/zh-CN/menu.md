## 菜单

可收缩菜单。

### 基本用法


::: demo
```html
<div class="menu-demo">
  <elx-menu
    :menu-data="testMenuData"
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
    @sidebar-open="sidebarOpen"
    @last-child-node-click="lastChildNodeClick"
    >
  </elx-menu>
  <div class="openDemo">
      选择open菜单
      <br/><br/>
    <el-select v-model="openValue" placeholder="请选择" >
      <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="activeDemo">
      选择active菜单
      <br/><br/>
    <el-select v-model="activeValue" placeholder="请选择" >
      <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="showDemo">
      show
      <br/><br/>
    <el-select v-model="menuType" placeholder="请选择" >
      <el-option v-for="(item, index) in showOptions" :key="index" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
  <div class="guideDemo">
      guide
      <br/><br/>
    <el-switch
      v-model="guideArrowShow"
      on-color="#13ce66"
      off-color="#ff4949">
    </el-switch>
  </div>
</div>
<script>
  export default {
    data: function() {
      return {
        testMenuData: [
          {
            "modelcode": "use-home",
            "modelname": "使用者门户",
            "images": "uex-icon-review-yes",
            "url": "",
            "children": [
              {
                 "modelcode": "data-directory",
                "modelname": "数据目录",
                "images": "",
                "url": "metamodel/catalog",
                "children": [],
              },
              {
                "modelcode": "data-atlas",
                "modelname": "数据图谱",
                "images": "",
                "url": "metamodel/data_graph",
                "children": [],
              }
            ],
          }
        ],
        refresh:0,
        focusMenu: '',
        menuActive: 'arch-design',
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
        ]
      }
    },
    methods: {
      menuChange: function(model) {
        this.focusMenu = model.modelcode;
        console.log(model.modelcode, model.active);
        this.refresh++;
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
      }
    },
    watch: {
      openValue: function(val, oldVal) {
        this.menuOpen = val;
      },
      activeValue: function(val, oldVal) {
        this.menuActive = val;
      }
    },
    created: function() {
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
