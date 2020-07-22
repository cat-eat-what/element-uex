import ElxSidebarP from './src/sidebar';

/* istanbul ignore next */
ElxSidebarP.install = function(Vue) {
  Vue.component(ElxSidebarP.name, ElxSidebarP);
};

export default ElxSidebarP;
