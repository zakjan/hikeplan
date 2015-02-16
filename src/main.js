'use strict';

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

var L = require('leaflet');
var React = require('react');

require('leaflet-routing-machine/src/L.Routing.Control.js');

var App = require('./app/app');


L.Icon.Default.imagePath = '_/node_modules/leaflet/dist/images';

document.addEventListener('DOMContentLoaded', function() {
  React.render(<App />, document.body);
});
