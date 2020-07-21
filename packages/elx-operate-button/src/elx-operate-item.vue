<template>
  <transition name="fade">
    <div class="elx-operate-item">
      <el-button type="primary">
        <slot></slot>
      </el-button>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ElxOperateItem',
    componentName: 'ElxOperateItem'
  };
</script>