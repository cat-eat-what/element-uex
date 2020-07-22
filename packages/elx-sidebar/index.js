import ElxSidebar from './src/sidebar';

/* istanbul ignore next */
ElxSidebar.install = function(Vue) {
  Vue.component(ElxSidebar.name, ElxSidebar);
};

export default ElxSidebar;
