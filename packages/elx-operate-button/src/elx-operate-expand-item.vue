<template>
  <transition name="fade">
    <div class="elx-operate-item">
      <div class="elx-operate-expand">
        <slot name="operate-expand"></slot>
      </div>
      <slot name="operate-button"></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'ElxOperateExpandItem',
    componentName: 'ElxOperateExpandItem'
  };
</script>