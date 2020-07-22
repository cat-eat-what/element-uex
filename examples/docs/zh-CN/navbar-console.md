## 控制台顶部导航

控制台顶部导航。

### 基本用法


::: demo 控制台顶部导航
```html
<div class="nav-demo">
  <elx-navbar-console
    :data.sync="testMenuData"
    :nav-open.sync="navOpen"
    :nav-active.sync="navActive">
  </elx-navbar-console>
</div>
<script>
  export default {
    data:function() {
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
        title: 'API管理',
        refresh:0,
        focusMenu: '',
        menuActive: 'api_catalog_1_2',
        menuOpen: '',
        menuType: 'outer',
        filter: null,
        searchFocus: false,
        guideArrowShow: false,
        refresh: 0,
        options: [
          {value: 'api_catalog_1_1', label: 'API目录_1_1'},
          {value: 'cert_mgr', label: '证书管理'},
          {value: 'add_data', label: '数据注册'}
        ],
        openValue: '',
        activeValue: '',
        //navOpen: 'use-home',
        navOpen: '',
        //navActive: 'team-data-mgr',
        navActive: 'data-directory'
      }
   },
    methods: {
      menuChange: function(model) {
          this.focusMenu = model.modelcode;
          this.refresh++;
      },
      sidebarOpen: function(type) {
        this.menuType = type;
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
| data | 菜单数据 | Array | — | [] |
| nav－active | 当前选中菜单项 | String | — | [] |
| nav－open | 当前展开菜单项 | String | — | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| nav-expand | 菜单项展开时触发的事件 | 当前展开菜单项 |
| nav-collapse | 菜单项收起时触发的事件 | 当前收起菜单项 |
| nav-change | 选中菜单项发生改变时触发的事件 | model: 当前选中菜单数据  |

### data 数据项格式
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 链接地址 | String | - | - |
| children | 子菜单 | Array | - | [] |
| modelcode | 菜单英文名 | String | - | - |
| modelname | 菜单中文名 | String | - | - |
| images | 图标 | String | - | - |

