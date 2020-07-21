## 面包屑(根据菜单数据形成面包屑)

面包屑。

### 基本用法


::: demo 面包屑
```html
<div class="menu-demo">
  <elx-menu
    :menu-title="testTitle"
    :menu-active="menuActive"
    :menu-open='menuOpen'
    :menu-data="testMenuData"
    :type="'outer'"
    :guide-arrow-show="guideArrowShow"
    @sidebar-open="sidebarOpen"
    @menu-change="menuChange">
  </elx-menu>
  <div class="breadcrumbDemo">
    <elx-breadcrumb
      :menu-data="testMenuData"
      :refresh="refresh">
    </elx-breadcrumb>
  </div>
</div>
<script>
  const menuData = require('examples/assets/menu.json');

  export default {
    data: function() {
      return {
        testTitle: {
          title: "后台管理",
          image: "uex-icon-drds"
        },
        testMenuData: menuData,
        refresh:0,
        focusMenu: '',
        menuActive: 'data-directory',
        menuOpen: '',
        menuType: 'outer',
        filter: null,
        searchFocus: false,
        guideArrowShow: false,
        refresh: 0,
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
| menu-data     | 菜单数据  | Array |   －   | [ ] |
