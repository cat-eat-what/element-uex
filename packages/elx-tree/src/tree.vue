<template>
    <div class="elx-tree">
        <el-input :placeholder="t('el.tree.filter')" v-model="filterText"></el-input>
        <el-tree :expand-on-click-node="false" :currentNodeKey="currentNodeKey" :default-expanded-keys="defaultExpandedKeys" ref="elxTreeChild" :filter-node-method="filterNode" @node-expand="nodeExpand" @node-collapse="nodeCollapse" @node-click="treeNodeClick" :data="currentTreeData" :props="props" node-key="id" :render-content="renderContent"></el-tree>
        <transition name="fade">
        <div class="elx-content-menu" v-show="contentMenuShow&&(activeData.isDelete||activeData.isAdd||activeData.isEdit)" :style="{top: pos.y, left: pos.x}">
            <ul>
                <li v-show="activeData.isAdd" @click.stop.prevent="append">
                    <span class="uex-icon-add"></span>
                    <span>{{t('el.tree.addNode')}}</span>
                </li>
                <li v-show="activeData.isEdit" @click.stop.prevent="rename">
                    <span class="uex-icon-edit"></span>
                    <span>{{t('el.tree.rename')}}</span>
                </li>
                <li v-show="activeData.isDelete" @click.stop.prevent="remove">
                    <span class="uex-icon-delete"></span>
                    <span>{{t('el.tree.delete')}}</span>
                </li>
            </ul>
        </div>
        </transition>
    </div>
</template>

