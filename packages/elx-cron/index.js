import ElxCron from './src/index';

/* istanbul ignore next */
ElxCron.install = function(Vue) {
  Vue.component(ElxCron.name, ElxCron);
};

export default ElxCron;
