<script>
  import testMenuData from '../../../examples/assets/test1.json';
  export default {
    data:function(){
	    return {
	    	testMenuData: [],
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: '',
	    	menuOpen: '',
	    	menuType: 'outer',
	    	filter: null,
	    	searchFocus: false,
	    	guideArrowShow: false,
	    	refresh: 0,
	    	showOptions: [
		    	{
		          value: 'narrow',
		          label: 'narrow'
		        }, 
		        {
		          value: 'outer',
		          label: 'outer'
		        }
	        ],
	    	options: [
		    	{
		          value: 'data-dev',
		          label: '数据开发'
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
		},
		lastChildNodeClick: function(model){
			console.log("ll")
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
.menu-demo{
	height: 100px;
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
.showDemo{
    position: absolute;
	right: 50px;
	top: 220px;	
}
</style>

## 菜单

可收缩菜单。

### 基本用法


::: demo 菜单
```html
<template>
  <div class="menu-demo">
  <elx-menu v-on:sidebar-open="sidebarOpen" v-on:last-child-node-click="lastChildNodeClick" :location-source="'http://0.0.0.0:8085/'" :is-post="true" :post-message="'hide'" v-on:menu-change="menuChange" :menu-active.sync="menuActive" :menu-open='menuOpen' :menu-data="testMenuData" :menu-type="menuType" :guide-arrow-show="guideArrowShow"></elx-menu>
  <div class="openDemo">
  	  选择open菜单
  	  <br/><br/>
	  <el-select v-model="openValue" placeholder="请选择" >
	    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
	  </el-select>
  </div>
  <div class="activeDemo">
  	  选择active菜单
  	  <br/><br/>
	  <el-select v-model="activeValue" placeholder="请选择" >
	    <el-option v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
	  </el-select>
  </div>
  <div class="showDemo">
  	  show
  	  <br/><br/>
	  <el-select v-model="menuType" placeholder="请选择" >
	    <el-option v-for="(item, index) in showOptions" :key="index" :label="item.label" :value="item.value"></el-option>
	  </el-select>
  </div>
  <div class="guideDemo">
  	  guide
  	  <br/><br/>
	  <el-switch
		  v-model="guideArrowShow"
		  on-color="#13ce66"
		  off-color="#ff4949">
		</el-switch>
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
			},
			lastChildNodeClick: function(model){
				console.log("ll")
			}
		},
		watch: {
			'menuActive': function(val, oldVal){
				console.log(val);
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
| menu-active     | 当前选中菜单项   | string  |   －   | '' |
| type     | 当前菜单类型   | string    | outer,narrow | 'outer' |
| menu-data | 菜单数据 | Array    | — | [] |
| menu－open | 当前展开菜单项 | String    | — | '' |
| guide-arrow-show | 是否出现向导箭头 | Boolean    | — | false |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| sidebar-open  | 菜单形式切换 | type: 菜单类型  |
| menu-change  | 当前active菜单数据 | model: 当前子菜单数据  |
| last-child-node-click  | 分支最后子节点点击事件 | model: 当前子菜单数据  |

