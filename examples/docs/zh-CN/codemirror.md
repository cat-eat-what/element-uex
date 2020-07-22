## codemirror

codemirror

### 基本用法


::: demo codemirror
```html
<elx-codemirror
  ref="codemirror"
  v-model="code"
  height="300px"
  :before-render="beforeRender"
  :input-read="inputRead"
  :action-data="actionData"
  :option="option"
  @show-hint="showHint"
  @right-click="rightClick">
</elx-codemirror>
<script>
  export default {
    data: function() {
      return {
        code: '',
        option: {
          mode: 'text/x-mysql',
          foldGutter: false,
          gutters: ['CodeMirror-linenumbers'],
          //mode: 'text/x-sh',
          hintOptions: {
            completeSingle: false,
            tables: {
              users: ["name", "score", "birthDate"],
              countries: ["name", "population", "size"]
            }
          }
          //mode: 'javascript'
        },
        actionData: [
          {
            "label": "test1test1test1test1",
            "action": function() {
              console.log('vfvfvf');
            }
          }
        ],
        timeout: null
      }
    },
    methods: {
      showHint: function(cm, table) {
        if (cm.options.hintOptions) {
          cm.options.hintOptions.tables['mkmk'] = ['a', 'b', 'c'];
        }
      },
      rightClick: function(cm) {
        this.actionData.push({
          "label": "test2",
          "action": function() {
            console.log('vfvfvf');
          }
        })
        console.log(cm);
      },
      inputRead: function(cm, range, val) {
        var strArr = val.split(' ');
        var lastStr = strArr[strArr.length - 1];
        if (this.timeout) {
          clearTimeout(this.timeout);
          this.timeout = null;
        }
        this.timeout = setTimeout(function() {
          //cm.options.hintOptions.list = ['a', 'b', 'c'];
          cm.showHint();
        }, 200);
      },
      beforeRender: function(CodeMirror) {
      }
    },
    created: function() {
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 数据绑定值 | String | — | '' |
| option | 配置数据（<a href="https://codemirror.net/doc/manual.html#config" target="_blank">参照codemirror配置项</a>） | Object | — | {} |
| width | 宽度 | [String, Number] | - | '100%'' |
| height | 高度 | [String, Number] | — | '100px' |
| actionData | 右键菜单 | Array | — | [] |
| inputRead | 输入时调用 | Function(cm, range, val) | — | - |
| beforeRender | 渲染前调用 | Function(CodeMirror) | — | - |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| right-click | 点击右键时触发的事件 | cm |
| change | 当绑定值变化时触发的事件 | val |
