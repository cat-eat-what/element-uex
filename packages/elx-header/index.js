import ElxHeader from './src/index';

/* istanbul ignore next */
ElxHeader.install = function(Vue) {
  Vue.component(ElxHeader.name, ElxHeader);
};

export default ElxHeader;
