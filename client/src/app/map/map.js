'use strict';

require('./map.less');

var _ = require('lodash');
var L = require('leaflet');
var MQ = require('mq-map');
var React = require('react');

var config = require('config');
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
    this.map = new L.Map(React.findDOMNode(this), { zoomControl: false, attributionControl: false });
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
    var zoomControl = new L.Control.Zoom({ zoomOutText: '&minus;' });
    var scaleControl = new L.Control.Scale({ imperial: false });
    var attributionControl = new L.Control.Attribution();

    attributionControl.addAttribution('data &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors');

    var thunderforestLandscapeLayer = new L.TileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a href="http://www.thunderforest.com" target="_blank">Thunderforest</a>'
    });

    var thunderforestOutdoorsLayer = new L.TileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a href="http://www.thunderforest.com" target="_blank">Thunderforest</a>'
    });

    var mapboxRunBikeHikeLayer = new L.TileLayer('https://{s}.tiles.mapbox.com/v4/zakjan.la34ba7d/{z}/{x}/{y}.png?access_token=' + config.mapboxAccessToken, {
      attribution: 'tiles &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
    });

    var mapboxOutdoorsLayer = new L.TileLayer('https://api.mapbox.com/styles/v1/zakjan/ck93ufkml37li1ip9tuea3jnk/tiles/256/{z}/{x}/{y}@2x?access_token=' + config.mapboxAccessToken, {
      attribution: 'tiles &copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a>'
    });
    
    var openCycleMapLayer = new L.TileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    });

    var openStreetMapLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a href="http://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    });

    var waymarkedTrailsLayer = new L.TileLayer('http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      maxZoom: 19,
      opacity: 0.5,
      attribution: 'overlay &copy; <a href="http://hiking.waymarkedtrails.org" target="_blank">Waymarked Trails</a>'
    });

    var layersControl = new L.Control.Layers({
      'Thunderforest Landscape': thunderforestLandscapeLayer,
      'Thunderforest Outdoors': thunderforestOutdoorsLayer,
      'Mapbox Run, Bike and Hike': mapboxRunBikeHikeLayer,
      'Mapbox Outdoors': mapboxOutdoorsLayer,
      'OpenCycleMap': openCycleMapLayer,
      'OpenStreetMap': openStreetMapLayer,
    }, {
      'Waymarked Trails': waymarkedTrailsLayer,
    });

    this.map.addControl(zoomControl);
    this.map.addControl(scaleControl);
    this.map.addControl(attributionControl);
    this.map.addControl(layersControl);
    this.map.addLayer(mapboxOutdoorsLayer);
    this.map.addLayer(waymarkedTrailsLayer);
  }

  initRouting() {
    this.routing = MQ.routing.directions();
    this.routing.on('success', (data) => {
      var route = data.route;

      if (!(route.sessionId && route.locations)) {
        return;
      }

      this.waypoints = route.locations.map(x => _.pick(x, 'latLng'));

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
    this.routingLayer.getAttribution = function() {
      return 'routing &copy <a href="http://www.mapquest.com" target="_blank">MapQuest</a>';
    };
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
        narrativeType: 'none',
        doReverseGeocode: false,
      }
    });

    this.props.onRoutingStart();
  }
}


module.exports = Map;
