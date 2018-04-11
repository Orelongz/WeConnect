const webpack = require('webpack');

const port = process.env.PORT || 8000;

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
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map'
};
