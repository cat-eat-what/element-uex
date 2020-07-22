## 表单

表单控件。

### 基本用法


::: demo 表单控件
```html
<elx-form
  ref="testForm"
  :label-suffix="':'"
  v-model="testData"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<el-button @click="validate">验证</el-button>

<script>
  export default {
    data: function() {
      return {
        testData: {
          field: 'javascript,javascript1',
          tabIds: ['insert'],
          label: 'FTP采集',
          ftpId: 'a1',
          path: 'fr',
          sourceFiles: 'gtgt',
          encoding: 'UTF-8',
          isEditColumn: '1',
          column: [
            {index: 1, type: 'date', name: '', format: 'mjmj'}
          ],
          compress: 'bzip2',
          skipHeader: '0',
          nullFormat: '\\\\N',
          fieldDelimiter: ', ',
          code: 'test'
        },
        config: {
          //inline: true,
          labelWidth: '140px',
            fields: [
              {
                label: 'FTP服务器名称',
                name: 'ftpId',
                type: 'select',
                options:[
                  {label: 'a', value: 'a1'},
                  {label: 'b', value: 'b1'}
                ],
                isShow:true,
                defaultValue: '',
                isRemark: true,
                remark: '备注',
                change: function(self) {
                  self.currentConfig.fields[1].options = [];
                  self.currentConfig.fields[1].isdisabled = true;
                  console.log(self);
                }
              },
              {
                label: '文件路径',
                name: 'path',
                type: 'select',
                filterable: true,
                isShow: true,
                options: [
                  {value: 'CHNL_KIND_ID', label: 'CHNL_KIND_ID_XX'},
                  {value: 'CHNL_KIND_NAME', label: 'CHNL_KIND_NAME_XX'}
                ],
                defaultValue: '',
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
                }
              },
              {
                label: 'field',
                name: 'field',
                type: 'inputTransfer',
                isShow: true,
                defaultValue: '',
                getRequestUrl: function() {
                  return '/api/data';
                },
                getOptionsUrl: function() {
                  return '/api/option';
                },
                transferProps: {
                  key: 'stepInst',
                  search: 'stepInstLabel'
                },
                optionProps: {
                  value: 'stepInst',
                  label: 'stepInstLabel'
                },
                column: {
                  stepInst: '指令',
                  stepInstLabel: '指令名称'
                }
              },
              {
                label: '及联',
                name: 'cascader',
                type: 'cascader',
                isShow: true,
                defaultValue: [],
                changeOnSelect: false,
                showAllLevels: false,
                options: [
                  {label: '江苏', cities: []},
                  {label: '浙江', cities: []}
                ],
                props: {
                  value: 'label',
                  children: 'cities'
                },
                activeItemChange: function(val, self) {
                  var field = _.find(self.currentConfig.fields, function(item) {
                    return item.name == 'cascader';
                  });
                  setTimeout(function() {
                    if (val.indexOf('江苏') > -1 && !field.options[0].cities.length) {
                      field.options[0].cities = [{
                        label: '南京'
                      }];
                    } else if (val.indexOf('浙江') > -1 && !field.options[1].cities.length) {
                      field.options[1].cities = [{
                        label: '杭州'
                      }];
                    }
                  }, 300);
                },
                change: function(self) {
                }
              },
              {
                label: '是否编辑文件列',
                name: 'isEditColumn',
                type: 'radio',
                options: [
                  {label: '是', value: '1'},
                  {label: '否', value: '0'}
                ],
                isShow: true,
                defaultValue: '0',
                relatedItems: ['column']
              },
              {
                label: '是否跳过首行',
                name: 'skipHeader',
                type: 'radioCard',
                options:[
                  {label: '是', value: '1'},
                  {label: '否', value: '0'}
                ],
                isShow: true,
                defaultValue: '0'
              },
              {
                label: '文件名',
                name: 'sourceFiles',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              },
              {
                label: '文件编码',
                name: 'encoding',
                type: 'select',
                clearable: true,
                options: [
                  {label: 'UTF-8', value: 'UTF-8'},
                  {label: 'UTF-81', value: 'UTF-81'}
                ],
                isShow: true,
                defaultValue: 'UTF-8'
              },
              {
                label: '文件列',
                name: 'column',
                type: 'tableForm',
                config: {
                  fields: [
                    {
                      name: 'type11',
                      columnLabel: '类型11',
                      label: '',
                      type: 'select',
                      filterable: true,
                      remote: true,
                      isPostRoot: true,
                      loading: false,
                      remoteMethod: function(self, query) {
                        var field = _.filter(self.currentConfig.fields, function(item) {
                          return item.name == 'type11';
                        })
                        if (field.length == 1) {
                          console.log(query);
                          field[0].loading = true;
                          field[0].options = [{label: 1, value: 1}];
                          field[0].loading = false;
                        }
                      },
                      options: [
                        {
                          label: 'CEM前台测试',
                          value: 'cemqtcs'
                        }, {
                          label: '测试集群【DM】',
                          value: '77_DM'
                        }
                      ],
                      isShow: true,
                      defaultValue: "cemqtcs"
                    },
                    {
                      name: 'index',
                      columnLabel: '序号',
                      label: '',
                      type: 'inputText',
                      isShow: true,
                      defaultValue: '',
                      change: function(self){
                        if (self.currentValue.index) {
                          self.currentValue.value = '';
                        }
                      }
                    },
                    {
                      name: 'value',
                      columnLabel: '常量',
                      label: '',
                      type: 'inputText',
                      isShow: true,
                      defaultValue: '',
                      change: function(self){
                        if (self.currentValue.value) {
                          self.currentValue.index = '';
                        }
                      }
                    },
                    {
                      name: 'format',
                      columnLabel: '格式',
                      label: '',
                      type: 'inputText',
                      isShow: true,
                      defaultValue: ''
                    }
                  ],
                  rules: {
                    index: [
                      {
                        validator: function(rule, value, callback) {
                          console.log(value);
                          if (value) {
                            value = Number(value);
                            if (typeof value == 'number') {
                              if (!Number.isInteger(value)) {
                                callback(new Error('请输入数字值'));
                              }
                            }
                          }
                          callback();
                        },
                        trigger: 'blur'
                      }
                    ]
                  },
                  editType: 'single',
                  rowKey: function(row) {
                    return row.id;
                  },
                  change: function(self) {
                    self.currentValue.column = _.map(self.currentValue.column, function(field) {
                      if(!field.id || field.id == '') {
                        field.id = new Date().getTime();
                      } return field;
                    });
                  }
                },
                isShow: false,
                dependVal: ['1'],
                defaultValue: ['*']
              },
              {
                label: '表单组合',
                name: 'formGroup',
                type: 'formGroup',
                config: {
                  fields: [
                    {
                      name: 'type',
                      columnLabel: '类型',
                      label: '',
                      type: 'select',
                      options: [
                          {label: 'string', value: 'string'},
                          {label: 'long', value: 'long'}
                      ],
                      isShow: true,
                      width: '80px',
                      defaultValue: 'string'
                    },
                    {
                      name: 'index',
                      columnLabel: '序号',
                      label: '',
                      type: 'inputText',
                      isShow: true,
                      defaultValue: '',
                      change: function(self){
                      }
                    }
                  ],
                  rules: {
                    index: [
                      {
                        validator: function(rule, value, callback) {
                          console.log(value);
                          if (value) {
                            value = Number(value);
                            if (typeof value == 'number') {
                              if (!Number.isInteger(value)) {
                                //callback(new Error('请输入数字值'));
                              }
                            }
                          } else {
                            //callback(new Error('请输入数字值'));
                          }
                          callback();
                        },
                        trigger: 'blur'
                      }
                    ]
                  }
              },
              isShow: true,
              defaultValue: {}
            },
            {
              label: '文件压缩类型',
              name: 'compress',
              type: 'select',
              options: [
                {label: 'lzo_deflate', value: 'lzo_deflate'},
                {label: 'lzo', value: 'lzo'}
              ],
              isShow: true,
              defaultValue: ''
            },
            {
                label: 'cardForm',
                type: 'cardForm',
                name: 'cardForm',
                config: {
                  labelWidth: '50px',
                  fields: [
                    {
                      name: 'type',
                      label: '类型',
                      type: 'select',
                      options: [
                        {label: 'string', value: 'string'},
                        {label: 'long', value: 'long'}
                      ],
                      isShow: true,
                      defaultValue: 'string'
                    },
                    {
                      name: 'format',
                      label: '格式',
                      type: 'inputText',
                      isShow: true,
                      defaultValue: ''
                    }
                  ],
                  rules: {
                    type: [
                      { required: true, message: '请输入类型'}
                    ],
                    format: [
                      { required: true, message: '请输入格式'}
                    ]
                  }
                }
              },
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
                    console.log('vfvfvf');
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
            },
            {
              label: '数据日期',
              name: 'dataDate',
              type: 'component',
              componentName: 'elx-custom-radio-group',
              param: {},
              change: function(form, field, val) {
                console.log(form, field, val.dataDate);
              },
              defaultValue: '日'
            }

          ]
        }
      }
    },
    methods: {
      'validate': function() {
        console.log(this.testData);
        console.log(this.$refs["testForm"].validate());
      }
    },
    watch: {
      testData: {
        deep: true,
        handler: function(val, oldVal) {
          //console.log(val);
        }
      }
    },
    created: function() {
    }
  }
</script>

```
:::

