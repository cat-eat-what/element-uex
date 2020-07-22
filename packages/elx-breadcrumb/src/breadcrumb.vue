<template>
  <div class="elx-breadcrumb">
    <ul class="elx-breadcrumb-item">
      <li>
        <a
          v-for="(node,index) in menuActiveArr"
          href="javascript:;"
          :class="node.children.length == 0 ? 'active' : ''">
          <span
            v-if="node.images != '' && node.images"
            :class="node.images">
          </span>
          <span
            v-html="'&nbsp;' + node.modelname + '&nbsp;'">
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'ElxBreadcrumb',
    componentName: 'ElxBreadcrumb',

    props: {
      menuData: {
        type: Array,
        default: []
      },
      refresh: {
        type: Number,
        default: 0
      }
    },
    data: function() {
      return {
        menuActiveArr: []
      };
    },
    methods: {
      formatData: function() {
        var self = this;
        self.menuActiveArr.splice(0, self.menuActiveArr.length);
        var fun = function(node) {
          self.menuActiveArr.push(node);
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].active) {
              fun(node.children[i]);
            }
          }
        };
        for (var i = 0; i < self.menuData.length; i++) {
          if (self.menuData[i].active) {
            fun(self.menuData[i]);
          }
        }
      }
    },
    watch: {
      menuData: {
        deep: true,
        handler: function(val) {
          this.formatData();
        }
      },
      refresh: function() {
        this.formatData();
      }
    }
  };
</script>

