
module.exports = {
  entry: './client/src/app.js',
  output: {
    filename: './client/public/bundle.js'
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
        options: ['react', 'env', 'stage-2']
      }
    ]
  },
  devtool: 'eval-source-map'
};
