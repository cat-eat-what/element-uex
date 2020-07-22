import ElxContextMenu from './src/index';

/* istanbul ignore next */
ElxContextMenu.install = function(Vue) {
  Vue.component(ElxContextMenu.name, ElxContextMenu);
};

export default ElxContextMenu;
