import ElxContent from './src/content';

/* istanbul ignore next */
ElxContent.install = function(Vue) {
  Vue.component(ElxContent.name, ElxContent);
};

export default ElxContent;
