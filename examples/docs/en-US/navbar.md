<script>
  import testMenuData from '../../../examples/assets/menu.json';
  export default {
    data:function(){
	    return {
	    	testMenuData: [],
	    	title: 'API管理',
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: 'api_catalog_1_2',
	    	menuOpen: '',
	    	menuType: 'outer',
	    	filter: null,
	    	searchFocus: false,
	    	guideArrowShow: false,
	    	refresh: 0,
	    	options: [
		    	{
		          value: 'api_catalog_1_1',
		          label: 'API目录_1_1'
		        }, 
		        {
		          value: 'cert_mgr',
		          label: '证书管理'
		        },
		        {
		          value: 'add_data',
		          label: '数据注册'
		        }
	        ],
	        openValue: '',
	        activeValue: ''	
		}
	},
	methods: {
		menuChange: function(model) {
		    this.focusMenu = model.modelcode;
		    console.log(model);
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
	}
  }
</script>
<style>
.nav-demo{
	height: 500px;
	overflow: hidden;
	position: relative;
}
.openDemo{
	position: absolute;
	right: 50px;
	top: 0px;
}
.activeDemo{
	position: absolute;
	right: 50px;
	top: 80px;
}
.guideDemo{
    position: absolute;
	right: 50px;
	top: 160px;	
}
</style>

## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<template>
  <div class="nav-demo">
    <elx-navbar :nav-data="testMenuData"></elx-navbar>
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
			    //console.log(model.url);
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
| nav-data | 菜单数据 | Array    | — | [] |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |

