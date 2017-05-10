var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    './index.js'
  ],
  output: {
    path: path.resolve(__dirname, './static'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  resolve: {
      extensions: ['', '.js', '.json', 'coffee','.vue']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader?presets[]=es2015'],
      include: path.join(__dirname, '.')
    },
    {
      test: /\.css/,
      loaders:['style','css'],
      include: path.join(__dirname, '.')
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url',
      query: {
          limit: 10000
      }
  }]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
};
