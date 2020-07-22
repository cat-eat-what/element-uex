## 模拟单页面应用

模拟单页面应用

### 基本用法


::: demo 模拟单页面应用
```html
<div class="content-demo">
  <elx-content
    list-title="目录"
    create-title="创建"
    icon="uex-icon-add"
    icon-label="哈哈"
    location-source="http://0.0.0.0:8085/"
    :src="src"
    :switch-ani="false"
    :type="type"
    @create="create"
    @end-load="endLoad"
    @back-href="backHref">
    <div id="content" slot="content"></div>
  </elx-content>
</div>
<script>
  export default {
    data: function(){
      return {
        src: 'https://www.baidu.com/',
        type: 'list',
      }
    },
    methods: {
      backHref: function(){
        console.log('back');
      },
      endLoad: function(){
        console.log("kkk");
      },
      create: function(){
        console.log("aaa")
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| list-title | 列表名称 | String | - | 'list' |
| create-title | 编辑名称 | String | - | 'create' |
| type | 类型 | String | 'list', 'create' | 'list' |
| src | iframe地址 | String | - | '' |
| location-origin | ip+port | String | - | '' |
| icon-label | 图标提示文字 | String | - | '新增' |
| icon | 图标class | String | - | 'uex-icon-add' |
| switch-ani | 是否有切换动画 | Boolean | - | true |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| back-href | 回退到主页面时触发事件 | - |
| end-load | 下级iframe加载完所触发的事件 | - |
| create | 点击新增时触发的事件 | - |
| receive-message | 接收到消息时所触发的事件 | message |
