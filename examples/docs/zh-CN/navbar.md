## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<div class="nav-demo">
  <elx-navbar :nav-data="testMenuData"></elx-navbar>
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
        activeValue: ''
      }
    },
    methods: {
      menuChange: function(model) {
          this.focusMenu = model.modelcode;
          console.log(model);
          this.refresh++;
      },
      sidebarOpen: function(type) {
        this.menuType = type;
          if(type === 'narrow'){
            $('.dataex-layout .dataex-container.include-sidemenu').css('margin-left', '52px');
          }else{
            $('.dataex-layout .dataex-container.include-sidemenu').css('margin-left', '182px');
          }
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
| nav-data | 菜单数据 | Array    | — | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |

### nav-data 数据项格式
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 链接地址 | String | - | - |
| children | 子菜单 | Array | - | [] |
| modelcode | 菜单英文名 | String | - | - |
| modelname | 菜单中文名 | String | - | - |
| images | 图标 | String | - | - |

