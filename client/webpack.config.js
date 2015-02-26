'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');
var Webpack = require('webpack');


var requiredEnvs = ['MAP_QUEST_ACCESS_TOKEN', 'MAPBOX_ACCESS_TOKEN'];
requiredEnvs.forEach(function(name) {
  if (!process.env[name]) {
    throw new Error('Missing ' + name + ' env var.');
  }
});

module.exports = {
  context: __dirname + '/src',
  entry: './main',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|common\/mq-)/, loader: 'babel'},
      { test: /\.css$/, loader: 'style!css'},
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)(\?.*)?$/, loader: 'file?name=[path][name].[ext]' },
      { test: /bootstrap\.js/, loader: 'imports?jQuery=jquery' },
      { test: /common\/mq-map/, loader: 'imports?config,MQKEY=>config.mapQuestAccessToken!exports?MQ' },
      { test: /common\/mq-routing/, loader: 'imports?config,MQKEY=>config.mapQuestAccessToken,MQ=mq-map' },
    ],
  },
  resolve: {
    alias: {
      'bootstrap.js': 'bootstrap/dist/js/bootstrap\.js',
      'mq-map': 'common/mq-map',
      'mq-routing': 'common/mq-routing',
    },
    modulesDirectories: ['node_modules', 'src'],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'MAP_QUEST_ACCESS_TOKEN': JSON.stringify(process.env.MAP_QUEST_ACCESS_TOKEN),
      'MAPBOX_ACCESS_TOKEN': JSON.stringify(process.env.MAPBOX_ACCESS_TOKEN),
    }),
    new Webpack.BannerPlugin(
      'HikePlan (build ' + new Date().toISOString() + ')\n\n' +
      'Copyright (c) 2015 Jan Žák (http://zakjan.cz)\n' +
      'The MIT License (MIT).'
    ),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      title: 'HikePlan',
    }),
  ],
};
