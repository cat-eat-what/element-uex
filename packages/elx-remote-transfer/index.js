import ElxRemoteTransfer from './src/index';

/* istanbul ignore next */
ElxRemoteTransfer.install = function(Vue) {
  Vue.component(ElxRemoteTransfer.name, ElxRemoteTransfer);
};

export default ElxRemoteTransfer;