<script>
  var $ = require('jquery');
  import Locale from 'element-uex/src/mixins/locale';
  export default {
    mixins: [Locale],
    name: 'ElxTree',
    componentName: 'ElxTree',

    props: {
      data: {
        type: Array
      },
      defaultExpandedKeys: Array,
      currentNodeKey: String,
      props: {
        default() {
          return {
            children: 'children',
            label: 'label'
          };
        }
      }
    },
    data: function() {
      return {
        store: {},
        id: 1000,
        currentTreeData: [],
        activeNode: {},
        activeData: {},
        pos: {
          x: 0,
          y: 0
        },
        contentMenuShow: false,
        filterText: ''
      };
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        this.$nextTick(function() {
          if (data.children.length !== 0) {
            data.isExpand = true;
          }
        });
        return data.label.indexOf(value) !== -1;
      },
      expandNode: function(key) {
        var _fun = function(node) {
          if (node.id === key && node.children.length !== 0) {
            node.isExpand = true;
          }
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            _fun(node.children[i]);
          }
        };
        for (var i = 0;i < this.currentTreeData.length;i++) {
          _fun(this.currentTreeData[i]);
        }
      },
      formatData: function() {
        var _fun = function(node) {
          node.isExpand = 'isExpand' in node ? node.isExpand : false;
          node.rename = 'rename' in node ? node.rename : false;
          node.isAdd = 'isAdd' in node ? node.isAdd : true;
          node.isEdit = 'isEdit' in node ? node.isEdit : true;
          node.isDelete = 'isDelete' in node ? node.isDelete : true;
          if ('children' in node) {
            if (Array.isArray(node.children)) {
              if (node.children.length === 0) {
                return;
              }
            } else {
              node.children = [];
              return;
            }
          } else {
            node.children = [];
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            _fun(node.children[i]);
          }
        };
        var _data = JSON.parse(JSON.stringify(this.data));
        for (var i = 0;i < _data.length;i++) {
          _fun(_data[i]);
        }
        return _data;
      },
      nodeExpand: function(data, node, obj) {
        data.isExpand = true;
      },
      nodeCollapse: function(data, node, obj) {
        data.isExpand = false;
      },
      treeNodeClick: function(data, node, obj, event) {
        this.contentMenuShow = false;
        this.$emit('node-click', node);
        this.renameFalse(event, node === this.activeNode);
      },
      getEventPos: function(e) {
        var x = e.clientX;
        var y = e.clientY;
        return { 'x': x, 'y': y };
      },
      nodeClick: function(node, data, store, event) {
        var e = event || window.event;
        var pos = this.getEventPos(e);
        if (e.which === 3) {
          this.$emit('right-click', node);
          this.contentMenuShow = false;
          this.renameFalse(event);
          this.pos.x = pos.x + 'px';
          this.pos.y = pos.y + 'px';
          this.activeData = data;
          this.store = store;
          this.activeNode = node;
          this.contentMenuShow = true;
        }
        this.preventDefault(e);
        e.returnValue = false;
        return false;
      },
      changeLabel: function(data, event) {
        var e = event || window.event;
        data.label = e.target.value;
      },
      append: function() {
        var _self = this;
        this.activeData.children.push({ id: this.id++, rename: false, isExpand: false, isEdit: true, isAdd: true, isDelete: true, label: '新增', children: [] });
        this.contentMenuShow = false;
        this.$nextTick(function() {
          _self.activeData.isExpand = _self.activeData.children.length !== 0;
          _self.activeNode.expand();
          _self.$emit('add', _self.activeNode);
        });
      },
      remove: function() {
        var _self = this;
        var _index;
        if ('children' in this.activeNode.parent.data) {
          _index = this.activeNode.parent.data.children.indexOf(this.activeData);
          this.activeNode.parent.data.children.splice(_index, 1);
          var _length = this.activeNode.parent.data.children.length;
          this.activeNode.parent.data.isExpand = _length !== 0;
        } else {
          _index = this.activeNode.parent.data.indexOf(this.activeData);
          this.activeNode.parent.data.splice(_index, 1);
        }
        this.activeNode.parent.removeChild(this.activeNode);
        this.contentMenuShow = false;
        this.$nextTick(function() {
          _self.$emit('remove', _self.activeNode);
        });
      },
      rename: function() {
        this.activeData.rename = true;
        this.contentMenuShow = false;
      },
      renameEmit: function() {
        var _self = this;
        this.$nextTick(function() {
          _self.$emit('rename', _self.activeNode);
        });
      },
      getDisabled: function() {
        return false;
      },
      preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnvalue = false;
        }
      },
      changeRename: function(data) {
        data.rename = true;
      },
      renameFalse: function(event, judge) {
        var e = event || window.event;
        if (e) {
          if (e.target.localName === 'input' && !('disabled' in e.target.attributes)) {
            return;
          }
        } else {
          if (judge) {
            return;
          }
        }
        var _fun = function(node) {
          node.rename = false;
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            _fun(node.children[i]);
          }
        };
        for (var i = 0;i < this.currentTreeData.length;i++) {
          _fun(this.currentTreeData[i]);
        }
      },
      renderContent: function(h, { node, data, store }) {
        this.store = store;
        return (
          <div class="node" on-contextmenu={ ($event) => (this.nodeClick(node, data, store, $event)) }>
            <el-tooltip class="item" open-delay={1000} effect="light" content={data.label} placement="right">
              <span>
                {data.isExpand ? (<span class="uex-icon-folder-open"></span>) : (<span class="uex-icon-folder"></span>)}
                {data.rename ? (<input type="text" on-blur={ () => this.renameEmit(node) } on-click={ () => this.changeRename(data) } value={data.label} on-input={ ($event) => this.changeLabel(data, $event) }></input>) : (<span>{data.label}</span>)}
              </span>
            </el-tooltip>
          </div>
        );
      },
      initTree: function() {
        for (var i in this.defaultExpandedKeys) {
          this.expandNode(this.defaultExpandedKeys[i]);
        }
        if (this.store.currentNode) {
          this.$emit('node-click', this.store.currentNode);
        }
      }
    },
    watch: {
      data: function(val, oldVal) {
        this.currentTreeData = this.formatData();
        if (Array.isArray(oldVal)) {
          if (oldVal.length === 0) {
            this.initTree();
          }
        }
      },
      currentTreeData: function(val, oldVal) {
        this.$emit('update: data', val);
      },
      filterText: function(val) {
        this.$refs.elxTreeChild.filter(val);
      }
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        $('body').on('click', function(event) {
          _self.contentMenuShow = false;
          _self.renameFalse(event);
        });
        _self.initTree();
      });
    },
    created: function() {
      this.currentTreeData = this.formatData();
    }
  };
</script>

