## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `uex-icon-iconName` 来使用即可。例如：

:::demo
```html
<div class="zxb zxb-5"></div>
<i class="demo-icon uex-icon-edit"></i>
<i class="demo-icon uex-icon-share"></i>
<i class="demo-icon uex-icon-delete"></i>

```
:::

### 图标集合

:::demo
```html
<ul class="icon-list">
  <li v-for="name in icons">
    <span>
      <i :class="'uex-icon-' + name"></i>{{'uex-icon-' + name}}
    </span>
  </li>
</ul>
<script>
  var iconList = require('examples/icon.json');

  export default {
    data() {
      return {
        icons: iconList
      };
    }
  }
</script>

```
