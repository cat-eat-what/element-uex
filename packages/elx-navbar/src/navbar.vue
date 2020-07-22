<template>
  <div class="elx-navbar">
    <ul>
      <li v-for="(item,index) in navData" :class="item.open?'open':''" @mouseenter="mouseenter(item)" @mouseleave="mouseleave(item)">
          <a :href="item.children.length>0?'javascript:void(0)':item.url">
            <span v-html="item.modelname" ></span>
            <span class="uex-icon-arrow-down" v-if="item.children.length>0"></span>
          </a>
          <transition name="fade">
          <div class="treeview-menu" v-show="item.open&&item.children.length>0">
            <ul>
                <li v-for="child in item.children">
                  <a :href="child.children.length>0?'javascript:void(0)':child.url">
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
    data: function() {
      return {
      };
    },
    methods: {
      mouseenter: function(item) {
        item.open = true;
      },
      mouseleave: function(item) {
        item.open = false;
      }
    }
  };
</script>

