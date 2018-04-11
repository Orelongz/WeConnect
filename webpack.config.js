const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    './client/src/index.js'
  ],
  output: {
    path: '/',
    filename: 'bundle.js'
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
  devServer: {
    contentBase: './client/public',
    port: 8000,
    hot: true
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map'
};
