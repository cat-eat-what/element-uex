import ElxTopMenu from './src/topMenu';

/* istanbul ignore next */
ElxTopMenu.install = function(Vue) {
  Vue.component(ElxTopMenu.name, ElxTopMenu);
};

export default ElxTopMenu;
