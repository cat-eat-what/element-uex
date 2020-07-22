var cooking = require('cooking');
var config = require('./config');
var webpack = require('webpack')
var sd = require('silly-datetime');
var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');

cooking.set({
  entry: './src/index.js',
  dist: './lib',
  clean: false,
  format: 'umd',
  moduleName: 'ELEMENTUEX',
  extends: ['vue2'],
  alias: config.alias,
  externals: { 
  	vue: 'Vue' ,
  	jquery: 'jQuery',
  	underscore: '_',
  	'codemirror/lib/codemirror': 'CodeMirror',
  	'sql-formatter': 'sqlFormatter',
    'js-beautify/js/lib/beautify': 'js_beautify',
    'js-beautify/js/lib/beautify-css': 'css_beautify',
    'js-beautify/js/lib/beautify-html': 'html_beautify'
  }
});

cooking.add('output.filename', 'index.js');
cooking.add('loader.js.exclude', config.jsexclude);
cooking.add('vue.preserveWhitespace', false);
cooking.add('plugin.Banner', new webpack.BannerPlugin(time))
module.exports = cooking.resolve();
