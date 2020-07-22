<script>
  import testMenuData from '../../../examples/assets/test1.json';
  export default {
    data:function(){
	    return {
	    	show: false,
	    	message: {menuType: 'narrow'},
	    	testMenuData: [],
	    	title: 'API管理',
	    	descr: '服务器分配的注释文字文字',
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: '',
	    	menuOpen: '',
	    	menuType: 'outer',
	    	filter: null,
	    	searchFocus: false,
	    	guideArrowShow: false,
	    	refresh: 0,
	    	options: [],
	        openValue: '',
	        activeValue: '',
	        locationOrigin: location.origin
		}
	},
	methods: {
		receiveMessage: function(message){
			console.log(message);
		},
		menuChange: function(model) {
		    this.focusMenu = model.modelcode;
		    console.log(model);
		    this.refresh++;
		},
		sidebarOpen: function(show){
			console.log(show);
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
  <div class="menu-demo">
  <elx-sidebar-p  :show.sync="show" :location-origin="locationOrigin" :title="title" :is-post="false" :message="message" :descr="descr" v-on:sidebar-open="sidebarOpen" v-on:menu-change="menuChange" :menu-active.sync="menuActive" :menu-open='menuOpen' :menu-data="testMenuData"  :guide-arrow-show="guideArrowShow"></elx-sidebar-p>
  
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
  import testMenuData from '../../../examples/assets/sidebar.json';
  export default {
    data:function(){
	    return {
	    	message: {menuType: 'narrow'},
	    	testMenuData: [],
	    	title: 'API管理',
	    	descr: '服务器分配的注释文字，这里可以放数据库分配的注释文字。',
	    	refresh:0,
	    	focusMenu: '',
	    	menuActive: '',
	    	menuOpen: '',
	    	menuType: 'outer',
	    	filter: null,
	    	searchFocus: false,
	    	guideArrowShow: false,
	    	refresh: 0,
	    	options: [],
	        openValue: '',
	        activeValue: '',
	        locationOrigin: location.origin
		}
	},
	methods: {
		receiveMessage: function(message){
			console.log(message);
		},
		menuChange: function(model) {
		    this.focusMenu = model.modelcode;
		    console.log(model);
		    this.refresh++;
		},
		sidebarOpen: function(show){
			console.log(show);
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
```
:::


### Menu Attribute
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| is-post | 是否向上层容器传递消息   | Boolean  |   －   | false |
| message | 传递的消息内容   | Array, Object, Number, String  |   －   | '' |
| location-origin | ip+port   | String  |   －   | '' |
| title | 标题   | String  |   －   | '暂无' |
| descr | 描述   | String  |   －   | '暂无' |
| menu-data | 菜单数据 | Array    | — | [] |
| show     | 当前菜单类型，菜单为窄菜单还是宽菜单   | Boolean    | － | true |
| menu-active     | 当前选中菜单项   | string  |   －   | '' |
| menu－open | 当前展开菜单项 | String    | — | '' |
| guide-arrow-show | 是否出现向导箭头 | Boolean    | — | false |

### Menu Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| sidebar-open  | 菜单形式切换 | type: 菜单类型  |
| menu-change  | 触发子菜单 | model: 当前子菜单数据  |
| receive-message  | 获取容器发送过来的消息 | 消息message  |

