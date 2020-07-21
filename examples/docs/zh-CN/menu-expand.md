## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<div class="menu-demo">
  <elx-menu-expand
    :title="'角色'"
    :menu-data.sync="testMenuData"
    @menu-change="menuChange">
  </elx-menu-expand>
</div>
<script>
  const menuData = require('examples/assets/menu.json');
  export default {
    data:function() {
      return {
        testMenuData: menuData
      };
    },
    methods: {
      menuChange: function(model) {
        console.log(model);
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
| title | 标题 | String | - | '' |
| is-post | 是否向上层容器传递消息 | Boolean | - | false |
| message | 传递的消息内容 | Array, Object, Number, String | - | '' |
| location-origin | ip+port | String | - | '' |
| menu-data | 菜单数据 | Array | - | [] |
| menu-active | 当前选中菜单项 | string | - | '' |
| menu-open | 当前展开菜单项 | String | — | '' |
| expand | 是否全部展开 | Boolean | - | true |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| menu-change | 触发子菜单 | model: 当前子菜单数据 |
| receive-message | 获取容器发送过来的消息 | 消息message |

### menu-data 数据项格式
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| url | 链接地址 | String | - | - |
| children | 子菜单 | Array | - | [] |
| modelcode | 菜单英文名 | String | - | - |
| modelname | 菜单中文名 | String | - | - |
| images | 图标 | String | - | - |
