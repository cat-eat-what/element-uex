import ElxCardList from './src/card-list';

/* istanbul ignore next */
ElxCardList.install = function(Vue) {
  Vue.component(ElxCardList.name, ElxCardList);
};

export default ElxCardList;
