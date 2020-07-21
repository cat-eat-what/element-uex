## 过滤列表

过滤列表。

### 基本用法


::: demo 过滤列表
```html
<elx-filter ref="elxFilter" :show.sync="show">
  <template v-if="filterData.list1 && filterData.list1.length > 0">
    <elx-filter-item
      name="品牌:"
      :select-type="'single'"
      :items="filterData.list1"
      @select-item="selectList1">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list2 && filterData.list2.length > 0">
    <elx-filter-item
      ref="list2"
      name="洗涤容量:"
      :select-type="'single'"
      :items="filterData.list2"
      @select-item="selectList2">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list3 && filterData.list3.length > 0">
    <elx-filter-item
      name="电机类型:"
      :select-type="'single'"
      :items="filterData.list3"
      @select-item="selectList3">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list4 && filterData.list4.length > 0">
    <elx-filter-item
      name="高度:"
      :select-type="'single'"
      :items="filterData.list4"
      @select-item="selectList4">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list5 && filterData.list5.length > 0">
    <elx-filter-item
      name="能效等级:"
      :items="filterData.list5"
      @select-item="selectList5">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list6 && filterData.list6.length > 0">
    <elx-filter-item
      name="产品类型:"
      :items="filterData.list6"
      @select-item="selectList6">
    </elx-filter-item>
  </template>
  <template v-if="filterData.list7 && filterData.list7.length > 0">
    <elx-filter-item
      name="排水类型:"
      :items="filterData.list7"
      @select-item="selectList7">
    </elx-filter-item>
  </template>
</elx-filter>
<script>
  export default {
    data: function() {
      return {
        filterData: {
          list1: [
            {name: 'Haier', value: 'haier'},
            {name: 'Midea', value: 'midea'},
            {name: 'SIEMENS', value: 'siemens'},
            {name: 'TCL', value: 'tcl'},
            {name: 'Panasonic', value: 'panasonic'},
            {name: 'LG', value: 'lg'},
            {name: 'BOSCH', value: 'bosch'},
            {name: 'LittleSwan', value: 'littleswan'},
            {name: 'LittleDuck', value: 'littleduck'},
            {name: 'SKYWORTH', value: 'skyworth'},
            {name: 'CASARTE', value: 'casarte'},
            {name: 'Leader', value: 'leader'},
            {name: 'Whirlpool', value: 'whirlpool'}
          ],
          list2: [
            {name: '8kg', value: 'a1'},
            {name: '10-20kg', value: 'a2'},
            {name: '6.1-6.9kg', value: 'a3'},
            {name: '7.1-7.9kg', value: 'a4'},
            {name: '8.1-8.9kg', value: 'a5'},
            {name: '9kg', value: 'a6'},
            {name: '9.1-9.9kg', value: 'a7'},
            {name: '7kg', value: 'a8'},
            {name: '6kg', value: 'a9'},
            {name: '5.1-5.9kg', value: 'a10'}
          ],
          list3: [
            {name: '定频', value: 'b1'},
            {name: '变频（节能）', value: 'b2'}
          ],
          list4: [
            {name: '90cm以上', value: 'c1'},
            {name: '70cm及以下', value: 'c2'},
            {name: '75.1-80cm', value: 'c3'},
            {name: '70.1-75cm', value: 'c4'},
            {name: '85.1-90cm', value: 'c5'},
            {name: '80.1-85cm', value: 'c5'}
          ],
          list5: [
            {name: '一级能效', value: 'd1'},
            {name: '二级能效', value: 'd2'},
            {name: '三级能效', value: 'd3'},
            {name: '四级能效', value: 'd4'},
            {name: '五级能效', value: 'd5'},
            {name: '无能效等级', value: 'd6'}
          ],
          list6: [
            {name: '波轮', value: 'e1'},
            {name: '洗烘一体', value: 'e2'},
            {name: '滚筒', value: 'e3'},
            {name: '迷你洗衣机', value: 'e4'},
            {name: '脱水机', value: 'e5'},
            {name: '壁挂', value: 'e6'}
          ],
          list7: [
            {name: '上排水', value: 'f1'},
            {name: '下排水', value: 'f2'},
            {name: '上/下排水', value: 'f3'}
          ]
        },
        show: true
      }
    },
    methods: {
      selectList2: function(data) {
        this.filterData.list4 = [
          {name: '90cm以上', value: 'c1'},
          {name: '70cm及以下', value: 'c2'}
        ];
        this.$nextTick(function() {
          this.$refs['elxFilter'].refreshHeight();
        })
      },
      selectList1: function(data) {
        this.filterData.list4 = [
          {name: '70.1-75cm', value: 'c4'},
          {name: '85.1-90cm', value: 'c5'},
          {name: '80.1-85cm', value: 'c5'}
        ];
        this.$nextTick(function() {
          this.$refs['elxFilter'].refreshHeight();
        })
        //this.$refs.list3.selectItems([this.filterData.list3[0]]);
      },
      selectList3: function(data) {
        console.log(data);
      },
      selectList4: function(data) {
        console.log(data);
      },
      selectList5: function(data) {
        console.log(data);
      },
      selectList6: function(data) {
        console.log(data);
      },
      selectList7: function(data) {
        console.log(data);
      }
    },
    mounted: function() {
    },
    created: function() {
    }
  }
</script>

```
:::

### filter Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| show | 筛选列表是否展开 | Boolean | - | true |

### filter-item Attributes
| 参数      | 说明          | 类型      | 可选值                           | 默认值  |
|---------- |-------------- |---------- |--------------------------------  |-------- |
| name | 唯一值属性 | String | - | '' |
| items | 可选项 | Array | - | [] |
| select-type | 选择方式（多选或者单选） | String | - | 'multi' |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
|expand |收起展开事件 |show |
