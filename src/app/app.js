'use strict';

require('./app.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var Header = require('./header/header');
var Map = require('./map/map');
var Sidebar = require('./sidebar/sidebar');

var Waypoint = require('../common/waypoint');
var Waypoints = require('../common/waypoints');


var App = React.createClass({
  getInitialState: function() {
    return {
      center: new L.LatLng(45.601944, 24.616944),
      zoom: 10,
      waypoints: new Waypoints(),
      route: null,
      routeLoading: false,
    };
  },

  loadSampleWaypoints: function() {
    var route = '45.648638,24.356754;45.599146,24.606199;45.60443,24.618988;45.596924,24.677782;45.599444,24.736111;45.695449,24.739665'; // Fagaras
    this.setState({ waypoints: Waypoints.fromString(route) });
  },

  clearWaypoints: function() {
    this.setState({ waypoints: new Waypoints() });
  },

  addEmptyWaypoint: function() {
    this.state.waypoints.waypoints.push(new Waypoint());
    this.forceUpdate();
  },

  addWaypoint: function(latLng) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => !x.latLng);
    if (i !== -1) {
      this.state.waypoints.waypoints[i].latLng = latLng;
    } else {
      this.state.waypoints.waypoints.push(new Waypoint(latLng));
    }
    this.forceUpdate();
  },

  reverseWaypoints: function() {
    this.state.waypoints.waypoints.reverse();
    this.forceUpdate();
  },

  changeWaypoint: function(waypointId, waypoint) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.waypoints[i] = element;
    this.forceUpdate();
  },

  removeWaypoint: function(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.removeElementAt(i);
    this.forceUpdate();
  },

  moveUpWaypoint: function(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.moveElementAt(i, i - 1);
    this.forceUpdate();
  },

  moveDownWaypoint: function(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.moveElementAt(i, i + 1);
    this.forceUpdate();
  },

  changeCenter: function(center) {
    this.setState({ center: center });
  },

  changeZoom: function(zoom) {
    this.setState({ zoom: zoom });
  },

  changeWaypoints: function(waypoints) {
    var waypoints = new Waypoints(waypoints.map(x => new Waypoint(x.latLng)));
    this.setState({ waypoints: waypoints });
  },

  routingStart: function() {
    this.setState({ route: null, routeLoading: true });
  },

  routingSuccess: function(route) {
    this.setState({ route: route, routeLoading: false });
  },

  routingFail: function(e) {
    console.error(e);
    this.setState({ route: null, routeLoading: false });
  },

  componentDidMount: function() {
    this.setState({ waypoints: Waypoints.fromString(location.hash) });
  },

  render: function() {
    location.hash = this.state.waypoints.toString();

    return (
      <div className="app">
        <Header
          onClickLoadSampleWaypoints={this.loadSampleWaypoints}
          onClickClearWaypoints={this.clearWaypoints}
        />

        <div className="main">
          <Sidebar
            waypoints={this.state.waypoints}
            onAddEmptyWaypoint={this.addEmptyWaypoint}
            onReverseWaypoints={this.reverseWaypoints}
            onChangeWaypoint={this.changeWaypoint}
            onRemoveWaypoint={this.removeWaypoint}
            onMoveUpWaypoint={this.moveUpWaypoint}
            onMoveDownWaypoint={this.moveDownWaypoint}

            route={this.state.route}
            routeLoading={this.state.routeLoading}
          />

          <Map
            center={this.state.center}
            zoom={this.state.zoom}
            waypoints={this.state.waypoints}
            onChangeCenter={this.changeCenter}
            onChangeZoom={this.changeZoom}
            onClick={this.addWaypoint}
            onChangeWaypoints={this.changeWaypoints}
            onRoutingStart={this.routingStart}
            onRoutingSuccess={this.routingSuccess}
            onRoutingFail={this.routingFail}
          />
        </div>
      </div>
    );
  },
});


module.exports = App;
