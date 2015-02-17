'use strict';

// require common assets
require('bootstrap/dist/css/bootstrap.css');
require('font-awesome/css/font-awesome.css');
require('leaflet/dist/leaflet.css');
require('leaflet/dist/images/layers-2x.png');
require('leaflet/dist/images/layers.png');
require('leaflet/dist/images/marker-icon-2x.png');
require('leaflet/dist/images/marker-icon.png');
require('leaflet/dist/images/marker-shadow.png');
require('leaflet-routing-machine/dist/leaflet-routing-machine.css');
require('leaflet-routing-machine/dist/leaflet.routing.icons.png');
require('leaflet-routing-machine/dist/leaflet.routing.icons.svg');
require('./main.less');

// init Leaflet
var L = require('leaflet');
L.Icon.Default.imagePath = '_/node_modules/leaflet/dist/images';

// init MapQuest
var MAP_QUEST_API_KEY = 'Fmjtd|luu821ut2l,8a=o5-94bx06';
require('mq-map');
require('mq-routing');

// run!
document.addEventListener('DOMContentLoaded', function() {
  var React = require('react');
  var App = require('./app/app');

  React.render(<App />, document.body);
});
