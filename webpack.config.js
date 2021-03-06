/* eslint strict:0 */

'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// default the environment to development
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';
const appPath = path.join(__dirname, 'app');
const assetsPath = path.join(__dirname, 'dist');
const publicPath = '/';

function getPlugins() {
  // These plugins are used in all environments
  const plugins = [

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html',
    }),

    // http://webpack.github.io/docs/list-of-plugins.html#occurenceorderplugin
    new webpack.optimize.OccurenceOrderPlugin(),

    // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
    }),
  ];

  // add plugins that should be used only in certain environments
  if (IS_PRODUCTION) {
    // http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
    plugins.push(new webpack.optimize.DedupePlugin());

    // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      sourceMap: true,
    }));
  } else {
    // http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
    plugins.push(new webpack.HotModuleReplacementPlugin());

    // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
    plugins.push(new webpack.NoErrorsPlugin());
  }

  return plugins;
}

function getLoaders() {
  const loaders = [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }, {
      test: /(\.scss)$/,
      exclude: /node_modules/,
      loaders: ['style', 'css', 'sass'],
    },
  ];

  return loaders;
}

function getEntry() {
  const entry = [];

  // hot reload only when in non-production environment
  if (!IS_PRODUCTION) {
    // https://github.com/glenjamin/webpack-hot-middleware#config
    entry.push('webpack-hot-middleware/client?reload=true');
  }

  // add our entry point for the client web app
  entry.push(path.join(appPath, 'index.js'));

  return entry;
}

function getOutput() {
  let output;

  // in production, we need a special output object
  if (IS_PRODUCTION) {
    output = {
      path: assetsPath,
      filename: '[name]-[hash].min.js',
    };
  } else {
    output = {
      path: assetsPath,
      publicPath,
      filename: '[name].js',
    };
  }

  return output;
}

module.exports = {
  // necessary per https://webpack.github.io/docs/testing.html#compile-and-test
  target: NODE_ENV === 'test' ? 'node' : 'web',

  // enable debug and cache in non-production environments
  debug: !IS_PRODUCTION,
  cache: !IS_PRODUCTION,

  // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps
  // more info: https://webpack.github.io/docs/configuration.html#devtool
  devtool: IS_PRODUCTION ? 'source-map' : 'eval-source-map',

  // set to false to see a list of every file being bundled.
  noInfo: true,

  resolve: {
    // defines where the code resides
    root: appPath,

    // lists file types that can have optional extensions
    extensions: ['', '.js', '.jsx'],

    // sets a base dir for imports
    modulesDirectories: ['node_modules', 'app'],
  },

  plugins: getPlugins(),

  module: {
    loaders: getLoaders(),
  },

  entry: getEntry(),

  output: getOutput(),

};
