<template>
  <div :class="'elx-tree ' + (line ? 'elx-tree-line ' : ' ') + (draggable ? 'draggable' : '')">
    <el-input
      size="mini"
      v-model="filterText"
      suffix-icon="uex-icon-search"
      :placeholder="t('el.tree.filter')">
    </el-input>
    <elx-el-tree
      ref="elxTreeChild"
      node-key="id"
      :data="currentTreeData"
      :props="props"
      :lazy="lazy"
      :indent="19"
      :load="load"
      :render-content="renderContent"
      :expand-on-click-node="expandOnClickNode"
      :current-node-key="currentNodeKey"
      :default-expanded-keys="defaultExpandedKeys"
      :filter-node-method="filterNode"
      :default-expand-all="defaultExpandAll"

      :draggable="draggable"
      :allow-drop="allowDrop"
      :allow-drag="allowDrag"
      :drop-by-outside="dropByOutside"

      @node-expand="nodeExpand"
      @node-collapse="nodeCollapse"
      @node-click="treeNodeClick"

      @node-drag-start="handleDragStart"
      @node-drag-enter="handleDragEnter"
      @node-drag-leave="handleDragLeave"
      @node-drag-over="handleDragOver"
      @node-drag-end="handleDragEnd"
      @node-drop="handleDrop">
    </elx-el-tree>
    <transition name="fade">
      <div
        class="elx-content-menu"
        v-show="contentMenuShow && (activeData.isDelete || activeData.isAdd || activeData.isEdit || activeData.hasExtraAction)"
        :style="{
          top: pos.y,
          left: pos.x
        }">
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
          <slot name="operate" :data="activeData"></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
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
      },
      expandOnClickNode: Boolean,
      defaultExpandAll: Boolean,
      lazy: Boolean,
      load: Function,
      line: {
        default: true,
        Boolean
      },
      draggable: Boolean,
      dropByOutside: Boolean,
      allowDrag: Function,
      allowDrop: Function
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
      appendTree(data, parentNode) {
        this.$refs['elxTreeChild'].append(data, parentNode);
      },
      insertBefore(data, refNode) {
        this.$refs['elxTreeChild'].insertBefore(data, refNode);
      },
      insertAfter(data, refNode) {
        this.$refs['elxTreeChild'].insertAfter(data, refNode);
      },
      handleDragStart: function(node, e) {
        this.$emit('node-drag-start', node, e);
      },
      handleDragEnter: function(draggingNode, dropNode, e) {
        this.$emit('node-drag-enter', draggingNode, dropNode, e);
      },
      handleDragLeave: function(draggingNode, dropNode, e) {
        this.$emit('node-drag-leave', draggingNode, dropNode, e);
      },
      handleDragOver: function(draggingNode, dropNode, e) {
        this.$emit('node-drag-over', draggingNode, dropNode, e);
      },
      handleDragEnd: function(draggingNode, dropNode, dropType, e) {
        this.$emit('node-drag-end', draggingNode, dropNode, dropType, e);
      },
      handleDrop: function(draggingNode, dropNode, dropType, e) {
        this.$emit('node-drop', draggingNode, dropNode, dropType, e);
      },
      hasText: function(label, value) {
        return (String(label).toLowerCase().indexOf(String(value).toLowerCase()) !== -1);
      },
      childNodesHasText: function(item) {
        var judge = false;
        var self = this;
        var func = function(node) {
          if (Array.isArray(node.childNodes)) {
            var childNodes = node.childNodes;
            for (var i = 0; i < childNodes.length; i++) {
              if (self.hasText(childNodes[i].data.label, self.filterText)) {
                judge = true;
                return;
              }
              func(childNodes[i]);
            }
          }
        };
        func(item);
        return judge;
      },
      filterNode(value, data, node) {
        if (!value) return true;
        var isParentVal = false;
        var parentNodes = [];
        var self = this;
        var getParent = function(node) {
          if (node.parent) {
            parentNodes.push(node.parent);
            isParentVal = isParentVal || self.hasText(node.parent.data.label, value);
            getParent(node.parent);
          }
        };
        getParent(node);
        var isVal = this.hasText(data.label, value);
        if (isVal) {
          node.hasText = true;
        } else {
          node.hasText = false;
        }
        this.$nextTick(function() {
          if (this.childNodesHasText(node)) {
            node.expand();
            data.isExpand = true;
          } else {
            data.isExpand = false;
            node.collapse();
          }
        });
        return isVal || isParentVal;
      },
      expandNode: function(key) {
        var _fun = function(node) {
          if (!Array.isArray(node.children)) {
            return;
          }
          if (node.children.length === 0) {
            return;
          }
          if (node.id === key && node.children.length !== 0) {
            node.isExpand = true;
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
          node.hasExtraAction = 'hasExtraAction' in node ? node.hasExtraAction : false;
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
        this.$emit('node-click', node, event);
        this.renameFalse(event, node === this.activeNode);
      },
      nodeDblClick: function(data, node, obj, event) {
        this.contentMenuShow = false;
        this.$emit('node-dblclick', node, event);
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
          this.$emit('right-click', node, event);
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
        this.activeData.children.push({ id: this.id++, rename: false, isExpand: false, hasExtraAction: false, isEdit: true, isAdd: true, isDelete: true, label: '新增', children: [] });
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
          if (!Array.isArray(node.children)) {
            return;
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
      renderContent: function(h, { node, data, store }) {
        this.store = store;
        var self = this;
        var nodeClass = 'node level-' + node.level + ' child-' + node.childNodes.length;
        var level = this.data.length > 1 ? node.level : node.level - 2;
        var parentNodes = [];
        var getParent = function(node) {
          if (node.parent) {
            parentNodes.push(node.parent);
            getParent(node.parent);
          }
        };
        getParent(node);
        nodeClass = node.nextNodesVisible ? nodeClass + ' has-next' : nodeClass;
        nodeClass = node.childNodesVisible ? nodeClass + ' has-child' : nodeClass;
        nodeClass = node.preNodesVisible ? nodeClass + ' has-pre' : nodeClass;
        nodeClass = node.parent ? (node.parent.parent ? nodeClass + ' has-parent' : nodeClass) : nodeClass;
        nodeClass = !node.isLeaf ? nodeClass + ' is-not-leaf' : nodeClass;
        var texts = [(<span>{data.label}</span>)];
        if (this.filterText) {
          if (node.hasText) {
            var indexs = [];
            var regexp = new RegExp(this.filterText, 'gi');
            var filterLength = this.filterText.length;
            data.label.replace(regexp, function(t, index, label) {
              indexs.push(index);
            });
            if (indexs.length > 0) {
              texts = [];
              var i = 0;
              indexs.map(function(index, pos) {
                var sliceText = data.label.slice(i, index);
                texts.push((<span>{sliceText}</span>));
                texts.push((<span class="filter">{self.filterText}</span>));
                i = index + filterLength;
                if (pos === indexs.length - 1) {
                  texts.push((<span>{data.label.slice(i, data.label.length)}</span>));
                }
              });
            }
          }
        }

        return (
          <div class={nodeClass} on-dblclick={ ($event) => (this.nodeDblClick(node, data, store, $event)) } on-contextmenu={ ($event) => (this.nodeClick(node, data, store, $event)) }>
            {
              this.line && level > 0 ? this._l(parentNodes, (node, index) =>
                node.nextNodesVisible ? <span class={'line' + index} style={'left: ' + (-index * 19 - 33) + 'px'}></span> : '') : ''
            }
            <el-tooltip class="item" open-delay={1000} effect="light" content={data.label} placement="right">
              <span>
                {!data.icon ? (!node.isLeaf ? (node.expanded ? (<span class="uex-icon-folder-open"></span>) : (<span class="uex-icon-folder"></span>)) : (<span class="uex-icon-document"></span>)) : (<span class={data.icon}></span>)}
                {data.rename ? (<input type="text" on-blur={ () => this.renameEmit(node) } on-click={ () => this.changeRename(data) } value={data.label} on-input={ ($event) => this.changeLabel(data, $event) }></input>) : this._l(texts, (text) => text)}
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
      },
      addEvent: function(element, type, handler) {
        if (element.addEventListener) {
          element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
          element.attachEvent('on' + type, function() {
            handler.call(element);
          });
        } else {
          element['on' + type] = handler;
        }
      },
      docClick: function(event) {
        this.contentMenuShow = false;
        this.renameFalse(event);
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
        this.$emit('update:data', val);
      },
      filterText: function(val) {
        this.$refs.elxTreeChild.filter(val);
      }
    },
    mounted: function() {
      var _self = this;
      this.$nextTick(function() {
        document.body.addEventListener('click', this.docClick);
        _self.initTree();
      });
    },
    beforeDestroy: function() {
      document.body.removeEventListener('click', this.docClick);
    },
    created: function() {
      this.currentTreeData = this.formatData();
    }
  };
</script>

