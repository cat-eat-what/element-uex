<template>
  <div class="page-container page-component">
    <el-row>
      <el-col :xs="24" :sm="6">
        <side-nav :data="navsData[lang]" :base="`/${ lang }/component`"></side-nav>
      </el-col>
      <el-col :xs="24" :sm="18">
        <router-view class="content"></router-view>
        <footer-nav></footer-nav>
      </el-col>
    </el-row>
    <transition name="back-top-fade">
      <div
        class="page-component-up"
        :class="{ 'hover': hover }"
        v-show="showBackToTop"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        @click="toTop">
        <i class="el-icon-caret-top"></i>
      </div>
    </transition>
  </div>
</template>
<script>
  import navsData from '../../nav.config.json';
  import throttle from 'throttle-debounce/throttle';
  export default {
    data() {
      return {
        lang: this.$route.meta.lang,
        navsData,
        hover: false,
        showBackToTop: false
      };
    },
    methods: {
      toTop() {
        this.hover = false;
        this.showBackToTop = false;
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      handleScroll() {
        this.showBackToTop = (document.body.scrollTop || document.documentElement.scrollTop) >= 0.5 * document.body.clientHeight;
      }
    },
    mounted() {
      this.throttledScrollHandler = throttle(300, this.handleScroll);
      document.addEventListener('scroll', this.throttledScrollHandler);
    },
    beforeDestroy() {
      document.removeEventListener('scroll', this.throttledScrollHandler);
    }
  };
</script>
