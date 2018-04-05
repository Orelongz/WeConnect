const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch',
    './client/src/index.jsx'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/public')
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'env', 'stage-2']
        }
      },
      {
        test: /\.s?css$/,
        loader: 'style-loader!css-loader!sass-loader',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './client/public',
    inline: true,
    port: 8000,
    hot: true
  },
  devtool: 'inline-source-map'
};
