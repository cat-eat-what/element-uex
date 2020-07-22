<script>
  import testMenuData from '../../../examples/assets/menu.json';
  export default {
    data:function(){
	    return {
	    	testMenuData: [],
	    	menuActive: '',
	    	menuOpen: '',
	    	menuType: 'outer',
	    	searchFocus: false,
	    	guideArrowShow: false
		}
	},
	methods: {
		menuChange: function(model) {
			console.log(model);
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
		var fun=function(node){
			node.open=true;
			node.active=false;
			node.modelcode=node.menuId;
			node.parentcode=node.parentId;
			node.modelname=node.menuName;
			node.modeltype=node.menuType;
			node.images=node.menuIcon;
			if(node.children.length==0)
				return;
			for(var i=0;i<node.children.length;i++){
				fun(node.children[i]);
			}
		};
		for (var i = 0;i < testMenuData.length;i++) {
			fun(testMenuData[i]);
		}
		this.testMenuData = testMenuData;
		console.log(this.testMenuData)
	}
  }
</script>
<style>
.menu-demo{
	height: 400px;
	overflow: hidden;
	position: relative;
}
</style>

## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<template>
  <div class="menu-demo">
  	  <elx-menu-expand :title="'角色'" :menu-data.sync="testMenuData" @menu-change = "menuChange"></elx-menu-expand>
  </div>
</template>
<script>
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |

