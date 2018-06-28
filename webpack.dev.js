const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const port = process.env.PORT || 8000;

module.exports = merge(common, {
  mode: 'development',
  entry: [
    'webpack-hot-middleware/client'
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './client/public',
    port,
    hot: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
