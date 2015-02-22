'use strict';

require('./map.less');

var _ = require('lodash');
var L = require('leaflet');
var MQ = require('mq-map');
var React = require('react');

var Route = require('common/route');


class Map extends React.Component {
  componentDidMount() {
    this.initMap();
    this.initLayers();
    this.initRouting();
    this.updateWaypoints();
  }

  componentDidUpdate() {
    this.updateWaypoints();
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

    var layerControl = new L.Control.Layers({
      'Thunderforest Landscape': thunderforestLandscapeLayer,
      'OpenStreetMap': openStreetMapLayer,
      'OpenCycleMap': openCycleMapLayer,
    }, {
      'Waymarked Trails': waymarkedTrailsLayer,
    });

    this.map.addLayer(thunderforestLandscapeLayer);
    this.map.addLayer(waymarkedTrailsLayer);
    this.map.addControl(layerControl);
  }

  initRouting() {
    this.routing = MQ.routing.directions();
    this.routing.on('success', (data) => {
      var route = data.route;

      if (!route.sessionId) {
        return;
      }

      Route.getStats(route.sessionId).then((data) => {
        route.elevationProfile = data.elevationProfile;
        route.stats = data.stats;

        this.props.onRoutingStop(route);
      });
    });
    this.routing.on('error', (e) => {
      console.error(e);
      this.props.onRoutingStop();
    });

    this.routingLayer = MQ.routing.routeLayer({
      directions: this.routing,
      fitBounds: true,
    });
    this.map.addLayer(this.routingLayer);
  }

  updateWaypoints() {
    var newWaypoints = this.props.waypoints.waypoints.filter(x => x.latLng).map(x => _.pick(x , 'latLng')); // filter empty waypoints

    // check if waypoints have been updated
    if (_.isEqual(this.waypoints, newWaypoints)) {
      return;
    }

    // clear previous route
    this.routingLayer.setRouteData();
    this.waypoints = newWaypoints;

    // check if there are at least two waypoints
    if (newWaypoints.length < 2) {
      return;
    }

    var routingWaypoints = _.cloneDeep(newWaypoints);
    for (var i = 1; i < routingWaypoints.length - 1; i++) {
      routingWaypoints[i].type = 'v';
    }

    // run!
    this.routing.route({
      locations: routingWaypoints,
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
