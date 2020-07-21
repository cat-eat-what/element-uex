import ElxTabFrame from './src/tabFrame';

/* istanbul ignore next */
ElxTabFrame.install = function(Vue) {
  Vue.component(ElxTabFrame.name, ElxTabFrame);
};

export default ElxTabFrame;
