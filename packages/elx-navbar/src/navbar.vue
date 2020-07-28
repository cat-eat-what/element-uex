<template>
  <div class="elx-navbar">
    <ul>
      <li
        v-for="(item,index) in currentNavData"
        :class="item.open ? 'open' : ''"
        @mouseenter="mouseenter(item)"
        @mouseleave="mouseleave(item)">
          <a :href="item.children.length > 0 ? 'javascript:void(0)' : item.url">
            <span v-html="item.modelname"></span>
            <span
              class="uex-icon-arrow-down"
              v-if="item.children.length > 0">
            </span>
          </a>
          <transition name="fade">
          <div
            class="treeview-menu"
            v-show="item.open && item.children.length > 0">
            <ul>
                <li v-for="child in item.children">
                  <a :href="child.children.length > 0 ? 'javascript:void(0)' : child.url">
                    <span v-html="child.modelname"></span>
                  </a>
                </li>
            </ul>
          </div>
          </transition>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ElxNavbar',
    componentName: 'ElxNavbar',

    props: {
      navData: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        currentNavData: []
      };
    },
    methods: {
      mouseenter(item) {
        item.open = true;
      },
      mouseleave(item) {
        item.open = false;
      },
      formatData() {
        var self = this;
        var fun = function(node) {
          if (!('open' in node)) {
            self.$set(node, 'open', false);
          }
          if (!('active' in node)) {
            self.$set(node, 'active', false);
          }
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            fun(node.children[i]);
          }
        };
        for (var i = 0;i < this.currentNavData.length; i++) {
          fun(this.currentNavData[i]);
        }
      }
    },
    watch: {
      navData(val) {
        this.currentNavData = val;
        this.formatData();
      }
    },
    created() {
      this.currentNavData = this.navData;
      this.formatData();
    }
  };
</script>

