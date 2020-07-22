import ElxTableColumn from '../elx-table/src/table-column';

/* istanbul ignore next */
ElxTableColumn.install = function(Vue) {
  Vue.component(ElxTableColumn.name, ElxTableColumn);
};

export default ElxTableColumn;
