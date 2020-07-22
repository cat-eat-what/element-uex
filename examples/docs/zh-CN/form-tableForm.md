## TableForm

TableForm（如果数据量大请用<a href="https://github.com/handsontable/vue-handsontable-official" target="_blank">vue-hansontable</a>）

### 基本用法


::: demo TableForm
```html
<elx-form
  ref="form-table-form"
  v-model="testData"
  :label-suffix="':'"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<button @click="validate">验证</button>
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
            label: '文件列',
            name: 'column',
            type: 'tableForm',
            config: {
              fields: [
                {
                  name: 'type',
                  columnLabel: '类型',
                  label: '',
                  type: 'select',
                  filterable: true,
                  remote: true,
                  isPostRoot: true,
                  loading: false,
                  remoteMethod: function(self, query) {
                    var field = _.filter(self.currentConfig.fields, function(item) {
                      return item.name == 'type';
                    })
                    if (field.length == 1) {
                      console.log(query);
                      field[0].loading = true;
                      field[0].options = [{'label': 1, 'value': 1}];
                      field[0].loading = false;
                    }
                  },
                  options: [
                    {label: 'CEM前台测试', value: 'cemqtcs'},
                    {label: '测试集群【DM】', value: '77_DM'},
                    {label: 'app_act_dwdb', value: 'app_act_dwdb'},
                    {label: 'app_msm_county', value: 'app_msm_county'},
                    {label: '多维成本日志', value: 'costdb_mysql'},
                    {label: '家庭宽带', value: 'AHBO'},
                    {label: 'Mysql_dataexdb', value: 'dataexdb'},
                    {label: 'hive采集库（迁移前）', value: 'hiveCollectDB1'},
                    {label: 'DACP-DATAPS65测试库', value: 'DACP-DATAPS-65'},
                    {label: 'COC前台', value: 'market_db'},
                    {label: '元数据库-mysql', value: 'METADB'},
                    {label: '上线元数据库-mysql', value: 'METADBS'},
                    {label: 'MSM前台库', value: 'mysqlMSM'},
                    {label: '自助分析mysql配置库', value: 'sa'},
                    {label: 'TASDB', value: 'TASDB'},
                    {label: 'DACP后台dataps库', value: 'DATAPS'},
                    {label: '存量前台库', value: 'Mysql_SCO'},
                    {label: 'DACP-DATAPS-65测试库', value: 'DACP-DATAPS-65'}
                  ],
                  isShow: true,
                  defaultValue: "Mysql_SCO"
                },
                {
                  name: 'index',
                  columnLabel: '序号',
                  label: '',
                  type: 'inputText',
                  isShow: true,
                  efaultValue: '',
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
                index: [{
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
                }]
              }
            },
            isShow: true,
            defaultValue: ['*']
          },
          {
            label: '关联字段',
            name: 'relFields',
            type: 'tableForm',
            config: {
              fields: [
                {
                  name: 'index',
                  columnLabel: '序号',
                  label: '',
                  width: '50',
                  type: 'index'
                },
                {
                  name: 'label',
                  columnLabel: '字段中文名',
                  label: '',
                  type: 'inputText',
                  isShow: true,
                  defaultValue: ''
                }, {
                  name: 'id',
                  columnLabel: 'ID',
                  label: '',
                  type: 'string',
                  isShow: false
                }, {
                  name: 'relId',
                  columnLabel: 'RELID',
                  label: '',
                  type: 'string',
                  isShow: false
                }, {
                  name: 'name',
                  columnLabel: '字段名',
                  label: '',
                  type: 'inputText',
                  isShow: true,
                  defaultValue: ''
                }, {
                  name: 'mappingType',
                  columnLabel: '映射类型',
                  label: '',
                  type: 'select',
                  options: [
                    {label: '表达式', value: 'expression'},
                    {label: '关联字段', value: 'associationField'}
                  ],
                  isShow: true,
                  defaultValue: 'expression',
                  change: function(self) {
                    self.currentValue.mappingRule = '';
                  }
                }, {
                  name: 'mappingRule',
                  columnLabel: '映射规则',
                  label: '',
                  filterable: true,
                  options: [],
                  type: 'inputText',
                  isShow: true,
                  defaultValue: '',
                  change: function(self) {
                    console.log(self.currentValue.mappingRule, self.currentValue.mappingType);
                  }
                }
              ],
              rules: {
                name: [{
                  required: true,
                  message: '请输入字段名',
                  trigger: 'change'
                }]
              },
              editType: 'single',
              rowKey: function(row) {
                return row.id;
              },
              relConfig: function(data, config) {
                var ruleFields = _.filter(config.fields, function(item) {
                  return item.name == 'mappingRule';
                });
                if (ruleFields.length == 1) {
                  var ruleField = ruleFields[0];
                } else {
                  return;
                } if (data.mappingType == 'associationField') {
                  if (ruleField.type == 'inputText') {
                    ruleField.type = 'select';
                  }
                } else {
                  if (ruleField.type == 'select') {
                    ruleField.type = 'inputText';
                  }
                }
                return config;
              }
            },
            defaultValue: [],
            change: function(self) {
              self.currentValue.relFields = _.map(self.currentValue.relFields, function(field) {
                if (!field.id || field.id == '') {
                  field.id = new Date().getTime();
                }
                return field;
              });
              console.log(JSON.stringify(self.currentValue.relFields));
              self.currentValue.stepVars = self.currentValue.relFields;
            }
          }
        ]
      }
    }
  }
}
</script>

```
:::

### config>fields>tableForm field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['inputTransfer', 'remoteTransfer'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |



### config>fields>tableForm field>config详细配置(参见table-formconfig配置)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

