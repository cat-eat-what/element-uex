<template>
  <div class="elx-menu-expand">
    <div
      class="elx-menu-expand-title"
      v-html="title"></div>
    <ul>
      <li
        v-for="model in currentMenu"
        :class="getClass(model)">
        <el-tooltip
          class="item"
          placement="right"
          effect="light"
          :open-delay="1000"
          :content="model.modelname">
          <a href="javascript:;">
            <span v-html="model.modelname"></span>
          </a>
        </el-tooltip>
        <el-collapse-transition>
          <ul>
            <li
              v-for="item in model.children"
              :class="item.active ? 'active' : ''"
              @click="selectMenu(item)">
              <el-tooltip
                class="item"
                effect="light"
                placement="right"
                :open-delay="1000"
                :content="item.modelname">
                <span v-html="item.modelname"></span>
              </el-tooltip>
            </li>
          </ul>
        </el-collapse-transition>
      </li>
    </ul>
  </div>
</template>

<script>
  import { cMessage } from 'packages/elx-menu/src/util';

  export default {
    name: 'ElxMenuExpand',
    componentName: 'ElxMenuExpand',

    props: {
      title: {
        type: String,
        default: ''
      },
      isPost: {
        type: Boolean,
        default: false
      },
      message: {
        type: [Array, Object, Number, String],
        default: ''
      },
      locationOrigin: {
        type: String,
        default: ''
      },
      menuData: {
        type: Array,
        default: []
      },
      menuActive: {
        type: String,
        default: ''
      },
      menuOpen: {
        type: String,
        default: ''
      },
      expand: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        menuAni: null,
        currentMenu: []
      };
    },
    methods: {
      openMenu(item) {
        item.open = !item.open;
      },
      selectMenu(item) {
        for (let i in this.currentMenu) {
          const _children = this.currentMenu[i].children;
          for (let j in _children) {
            _children[j].active = false;
            if (_children[j].modelcode === item.modelcode) {
              this.currentMenu[i].active = true;
            }
          }
        }
        item.active = true;
        this.$emit('menu-change', item);
      },
      expandAll() {
        if (this.expand) {
          for (let i in this.currentMenu) {
            this.currentMenu[i].open = true;
          }
        }
      },
      postMessage() {
        if (this.isPost) {
          cMessage.postMessage(this.message, this.locationOrigin, parent);
        }
      },
      bindPostMessage() {
        const _self = this;
        cMessage.receiveMessage(function(message) {
          if (typeof message.data === 'object' && !Array.isArray(message.data)) {
            if ('menuType' in message.data) {
              if (window.top !== window.self) {
                cMessage.postMessage(message.data, _self.locationOrigin, parent);
              }
            } else if ('menuActive' in message.data) {
              _self.$emit('update:menuActive', message.data.menuActive);
            }
          }
          _self.$emit('receive-message', message);
        }, _self.locationOrigin);
      },
      getClass(item) {
        let _class = '';
        if (item.open) {
          _class = _class + 'open ';
        }
        if (item.active) {
          _class = _class + 'active ';
        }
        return _class;
      },
      formatData() {
        const self = this;
        const fun = function(node) {
          if (!('open' in node)) {
            self.$set(node, 'open', false);
          }
          if (!('active' in node)) {
            self.$set(node, 'active', false);
          }
          if (node.children.length === 0) {
            return;
          }
          for (let i = 0; i < node.children.length; i++) {
            fun(node.children[i]);
          }
        };
        for (let i = 0;i < this.currentMenu.length; i++) {
          fun(this.currentMenu[i]);
        }
      }
    },
    watch: {
      'isPost'(val, oldVal) {
        this.postMessage();
      },
      'menuData'(val, oldVal) {
        this.currentMenu = val;
        this.formatData();
      },
      'currentMenu'(val, oldVal) {
        this.$emit('updata:menuData', val);
      },
      'expand'(val, oldVal) {
        this.expandAll();
      }
    },
    created() {
      this.currentMenu = this.menuData;
      this.formatData();
      this.postMessage();
      this.bindPostMessage();
      this.expandAll();
    }
  };
</script>

