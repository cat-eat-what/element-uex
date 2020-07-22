import ElxNavbarConsole from './src/index';

/* istanbul ignore next */
ElxNavbarConsole.install = function(Vue) {
  Vue.component(ElxNavbarConsole.name, ElxNavbarConsole);
};

export default ElxNavbarConsole;
