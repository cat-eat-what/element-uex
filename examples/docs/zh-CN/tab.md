## tab标签页

tab标签页

### 基本用法


::: demo tab标签页
```html
<div class="demoTab">
  <!-- 需加elx-tab-frame包裹-->
  <div class="elx-tab-frame">
    <elx-tabs
      v-model="tabActiveIndex"
      type="border-card"
      closable
      @tab-contextmenu="handleTabContextmenu"
      @tab-remove="removeTab">
      <!-- 页面标题 -->
      <div class="title" slot="title" @click="backMain">
        <span class="icon uex-icon-menu-card"></span>
        <span v-html="title"></span>
      </div>
      <!-- 无tab页或者tabActiveIndex == 'nothing'时展示-->
      <div v-show="tabActiveIndex=='nothing'">
        <el-button @click.native="addTab">新增tab</el-button>
        <ul class="list">
          <li v-for="item in list">
            <span v-text="item.name"></span>
            <span v-text="item.label"></span>
            <span v-text="item.url"></span>
            <span class="uex-icon-edit" @click="editItem(item)"></span>
          </li>
        </ul>
      </div>
      <!-- 标签页 -->
      <el-tab-pane
        v-show="tabActiveIndex!='nothing'&&tabActiveIndex == item.name"
        v-for="(item, index) in tabData"
        :label="item.label"
        :name="item.name">
        <template slot="label">
          <span v-html="item.label"></span>
          <!--<elx-tab-label :label="item.label" :change="item.change"></elx-tab-label>-->
        </template>
        <iframe :src="item.url"></iframe>
      </el-tab-pane>
    </elx-tabs>
    <elx-context-menu
      :data="actionData"
      :width="90"
      :x="pos.x"
      :y="pos.y"
      :visible="contentMenuShow"
      :tip-show="false"
      @action="action">
    </elx-context-menu>
  </div>
</div>
<script>
  export default {
    data: function() {
      return {
        tabData: [],
        tabActiveIndex: 'nothing',
        tabContextmenuActive: '',
        title: '资产管理页面',
        list: [
          {name: '1' , label: 'TAB1', url: 'https://www.baidu.com/'},
          {name: '2' , label: 'TAB2', url: 'https://www.baidu.com/'},
          {name: '3' , label: 'TAB3', url: 'https://www.baidu.com/'},
          {name: '4' , label: 'TAB4', url: 'https://www.baidu.com/'},
          {name: '5' , label: 'TAB5', url: 'https://www.baidu.com/'}
        ],
        pos: {
          x: 0,
          y: 0
        },
        actionData: [
          {label: '关闭当前', action: 'current'},
          {label: '关闭其他', action: 'other'},
          {label: '关闭所有', action: 'all'}
        ],
        contentMenuShow: false
      }
    },
    methods: {
      removeTab: function(name) {
        var self = this;
        var filterTabData = [];
        _.map(this.tabData, function(tab) {
          if (tab.name === name) {
            var index = self.tabData.indexOf(tab);
            var nextTab = self.tabData[index + 1] || self.tabData[index - 1];
            self.tabActiveIndex = nextTab ? nextTab.name : 'nothing';
          } else {
            filterTabData.push(tab)
          }
        });
        this.tabData = filterTabData;
      },
      openTab: function(data) {
        var self = this;
        var filterTabData = [];
        this.tabActiveIndex = this.tabData > 0 ? this.tabData[this.tabData.length - 1].name : this.tabActiveIndex;
        this.$nextTick(function() {
          _.map(self.tabData, function(tab) {
            if(tab.name === data.name){
              filterTabData.push(tab);
            }
          });
          if (filterTabData.length === 0) {
            self.tabData.push(data);
            self.$nextTick(function() {
              self.tabActiveIndex = data.name;
            });
          } else {
            self.tabActiveIndex = filterTabData[0].name;
          }
        })
      },
      backMain: function() {
        this.tabActiveIndex = "nothing";
      },
      editItem: function(item) {
        this.openTab({
          name: item.name,
          label: item.label,
          change: false,
          url: item.url
        });
      },
      addTab: function() {
        this.openTab({
          name: String(new Date().getTime()),
          label: '新增',
          change: false,
          url: 'https://www.baidu.com/'
        });
      },
      handleTabContextmenu: function(tab, tabName, event) {
        this.tabContextmenuActive = tabName;
        var e = event || window.event;
        var pos = this.getEventPos(e);
        if (e.which === 3) {
          this.contentMenuShow = false;
          this.pos.x = pos.x;
          this.pos.y = pos.y;
          this.contentMenuShow = true;
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      preventDefault: function(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnvalue = false;
        }
      },
      action: function(data) {
        var self = this;
        this.contentMenuShow = false;
        if (data.action == 'current') {
          this.removeTab(this.tabContextmenuActive);
        } else if (data.action == 'other') {
          this.tabData = _.filter(this.tabData, function(tab) {
            return tab.name === self.tabContextmenuActive;
          });
          this.tabActiveIndex = this.tabContextmenuActive;
        } else if (data.action == 'all') {
          this.tabData = [];
          this.tabActiveIndex = 'nothing';
        }
      },
      renderTabLabel: function(item) {
        console.log(this, item);
        console.log(this.$createElement);
        //return item.label;
        var node = this.$createElement('span', item.label);
        console.log(node);
        return '<span>' + item.label + '</span>';
      }
    },
    watch: {
      tabActiveIndex: function() {

      }
    },
    created: function() {
    },
    mounted: function() {
      var self = this;
      this.$nextTick(function() {
        var el = document.body;
        var handleDisplay = function() {
          self.contentMenuShow = false;
        }
        if (el.addEventListener) {
            el.addEventListener('click', handleDisplay);
        } else if (el.attachEvent)  {
            el.attachEvent('onclick', handleDisplay);
        }
      });
    }
  }
</script>
```
:::



### tabData
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | tab唯一值判定 | Number,String | - | - |
| label | tab标签页名称 | String | - | - |
| url | tab标签页url地址 | String | - | - |

### elx-tabs Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 风格类型 | String | card/border-card | - |
| active-name | 选中选项卡的 name | String | - | 第一个选项卡的 name |
| closable | 标签是否可关闭 | Boolean | - | - |
| addable | 标签是否可增加 | Boolean | - | - |
| value | 绑定值，选中选项卡的 name | String | - | 第一个选项卡的 name |
| editable | 标签是否同时可增加和关闭 | Boolean | - | - |

### el-tab-pane Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | tab唯一值判定 | Number,String | - | - |
| label | tab标签页名称 | String | - | - |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| edit | 点击 tabs 的新增按钮或 tab 被关闭后触发 | (targetName, action) |
| tab-remove | 点击 tab 移除按钮后触发 | 被删除的标签的name |
| tab-click | tab 被选中时触发 | 被选中的标签 tab 实例 |
| tab-contextmenu | tab右键单击时触发 | 当前标签 tab 实例 |
| tab-add | 点击 tabs 的新增按钮后触发 | - |
