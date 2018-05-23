const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const port = process.env.PORT || 8000;

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    './client/src/index.js'
  ],
  output: {
    path: '/',
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: ['babel-loader']
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        loader: 'url-loader?limit=25000'
      }
    ]
  },
  devServer: {
    contentBase: './client/public',
    port,
    hot: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new Dotenv({
      path: './env',
      safe: true,
      systemvars: true,
      silent: true
    })
  ],
  devtool: 'eval-source-map'
};
