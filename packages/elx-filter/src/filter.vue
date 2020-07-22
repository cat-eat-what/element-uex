<template>
    <div class="repeater-container section elx-filter">
      <div class="repeater" data-staticheight="400px" id="myRepeaterThumbnail">
        <div class="repeater-header">
          <div class="dacp-menu" :style="{height: currentShow ? height+'px' : '44px'}">
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
  var $ = require('jquery');
  export default {
    name: 'ElxFilter',
    componentName: 'ElxFilter',

    props: {
      show: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
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
      refreshHeight: function() {
        this.height = window.parseInt($('.elx-filter .dacp-menu-content').height());
      },
      handleClick: function() {
        this.currentShow = !this.currentShow;
        this.$emit('expand', this.currentShow);
      },
      changeButton: function(show) {
        this.button.icon = show ? 'uex-icon-arrow-up' : 'uex-icon-arrow-down';
      }
    },
    watch: {
      show: function(val, oldVal) {
        this.currentShow = val;
      },
      currentShow: function(val, oldVal) {
        this.changeButton(val);
        this.refreshHeight();
        this.$emit('update:show', val);
      }
    },
    created: function() {
      this.changeButton(this.show);
      this.refreshHeight();
    }
  };
</script>

