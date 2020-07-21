<template>
  <div class="headerWrapper">
    <header class="header"
    ref="header"
    :style="headerStyle"
    :class="{
      'header-home': isHome
    }">
      <div class="container">
        <h1><router-link :to="`/${ lang }`">
          Element-Uex
        </router-link></h1>
        <ul class="nav">
          <li class="nav-item">
            <router-link
              active-class="active"
              :to="`/${ lang }/component`">{{ langConfig.components }}
            </router-link>
          </li>
          <!--<li class="nav-item">
            <span
              class="nav-lang"
              :class="{ 'active': lang === 'zh-CN' }"
              @click="switchLang('zh-CN')">
              中文
            </span>
            <span> / </span>
            <span
              class="nav-lang"
              :class="{ 'active': lang === 'en-US' }"
              @click="switchLang('en-US')">
              En
            </span>
          </li>-->
        </ul>
      </div>
    </header>
  </div>
</template>
<script>
  import compoLang from '../i18n/component.json';

  export default {
    data() {
      return {
        active: '',
        isHome: false,
        headerStyle: {}
      };
    },
    watch: {
      '$route.path': {
        immediate: true,
        handler() {
          this.headerStyle.backgroundColor = `rgba(255, 255, 255, ${ this.isHome ? '0' : '1' })`;
        }
      }
    },
    computed: {
      lang() {
        return this.$route.path.split('/')[1] || 'zh-CN';
      },
      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['header'];
      }
    },
    methods: {
      switchLang(targetLang) {
        if (this.lang === targetLang) return;
        localStorage.setItem('ELEMENT_LANGUAGE', targetLang);
        this.$router.push(this.$route.path.replace(this.lang, targetLang));
      }
    },
    mounted() {
    }
  };
</script>
