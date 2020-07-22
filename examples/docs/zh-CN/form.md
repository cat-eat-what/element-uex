<script>
  export default {
  	data: function(){
  		return {
  			testData: {
          "label":"FTP采集",
          "ftpId":"a1",
          "path":"fr",
          "sourceFiles":"gtgt",
          "encoding":"UTF-8",
          "isEditColumn": "1",
          "column":[
            {"index":1,"type":"date","name":"","format":"mjmj"}
          ],
          "compress":"bzip2",
          "skipHeader":"0",
          "nullFormat":"N",
          "fieldDelimiter":", ",
          "code": 'test'
        },
        changeConfig3: {
          'labelWidth': '120px',
            fields: [
                {label:'FTP服务器名称',name:'ftpId',type:'select', options:[{label: 'a', value: 'a1'}, {label: 'b', value: 'b1'}], isShow:true,defaultValue: ''},
                {label:'文件路径',name:'path',type:'inputText',isShow:true,defaultValue: '',"change": function(self){
                    console.log(self.value.path);
                }},
                {label:"code",name:"code",type:'codeMirror',isShow: true, defaultValue: false,
                  option: {
                    mode: 'javascript',
                  },
                  height: '300px',
                  actionData: [
                    {
                      "label": "test1test1test1test1", 
                      "action": function() {
                        console.log('vfvfvf');
                      }
                    }
                  ]
                },
                {
                  label: 'cardForm',
                  type: 'cardForm',
                  name: 'cardForm',
                  config: {
                    labelWidth: '50px',
                    fields: [
                      {name: 'type', label: '类型', type: 'select', options: [{label: 'string', value: 'string'}, {label: 'long', value: 'long'}, {label: 'boolean', value: 'boolean'}, {label: 'double', value: 'double'}, {label: 'date', value: 'date'}], isShow: true, defaultValue: 'string' },
                      {name: 'format', label: '格式', type: 'inputText', isShow: true, defaultValue: '' }
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
              
                {label:'文件名',name:'sourceFiles',type:'inputText',isShow:true,defaultValue: ''},
                {label:'文件编码',name:'encoding',type:'select', options:[{label: 'UTF-8', value: 'UTF-8'}, {label: 'UTF-81', value: 'UTF-81'}],isShow:true,defaultValue: 'UTF-8'},
                {
                  label:'是否编辑文件列',
                  name:'isEditColumn',
                  type:'radio',
                  options:[
                    {label:'是', value: '1'},
                    {label:'否', value: '0'}
                  ], 
                  isShow:true, 
                  defaultValue: '0',
                  "relatedItems": ["column"]
                },
                {
                    label:"文件列",
                    name:"column",
                    type:'tableForm', 
                    config: {
                    fields: [
                        {
                            "name": "type11", 
                            "columnLabel": "类型11", 
                            "label": "", 
                            "type": "select",
                            "filterable": true, 
                            "options": [
                              {
                                "label": "CEM前台测试",
                                "value": "cemqtcs"
                              }, {
                                "label": "测试集群【DM】",
                                "value": "77_DM"
                              }, {
                                "label": "app_act_dwdb",
                                "value": "app_act_dwdb"
                              }, {
                                "label": "app_msm_county",
                                "value": "app_msm_county"
                              }, {
                                "label": "多维成本日志",
                                "value": "costdb_mysql"
                              }, {
                                "label": "家庭宽带",
                                "value": "AHBO"
                              }, {
                                "label": "Mysql_dataexdb",
                                "value": "dataexdb"
                              }, {
                                "label": "hive采集库（迁移前）",
                                "value": "hiveCollectDB1"
                              }, {
                                "label": "DACP-DATAPS65测试库",
                                "value": "DACP-DATAPS-65"
                              }, {
                                "label": "COC前台",
                                "value": "market_db"
                              }, {
                                "label": "元数据库-mysql",
                                "value": "METADB"
                              }, {
                                "label": "上线元数据库-mysql",
                                "value": "METADBS"
                              }, {
                                "label": "MSM前台库",
                                "value": "mysqlMSM"
                              }, {
                                "label": "自助分析mysql配置库",
                                "value": "sa"
                              }, {
                                "label": "TASDB",
                                "value": "TASDB"
                              }, {
                                "label": "DACP后台dataps库",
                                "value": "DATAPS"
                              }, {
                                "label": "存量前台库",
                                "value": "Mysql_SCO"
                              }, {
                                "label": "DACP-DATAPS-65测试库",
                                "value": "DACP-DATAPS-65"
                              }
                            ], 
                            "isShow": true, 
                            "defaultValue": "Mysql_SCO" 
                        },
                        {
                            "name": "index", 
                            "columnLabel": "序号", 
                            "label": "",  
                            "type": "inputText",
                            "isShow": true, 
                            "defaultValue": "",
                            "change": function(self){
                              if (self.currentValue.index) {
                                    self.currentValue.value = '';
                                } 
                            }
                        },
                        {
                            "name": "value", 
                            "columnLabel": "常量", 
                            "label": "", 
                            "type": "inputText",
                            "isShow": true, 
                            "defaultValue": "",
                            "change": function(self){
                                if (self.currentValue.value) {
                                    self.currentValue.index = '';
                                }
                            }
                        },
                        {
                            "name": "format", 
                            "columnLabel": "格式", 
                            "label": "", 
                            "type": "inputText", 
                            "isShow": true, 
                            "defaultValue": ""
                        }
                    ],
                    "rules": {
                        "index": [
                            { 
                          "validator": function(rule, value, callback) {
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
                    }
                 },isShow: false,"dependVal": ["1"], "defaultValue": ["*"]},
                {
                  label: "表单组合",
                  name: "formGroup",
                  type: 'formGroup', 
                  config: {
                  fields: [
                    {
                        "name": "type", 
                        "columnLabel": "类型", 
                        "label": "", 
                        "type": "select", 
                        "options": [
                            {"label": "string", "value": "string"}, 
                            {"label": "long", "value": "long"}, 
                            {"label": "boolean", "value": "boolean"}, 
                            {"label": "double", "value": "double"}, 
                            {"label": "date", "value": "date"}
                        ], 
                        "isShow": true, 
                        "width": "80px",
                        "defaultValue": "string" 
                    },
                    {
                        "name": "index", 
                        "columnLabel": "序号", 
                        "label": "",  
                        "type": "inputText",
                        "isShow": true, 
                        "defaultValue": "",
                        "change": function(self){
                        }
                    }
                ],
                "rules": {
                    "index": [
                        { 
                            "validator": function(rule, value, callback) {
                                if (value) {
                                    value = Number(value);
                                    if (typeof value == 'number') {
                                        if (!Number.isInteger(value)) {
                                            callback(new Error('请输入数字值'));
                                        }
                                    }
                                } else {
                                  callback(new Error('请输入数字值'));
                                }
                                callback();
                            },
                            trigger: 'blur'
                        }
                    ]
                }
                 },isShow: true, "defaultValue": {}},
                {label:'文件压缩类型',name:'compress',type:'select', options:[{label: 'lzo_deflate', value: 'lzo_deflate'}, {label: 'lzo', value: 'lzo'}, {label: 'gzip', value: 'gzip'}, {label: 'bzip2', value: 'bzip2'}, {label: 'zip', value: 'zip'}], isShow:true,defaultValue: ''},
                {label:'是否跳过首行',name:'skipHeader',type:'radioCard',options:[{label:'是', value: '1'},{label:'否', value: '0'}], isShow:true, defaultValue: '0'},
                {label:'NULL格式',name:'nullFormat',type:'inputText',isShow:true,defaultValue: '\N'},
                {label:'字段分割符',name:'fieldDelimiter',type:'inputText',isShow:true,defaultValue: ', '}
                
            ]
        },
        changeConfig1: {
          fields: [
              {
                name: 'apiBodys',
                type:"paramForm",
                labelWidth: '0px',
                params:[
                  {apiId : "a2f1ebdca215987b", chargingTimes : null, dataExApi : null, field : "aa", fieldLevel : null, fieldName : "aa", fieldType : "string", id : null, parentField : null, seq : "aa"}
                ],
                'paramEn': 'field',
                'paramZh': 'fieldName',
                columns:[
                    {label:"脱敏",align:"center",property:"cryptType",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
                    {label:"规则",align:"center",property:"cryptRuleId",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
                    {label:"长度",align:"center",property:"stringLen",field:{type:'number'},placeHolder:"最大长度"},
                    {label:"正则",align:"center",property:"regExp",field:{type:'text'},placeHolder:"请输入正则式"},
                    {label:"枚举",align:"center",property:"enumVal",field:{type:'text'},placeHolder:"枚举值，逗号分隔"}
                ],
                isShow: true,
                change: function(self){
                  console.log(self);
                  console.log(this);
                }
              },
              {
                type:"button",
                labelWidth: '0px',
                text: '测试',
                click: function(self){
                  console.log(self.value.apiBodys);
                },
                isShow:true
              }
          ]
        },
        changeConfig2: {
          fields: [
              {label:"URL",name:"requestUrl",type:'inputCompound',isShow: true,compoundType:'prepend',compoundContent:'Http://', isdisabled: true},
              {label:"表格form",name:"tableForm",type:'tableForm',config: {
                fields: [
                  {name: 'index', columnLabel: '序号', label: '', width: '50', type: 'index'},
                  {name: 'type', columnLabel: '类型', label: '', type: 'select', options: [{label: 'string', value: 'string'}, {label: 'long', value: 'long'}, {label: 'boolean', value: 'boolean'}, {label: 'double', value: 'double'}, {label: 'date', value: 'date'}], isShow: true, defaultValue: 'string' },
                  {name: 'format', columnLabel: '格式', label: '', type: 'inputText', isShow: true, defaultValue: '' }
                ],
                rules: {
                  type: [
                    { required: true, message: '请输入类型'}
                  ],
                  format: [
                    { required: true, message: '请输入格式'}
                  ],
                }
              },isShow: true,},
              {label:"请求类型",name:"callType",type:'radio',options:["GET","POST"],isShow:"true",defaultValue:'GET', isRemark: true},
              {label:"请求格式",name:"paramType",type:'radio',options:[{label:"JSON",value:"json", remark:'vfvff'},{label:"FORM",value:"form"}],defaultValue:'json', isShow:"true", isRemark: true},
              {label:"判断",name:"judge",type:'radio',options:[{label:"是",value:"1", remark:'vfvff'},{label:"否",value:"0"}],defaultValue:'0', isShow:"true", isRemark: true},
              {label:"超时时间(秒)",name:"httpTimeout",type:'slider',isShow: true, change: function(self){
                console.log(self)
              }},
              {label:"是否全部传参",name:"isAllSelect",type:'switch',isShow: true, defaultValue: false},
              {label:"请求参数",name:"params",type:'operateParam',isShow: true,change: function(self){
                for(var i in self.config.fields){
                  if(self.config.fields[i].name == 'check'){
                    self.config.fields[i].options = self.value.params.length>1?[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"}]:[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"},{label:"列表(list)",value:"list"},{label:"集合(set)",value:"set"},{label:"有序集合(zset)",value:"zset"}];
                  }
                }
              }},
              
              {label:"redis数据类型",name:"redisDataType",type:'radio',defaultValue:'string',options:[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"},{label:"列表(list)",value:"list"},{label:"集合(set)",value:"set"},{label:"有序集合(zset)",value:"zset"}],isShow:true,relatedItems:["field","start","end","sort"]},
              {label:"key值",name:"key",type:'inputText',isShow:true, isdisabled: true},
              {label:"field值",name:"field",type:'inputText',isShow:false,dependVal:['hash']},
              {label:"开始下标",name:"start",type:'inputText',isShow:false,dependVal:['list','zset']},
              {label:"结束下标", name:"end", type:'inputText',isShow:false,dependVal:['list','zset']}, 
              {label:"排序策略", name:"sort",type:'radio',defaultValue: 'AES', options: [{label:"升序",value:"AES"},{label:"降序",value:"DES"}],isShow:false,dependVal:['zset']},
          ],
          rules: {
            requestUrl: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            callType: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            paramType: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ],
            redisDataType: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        },
        config: {},
        radio2: 3,
  		}
  	},
    methods: {
      'changeConfig': function() {
        
        this.config = JSON.parse(JSON.stringify(this.changeConfig1));
      },
      'validate': function() {
        console.log(this.$refs["formrfr"].validate());
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
      this.config = this.changeConfig3;
      console.log(this.config);
    }
  }
</script>

## 表单

表单控件。

### 基本用法


::: demo 表单控件
```html
<template>
  <elx-form ref="formrfr" :label-suffix="':'" v-model="testData" label-width="80px" :config ="config"></elx-form>
  <el-button @click="changeConfig">改变表单配置</el-button>
  <el-button @click="validate">验证</el-button>
</template>
<script>
  export default {
    data: function(){
      return {
        testData: {},
        changeConfig1: {
          fields: [
              {
                name: 'apiBodys',
                type:"paramForm",
                labelWidth: '0px',
                params:[
                  {apiId : "a2f1ebdca215987b", chargingTimes : null, dataExApi : null, field : "aa", fieldLevel : null, fieldName : "aa", fieldType : "string", id : null, parentField : null, seq : "aa"}
                ],
                'paramEn': 'field',
                'paramZh': 'fieldName',
                columns:[
                    {label:"脱敏",align:"center",property:"cryptType",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
                    {label:"规则",align:"center",property:"cryptRuleId",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
                    {label:"长度",align:"center",property:"stringLen",field:{type:'number'},placeHolder:"最大长度"},
                    {label:"正则",align:"center",property:"regExp",field:{type:'text'},placeHolder:"请输入正则式"},
                    {label:"枚举",align:"center",property:"enumVal",field:{type:'text'},placeHolder:"枚举值，逗号分隔"}
                ],
                isShow: true,
                change: function(self){
                  console.log(self);
                  console.log(this);
                }
              },
              {
                type:"button",
                labelWidth: '0px',
                text: '测试',
                click: function(self){
                  console.log(self.value.apiBodys);
                },
                isShow:true
              }
          ]
        },
        changeConfig2: {
          fields: [
              {label:"URL",name:"requestUrl",type:'inputCompound',isShow: true,compoundType:'prepend',compoundContent:'Http://', isdisabled: true},
              {label:"请求类型",name:"callType",type:'radio',options:["GET","POST"],isShow:"true",defaultValue:'GET', isRemark: true},
              {label:"请求格式",name:"paramType",type:'radio',options:[{label:"JSON",value:"json", remark:'vfvff'},{label:"FORM",value:"form"}],defaultValue:'json', isShow:"true", isRemark: true},
              {label:"超时时间(秒)",name:"httpTimeout",type:'slider',isShow: true, change: function(self){
                console.log(self)
              }},
              {label:"是否全部传参",name:"isAllSelect",type:'switch',isShow: true, defaultValue: false},
              {label:"code",name:"code",type:'codeMirror',isShow: true, defaultValue: false},
              {
                label: 'cardForm',
                type: 'cardForm',
                name: 'cardForm',
                config: {
                  labelWidth: '50px',
                  fields: [
                    {name: 'type', label: '类型', type: 'select', options: [{label: 'string', value: 'string'}, {label: 'long', value: 'long'}, {label: 'boolean', value: 'boolean'}, {label: 'double', value: 'double'}, {label: 'date', value: 'date'}], isShow: true, defaultValue: 'string' },
                    {name: 'format', label: '格式', type: 'inputText', isShow: true, defaultValue: '' }
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
              /*{label:"请求参数",name:"params",type:'operateParam',isShow: true,change: function(self){
                for(var i in self.config.fields){
                  if(self.config.fields[i].name == 'check'){
                    self.config.fields[i].options = self.value.params.length>1?[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"}]:[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"},{label:"列表(list)",value:"list"},{label:"集合(set)",value:"set"},{label:"有序集合(zset)",value:"zset"}];
                  }
                }
              }},*/
              
              /*{label:"redis数据类型",name:"redisDataType",type:'radio',defaultValue:'string',options:[{label:"字符串(string)",value:"string"},{label:"哈希(hash)",value:"hash"},{label:"列表(list)",value:"list"},{label:"集合(set)",value:"set"},{label:"有序集合(zset)",value:"zset"}],isShow:true,relatedItems:["field","start","end","sort"]},
              {label:"key值",name:"key",type:'inputText',isShow:true, isdisabled: true},
              {label:"field值",name:"field",type:'inputText',isShow:false,dependVal:['hash']},
              {label:"开始下标",name:"start",type:'inputText',isShow:false,dependVal:['list','zset']},
              {label:"结束下标", name:"end", type:'inputText',isShow:false,dependVal:['list','zset']}, 
              {label:"排序策略", name:"sort",type:'radio',defaultValue: 'AES', options: [{label:"升序",value:"AES"},{label:"降序",value:"DES"}],isShow:false,dependVal:['zset']},
              */
          ],
          rules: {
            requestUrl: [
              { required: true, message: '请输入活动名称', trigger: 'blur' }
            ],
            callType: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            paramType: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ],
            redisDataType: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        },
        config: {},
        radio2: 3,
      }
    },
    methods: {
      'changeConfig': function() {
          console.log(this.$refs["formrfr"].validate());
        //this.config = JSON.parse(JSON.stringify(this.changeConfig1));
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
      this.config = this.changeConfig3;
      console.log(this.config);
    }
  }
</script>

```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| v-model | form数据 | Object | －| ｛｝ |
| config | 表单配置 | Object | － | ｛｝ |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
