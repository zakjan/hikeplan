'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack = require('webpack');


module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel'},
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/, loader: 'file?name=[path][name].[ext]' },
    ],
  },
  resolve: {
    alias: {
      'react': 'react/addons',
    },
  },
  plugins: [
    new Webpack.BannerPlugin(
      'HikePlan: build ' + new Date().toISOString() + '\n\n' +
      'Copyright (c) 2015 Jan Zak (http://zakjan.cz)\n' +
      'The MIT License (MIT).'
    ),
    new HtmlWebpackPlugin({
      title: 'HikePlan',
    }),
  ],
};
