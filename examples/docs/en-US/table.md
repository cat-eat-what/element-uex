<script>
  export default {
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          'de.name': '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-02',
          'de.name': '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }, {
          date: '2016-05-04',
          'de.name': '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '家'
        }, {
          date: '2016-05-01',
          'de.name': '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          tag: '公司'
        }],
        currentRow: null,
        multipleSelection: []
      };
    },

    methods: {
      handleClick() {
        console.log('click');
      },

      handleEdit(index, row) {
        console.log(index, row);
      },

      handleDelete(index, row) {
        console.log(index, row);
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleCurrentChange(val) {
        this.currentRow = val;
      },

      formatter(row, column) {
        return row.address;
      },

      filterTag(value, row) {
        return row.tag === value;
      },

      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },

      deleteRow(index, rows) {
        rows.splice(index, 1);
      }
    },

    watch: {
      multipleSelection(val) {
        console.log('selection: ', val);
      }
    }
  };
</script>

<style>
  .el-table .info-row {
    background: #c9e5f5;
  }

  .el-table .positive-row {
    background: #e2f0e4;
  }

  .demo-table .name-wrapper {
    display: inline-block;
  }

  .demo-table .demo-table-expand {
    label {
      width: 90px;
      color: #99a9bf;
    }
    .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
  }
</style>

## Table 可拖拽表格(鼠标按住序号列拖拽)

可拖拽表格(鼠标按住序号列拖拽)。

### 基础表格

基础的表格展示用法。

:::demo 当`elx-table`元素中注入`data`对象数组后，在`elx-table-column`中用`prop`属性来对应对象中的键名即可填入数据，用`label`属性来定义表格的列名。可以使用`width`属性来定义列宽。
```html
  <template>
    <elx-table
      :data="tableData"
      style="width: 100%" border>
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index" width="50" label="序号">
        <template scope="props">
          {{props.$index!=null?props.$index+1:''}}
        </template>
      </el-table-column>
      <elx-table-column
        label="日期"
        width="180">
        <template scope="props">
        <el-input v-model = "props.row.date"></el-input>
        </template>
      </elx-table-column>
      <elx-table-column
        prop="de.name"
        label="姓名"
        width="180">
      </elx-table-column>
      <elx-table-column
        prop="address"
        label="地址">
      </elx-table-column>
      <el-table-column type="expand">
        <template scope="props">
          xxx
        </template>
      </el-table-column>
    </elx-table>
  </template>

  <script>
    export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
      }
    }
  </script>
```
:::

### Table Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| data | 显示的数据 | array | — | — |
| height | Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则 Table 的高度受控于外部样式。  | string/number | — | — |
| max-height | Table 的最大高度 | string/number | — | — |
| stripe | 是否为斑马纹 table | boolean | — | false |
| border | 是否带有纵向边框 | boolean | — | false |
| fit | 列的宽度是否自撑开 | boolean | — | true |
| show-header | 是否显示表头 | boolean | — | true |
| highlight-current-row | 是否要高亮当前行 | boolean | — | false |
| current-row-key | 当前行的 key，只写属性 | String,Number | — | — |
| row-class-name | 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。 | Function(row, index)/String | — | — |
| row-style | 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。 | Function(row, index)/Object | — | — |
| row-key | 行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能的情况下，该属性是必填的 | Function(row)/String | — | — |
| empty-text | 空数据时显示的文本内容，也可以通过 `slot="empty"` 设置 | String | — | 暂无数据 |
| default-expand-all | 是否默认展开所有行，当 Table 中存在 type="expand" 的 Column 的时候有效 | Boolean | — | false |
| expand-row-keys | 可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。| Array | — | |
| default-sort | 默认的排序列的prop和顺序。它的`prop`属性指定默认的排序的列，`order`指定默认排序的顺序| Object | `order`: ascending, descending | 如果只指定了`prop`, 没有指定`order`, 则默认顺序是ascending |
| tooltip-effect | tooltip `effect` 属性 | String | dark/light | | dark |

### Table Events
| 事件名 | 说明 | 参数 |
| ---- | ---- | ---- |
| select | 当用户手动勾选数据行的 Checkbox 时触发的事件 | selection, row |
| select-all | 当用户手动勾选全选 Checkbox 时触发的事件 | selection |
| selection-change | 当选择项发生变化时会触发该事件 | selection |
| cell-mouse-enter | 当单元格 hover 进入时会触发该事件 | row, column, cell, event |
| cell-mouse-leave | 当单元格 hover 退出时会触发该事件 | row, column, cell, event |
| cell-click | 当某个单元格被点击时会触发该事件 | row, column, cell, event |
| cell-dblclick | 当某个单元格被双击击时会触发该事件 | row, column, cell, event |
| row-click | 当某一行被点击时会触发该事件 | row, event, column |
| row-contextmenu | 当某一行被鼠标右键点击时会触发该事件 | row, event |
| row-dblclick | 当某一行被双击时会触发该事件 | row, event |
| header-click | 当某一列的表头被点击时会触发该事件 | column, event |
| sort-change | 当表格的排序条件发生变化的时候会触发该事件 | { column, prop, order } |
| filter-change | 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。 | filters |
| current-change | 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性 | currentRow, oldCurrentRow |
| header-dragend | 当拖动表头改变了列的宽度的时候会触发该事件 | newWidth, oldWidth, column, event |
| expand | 当用户对某一行展开或者关闭的上会触发该事件 | row, expanded |

### Table Methods
| 方法名 | 说明 | 参数 |
| ---- | ---- | ---- |
| clearSelection | 清空用户的选择，当使用 reserve-selection 功能的时候，可能会需要使用此方法 | selection |
| toggleRowSelection | 切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中） | row, selected |

### Table-column Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| type | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 expand 则显示为一个可展开的按钮 | string | selection/index/expand | — |
| column-key | column 的 key，如果需要使用 filter-change 事件，则需要此属性标识是哪个 column 的筛选条件 | string | — | — |
| label | 显示的标题 | string | — | — |
| prop | 对应列内容的字段名，也可以使用 property 属性 | string | — | — |
| width | 对应列的宽度 | string | — | — |
| min-width | 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 | string | — | — |
| fixed | 列是否固定在左侧或者右侧，true 表示固定在左侧 | string, boolean | true, left, right | — |
| render-header | 列标题 Label 区域渲染使用的 Function | Function(h, { column, $index }) | — | — |
| sortable | 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 | boolean, string | true, false, 'custom' | false |
| sort-method | 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效 | Function(a, b) | — | — |
| resizable | 对应列是否可以通过拖动改变宽度（需要在 el-table 上设置 border 属性为真） | boolean | — | true |
| formatter | 用来格式化内容 | Function(row, column) | — | — |
| show-overflow-tooltip | 当内容过长被隐藏时显示 tooltip | Boolean | — | false |
| align | 对齐方式 | String | left/center/right | left |
| header-align | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | — |
| class-name | 列的 className | string | — | — |
| label-class-name | 当前列标题的自定义类名 | string | — | — |
| selectable | 仅对 type=selection 的列有效，类型为 Function，Function 的返回值用来决定这一行的 CheckBox 是否可以勾选 | Function(row, index) | — | — |
| reserve-selection | 仅对 type=selection 的列有效，类型为 Boolean，为 true 则代表会保留之前数据的选项，需要配合 Table 的 clearSelection 方法使用。 | Boolean | — | false |
| filters | 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性。 | Array[{ text, value }] | — | — |
| filter-multiple | 数据过滤的选项是否多选 | Boolean | — | true |
| filter-method | 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示。 | Function(value, row) | — | — |
| filtered-value | 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性。 | Array | — | — |
