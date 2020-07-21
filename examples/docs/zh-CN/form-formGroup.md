## form-group

form-group

### 基本用法


::: demo form-group
```html
<elx-form
  ref="form-group"
  v-model="testData"
  :label-suffix="':'"
  :label-width="config.labelWidth||'80px'"
  :config ="config">
</elx-form>
<script>
export default {
  data: function() {
    return {
      testData: {},
      config: {
        labelWidth: '100px',
        inline: false,
        fields: [
          {
            label: '表单组合',
            name: 'formGroup',
            type: 'formGroup',
            config: {
              fields: [
                {
                  name: 'type',
                  type: 'select',
                  options: [
                    {label: 'string', value: 'string'},
                    {label: 'long', value: 'long'},
                    {label: 'boolean', value: 'boolean'},
                    {label: 'double', value: 'double'},
                    {label: 'date', value: 'date'}
                  ],
                  isShow: true,
                  width: '80px',
                  defaultValue: 'string'
                },
                {
                  name: 'index',
                  type: 'inputText',
                  isShow: true,
                  defaultValue: '',
                  change: function(self) {
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
        ]
      }
    }
  }
}
</script>
```
:::

### config>fields>formGroup field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| label | 标签文本 | String | -- | -- |
| labelWidth | 表单域标签的的宽度，例如 '50px' | String | -- | '140px' |
| name | 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的 | String | -- | -- |
| type | 表单类型 | String | ['cron'] | -- |
| defaultValue | 默认值 | -- | -- | -- |
| remark | 帮助信息 | String | -- | -- |
| isShow | 是否展示 | Boolean | true,false | true |
| isRemark | 是否展示帮助信息 | Boolean | true,false | false |
| change | 当值发生改变时调用的方法（返回参数：form组件对象、 field组件对象、 值） | Function | -- | -- |
| config | 详细配置见下表 | - | - | - |

### config>fields>formGroup field基本配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| fields | 配置表单元素（不要配置field中label属性） | Array | - | - |
| 其余配置跟form配置类似 | | | | |