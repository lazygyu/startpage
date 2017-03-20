const path = require('path'), webpack = require('webpack'),
  merge = require('webpack-merge'), vueConfig = require('./vue-loader.config'),
  HTMLPlugin = require('html-webpack-plugin'), SWPrecachePlugin = require('sw-precache-webpack-plugin'),
  base = require('./webpack.base.config');

const config = merge(base, {
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HTMLPlugin({
      template: 'src/index.template.html'
    })
  ]
});

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/index\.html$/, /\.map$/]
    })
  )
};

module.exports = config;