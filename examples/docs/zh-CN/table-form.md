<script>
  export default {
  	data: function(){
  		return {
        data: ['*'],
        config: {
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
        }
  		}
  	},
    watch: {
      data: function() {
        console.log(this.data);
      }
    },
  	methods: {
      validate: function() {
        var result = this.$refs.elxTableForm.validate();
        console.log(result);
      },
      change: function() {
        console.log(this.data);
      }
  	}
  }
</script>
<style>
</style>

## 页面加载

页面加载，防止闪烁

### 基本用法


::: demo 页面加载
```html
<template>
  <div>
	  <elx-table-form ref="elxTableForm" @change="change" v-model="data" :config="config"></elx-table-form>
    <el-button @click="validate">验证</el-button>
  </div>
  <script>
	  export default {
	  }
	</script>
</template>
```
:::









### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
