## 顶部菜单

顶部浮动菜单。

### 基本用法


::: demo 菜单
```html
<div class="nav-demo">
  <elx-top-menu @change-menu="changeMenu" :menu-length="menuLength" :menu-data="testMenuData"></elx-top-menu>
</div>
<script>
var testMenuData = require('examples/assets/topMenu.json');
  export default {
    data:function() {
      return {
        testMenuData: [],
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
        menuLength: 999,
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
      },
      changeMenu: function(item) {
        console.log("parent get",item);
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
      this.testMenuData = testMenuData;
      console.log('topmenu', this.testMenuData);
    }
  }
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| menu-data | 菜单数据 | Array    | — | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |

### menu-data 数据项格式
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 链接地址 | String | - | - |
| children | 子菜单 | Array | - | [] |
| modelcode | 菜单英文名 | String | - | - |
| modelname | 菜单中文名 | String | - | - |
| images | 图标 | String | - | - |

