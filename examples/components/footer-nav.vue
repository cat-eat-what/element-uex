<template>
  <div class="footer-nav">
    <span
      v-if="leftNav"
      class="footer-nav-link footer-nav-left"
      @click="handleNavClick('prev')">
      <i class="el-icon-arrow-left"></i>
      {{ leftNav.title || leftNav.name }}
    </span>
    <span
      v-if="rightNav"
      class="footer-nav-link footer-nav-right"
      @click="handleNavClick('next')">
      {{ rightNav.title || rightNav.name }}
      <i class="el-icon-arrow-right"></i>
    </span>
  </div>
</template>
<script>
  import navConfig from '../nav.config.json';

  export default {
    data() {
      return {
        currentComponent: null,
        nav: [],
        currentIndex: -1,
        leftNav: null,
        rightNav: null
      };
    },

    computed: {
      lang() {
        return this.$route.meta.lang;
      }
    },

    watch: {
      '$route.path'() {
        this.setNav();
        this.updateNav();
      }
    },

    methods: {
      setNav() {
        let nav = navConfig[this.lang];
        this.nav = nav[0].children.concat(nav[1]);
        nav[1].groups.map(group => group.list).forEach(list => {
          this.nav = this.nav.concat(list);
        });
      },

      updateNav() {
        this.currentComponent = '/' + this.$route.path.split('/')[3];
        for (let i = 0, len = this.nav.length; i < len; i++) {
          if (this.nav[i].path === this.currentComponent) {
            this.currentIndex = i;
            break;
          }
        }
        this.leftNav = this.nav[this.currentIndex - 1];
        this.rightNav = this.nav[this.currentIndex + 1];
      },

      handleNavClick(direction) {
        this.$router.push(`/${ this.lang }/component${ direction === 'prev' ? this.leftNav.path : this.rightNav.path }`);
      }
    },

    created() {
      this.setNav();
      this.updateNav();
    }
  };
</script>