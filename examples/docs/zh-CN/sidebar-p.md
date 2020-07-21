## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<div class="menu-demo">
  <elx-sidebar-p
    :menu-data="testMenuData"
    :menu-active.sync="menuActive"
    :menu-open='menuOpen'
    :show.sync="show"
    :location-origin="locationOrigin"
    :title="title"
    :is-post="false"
    :message="message"
    :descr="descr"
    :action-data="actionData"
    :guide-arrow-show="guideArrowShow"
    @contextmenu-action="contextmenuAction"
    @sidebar-open="sidebarOpen"
    @menu-change="menuChange">
  </elx-sidebar-p>
  <div class="openDemo">
    选择open菜单
    <br/><br/>
    <el-select v-model="openValue" placeholder="请选择" >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="activeDemo">
    选择active菜单
    <br/><br/>
    <el-select v-model="activeValue" placeholder="请选择" >
      <el-option
        v-for="(item, index) in options"
        :key="index"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
  </div>
  <div class="guideDemo">
    guide
    <br/>
    <br/>
    <el-switch
      v-model="guideArrowShow"
      on-color="#13ce66"
      off-color="#ff4949">
    </el-switch>
  </div>
</div>
<script>
  const menuData = require('examples/assets/menu.json');
  export default {
    data:function(){
      return {
        show: false,
        message: {
          menuType: 'narrow'
        },
        testMenuData: menuData,
        title: '系统管理',
        descr: '注释注释注释注释注释注释注释注释注释注释注释',
        refresh:0,
        focusMenu: '',
        menuActive: '',
        menuOpen: '',
        menuType: 'outer',
        filter: null,
        searchFocus: false,
        guideArrowShow: false,
        refresh: 0,
        options: [],
        openValue: '',
        activeValue: '',
        locationOrigin: location.origin,
        actionData: [
          {label: '刷新', action: 'refresh'},
          {label: '收藏', action: 'collect'}
        ]
      }
    },
    methods: {
      receiveMessage: function(message) {
        console.log(message);
      },
      menuChange: function(model) {
        this.focusMenu = model.modelcode;
        console.log(model);
        this.refresh++;
      },
      sidebarOpen: function(show) {
        console.log(show);
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
| title | 标题 | String | - | '暂无' |
| descr | 描述 | String | - | '暂无' |
| menu-data | 菜单数据 | Array | — | [] |
| menu-active | 当前选中菜单项 | string | - | '' |
| menu－open | 当前展开菜单项 | String | — | '' |
| guide-arrow-show | 是否出现向导箭头 | Boolean | — | false |
| show | 当前菜单类型，菜单为窄菜单还是宽菜单 | Boolean | - | true |
| type | 高度是否撑满parentDom | String | full／auto | 'full' |
| action-data | 右键菜单数据 | Array | - | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| sidebar-open | 菜单形式切换 | type: 菜单类型 |
| menu-change | 触发子菜单 | model: 当前子菜单数据 |
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
