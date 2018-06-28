const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: [
    'babel-polyfill',
    './client/src/index.js'
  ],
  plugins: [
    new Dotenv({
      path: './env',
      safe: true,
      systemvars: true,
      silent: true
    })
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
  }
};
