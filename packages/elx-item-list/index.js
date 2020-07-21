import ElxItemList from './src/item';

/* istanbul ignore next */
ElxItemList.install = function(Vue) {
  Vue.component(ElxItemList.name, ElxItemList);
};

export default ElxItemList;
