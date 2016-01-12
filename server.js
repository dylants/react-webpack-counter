/* eslint no-console:0 */

import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';

// default to development environment
const NODE_ENV = process.env.NODE_ENV || 'development';
const isDev = NODE_ENV !== 'production';

// default to port 3000 if not supplied
const port = process.env.PORT || 3000;
const app = express();

if (isDev) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
}

// for now, all requests render the index page
app.all('*', function response(req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Express server listening on port ${port} in ${NODE_ENV} environment`);
});
