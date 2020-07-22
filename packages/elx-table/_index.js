import ElxTableColumn from './src/table-column';
import ElxTable from './src/table';

/* istanbul ignore next */
export default function(Vue) {
  Vue.component(ElxTable.name, ElxTable);
  Vue.component(ElxTableColumn.name, ElxTableColumn);
};

export { ElxTable, ElxTableColumn };
