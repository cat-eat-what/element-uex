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
      this.config = this.changeConfig2;
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
      this.config = this.changeConfig2;
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
