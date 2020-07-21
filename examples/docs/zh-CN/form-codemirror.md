## Codemirror

Codemirror

### 基本用法


::: demo Codemirror
```html
<elx-form
  ref="form-codemirror"
  v-model="testData"
  :label-suffix="':'"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<script>
export default {
  data: function() {
    return {
      testData: {},
      config: {
        labelWidth: '90px',
        inline: false,
        fields: [
          {
            label: 'code',
            name: 'code',
            type: 'codeMirror',
            isShow: true,
            defaultValue: false,
            option: {
              mode: 'text/x-mysql',
              hintOptions: {
                list: []
              }
            },
            height: '300px',
            actionData: [
              {
                label: '数据字典',
                action: function() {
                  console.log('数据字典－action');
                }
              }
            ],
            rightClick: function(self, field, value) {
              console.log(self, field, value);
            },
            showHint: function(self, field, value) {
              console.log(self, field, value);
            },
            inputRead: function(cm, range, val) {
              var strArr = val.split(' ');
              var lastStr = strArr[strArr.length - 1];
              if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
              }
              this.timeout = setTimeout(function() {
                cm.options.hintOptions.list = ['a', 'b', 'c'];
                cm.showHint();
              }, 1000);
            },
            beforeRender: function(CodeMirror) {
              var WORD = /[\w$]+/, RANGE = 500;
              CodeMirror.registerHelper('hint', 'sql', function(editor, options) {
                var word = options && options.word || WORD;
                var range = options && options.range || RANGE;
                var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
                var end = cur.ch, start = end;
                while (start && word.test(curLine.charAt(start - 1))) --start;
                var curWord = start != end && curLine.slice(start, end);
                var list = options && options.list || [];
                return {list: list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end)};
              });
            }
          }
        ],
        rules: {
          code: [{
            validator: function(rule, value, callback) {
              if (value) {
                var regexp = /create\s+table/gi;
                if (regexp.test(value)) {
                  callback(new Error('不允许创建表'));
                }
              }
              callback();
            },
            trigger: 'change'
          }]
        }
      }
    }
  }
}
</script>

```
:::

### config>fields>codemirror field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['inputTransfer', 'remoteTransfer'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| option | 配置数据（<a href="https://codemirror.net/doc/manual.html#config" target="_blank">参照codemirror配置项</a>） | Object | — | {} |
| width | 宽度 | [String, Number] | - | '100%'' |
| height | 高度 | [String, Number] | — | '100px' |
| actionData | 右键菜单 | Array | — | [] |
| isShow | 是否展示 | Boolean | true,false | true |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
| show-hint | 自动联想时触发的事件（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
| right-click | 点击右键时触发的事件（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
| inputRead | 输入时调用 | Function(cm, range, val) | — | - |
| beforeRender | 渲染前调用 | Function(CodeMirror) | — | - |