<template>
  <div
    class="elx-main"
    v-loading="currentFullscreenLoading"
    :element-loading-text="t('el.mainLoading.loading')"
    :style="{overflow: overflow}">
    <div
      :class="{
        'main-show': !currentFullscreenLoading,
        'elx-row': splitType == 'row',
        'elx-col': splitType == 'col'
      }"
      :style="{opacity: currentFullscreenLoading ? 0 : 1}">
      <slot>无分发内容</slot>
    </div>
  </div>
</template>

<script>
  import Locale from 'element-uex/src/mixins/locale';
  export default {
    mixins: [Locale],
    name: 'ElxMain',
    componentName: 'ElxMain',

    props: {
      controlByParent: Boolean,
      fullscreenLoading: {
        type: Boolean,
        default: true
      },
      splitType: {
        type: String,
        default: 'row'
      }
    },
    data() {
      return {
        currentFullscreenLoading: this.fullscreenLoading,
        overflow: 'hidden'
      };
    },
    methods: {
      resize() {
        const self = this;
        if (typeof self.$children === 'object') {
          self.$children.map(function(item) {
            if (typeof item.resize === 'function') {
              item.resize();
            }
          });
        }
      }
    },
    watch: {
      fullscreenLoading(val, oldVal) {
        this.currentFullscreenLoading = val;
      },
      currentFullscreenLoading(val, oldVal) {
        const self = this;
        this.$emit('update:fullscreenLoading', val);
        if (!val) {
          this.$nextTick(function() {
            self.resize();
          });
        }
      }
    },
    mounted() {
      const self = this;
      window.addEventListener('resize', this.resize);
      this.$nextTick(function() {
        setTimeout(function() {
          if (!self.controlByParent) {
            self.currentFullscreenLoading = false;
          }
        }, 800);
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resize);
    }
  };
</script>

