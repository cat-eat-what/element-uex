import ElxAside from './src/index';

/* istanbul ignore next */
ElxAside .install = function(Vue) {
  Vue.component(ElxAside.name, ElxAside);
};

export default ElxAside;
