'use strict';

require('./map.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var MapRouting = require('./mapRouting');


class Map extends React.Component {
  componentDidMount() {
    this.initMap();
    this.initLayers();
    this.initRouting();
  }

  componentDidUpdate(prevProps) {
    if (!_.isEqual(this.routing.getWaypoints().map(x => x.latLng), this.props.waypoints.waypoints.map(x => x.latLng))) {
      this.routing.setWaypoints(this.props.waypoints.waypoints.map(x => x.latLng));
    }
  }

  render() {
    return (
      <div className="map" />
    );
  }

  initMap() {
    this.map = new L.Map(React.findDOMNode(this));
    this.map.setView(this.props.center, this.props.zoom);

    this.map.on('moveend', () => { this.props.onChangeCenter(this.map.getCenter()); });
    this.map.on('zoomend', () => { this.props.onChangeZoom(this.map.getZoom()); });
    this.map.on('click', (e) => { this.props.onClick(e.latlng); });
  }

  initLayers() {
    var thunderforestLandscapeLayer = new L.TileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.thunderforest.com">Thunderforest</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>)'
    });

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

    this.map.addLayer(thunderforestLandscapeLayer);
    this.map.addLayer(waymarkedTrailsLayer);
    this.map.addControl(layers);
  }

  initRouting() {
    this.routing = new L.Routing.Control({
      router: new MapRouting(),
      waypoints: this.props.waypoints.waypoints,
    });

    this.routing.on('routingstart', () => { this.props.onRoutingStart(); });
    this.routing.on('routesfound', (e) => { this.props.onRoutingStop(e.routes[0]); });
    this.routing.on('routingerror', () => { this.props.onRoutingStop(); });
    this.routing.getPlan().on('waypointschanged', (e) => { this.props.onChangeWaypoints(e.waypoints); });

    this.map.addControl(this.routing);
  }
}


module.exports = Map;
