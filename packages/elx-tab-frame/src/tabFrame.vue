<template>
  <div class="elx-tab-frame">
    <elx-tabs
      v-model="currentActiveIndex"
      type="border-card"
      closable
      @edit="tabEdit"
      @tab-click="tabClick"
      @tab-add="addTab"
      @tab-remove="removeTab">
      <div class="title" slot="title">
        <span v-html="title"></span>
      </div>
      <el-tree
        :data="treeData"
        :props="defaultProps"
        @node-click="handleNodeClick">
      </el-tree>
      <el-tab-pane
        v-for="(item, index) in currentTabData"
        :key="item.name"
        :label="item.label"
        :name="item.name">
        <iframe :src="item.url" />
      </el-tab-pane>
    </elx-tabs>
  </div>
</template>

<script>
  export default {
    name: 'ElxTabFrame',
    componentName: 'ElxTabFrame',

    props: {
      title: {
        type: String,
        default: ''
      },
      tabActiveIndex: {
        type: String,
        default: '1'
      },
      tabData: {
        type: Array,
        default: []
      },
      treeData: {
        type: Array,
        default: []
      },
      defaultProps: {
        type: Object,
        default() {
          return {
            children: 'children',
            label: 'label'
          };
        }
      }
    },
    data() {
      return {
        currentActiveIndex: this.tabActiveIndex,
        currentTabData: this.tabData
      };
    },
    methods: {
      tabClick(tab) {
        this.$emit('tab-click', tab);
      },
      tabEdit(name, action) {
        this.$emit('edit', name, action);
      },
      addTab() {
        this.$emit('tab-add');
      },
      removeTab(name) {
        const _self = this;
        this.currentTabData = this.currentTabData.filter(function(tab) {
          if (tab.name === name) {
            const _index = _self.currentTabData.indexOf(tab);
            const _nextTab = _self.currentTabData[_index + 1] || _self.currentTabData[_index - 1];
            _self.currentActiveIndex = _nextTab ? _nextTab.name : null;
          }
          return tab.name !== name;
        });
        this.$emit('tab-remove', name);
      },
      handleNodeClick(data) {
        const _self = this;
        if (data.children.length === 0) {
          const _filterTabData = this.currentTabData.filter(function(tab) {
            return tab.name === data.name;
          });
          if (_filterTabData.length === 0) {
            this.currentTabData.push(data);
            this.$nextTick(function() {
              _self.currentActiveIndex = data.name;
            });
          } else {
            _self.currentActiveIndex = _filterTabData[0].name;
          }
        }
        this.$emit('node-click', data);
      }
    },
    watch: {
      tabActiveIndex(val) {
        this.currentActiveIndex = val;
      },
      currentActiveIndex(val) {
        this.$emit('update:tabActiveIndex', val);
      },
      tabData(val) {
        this.currentTabData = val;
      },
      currentTabData(val) {
        this.$emit('update:tabData', val);
      }
    },
    created() {
    }
  };
</script>

