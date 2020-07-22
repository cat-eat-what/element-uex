import ElxFilter from './src/filter';

/* istanbul ignore next */
ElxFilter.install = function(Vue) {
  Vue.component(ElxFilter.name, ElxFilter);
};

export default ElxFilter;
