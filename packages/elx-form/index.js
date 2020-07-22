import ElxForm from './src/form';

/* istanbul ignore next */
ElxForm.install = function(Vue) {
  Vue.component(ElxForm.name, ElxForm);
};

export default ElxForm;
