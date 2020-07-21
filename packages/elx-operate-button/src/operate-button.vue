<template>
    <div class="elx-operate-button">
      <div class="elx-button-group">
        <el-button
          type="primary"
          class="operate-show"
          @click="groupOperate">
          <span
            class="uex-icon"
            :class="this.currentOperateShow?'uex-icon-arrow-right':'uex-icon-arrow-left'">
          </span>
        </el-button>
        <div class="elx-operate-group">
            <slot v-if="currentOperateShow"></slot>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'ElxOperateButton',
    componentName: 'ElxOperateButton',
    props: {
      operateShow: {
        type: Boolean,
        default: true
      }
    },
    data: function() {
      return {
        currentOperateShow: this.operateShow
      };
    },
    methods: {
      groupOperate: function() {
        this.currentOperateShow = !this.currentOperateShow;
      }
    }
  };
</script>

