## Select

Select

### 基本用法


::: demo Select
```html
<elx-form
  ref="form-select"
  v-model="testData"
  label-suffix=":"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<script>
export default {
  data: function() {
    return {
      testData: {},
      config: {
        labelWidth: '120px',
        inline: false,
        fields: [
          {
            label: 'FTP服务器名称',
            name: 'ftpId',
            type: 'select',
            options: [
              {label: 'a', value: 'a1'},
              {label: 'b', value: 'b1'}
            ],
            defaultValue: '',
            remark: '备注',
            isShow: true,
            isRemark: true,
            visibleChange: function(form, field, val, visible) {
              console.log('visible-change', form, field, val, visible);
            }
          },
          {
            label: '文件路径',
            name: 'path',
            type: 'select',
            options: [
              {value: 'CHNL_KIND_ID', label: 'CHNL_KIND_ID_XX'},
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
            ],
            renderContent: function (createElement, option) {
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
            defaultValue: '',
            filterable: true,
            isShow: true
          },
          {
            label: '选择输入框',
            name: 'selectInput',
            type: 'selectInput',
            options: [
              {label: 'a', value: 'a'},
              {label: 'b', value: 'b'},
              {label: 'c', value: 'c'}
            ],
            defautValue: '',
            isShow: true
          },
          {
            label: '文件编码',
            name: 'encoding',
            type: 'select',
            options: [
              {label: 'UTF-8', value: 'UTF-8'},
              {label: 'UTF-81', value: 'UTF-81'}
            ],
            defaultValue: 'UTF-8',
            clearable: true,
            isShow: true
          },
          {
            label: '消费对象名称',
            name: 'tabIds',
            type: 'select',
            options: [
              {label: 'insert', value: 'insert'},
              {label: 'update', value: 'update'},
              {label: 'delete', value: 'delete'},
              {label: 'put', value: 'put'}
            ],
            defaultValue: [],
            multiple: true,
            clearable: true,
            filterable: true,
            remote: true,
            loading: false,
            isPostRoot: true,
            isShow: true,
          }
        ]
      }
    }
  },
  watch: {
    testData: function() {
      console.log(this.testData);
      window.testData = this.testData;
    }
  }
}
</script>

```
:::
### config>fields>radio field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | - | - |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | - | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | - | - |
| type | 表单类型 | String | ['select', 'multipleSelect'] | - |
| defaultValue | 默认值 | - | - | - |
| options | 枚举项(详细配置见option详细配置表 | Array | - | - |
| placeholder | 输入框占位文本 | String | - | - |
| remark | 帮助信息 | String | - | - |
| loading | 是否正在从远程获取数据 | Boolean | - | false |
| clearable | 单选时是否可以清空选项 | Boolean | - | false |
| isPostRoot | 是否传递form组件对象 | Boolean | - | false |
| filterable | 是否可搜索 | Boolean | - | false |
| multiple | 是否多选 | Boolean | - | false |
| remote | 是否为远程搜索 | Boolean | - | false |
| isShow | 是否展示 | Boolean | true,false | true |
| isdisabled | 是否禁用 | Boolean | true,false | false |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| filterMethod | 自定义过滤方法 | Function | - | - |
| remoteMethod | 远程搜索方法 | Function | - | - |
| renderContent | 选项的内容区的渲染 Function（需必填option） | Function(h, { node } | - | - |
| visibleChange | 下拉框出现/隐藏时触发 | Function | - | - |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | - | - |

###  config>fields>field>options>option 详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | select option 标签文本 | String | - | - |
| value | select option 的值 | String | - | - |

