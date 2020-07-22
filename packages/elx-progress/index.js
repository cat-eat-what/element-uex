import ElxProgress from './src/progress';

/* istanbul ignore next */
ElxProgress.install = function(Vue) {
  Vue.component(ElxProgress.name, ElxProgress);
};

export default ElxProgress;
