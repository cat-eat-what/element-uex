## Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。



### 可搜索

可以利用搜索功能快速查找选项

:::demo 为`elx-select`添加`filterable`属性即可启用搜索功能。默认情况下，Select 会找出所有`label`属性包含输入值的选项。如果希望使用其他的搜索逻辑，可以通过传入一个`filter-method`来实现。`filter-method`为一个`Function`，它会在输入值发生变化时调用，参数为当前输入值。
```html
<style>
  .demo-select .el-select {
    width: 400px;
  }
</style>
<elx-select v-model="value1" type="card" multiple clearable filterable placeholder="请选择" @change="change">
  <elx-option
    style="width: calc((100% - 60px) / 5); margin-left: 10px;"
    v-for="(item, index) in options"
    :render-content="renderOptionCard"
    :key="index"
    :option="item"
    :label="item.label"
    :value="item.value">
  </elx-option>
</elx-select>
<br/>
<elx-select v-model="value" clearable filterable placeholder="请选择" @change="change">
  <elx-option
    v-for="(item, index) in options"
    :render-content="renderOption"
    :key="index"
    :option="item"
    :label="item.label"
    :value="item.value">
  </elx-option>
</elx-select>

<script>
  export default {
    data: function() {
      return {
        options: [],
        value: 'PARENT_CHNL_KIND_ID',
        value1: []
      };
    },
    methods: {
      renderOptionCard: function (createElement, option) {
        if (createElement) {
          var createColumn = function(pos, val) {
            return createElement(
              'el-tooltip', {
                props: {
                  placement: pos,
                  content: val
                }
              },
              [createElement(
                'span', {
                  attrs: {
                    class: 'option-value'
                  },
                  style: {
                    width: '100%',
                    display: 'inline-block',
                    overflow: 'hidden',
                    'text-align': 'left',
                    'text-overflow': 'ellipsis',
                  },
                  domProps: {
                    innerHTML: val
                  }
                }
              )]
            )
          };
          return createElement(
            'div', {
              attrs: {
                class: 'option-card'
              }
            }, [
              createColumn('top', option.label)
            ]
          );
        }
      },
      renderOption: function (createElement, option) {
        if (createElement) {
          var createColumn = function(pos, val) {
            return createElement(
              'el-tooltip', {
                props: {
                  placement: pos,
                  content: val
                }
              },
              [createElement(
                'span', {
                  style: {
                    width: '50%',
                    display: 'inline-block',
                    overflow: 'hidden',
                    'text-align': 'left',
                    'text-overflow': 'ellipsis',
                  },
                  domProps: {
                    innerHTML: val
                  }
                }
              )]
            )
          };
          return createElement(
            'div', [
              createColumn('left', option.value),
              createColumn('right', option.label),
            ]
          );
        }
      },
      remoteMethod: function(val) {
        console.log(val);
      },
      changeNumber: function(val) {
        console.log(val, typeof val);
      },
      getForm: function(val) {
        console.log(this.ruleForm2);
      },
      change: function() {
      }
    },
    watch: {
      age: function(val) {
      }
    },
    created: function() {
      var self = this;
      setTimeout(function() {
        self.options = [
          {value: 'CHNL_KIND_ID', label: 'CHNL_KIND_IDCHNL_KIND_IDCHNL_KIND_IDCHNL_KIND_IDCHNL_KIND_IDCHNL_KIND_ID'},
          {value: 'CHNL_KIND_NAME', label: 'CHNL_KIND_NAME_XX'},
          {value: 'PARENT_CHNL_KIND_ID', label: 'PARENT_CHNL_KIND_ID_XX'},
          {value: 'PARENT_CHNL_KIND_NAME', label: 'PARENT_CHNL_KIND_NAME_XX'},
          {value: 'CHNL_KIND_FRAME', label: 'CHNL_KIND_FRAME_XX'},
          {value: 'GROUP_KIND_ID', label: 'GROUP_KIND_ID_XX'},
          {value: 'GROUP_KIND_NAME', label: 'GROUP_KIND_NAME_XX'},
          {value: 'OPER_TYPE_CODE', label: 'OPER_TYPE_CODE_XX'},
          {value: 'SELECTABLE', label: 'SELECTABLE_XX'},
          {value: 'STATE', label: 'STATE_XX'},
          {value: 'UPDATE_TIME', label: 'UPDATE_TIME_XX'},
          {value: 'UPDATE_STAFF_ID', label: 'UPDATE_STAFF_ID_XX'},
          {value: 'UPDATE_DEPART_ID', label: 'UPDATE_DEPART_ID_XX'},
          {value: 'REMARK', label: 'REMARK_XX'}
        ];
      }, 1000);
    }
  };
</script>

```
:::



### Select Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | select input 的 name 属性 | string | - | - |
| value | 数据绑定值 | - | - | - |
| size | 输入框尺寸 | string | large/small/mini | - |
| root | 所需传递的组件 | Object | - | - |
| is-post-root | 是否传递组件 | Boolean | - | false |
| disabled | 是否禁用 | boolean | - | false |
| clearable | 单选时是否可以清空选项 | boolean | - | false |
| filterable | 是否可搜索 | boolean | - | false |
| loading | 是否正在从远程获取数据 | boolean | - | false |
| remote | 是否为远程搜索 | boolean | - | false |
| remote-method | 远程搜索方法 | function | - | - |
| filter-method | 自定义过滤方法 | function | - | - |
| multiple | 是否多选 | boolean | - | false |
| placeholder | 占位符 | string | - | 请选择 |

### Select Events
| 事件名称 | 说明 | 回调参数 |
|---------|---------|---------|
| change | 选中值发生变化时触发 | 目前的选中值 |
| visible-change | 下拉框出现/隐藏时触发 | 出现则为 true，隐藏则为 false |

### Option Group Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 分组的组名 | string | - | - |
| disabled | 是否将该分组下所有选项置为禁用 | boolean | - | false |

### Option Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 选项的值 | string/number/object | - | - |
| label | 选项的标签，若不设置则默认与 `value` 相同 | string/number | - | - |
| disabled | 是否禁用该选项 | boolean | - | false |
| option | 选项数据 | Object | - | - |
| renderContent | 选项的内容区的渲染 Function（需必填option） | Function(h, { node } | - | - |
