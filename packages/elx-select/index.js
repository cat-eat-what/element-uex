import ElxSelect from './src/select.vue';

/* istanbul ignore next */
ElxSelect.install = function(Vue) {
  Vue.component(ElxSelect.name, ElxSelect);
};

export default ElxSelect;
