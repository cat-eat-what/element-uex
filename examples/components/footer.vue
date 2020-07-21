<template>
  <footer class="footer">
    <div class="container"></div>
  </footer>
</template>

<script type="text/babel">
  import compoLang from '../i18n/component.json';
  import { version } from 'main/index.js';

  export default {
    data() {
      return {
        version
      };
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1];
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['footer'];
      }
    }
  };
</script>
