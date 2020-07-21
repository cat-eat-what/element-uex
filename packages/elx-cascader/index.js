import ElxCascader from './src/main';

/* istanbul ignore next */
ElxCascader.install = function(Vue) {
  Vue.component(ElxCascader.name, ElxCascader);
};

export default ElxCascader;
