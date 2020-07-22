<template>
    <div class="elx-breadcrumb">
       <ul class="elx-breadcrumb-item">
           <li>
               <a v-for="(node,index) in menuActiveArr" href="javascript:;" :class="node.children.length==0?'active':''" >
                   <span v-if="node.images!=''&&node.images" :class="node.images"></span>
                   <span v-html="'&nbsp'+node.modelname+'&nbsp'"></span>
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
    watch: {
      refresh: function() {
        var _self = this;
        _self.menuActiveArr.splice(0, _self.menuActiveArr.length);
        var fun = function(node) {
          _self.menuActiveArr.push(node);
          if (node.children.length === 0) {
            return;
          }
          for (var i = 0; i < node.children.length; i++) {
            if (node.children[i].active) {
              fun(node.children[i]);
            }
          }
        };
        for (var i = 0; i < _self.menuData.length; i++) {
          if (_self.menuData[i].active) {
            fun(_self.menuData[i]);
          }
        }
      }
    }
  };
</script>

