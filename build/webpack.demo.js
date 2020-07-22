var config = require('./config');
var md = require('markdown-it')();
var webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var striptags = require('./strip-tags');
var slugify = require('transliteration').slugify;
var isProd = process.env.NODE_ENV === 'production';
var isPlay = !!process.env.PLAY_ENV;

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(parseInt(encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, '$2'), 16));
  });
  return str;
}

var wrap = function(render) {
  return function() {
    return render.apply(this, arguments)
      .replace('<code class="', '<code class="hljs ')
      .replace('<code>', '<code class="hljs">');
  };
};


var webpackConfig = {
  output: {
    path: path.resolve(process.cwd(), './examples/element-uex/'),
    publicPath: '',
    filename: '[name].js',
    chunkFilename: '[id].js'
  },
  resolve:{
    extensions: ['.js', '.vue', '.json'],
    alias: Object.assign(config.alias, {
      'vue$': 'vue/dist/vue.common.js'
    })
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.(scss|css)$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loaders: [ 'html-loader?minimize=false' ]
      },
      {
        test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.vue$/,
        loaders: [ 'vue-loader' ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js')
          }
        ]
      },
      {
        test: /\.(vue|jsx?)$/,
        exclude: /node_modules|bower_components/,
        enforce: "pre",
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      }
    ]
  },
  entry: isProd ? {docs: './examples/entry.js', 'element-uex': './src/index.js'} : (isPlay ? './examples/play.js' : './examples/entry.js'),
  devtool: '#eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 9000,
    publicPath: '/',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './examples/index.tpl',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: './examples/favicon.ico',
      minify: false,
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      title: 'Webpack App',
      xhtml: false
    }),
    new CopyWebpackPlugin([
      { from: 'examples/versions.json' }
    ]),
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({'process.env.NODE_ENV': '"development"'}),
    new webpack.LoaderOptionsPlugin({
      vue: {
        compilerOptions: {
          preserveWhitespace: false
        }
      }
    })
  ]
}

if (isProd) {
  webpackConfig.externals = {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    'highlight.js': 'hljs'
  };
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:7].css'
    })
  );
  webpackConfig.optimization.minimizer.push(
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: false
    }),
    new OptimizeCSSAssetsPlugin({})
  );
  // https://webpack.js.org/configuration/optimization/#optimizationsplitchunks
  webpackConfig.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        test: /\/src\//,
        name: 'element-ui',
        chunks: 'all'
      }
    }
  };
  webpackConfig.devtool = false;
}

module.exports = webpackConfig;
