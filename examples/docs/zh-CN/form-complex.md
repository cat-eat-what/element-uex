## Complex

Complex

### 基本用法


::: demo Complex
```html
<elx-form
  ref="form-complex"
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
        labelWidth: '90px',
        inline: false,
        fields: [
          {
            label: 'redis数据类型',
            name: 'redisDataType',
            type: 'radio',
            defaultValue: 'string',
            options:[
              {label: '字符串(string)', value: 'string'},
              {label: '哈希(hash)', value: 'hash'},
              {label: '列表(list)', value: 'list'},
              {label: '集合(set)', value: 'set'},
              {label: '有序集合(zset)', value: 'zset'}
            ],
            isShow: true,
            relatedItems: ['field', 'start', 'end', 'sort']
          },
          {
            label: '排序策略',
            name: 'sort',
            type: 'radio',
            defaultValue: 'AES',
            options: [
              {label: '升序', value: 'AES'},
              {label: '降序', value: 'DES'}
            ],
            isShow: false,
            dependVal: ['zset']
          },
          {
            label: 'field值',
            name: 'field',
            type: 'inputText',
            isShow: false,
            dependVal: ['hash']
          },
          {
            label: '开始下标',
            name: 'start',
            type: 'inputText',
            isShow: false,
            dependVal: ['list', 'zset']
          },
          {
            label: '结束下标',
            name: 'end',
            type: 'inputText',
            isShow: false,
            dependVal: ['list', 'zset']
          }
        ]
      }
    }
  }
}
</script>

```
:::

### 配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| relatedItems | 定义关联字段，通常意义上指本元素发生变化时会影响到的其他元素，通过relatedItems的配置，检查本元素的变化会影响到的其他元素，填写其他元素的fieldName，值用数组表示。</br>例如['field', 'start', 'end', 'sort'] | Array | - | - |
| dependVal | 定义关联字段，配置于被影响元素中，表示当其他元素值变化时，本元素是否显示，例如：设置dependVal为[1]表示当关联字段的值为1时本元素显示否则隐藏。</br>示例，A元素的值达到一定条件，则B元素显示，否则B元素不显示，配置A元素的relatedItems的值为'b'，配置B元素的dependVal为1，意为当A的值为1的时候，B元素显示，否则B元素隐藏，配置如下：</br>{</br>&nbsp;&nbsp;&nbsp;&nbsp;type: 'radio',</br>&nbsp;&nbsp;&nbsp;&nbsp;label: 'A',</br>&nbsp;&nbsp;&nbsp;&nbsp;name: 'a',</br>&nbsp;&nbsp;&nbsp;&nbsp;options: [</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{label: 1, value: 1},</br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{label: 2, value: 2}</br>&nbsp;&nbsp;&nbsp;&nbsp;],</br>&nbsp;&nbsp;&nbsp;&nbsp;defaultValue: 2,</br> &nbsp;&nbsp;&nbsp;&nbsp;relatedItems: 'b'</br>},{</br>&nbsp;&nbsp;&nbsp;&nbsp;type: 'inputText',</br>&nbsp;&nbsp;&nbsp;&nbsp;label: 'B',</br>&nbsp;&nbsp;&nbsp;&nbsp;name: 'b',</br> &nbsp;&nbsp;&nbsp;&nbsp;dependVal: [1],</br>&nbsp;&nbsp;&nbsp;&nbsp;isShow: false</br>}| - | - | - |
