<script>
  export default {
    data: function(){
      return {
        code: '{\n    \"labelWidth\": \"120px\",\n    \"fields\": [\n        {\n            \"label\": \"分片类型\",\n            \"name\": \"strg\",\n            \"type\": \"radio\",\n            \"options\": [\n                {\"label\": \"文件\", \"value\": \"file\"},\n                {\"label\": \"SQL\", \"value\": \"sql\"}\n            ],\n            \"isShow\": true,\n            \"defaultValue\": \"file\",\n            \"relatedItems\": [\"filter\"],\n            \"change\": function(self) {\n                self.currentValue.contents = [];\n                self.config.beforeRender(self);\n            }\n        },\n        {\n            \"label\": \"数据文件\", \n            \"name\": \"contents\", \n            \"type\": \"tableForm\", \n            \"options\": [], \n            \"storeSql\": \"select ds_id value, ds_label label, ds_type dstype, ds_category dscategory from dacp_meta_datasource where ds_type in ( \'ftp\',\'ssh\',\'http\',\'mysql\')\",\n            \"config\": {\n                \"fields\": [\n                    {\n                        \"name\": \"dsId\", \n                        \"columnLabel\": \"数据源\", \n                        \"label\": \"\", \n                        \"type\": \"select\", \n                        \"options\": [], \n                        \"isShow\": true, \n                        \"defaultValue\": \"\" \n                    },\n                    {\n                        \"name\": \"content\", \n                        \"columnLabel\": \"文件路径\", \n                        \"label\": \"\",  \n                        \"type\": \"inputText\",\n                        \"isShow\": true, \n                        \"defaultValue\": \"\"\n                    }\n                ]\n            },\n            \"isShow\": true,\n            \"defaultValue\": []\n        },\n        {\n            \"label\": \"分片数\",\n            \"name\": \"shardCnt\",\n            \"type\": \"inputNumber\",\n            \"isShow\": true,\n            \"defaultValue\": 1,\n            \"min\": 0\n        },\n        {\n            \"label\": \"正则\",\n            \"name\": \"filter\",\n            \"type\": \"inputTextarea\",\n            \"isShow\": true,\n            \"defaultValue\": \"\",\n            \"dependVal\": [\"file\"]\n        }\n    ],\n    \"rules\": {\n        \"shardCnt\": [\n            { \n                \"validator\": function(rule, value, callback) {\n                    if (!Number.isInteger(value)) {\n                        callback(new Error(\'必须为整数\'));\n                    }\n                    callback();\n                },\n                \"trigger\": \"blur\"\n            }\n        ]\n    },\n    \"beforeRender\": function(self) {\n        var strgObj = {\n            file: [\'ftp\',\'ssh\',\'http\'],\n            sql: [\'mysql\']\n        };\n        var contentStr = {\n            file: \'文件路径\',\n            sql: \'SQL\'\n        }\n        for (var i in self.config.fields) {\n            if (self.config.fields[i].name == \'contents\') {\n                var filterData = _.filter(self.config.fields[i].options, function(option) {\n                    return strgObj[self.currentValue.strg].indexOf(option.dstype) > -1 || strgObj[self.currentValue.strg].indexOf(option.dscategory) > -1;\n                })\n                for (var j in self.config.fields[i].config.fields) {\n                    if (self.config.fields[i].config.fields[j].name == \'dsId\') {\n                        self.config.fields[i].config.fields[j].options = filterData;\n                    } else if(self.config.fields[i].config.fields[j].name == \'content\') {\n                        self.config.fields[i].config.fields[j].columnLabel = contentStr[self.currentValue.strg];\n                    }\n                }\n            }\n        }\n    }\n}',
        option: {
          //mode: 'text/x-mysql',
          mode: 'javascript'
        },
        actionData: [
          {
            "label": "test1test1test1test1", 
            "action": function() {
              console.log('vfvfvf');
            }
          }
        ]
      }
    },
    methods: {
    }
  }
</script>
<style>
</style>

## codemirror

codemirror

### 基本用法


::: demo codemirror
```html
<template>
  <elx-codemirror v-model="code" :option="option" height="300px"></elx-codemirror>
</template>
<script>
  export default {
  	data: function(){
  		return {
  		}
  	},
    methods: {
    }
  }
</script>
```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
