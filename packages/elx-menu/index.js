import ElxMenu from './src/elx-menu.vue';

/* istanbul ignore next */
ElxMenu.install = function(Vue) {
  Vue.component(ElxMenu.name, ElxMenu);
};

export default ElxMenu;
