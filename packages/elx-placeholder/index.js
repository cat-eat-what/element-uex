import ElxPlaceholder from './src/placeholder';

/* istanbul ignore next */
ElxPlaceholder.install = function(Vue) {
  Vue.component(ElxPlaceholder.name, ElxPlaceholder);
};

export default ElxPlaceholder;
