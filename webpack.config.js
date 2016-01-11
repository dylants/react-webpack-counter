/* eslint strict:0 */

'use strict';

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

// default the environment to development
const NODE_ENV = process.env.NODE_ENV || 'development';
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
  switch (NODE_ENV) {
    case 'production':

      // http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
      plugins.push(new webpack.optimize.DedupePlugin());

      // http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
      plugins.push(new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        sourceMap: true,
      }));
      break;
    case 'development':

      // http://webpack.github.io/docs/list-of-plugins.html#hotmodulereplacementplugin
      plugins.push(new webpack.HotModuleReplacementPlugin());

      // http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
      plugins.push(new webpack.NoErrorsPlugin());
      break;
    default:
      throw new Error('Unknown environment: ' + NODE_ENV);
  }

  return plugins;
}

function getLoaders() {
  const loaders = [
    {
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'stage-0', 'react'],
      },
    }, {
      test: /(\.scss)$/,
      loaders: ['style', 'css', 'sass'],
    },
  ];

  return loaders;
}

function getEntry() {
  const entry = [];

  // hot reload only when in dev environment
  if (NODE_ENV === 'development') {
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
  if (NODE_ENV === 'production') {
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

  debug: true,

  // more info: https://webpack.github.io/docs/build-performance.html#sourcemaps
  // more info: https://webpack.github.io/docs/configuration.html#devtool
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',

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
