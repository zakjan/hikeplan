'use strict';

require('./map.less');

var _ = require('lodash');
var L = require('leaflet');
var MQ = require('mq-map');
var React = require('react');


class Map extends React.Component {
  componentDidMount() {
    this.initMap();
    this.initLayers();
    this.initRouting();
    this.updateRouting();
  }

  componentDidUpdate(prevProps) {
    this.updateRouting();
  }

  render() {
    return (
      <div className="map" />
    );
  }

  initMap() {
    this.map = new L.Map(React.findDOMNode(this));
    this.map.setView(this.props.center, this.props.zoom);

    this.map.on('moveend', () => {
      this.props.onChangeCenter(this.map.getCenter());
    });
    this.map.on('zoomend', () => {
      this.props.onChangeZoom(this.map.getZoom());
    });
    this.map.on('click', (e) => {
      this.props.onClick(e.latlng);
    });
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
    this.routing = MQ.routing.directions();
    this.routing.on('success', (data) => {
      if (this.oldRoutingLayer) {
        this.map.removeLayer(this.oldRoutingLayer);
      }
      this.props.onRoutingStop();//data.route);
    });
    this.routing.on('error', (e) => {
      this.props.onRoutingStop();
    });
  }

  updateRouting() {
    var newRoutingWaypoints = this.props.waypoints.waypoints.map(x => _.pick(x, 'latLng')).filter(x => x.latLng);
    for (var i = 1; i < newRoutingWaypoints.length - 1; i++) {
      newRoutingWaypoints[i].type = 'v';
    }

    if (_.isEqual(this.routingWaypoints, newRoutingWaypoints)) {
      return;
    }
    this.routingWaypoints = newRoutingWaypoints;
    if (this.routingWaypoints < 2) {
      return;
    }

    // run!

    // RoutingLayer can't properly update rendered route, we need to create new layer
    this.oldRoutingLayer = this.routingLayer;
    this.routingLayer = MQ.routing.routeLayer({
      directions: this.routing,
      fitBounds: true,
    });
    this.map.addLayer(this.routingLayer);

    this.routing.route({
      locations: this.routingWaypoints,
      options: {
        unit: 'k',
        routeType: 'pedestrian',
        reverseGeocoding: false,
      }
    });

    this.props.onRoutingStart();
  }
}


module.exports = Map;
