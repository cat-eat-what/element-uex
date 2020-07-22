import ElxOption from '../elx-select/src/option';

/* istanbul ignore next */
ElxOption.install = function(Vue) {
  Vue.component(ElxOption.name, ElxOption);
};

export default ElxOption;
