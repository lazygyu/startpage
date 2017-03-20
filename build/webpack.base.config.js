const path = require('path'), webpack = require('webpack'), vueConfig = require('./vue-loader.config');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/entry-client.js',
    vendor: [
      'es6-promise/auto',
      'firebase',
      'firebase/database',
      'vue',
      'vuex'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    alias: {
      'public': path.resolve(__dirname, '../static')
    }
  },
  module: {
    noParse: /es6-promise\.js$/,
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        exclude: /node_modules/,
        options: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  }
};
