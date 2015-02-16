'use strict';

require('./map.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var MapRouting = require('./mapRouting.js');


var Map = React.createClass({
  initMap: function() {
    this.map = new L.Map(this.getDOMNode());
    this.map.setView(this.props.center, this.props.zoom);

    this.map.on('moveend', () => { this.props.onChangeCenter(this.map.getCenter()); });
    this.map.on('zoomend', () => { this.props.onChangeZoom(this.map.getZoom()); });
    this.map.on('click', (e) => { this.props.onClick(e.latlng); });
  },

  initLayers: function() {
    var thunderforestLandscapeLayer = new L.TileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.thunderforest.com">Thunderforest</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>)'
    });
    this.map.addLayer(thunderforestLandscapeLayer);

    var openStreetMapLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var openCycleMapLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var waymarkedTrailsLayer = new L.TileLayer('http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      maxZoom: 19,
      opacity: 0.5,
      attribution: 'overlay &copy; <a target="_blank" href="http://hiking.waymarkedtrails.org">Waymarked Trails</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/3.0/de/deed.en">CC-BY-SA 3.0 DE</a>)'
    });

    var layers = new L.Control.Layers({
      'Thunderforest Landscape': thunderforestLandscapeLayer,
      'OpenStreetMap': openStreetMapLayer,
      'OpenCycleMap': openCycleMapLayer,
    }, {
      'Waymarked Trails': waymarkedTrailsLayer,
    });
    this.map.addControl(layers);
  },

  initRouting: function() {
    this.routing = new L.Routing.Control({
      router: MapRouting,
      waypoints: this.props.waypoints,
    });

    this.routing.on('routingstart', () => { this.props.onRoutingStart(); });
    this.routing.on('routesfound', (e) => { this.props.onRoutingSuccess(e.routes[0]); });
    this.routing.on('routingerror', (e) => { this.props.onRoutingFail(e.error); });
    this.routing.getPlan().on('waypointschanged', (e) => { this.props.onChangeWaypoints(e.waypoints); });

    this.map.addControl(this.routing);
  },

  componentDidMount: function() {
    this.initMap();
    this.initLayers();
    this.initRouting();
  },

  componentDidUpdate: function(prevProps) {
    if (!_.isEqual(prevProps.waypoints.map(x => x.latLng), this.props.waypoints.map(x => x.latLng))) {
      this.routing.setWaypoints(this.props.waypoints);
    }
  },

  render: function() {
    return (
      <div className="map" />
    );
  },
});


module.exports = Map;
