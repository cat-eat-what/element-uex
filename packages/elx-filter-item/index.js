import ElxFilterItem from '../elx-filter/src/filter-item';

/* istanbul ignore next */
ElxFilterItem.install = function(Vue) {
  Vue.component(ElxFilterItem.name, ElxFilterItem);
};

export default ElxFilterItem;
