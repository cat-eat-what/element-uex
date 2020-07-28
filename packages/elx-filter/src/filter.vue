<template>
  <div class="repeater-container section elx-filter">
    <div
      class="repeater"
      data-staticheight="400px"
      id="myRepeaterThumbnail">
      <div class="repeater-header">
        <div
          class="dacp-menu"
          :style="{height: currentShow ? height+'px' : '44px'}">
          <el-row class="dacp-menu-content">
            <slot></slot>
          </el-row>
        </div>
        <div class="button">
          <span @click="handleClick">
            <span :class="button.icon"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ElxFilter',
    componentName: 'ElxFilter',

    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        button: {
          icon: 'uex-icon-arrow-down'
        },
        currentShow: this.show,
        length: 0,
        height: 0
      };
    },
    methods: {
      refreshHeight() {
        var el = document.querySelector('.elx-filter .dacp-menu-content');
        if (el) {
          this.height = window.parseInt(el.clientHeight);
        }
      },
      handleClick() {
        this.currentShow = !this.currentShow;
        this.$emit('expand', this.currentShow);
      },
      changeButton(show) {
        this.button.icon = show ? 'uex-icon-arrow-up' : 'uex-icon-arrow-down';
      }
    },
    watch: {
      show(val, oldVal) {
        this.currentShow = val;
      },
      currentShow(val, oldVal) {
        this.changeButton(val);
        this.refreshHeight();
        this.$emit('update:show', val);
      }
    },
    created() {
      this.changeButton(this.show);
    },
    mounted() {
      this.refreshHeight();
    }
  };
</script>

