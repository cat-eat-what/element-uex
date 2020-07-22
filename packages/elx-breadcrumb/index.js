import ElxBreadcrumb from './src/breadcrumb';

/* istanbul ignore next */
ElxBreadcrumb.install = function(Vue) {
  Vue.component(ElxBreadcrumb.name, ElxBreadcrumb);
};

export default ElxBreadcrumb;
