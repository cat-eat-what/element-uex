import ElxRadio from './src/radio';

/* istanbul ignore next */
ElxRadio.install = function(Vue) {
  Vue.component(ElxRadio.name, ElxRadio);
};

export default ElxRadio;
