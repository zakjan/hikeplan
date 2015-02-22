'use strict';

// require common assets
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
require('./bootstrap.less');
require('./main.less');

// init Leaflet
var L = require('leaflet');
L.Icon.Default.imagePath = '_/node_modules/leaflet/dist/images';

// init MapQuest
require('mq-map');
require('mq-routing');

// init Bootstrap
require('bootstrap.js');

// run!
document.addEventListener('DOMContentLoaded', function() {
  var React = require('react');
  var App = require('./app/app');

  React.render(<App />, document.body);
});
