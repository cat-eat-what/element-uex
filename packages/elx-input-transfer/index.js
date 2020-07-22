import ElxInputTransfer from './src/index';

/* istanbul ignore next */
ElxInputTransfer.install = function(Vue) {
  Vue.component(ElxInputTransfer.name, ElxInputTransfer);
};

export default ElxInputTransfer;
