import ElxNavbar from './src/navbar';

/* istanbul ignore next */
ElxNavbar.install = function(Vue) {
  Vue.component(ElxNavbar.name, ElxNavbar);
};

export default ElxNavbar;
