## 可编辑表格

可编辑表格（如果数据量大请用<a href="https://github.com/handsontable/vue-handsontable-official" target="_blank">vue-hansontable</a>）

### 基本用法

::: demo
```html
<div class='layout'>
  <elx-table-form
    ref='elxTableForm'
    v-model='data'
    :config='config'
    @change='change'>
  </elx-table-form>
</div>
<script>
  export default {
    data: function(){
      return {
        id: 1,
        data: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }],
        config: {
          maxHeight: 700,
          //height: 200,
          fields: [{
            name: 'idx',
            columnLabel: '序号',
            label: '',
            width: '50',
            type: 'index',
            isDraggable: true
          },
          {
            name: 'id',
            columnLabel: '商品 ID',
            label: '',
            type: 'string',
            isShow: true,
            defaultValue: ''
          },
          {
            name: 'name',
            columnLabel: '商品名称',
            label: '',
            type: 'inputText',
            isShow: true,
            defaultValue: ''
          },
          {
            name: 'category',
            columnLabel: '商品分类',
            label: '',
            type: 'inputText',
            isShow: true,
            defaultValue: ''
          },
          {
            name: 'shopId',
            columnLabel: '店铺 ID',
            label: '',
            type: 'inputText',
            isShow: true,
            defaultValue: ''
          },
          {
            name: 'address',
            columnLabel: '店铺地址',
            label: '',
            type: 'inputText',
            isShow: true,
            defaultValue: ''
          },
          {
            name: 'desc',
            columnLabel: '描述',
            label: '',
            type: 'inputText',
            isShow: true,
            defaultValue: ''
          }],
          expandConf: {
            inline: true,
            labelWidth: '90px',
            fields: [
              {
                name: 'name',
                label: '商品名称',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              },
              {
                name: 'category',
                label: '商品分类',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              },
              {
                name: 'shopId',
                label: '店铺 ID',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              },
              {
                name: 'address',
                label: '店铺地址',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              },
              {
                name: 'desc',
                label: '描述',
                type: 'inputText',
                isShow: true,
                defaultValue: ''
              }
            ]
          },
          editType: 'single',
          pageSize: 50,
          isExpand: true,
          rowKey: function(row) {
            return row.id;
          }
        }
      }
    },
    watch: {
      data: function() {
      }
    },
    methods: {
      validate: function() {
        var result = this.$refs.elxTableForm.validate();
        console.log(result);
      },
      change: function(val) {
        //console.log(val);
        var self = this;
        val = val.map(function(field) {
          if (!field.id || field.id == '') {
            field.id = self.id++;
          }
          return field;
        });
      },
      addData: function() {
        var id = 123233434;
        /*for (var i = 0; i < 196; i++) {*/
        for (var i = 0; i < 296; i++) {
          var data = JSON.parse(JSON.stringify(this.data[1]));
          id++;
          data.id = String(id);
          this.data.push(data);
        }
      }
    },
    created: function() {
      var self = this;
      this.addData();
    }
  }
</script>
```
:::

### Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| value | 数据绑定值 | Array | - | [] |
| config | 配置项 | Object | - | {} |

### config详细配置
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| maxHeight | Table 的最大高度 | string/number | - | 280 |
| fields | 表单元素(input相关表单元素详细配置见下表) | Array | -- | [] |
| rules | 验证规则 | Object | -- | {} |
| rowKey | 行数据的 Key，用来优化 Table 的渲染 | Function(row) | - | - |
| firstRowKey | 表格中第一行的key | String | - | - |
| lastRowKey | 表格中最后一行的key | String | - | - |
| unabledDeleteRowKeys | 不能进行删除操作的行数据的rowkey | Array | - | [] |
| isExpand | 表格行数据是否有展开内容 | Boolean | - | false |
| expandConf | 展开内容的表单配置项见下表 | Object | - | {} |
| editType | 编辑类型(1、当单击单元格时可以编辑该单元格；2、全部单元格可直接编辑),建议选择single,可优化table的渲染 | single／all | - | 'all' |
| pageSize | 每页显示条目个数 | Number | - | 20 |
| relConfig | 处理表格每行中表单元素之间的关系 | Function(data, config) | - | - |
| afterRender | 渲染完成后所触发的方法 | Function(component) | - | - |

### fields 详细配置(下面列出的为特殊属性， 其余的属性跟from中配置field类似，可参照)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 表格单元格展现形式 | String | index／string／form表单元素类型如（inputText等） | - |
| columnLabel | 表格显示的标题 | String | - | - |
| isDraggable | 当type为index的时候，可以设置是否可拖拽换行 | Boolean | - | false |
| label | 不需要设置该项 | - | - | - |

### expandConf 详细配置(可参照from配置)
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| change | 绑定值发生改变时触发的事件 | val |
