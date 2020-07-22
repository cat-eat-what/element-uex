import ElxCodemirror from './src/index';

/* istanbul ignore next */
ElxCodemirror.install = function(Vue) {
  Vue.component(ElxCodemirror.name, ElxCodemirror);
};

export default ElxCodemirror;
