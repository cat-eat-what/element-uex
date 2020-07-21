<template>
  <div class="page-container page-guide">
    <el-row>
      <el-col :xs="24" :sm="5">
        <side-nav :data="navsData" :base="`/${ lang }/guide`"></side-nav>
      </el-col>
      <el-col :xs="24" :sm="19">
        <router-view class="content"></router-view>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData: [
          {
            path: '/design',
            name: '<%= 1 >'
          },
          {
            path: '/nav',
            name: '<%= 2 >'
          }
        ]
      };
    }
  };
</script>
