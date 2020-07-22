<script>
  export default {
  	data: function(){
  		return {
  			loading: true
  		}
  	},
  	methods: {
  		test: function(){
  			this.loading = !this.loading;
  		}
  	}
  }
</script>
<style>
.main-demo{
	height:300px;
	background-color: green
}
</style>

## 页面加载

页面加载，防止闪烁

### 基本用法


::: demo 页面加载
```html
<template>
  <div class="main-demo">
	  <elx-main :fullscreen-loading.sync="loading">
	     <div id="content"></div>
	  </elx-main>
	  <button @click="test">test</button>
  </div>
  <script>
	  export default {
	  }
	</script>
</template>
```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
|fullscreen-loading | 是否加载 | Boolean |－|true|


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
