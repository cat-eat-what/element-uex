<template>
    <div class="elx-main" :element-loading-text="t('el.mainLoading.loading')" v-loading="currentFullscreenLoading" :style="{overflow: overflow}">
    <div :class="{'main-show': !currentFullscreenLoading, 'elx-row': splitType=='row', 'elx-col': splitType=='col'}" :style="{opacity:currentFullscreenLoading?0:1}">
        <slot>无分发内容</slot>
    </div>
    </div>
</template>

<script>
  import _ from 'underscore';
  import Locale from 'element-uex/src/mixins/locale';
  export default {
    mixins: [Locale],
    name: 'ElxMain',
    componentName: 'ElxMain',

    props: {
      fullscreenLoading: {
        type: Boolean,
        default: true
      },
      splitType: {
        type: String,
        default: 'row'
      }
    },
    data: function() {
      return {
        currentFullscreenLoading: this.fullscreenLoading,
        overflow: 'hidden'
      };
    },
    methods: {
      resize: function() {
        var self = this;
        if (typeof self.$children === 'object') {
          _.map(self.$children, function(item) {
            if (typeof item.resize === 'function') {
              item.resize();
            }
          });
        }
      }
    },
    watch: {
      fullscreenLoading: function(val, oldVal) {
        this.currentFullscreenLoading = val;
      },
      currentFullscreenLoading: function(val, oldVal) {
        var self = this;
        this.$emit('update:fullscreenLoading', val);
        if (!val) {
          this.$nextTick(function() {
            self.resize();
          });
        }
      }
    },
    mounted: function() {
      var self = this;
      if (window.addEventListener) {
        window.addEventListener('resize', self.resize);
      } else if (window.attachEvent) {
        window.attachEvent('resize', self.resize);
      }
      this.$nextTick(function() {
        setTimeout(function() {
          self.currentFullscreenLoading = false;
        }, 800);
      });
    }
  };
</script>

