import ElxTable from './src/table';

/* istanbul ignore next */
ElxTable.install = function(Vue) {
  Vue.component(ElxTable.name, ElxTable);
};

export default ElxTable;
