<template>
  <div
    class="demo-block"
    :class="[blockClass, { 'hover': hovering }]"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false">
    <slot name="source"></slot>
    <div class="meta">
      <div class="description">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="demo-block-control" @click="isExpanded = !isExpanded">
      <transition name="arrow-slide">
        <i :class="[iconClass, { 'hovering': hovering }]"></i>
      </transition>
      <transition name="text-slide">
        <span v-show="hovering">{{ controlText }}</span>
      </transition>
    </div>
  </div>
</template>
<script type="text/babel">
  import compoLang from '../i18n/component.json';

  export default {
    data() {
      return {
        hovering: false,
        isExpanded: false
      };
    },

    props: {
      jsfiddle: Object,
      default() {
        return {};
      }
    },

    methods: {
      goJsfiddle() {
        const { script, html, style } = this.jsfiddle;
        const resourcesTpl = '<scr' + 'ipt src="//unpkg.com/vue/dist/vue.js"></scr' + 'ipt>' +
        '\n<scr' + 'ipt src="//unpkg.com/ext-element/lib/index.js"></scr' + 'ipt>';
        let jsTpl = (script || '').replace(/export default/, 'var Main =').trim();
        let htmlTpl = `${resourcesTpl}\n<div id="app">\n${html.trim()}\n</div>`;
        let cssTpl = `@import url("//unpkg.com/element-ui/lib/theme-default/index.css");\n${(style || '').trim()}\n`;
        jsTpl = jsTpl
          ? jsTpl + '\nvar Ctor = Vue.extend(Main)\nnew Ctor().$mount(\'#app\')'
          : 'new Vue().$mount(\'#app\')';
        const data = {
          js: jsTpl,
          css: cssTpl,
          html: htmlTpl,
          panel_js: 3,
          panel_css: 1
        };
        const form = document.getElementById('fiddle-form') || document.createElement('form');
        form.innerHTML = '';
        const node = document.createElement('textarea');

        form.method = 'post';
        form.action = 'https://jsfiddle.net/api/post/library/pure/';
        form.target = '_blank';

        for (let name in data) {
          node.name = name;
          node.value = data[name].toString();
          form.appendChild(node.cloneNode());
        }
        form.setAttribute('id', 'fiddle-form');
        form.style.display = 'none';
        document.body.appendChild(form);

        form.submit();
      }
    },

    computed: {
      lang() {
        return this.$route.path.split('/')[1];
      },

      langConfig() {
        return compoLang.filter(config => config.lang === this.lang)[0]['demo-block'];
      },

      blockClass() {
        return `demo-${ this.lang } demo-${ this.$router.currentRoute.path.split('/').pop() }`;
      },

      iconClass() {
        return this.isExpanded ? 'el-icon-caret-top' : 'el-icon-caret-bottom';
      },

      controlText() {
        return this.isExpanded ? this.langConfig['hide-text'] : this.langConfig['show-text'];
      },

      codeArea() {
        return this.$el.getElementsByClassName('meta')[0];
      },

      codeAreaHeight() {
        if (this.$el.getElementsByClassName('description').length > 0) {
          return Math.max(this.$el.getElementsByClassName('description')[0].clientHeight, this.$el.getElementsByClassName('highlight')[0].clientHeight);
        }
        return this.$el.getElementsByClassName('highlight')[0].clientHeight;
      }
    },

    watch: {
      isExpanded(val) {
        this.codeArea.style.height = val ? `${ this.codeAreaHeight + 1 }px` : '0';
      }
    },

    mounted() {
      this.$nextTick(() => {
        let highlight = this.$el.getElementsByClassName('highlight')[0];
        if (this.$el.getElementsByClassName('description').length === 0) {
          highlight.style.width = '100%';
          highlight.borderRight = 'none';
        }
      });
    }
  };
</script>
