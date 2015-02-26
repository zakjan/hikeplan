'use strict';

require('./app.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var Header = require('app/header/header');
var Map = require('app/map/map');
var QueryString = require('common/queryString');
var Sidebar = require('app/sidebar/sidebar');
var Waypoint = require('common/waypoint');
var Waypoints = require('common/waypoints');


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

    _.bindAll(this, ['onHashChange', 'loadSampleWaypoints', 'clearWaypoints', 'addEmptyWaypoint', 'addWaypoint', 'reverseWaypoints', 'changeWaypoint', 'removeWaypoint', 'moveUpWaypoint', 'moveDownWaypoint', 'changeCenter', 'changeZoom', 'routingStart', 'routingStop']);
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', this.onHashChange);
  }

  render() {
    location.hash = '#' + this.state.waypoints.toString();

    return (
      <div className="app">
        <Header
          onClickLoadSampleWaypoints={this.loadSampleWaypoints}
        />

        <div className="main">
          <Sidebar
            waypoints={this.state.waypoints}
            onAddEmptyWaypoint={this.addEmptyWaypoint}
            onReverseWaypoints={this.reverseWaypoints}
            onClearWaypoints={this.clearWaypoints}
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
            route={this.state.route}
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

  onHashChange() {
    this.setState({ waypoints: Waypoints.fromString(location.hash.substring(1)) });
  }

  loadSampleWaypoints(i) {
    var routes = [
      '50.03118,14.52796;50.02644,14.53557;49.83614,14.57754;49.79602,14.5436;49.65526,14.44909;49.57925,14.48419;49.57811,14.53835', // Prčice
      '50.77005,15.43461;50.77577,15.53561;50.76773,15.58466;50.75997,15.6829;50.73493,15.6968;50.73598,15.74017;50.71649,15.72399;50.69554,15.73899', // Sněžka
      '49.264,20.11322;49.14716,20.06906;49.11857,20.06239', // Rysy
      '45.64864,24.35675;45.59963,24.40401;45.59915,24.6062;45.60443,24.61899;45.59692,24.67778;45.59944,24.73611;45.63826,24.73899;45.65476,24.73881;45.69558,24.73958', // Fagaraš
    ];
    var route = routes[i];

    this.setState({ waypoints: Waypoints.fromString(route) });
  }

  clearWaypoints() {
    this.setState({ route: null, waypoints: new Waypoints() });
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
    if (!route) {
      if (this.state.routeLoading) {
        this.setState({ routeLoading: false });
      }
      return;
    }

    var waypoints = new Waypoints(route.locations.map(x => new Waypoint(x.latLng)));

    this.setState({ waypoints: waypoints, route: route, routeLoading: false });
  }
}


module.exports = App;
