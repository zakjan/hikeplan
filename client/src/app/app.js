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


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      center: new L.LatLng(50.088134, 14.4416265),
      zoom: 4,
      waypoints: Waypoints.fromString(location.hash.substring(1)),
      route: null,
      routeLoading: false,
    };

    this.loadSampleWaypoints = this.loadSampleWaypoints.bind(this);
    this.clearWaypoints = this.clearWaypoints.bind(this);
    this.addEmptyWaypoint = this.addEmptyWaypoint.bind(this);
    this.addWaypoint = this.addWaypoint.bind(this);
    this.reverseWaypoints = this.reverseWaypoints.bind(this);
    this.changeWaypoint = this.changeWaypoint.bind(this);
    this.removeWaypoint = this.removeWaypoint.bind(this);
    this.moveUpWaypoint = this.moveUpWaypoint.bind(this);
    this.moveDownWaypoint = this.moveDownWaypoint.bind(this);
    this.changeCenter = this.changeCenter.bind(this);
    this.changeZoom = this.changeZoom.bind(this);
    this.routingStart = this.routingStart.bind(this);
    this.routingStop = this.routingStop.bind(this);
  }

  render() {
    location.hash = '#' + this.state.waypoints.toString();

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
            onRoutingStart={this.routingStart}
            onRoutingStop={this.routingStop}
          />
        </div>
      </div>
    );
  }

  loadSampleWaypoints() {
    var route = '45.648638,24.356754;45.599146,24.606199;45.60443,24.618988;45.596924,24.677782;45.599444,24.736111;45.695449,24.739665'; // Fagaras
    this.setState({ waypoints: Waypoints.fromString(route) });
  }

  clearWaypoints() {
    this.setState({ waypoints: new Waypoints() });
  }

  addEmptyWaypoint() {
    this.state.waypoints.waypoints.push(new Waypoint());
    this.forceUpdate();
  }

  addWaypoint(latLng) {
    var emptyIndex = _.findIndex(this.state.waypoints.waypoints, x => !x.latLng);
    if (emptyIndex !== -1) {
      this.state.waypoints.waypoints[emptyIndex].latLng = latLng;
    } else {
      this.state.waypoints.waypoints.push(new Waypoint(latLng));
    }
    this.forceUpdate();
  }

  reverseWaypoints() {
    this.state.waypoints.waypoints.reverse();
    this.forceUpdate();
  }

  changeWaypoint(waypointId, waypoint) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.waypoints[i].latLng = waypoint.latLng;
    this.forceUpdate();
  }

  removeWaypoint(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.removeElementAt(i);
    this.forceUpdate();
  }

  moveUpWaypoint(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.moveElementAt(i, i - 1);
    this.forceUpdate();
  }

  moveDownWaypoint(waypointId) {
    var i = _.findIndex(this.state.waypoints.waypoints, x => x.id === waypointId);
    this.state.waypoints.moveElementAt(i, i + 1);
    this.forceUpdate();
  }

  changeCenter(center) {
    this.setState({ center: center });
  }

  changeZoom(zoom) {
    this.setState({ zoom: zoom });
  }

  routingStart() {
    this.setState({ routeLoading: true });
  }

  routingStop(route) {
    this.setState({ routeLoading: false });

    if (!(route && route.locations)) {
      return;
    }

    var waypoints = new Waypoints(route.locations.map(x => new Waypoint(x.latLng)));
    this.setState({ route: route, waypoints: waypoints });
  }
}


module.exports = App;
