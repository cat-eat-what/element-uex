## 过滤列表

过滤列表。

### 基本用法


::: demo 过滤列表
```html
<elx-filter ref="elxFilter" :show.sync="show">
  <template v-if="filterData.protocols && filterData.protocols.length > 0">
    <elx-filter-item
      name="协议:"
      :select-type="'single'"
      :items="filterData.protocols"
      @select-item="selectProtocols">
    </elx-filter-item>
  </template>
  <template v-if="filterData.callTypes && filterData.callTypes.length > 0">
    <elx-filter-item
      ref="callTypes"
      name="类型:"
      :select-type="'single'"
      :items="filterData.callTypes"
      @select-item="selectCallTypes">
    </elx-filter-item>
  </template>
  <template v-if="filterData.plats && filterData.plats.length > 0">
    <elx-filter-item
      name="平台:"
      :select-type="'single'"
      :items="filterData.plats"
      @select-item="selectPlats">
    </elx-filter-item>
  </template>
  <template v-if="filterData.dataTypes && filterData.dataTypes.length > 0">
    <elx-filter-item
      name="数据类型:"
      :select-type="'single'"
      :items="filterData.dataTypes"
      @select-item="selectDataTypes">
    </elx-filter-item>
  </template>
  <template v-if="filterData.states && filterData.states.length > 0">
    <elx-filter-item
      name="共享发布:"
      :items="filterData.states"
      @select-item="selectStates">
    </elx-filter-item>
  </template>
  <template v-if="filterData.dataCycles && filterData.dataCycles.length > 0">
    <elx-filter-item
      name="数据周期:"
      :items="filterData.dataCycles"
      @select-item="selectDataCycles">
    </elx-filter-item>
  </template>
  <template v-if="filterData.categorys && filterData.categorys.length > 0">
    <elx-filter-item
      name="业务类型:"
      :items="filterData.categorys"
      @select-item="selectCategorys">
    </elx-filter-item>
  </template>
</elx-filter>
<script>
  export default {
    data: function() {
      return {
        filterData: {
          protocols: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ],
          callTypes: [
            {name: '本地mysql源', value: '4GF9Q5gtfeSaSWAc'},
            {name: '测试集群【DM】', value: '77_DM'},
            {name: '测试集群【GbaseBAS】', value: '77_GbaseBAS'},
            {name: '测试集群【GbaseDWD】', value: '77_GbaseDWD'},
            {name: '测试集群【GbaseDWI】', value: '77_GbaseDWI'},
            {name: '测试集群【GbaseMSM】', value: '77_GbaseMSM'},
            {name: 'app_act_dwdb', value: 'app_act_dwdb'},
            {name: 'app_msm_county', value: 'app_msm_county'},
            {name: '数据中心-gbase', value: 'BIGDB'},
            {name: '60节点_channelapp', value: 'channelapp'},
            {name: '多维成本日志', value: 'costdb_mysql'},
            {name: 'gbasebak', value: 'gbasebak'},
            {name: 'GbaseBAS[60节点-数据中心]', value: 'GbaseBAS'},
            {name: 'GbaseDM[60节点-数据中心]', value: 'GbaseDM'},
            {name: 'GbaseDWA[60节点-数据中心]', value: 'GbaseDWA'},
            {name: 'GbaseDWD[60节点-数据中心]', value: 'GbaseDWD'},
            {name: 'GbaseDWI[60节点-数据中心]', value: 'GbaseDWI'},
            {name: 'GbaseFTT', value: 'GbaseFTT'},
            {name: 'GbaseLOP[60节点-数据中心]', value: 'GbaseLOP'},
            {name: 'GbaseMC[60节点-数据中心]', value: 'GbaseMC'},
            {name: 'gbasemcd', value: 'gbasemcd'},
            {name: 'GbaseMSM[60节点-数据中心]', value: 'GbaseMSM'},
            {name: 'GbaseODS[60节点-数据中心]', value: 'GbaseODS'},
            {name: 'GbaseRPT', value: 'GbaseRPT'},
            {name: 'gbasest', value: 'gbasest'},
            {name: 'Gbase_DM[6节点-数据中心]', value: 'Gbase_6_DM'},
            {name: 'Gbase_DWD[6节点-数据中心]', value: 'Gbase_6_DWD'},
            {name: 'Gbase_LOP[6节点-数据中心]', value: 'Gbase_6_LOP'},
            {name: 'Gbase_MC[6节点-数据中心]', value: 'Gbase_6_MC'},
            {name: 'Gbase_ODS[6节点-数据中心]', value: 'Gbase_6_ODS'},
            {name: 'HP集群', value: 'hive'},
            {name: 'hive采集库（迁移前）', value: 'hiveCollectDB1'},
            {name: 'Hive DWA', value: 'HiveDWA'},
            {name: 'Hive DWD', value: 'HiveDWD'},
            {name: 'Hive DWI', value: 'HiveDWI'},
            {name: 'Hive ICA', value: 'HiveICA'},
            {name: 'Hive ODS', value: 'HiveODS'},
            {name: 'Hive TAS', value: 'HiveTAS'},
            {name: 'hivetest', value: 'hivetest'},
            {name: 'HIVE_电子稽核', value: 'Hive_Inspect'},
            {name: '数据体检开发库', value: 'md_dev'},
            {name: 'MSM前台库', value: 'mysqlMSM'},
            {name: 'oracl', value: 'oracl'},
            {name: 'pgSql', value: 'pgSql'},
            {name: 'postgreSQL', value: 'postgreSQL'},
            {name: '自助分析mysql配置库', value: 'sa'},
            {name: 'spark_hive_sql', value: 'sparkhive'},
            {name: 'spark_hive', value: 'sparksql'},
            {name: '测试库01', value: 'spQxEuefuk2hMyfc'},
            {name: 'TASDB', value: 'TASDB'}
          ],
          plats: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ],
          dataTypes: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ],
          states: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ],
          dataCycles: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ],
          categorys: [
            {name: 'a', value: 'a'},
            {name: 'b', value: 'b'},
            {name: 'c', value: 'c'}
          ]
        },
        show: true
      }
    },
    methods: {
      selectCallTypes: function(data) {
        this.filterData.plats = [
          {name: '本地mysql源', value: '4GF9Q5gtfeSaSWAc'},
          {name: '测试集群【DM】', value: '77_DM'},
          {name: '测试集群【GbaseBAS】', value: '77_GbaseBAS'},
          {name: '测试集群【GbaseDWD】', value: '77_GbaseDWD'},
          {name: '测试集群【GbaseDWI】', value: '77_GbaseDWI'},
          {name: '测试集群【GbaseMSM】', value: '77_GbaseMSM'},
          {name: 'app_act_dwdb', value: 'app_act_dwdb'},
          {name: 'app_msm_county', value: 'app_msm_county'},
          {name: '数据中心-gbase', value: 'BIGDB'},
          {name: '60节点_channelapp', value: 'channelapp'},
          {name: '多维成本日志', value: 'costdb_mysql'},
          {name: 'gbasebak', value: 'gbasebak'},
          {name: 'GbaseBAS[60节点-数据中心]', value: 'GbaseBAS'},
          {name: 'GbaseDM[60节点-数据中心]', value: 'GbaseDM'},
          {name: 'GbaseDWA[60节点-数据中心]', value: 'GbaseDWA'},
          {name: 'GbaseDWD[60节点-数据中心]', value: 'GbaseDWD'},
          {name: 'GbaseDWI[60节点-数据中心]', value: 'GbaseDWI'},
          {name: 'GbaseFTT', value: 'GbaseFTT'},
          {name: 'GbaseLOP[60节点-数据中心]', value: 'GbaseLOP'}
        ];
        this.$nextTick(function() {
          this.$refs['elxFilter'].refreshHeight();
        })
      },
      selectProtocols: function(data) {
        this.filterData.plats = [
          {name: 'a', value: 'a'},
          {name: 'b', value: 'b'},
          {name: 'c', value: 'c'}
        ];
        this.$nextTick(function() {
          this.$refs['elxFilter'].refreshHeight();
        })
        //this.$refs.callTypes.selectItems([this.filterData.callTypes[10]]);
      },
      selectPlats: function(data) {
        console.log(data);
      },
      selectDataTypes: function(data) {
        console.log(data);
      },
      selectStates: function(data) {
        console.log(data);
      },
      selectDataCycles: function(data) {
        console.log(data);
      },
      selectCategorys: function(data) {
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