### 基本用法

::: demo 表单控件
```html
<el-form :inline="true" :model="data" class="demo-form-inline">
  <el-form-item>
    <el-input v-model="data.label" placeholder="名称"></el-input>
  </el-form-item>
  <el-form-item>
    <el-select filterable v-model="data.dsCategory" clearable placeholder="数据源类目">
      <el-option v-for="item in dsCategories" :label="item.name" :value="item.value"></el-option>
    </el-select >
  </el-form-item>
  <el-form-item>
    <el-tooltip content="查询" placement="top">
      <el-button type="primary"><i class="uex-icon-search"></i></el-button>
    </el-tooltip>
  </el-form-item>
</el-form>

<script>
  export default {
    data: function() {
      return {
        data: {},
        dsCategories: [{label: 1, value: 1}]
      }
    },
    methods: {
    },
    watch: {
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
| index | - | - | - | - |
| value | form数据 | Object | -- | {} |
| config | 表单配置(详细配置看下表) | Object | -- | {} |
| label-suffix | 表单域标签的后缀 | String | -- | -- |
| label-width | 表单域标签的宽度 | String | -- | '140px' |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| before-get-fields | - | - |
| before-render | - | - |
| after-render | - | - |

### config详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| inline | 行内表单模式 | boolean | －| false |
| fields | 表单元素(input相关表单元素详细配置见下表) | Array | -- | [] |
| rules | 验证规则 | Object | -- | {} |
| beforeGetFields | 获取字段前所触发的方法（返回参数：form组件对象） | Function | -- | -- |
| beforeRender | 渲染前所触发的方法（返回参数：form组件对象） | Function | -- | -- |
| afterRender | 渲染完成后所触发的方法（返回参数：form组件对象） | Function | -- | -- |

