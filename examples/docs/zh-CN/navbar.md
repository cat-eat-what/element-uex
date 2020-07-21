## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<div class="nav-demo">
  <elx-navbar :nav-data="testMenuData"></elx-navbar>
</div>
<script>
  const menuData = require('examples/assets/menu.json');

  export default {
    data:function() {
      return {
        testMenuData: menuData,
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

