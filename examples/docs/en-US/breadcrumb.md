<script>
  import testMenuData from '../../../examples/assets/menu.json';
  export default {
    data:function(){
	    return {
	    	testMenuData: [],
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: 'api_catalog_1_2',
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
		sidebarOpen: function(type){
			this.menuType = type;
		    if(type === 'narrow'){
		    	$('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","52px");
		    }else{
		    	$('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","182px");
		    }
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
			node.open=false;
			node.active=false;
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
	}
  }
</script>
<style>
.menu-demo{
	height: 400px;
	overflow: hidden;
	position: relative;
}
.breadcrumbDemo{
    background-color: #303643;
    position: absolute;
	right: 0px;
	top: 0px;		
}
</style>

## 面包屑

面包屑。

### 基本用法


::: demo 面包屑
```html
<template>
  <div class="menu-demo">
  <elx-menu v-on:sidebar-open="sidebarOpen" v-on:menu-change="menuChange" :menu-active="menuActive" :menu-open='menuOpen' :menu-data="testMenuData" :type="'outer'" :guide-arrow-show="guideArrowShow"></elx-menu>
  <div class="breadcrumbDemo">
	  <elx-breadcrumb :menu-data="testMenuData" :refresh="refresh"></elx-breadcrumb>
  </div>
  </div>
</template>
<script>
  import testMenuData from '../../../examples/assets/menu.json';
  export default {
    data:function(){
	    return {
	    	testMenuData: [],
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: 'api_catalog_1_2',
	    	menuOpenActive: '',
	    	menuType: 'outer',
	    	filter: null,
	    	searchFocus: false
	    }	
		},
		methods:{
			menuChange: function(model) {
			    this.focusMenu = model.modelcode;
			    this.refresh++;
			},
			sidebarOpen: function(type){
				this.menuType = type;
			    if(type === 'narrow'){
			    	$('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","52px");
			    }else{
			    	$('.dataex-layout .dataex-container.include-sidemenu').css("margin-left","182px");
			    }
			}
		},
		created: function() {
			var fun=function(node){
				node.open=false;
				node.active=false;
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
		}
  }
</script>
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| menu-data     | 数据  | Array |   －   | [ ] |
| refresh     | 刷新面包屑   | Number | － | 0 |


