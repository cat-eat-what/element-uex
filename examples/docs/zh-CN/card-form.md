## card-form

card-form

### 基本用法


::: demo card-form
```html
<div>
  <elx-card-form
    ref="elxCardForm"
    v-model="data"
    :config="config"
    @change="change">
  </elx-card-form>
  <el-button @click="validate">验证</el-button>
</div>
<script>
  export default {
    data: function() {
      return {
        data: [
          {type: 'string', format: 'de1'},
          {type: 'string', format: 'de2'},
          {type: 'string', format: 'de3'}
        ],
        config: {
          labelWidth: '80px',
          fields: [
            {
              name: 'type',
              label: '类型',
              type: 'select',
              options: [
                {label: 'string', value: 'string'},
                {label: 'long', value: 'long'},
                {label: 'boolean', value: 'boolean'},
                {label: 'double', value: 'double'},
                {label: 'date', value: 'date'}
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
        var result = this.$refs.elxCardForm.validate();
        console.log(result);
      },
      change: function() {
        console.log(this.data);
      }
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 数据绑定值 | - | - | - |
| config | 表单配置(详细配置看下表) | Object | -- | {} |

### config详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| inline | 行内表单模式 | boolean | －| false |
| fields | 表单元素(input等相关表单元素详细配置见下表) | Array | -- | [] |
| rules | 验证规则 | Object | -- | {} |
| beforeGetFields | 获取字段前所触发的方法（返回参数：form组件对象） | Function | -- | -- |
| beforeRender | 渲染前所触发的方法（返回参数：form组件对象） | Function | -- | -- |
| afterRender | 渲染完成后所触发的方法（返回参数：form组件对象） | Function | -- | -- |


### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| - | - | - |
