import ElxMain from './src/main';

/* istanbul ignore next */
ElxMain.install = function(Vue) {
  Vue.component(ElxMain.name, ElxMain);
};

export default ElxMain;
