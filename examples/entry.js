import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import hljs from 'highlight.js';
import routes from './route.config';
import './assets/element-ui/src/index.scss';
import 'packages/theme-default/src/index.scss';
import './demo-styles/index.scss';

import Element from 'main/index.js';
import ElementUI from 'element-ui';

require('./mock.js');

import demoBlock from './components/demo-block.vue';
import MainFooter from './components/footer.vue';
import MainHeader from './components/header.vue';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title.json';

import 'codemirror/lib/codemirror.css';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';

import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/xml-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/markdown-fold';
import 'codemirror/addon/fold/comment-fold';

import 'codemirror/addon/display/fullscreen.css';
import 'codemirror/addon/display/fullscreen.js';

import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/shell/shell';
import 'codemirror/mode/xml/xml';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import 'codemirror/mode/python/python';
import 'codemirror/mode/markdown/markdown';

import 'codemirror/addon/search/searchcursor';

Vue.use(Element);
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element-Uex';
  ga('send', 'event', 'PageView', route.name);
});

new Vue({ // eslint-disable-line
  render: h => h(entry),
  router
}).$mount('#app');
