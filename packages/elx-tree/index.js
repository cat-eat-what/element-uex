import ElxTree from './src/tree';

/* istanbul ignore next */
ElxTree.install = function(Vue) {
  Vue.component(ElxTree.name, ElxTree);
};

export default ElxTree;
