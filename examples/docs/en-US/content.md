<script>
  export default {
    data: function(){
      return {
        src: "http://0.0.0.0:8085/#/zh-CN/component/content",
        type: "list",
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
<style>
.content-demo{

	height:300px;
}
.content-demo #content{
	background: green
}
</style>

## 模拟单页面应用

模拟单页面应用

### 基本用法


::: demo 模拟单页面应用
```html
<template>
  <div class="content-demo">
	  <elx-content @create="create" :icon="'uex-icon-add'" :icon-label="'哈哈'" :src="src"  :location-source="'http://0.0.0.0:8085/'" :type="type" @end-load="endLoad" @back-href="backHref" :list-title="'目录'" :create-title="'创建'">
	     <div id="content" slot="content"></div>
	  </elx-content>
  </div>
</template>
<script>
  export default {
  	data: function(){
  		return {
  			src: "http://0.0.0.0:8085/#/zh-CN/component/content",
  			type: "list",
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
|src | iframe地址 | String |－|''|
|type | 类型 | String |'list', 'create'|'list'|
|list-title | 列表名称 | String |－|'list'|
|create-title | 编辑名称 | String |－|'create'|
|icon | 图标class | String |－|'uex-icon-add'|
|icon-label | 图标提示文字 | String |－|'新增'|


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|back-href | 回退时间 |---------- |
|end-loading | iframe加载完 |---------- |
