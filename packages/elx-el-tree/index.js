import ElxElTree from './src/tree.vue';

/* istanbul ignore next */
ElxElTree.install = function(Vue) {
  Vue.component(ElxElTree.name, ElxElTree);
};

export default ElxElTree;
