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
<style>
  .demo-icon .source > i {
    font-size: 24px;
    color: #8492a6;
    margin: 0 20px;
    font-size: 1.5em;
    vertical-align: middle;
  }
  
  .demo-icon .source > button {
    margin: 0 20px;
  }

  .icon-list {
    overflow: hidden;
    list-style: none;
    padding: 0;
    border-radius: 4px;
  }
  .icon-list li {
    float: left;
    width: calc(33.333% - 2px);
    text-align: left;
    padding-left: 10px;
    line-height: 50px;
    color: #666;
    font-size: 13px;
    transition: color .15s linear;
    margin-right: 1px;
    margin-bottom: 1px;
    background: white;

    @utils-vertical-center;

    & span {
      display: inline-block;
      line-height: normal;
      vertical-align: middle;
      font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',SimSun,sans-serif;
      color: #99a9bf;
    }
    & i {
      font-size: 14px;
      margin-bottom: 15px;
      margin-right: 10px;
      color: #8492a6;
    }
    &:hover {
      color: rgb(92, 182, 255);
    }
  }
</style>
## Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `uex-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="uex-icon-edit"></i>
<i class="uex-icon-share"></i>
<i class="uex-icon-delete"></i>
<el-button type="primary" icon="search">搜索</el-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in icons">
    <span>
      <i :class="'uex-icon-' + name"></i>{{'uex-icon-' + name}}
    </span>
  </li>
</ul>
