<script>
  export default {
    data: function(){
      return {
        apiBody: [{"id":"fparwvekn8kryn0d","field":"a","fieldLevel":0,"fieldName":"a","fieldType":"string","parentField":null,"chargingTimes":0,"maskRule":null,"seq":1,"apiId":"04469594fe2d76aa"}],
        columns:[
          {label:"脱敏",align:"center",property:"cryptType",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
          {label:"规则",align:"center",property:"cryptRuleId",field:{type:'select',options:[]}},
          {label:"长度",align:"center",property:"stringLen",field:{type:'number'},placeHolder:"最大长度"},
          {label:"正则",align:"center",property:"regExp",field:{type:'text'},placeHolder:"请输入正则式"},
          {label:"枚举",align:"center",property:"enumVal",field:{type:'text'},placeHolder:"枚举值，逗号分隔"}
        ],
        permitFieldMap: {},
      }
    },
    watch: {
      permitFieldMap: function(val, oldVal){
        console.log(val);
      }
    }
  }
</script>

## 参数表单控件

参数表单控件。

### 基本用法


::: demo 参数表单控件
```html
<template>
  <elx-param-form v-model="permitFieldMap" :params="apiBody" main-label="是否授权" param-en="field" param-zh="fieldName" :columns="columns" ></elx-param-form>
</template>
<script>
  export default {
    data: function(){
      return {
        apiBody: [{"id":"fparwvekn8kryn0d","field":"a","fieldLevel":0,"fieldName":"a","fieldType":"string","parentField":null,"chargingTimes":0,"maskRule":null,"seq":1,"apiId":"04469594fe2d76aa"}],
        columns:[
          {label:"脱敏",align:"center",property:"cryptType",field:{type:'select',options:[{label:'脱敏',value:'1'},{label:'还原',value:'2'}]}},
          {label:"规则",align:"center",property:"cryptRuleId",field:{type:'select',options:[]}},
          {label:"长度",align:"center",property:"stringLen",field:{type:'number'},placeHolder:"最大长度"},
          {label:"正则",align:"center",property:"regExp",field:{type:'text'},placeHolder:"请输入正则式"},
          {label:"枚举",align:"center",property:"enumVal",field:{type:'text'},placeHolder:"枚举值，逗号分隔"}
        ],
        permitFieldMap: {},
      }
    },
    watch: {
      permitFieldMap: function(val, oldVal){
        console.log(val);
      }
    }
  }
</script>

```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| params | 参数数组 | Array | －| [ ] |
| columns | 参数操作表单 | Array | － | [ ] |
| mainLabel | 参数总开关label名 | String | － | '' |
| paramEn | 参数英文名字段名 | String | － | '' |
| paramZh | 参数中文名字段名 | String | － | '' |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
