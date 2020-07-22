<template>
  <div id="app">
    <main-header v-if="lang !== 'play'"></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="lang !== 'play'"></main-footer>
  </div>
</template>

<script>
  import { use } from 'main/locale';
  import zhLocale from 'main/locale/lang/zh-CN';
  import enLocale from 'main/locale/lang/en';
  use(location.href.indexOf('zh-CN') > -1 ? zhLocale : enLocale);

  export default {
    name: 'app',

    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      }
    },

    watch: {
      lang() {
        this.localize();
      }
    },

    methods: {
      localize() {
        use(this.lang === 'zh-CN' ? zhLocale : enLocale);
      },

      renderAnchorHref() {
        if (/changelog/g.test(location.href)) return;
        const anchors = document.querySelectorAll('h2 a,h3 a');
        const basePath = location.href.split('#').splice(0, 2).join('#');

        [].slice.call(anchors).forEach(a => {
          const href = a.getAttribute('href');
          a.href = basePath + href;
        });
      },

      goAnchor() {
        if (location.href.match(/#/g).length > 1) {
          const anchor = location.href.match(/#[^#]+$/g);
          if (!anchor) return;
          const elm = document.querySelector(anchor[0]);
          if (!elm) return;

          setTimeout(_ => {
            document.documentElement.scrollTop = document.body.scrollTop = elm.offsetTop + 120;
          }, 50);
        }
      }
    },

    mounted() {
      this.localize();
      this.renderAnchorHref();
      this.goAnchor();
    },

    created() {
      window.addEventListener('hashchange', () => {
        if (location.href.match(/#/g).length < 2) {
          document.documentElement.scrollTop = document.body.scrollTop = 0;
          this.renderAnchorHref();
        } else {
          this.goAnchor();
        }
      });
    }
  };
</script>
