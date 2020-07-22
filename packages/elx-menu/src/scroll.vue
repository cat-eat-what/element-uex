<template>
    <div class="scroll" @mousemove="scrollMouseEnter" @mouseout="scrollMouseOut"  @mousedown="scroll" :style="{ top: top+'px',height: height+'px',width: width+'px' }"></div>
</template>
<script>
    var $ = require('jquery');
    export default {
      name: 'Scroll',
      componentName: 'Scroll',

      props: {
        top: {
          type: Number,
          default: 51
        },
        height: {
          type: Number,
          default: 10
        },
        scrollStart: {
          type: Boolean,
          default: false
        }
      },
      data: function() {
        return {
          width: 6
        };
      },
      methods: {
        scrollMouseEnter: function() {
          this.width = 10;
        },
        scrollMouseOut: function() {
          this.width = 6;
        },
        scroll: function(event) {
          var _e = event || window.event;
          this.$emit('start', _e.pageY, _e.pageY - $('#sidebar').offset().top - this.top);
        }
      }
    };
</script>
