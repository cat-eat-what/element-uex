import ElxRadioGroup from '../elx-radio/src/radio-group';

/* istanbul ignore next */
ElxRadioGroup.install = function(Vue) {
  Vue.component(ElxRadioGroup.name, ElxRadioGroup);
};

export default ElxRadioGroup;
