<script>
  export default {
  	data: function() {
      return {
        tableData: [
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },

            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "authVerify",
                "stepType": "输入区",
                "actions": [
                    {"label": "test1test1test1", "action": "aaaa"},
                    {"label": "test2", "action": "bbbb"}
                ]
            },
            {
                "stepInst": "paramCheck",
                "stepType": "输入区",
                "actions": [
                    {"label": "test3", "action": "aaaa1"},
                    {"label": "test4", "action": "bbbb1"}
                ]
            },
            {
                "stepInst": "paramsConvert",
                "stepType": "输入区",
                "actions": [
                  {
                    "label": "test1test1test1test1", 
                    "action": "action1"
                  },
                  {
                    "label": "test2test2test2", 
                    "action": "action2",
                    "children": [
                      {
                        "label": "test21est21est21", 
                        "action": "action21",
                        "children": [
                          {
                            "label": "test211test211test211", 
                            "action": "action211"
                          },
                          {
                            "label": "test212test212test212", 
                            "action": "action212"
                          }
                        ]
                      },
                      {
                        "label": "test22test22test22", 
                        "action": "action22"
                      },
                    ]
                  }
                ]
            }
        ],
        pos: {
            x: 0,
            y: 0
        },
        actionData: [],
        contentMenuShow: false
      }
    },
    methods: {
      getEventPos: function(e) {
          var x = e.clientX;
          var y = e.clientY;
          return { 'x': x, 'y': y };
      },
      rowContextmenu: function(row, event) {
          var e = event || window.event;
          var pos = this.getEventPos(e);
          if (e.which === 3) {
              this.contentMenuShow = false;
              this.pos.x = pos.x;
              this.pos.y = pos.y;
              this.actionData = row.actions;
              this.contentMenuShow = true;
          }
          this.preventDefault(e);
          e.returnValue = false;
          return false;
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
        console.log(data);
        alert(data.action);
        this.contentMenuShow = false;
      }
    },
    created: function() {
    },
    mounted: function() {
        var _self = this;
        this.$nextTick(function() {
          var el = document.body;
          var handleDisplay = function() {
              _self.contentMenuShow = false;
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
<style>
.main-demo{
	height:300px;
}
</style>

## context-menu

context-menu

### 基本用法


::: demo context-menu
```html
<template>
  <div id="main" class="main-demo">
      <elx-main>
          <div id="content" class="layout">
        <el-table :data="tableData" border style="width: 100%" @row-contextmenu="rowContextmenu">
              <el-table-column prop="stepInst" label="指令" show-overflow-tooltip></el-table-column>
              <el-table-column prop="stepType" label="所属区域" show-overflow-tooltip></el-table-column>
          </el-table>
                <elx-context-menu @action="action"  :data="actionData" :width="90" :visible="contentMenuShow" :x="pos.x" :y="pos.y"></elx-context-menu>
          </div>
    </elx-main> 
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


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
