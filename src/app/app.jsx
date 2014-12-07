'use strict';

var App = React.createClass({
  getInitialState: function() {
    return {
      center: new L.LatLng(45.601944, 24.616944),
      zoom: 10,
      waypointNextId: 6,
      waypoints: [
        { id: 1, latLng: new L.LatLng(45.652778, 24.355278) },
        { id: 2, latLng: new L.LatLng(45.599146, 24.606199) },
        { id: 3, latLng: new L.LatLng(45.604430, 24.618988) },
        { id: 4, latLng: new L.LatLng(45.599444, 24.736111) },
        { id: 5, latLng: new L.LatLng(45.695449, 24.739665) },
      ],
    };
  },

  createWaypoint: function(waypoint) {
    return {
      id: waypoint.id || this.state.waypointNextId++,
      latLng: new L.LatLng(waypoint.latLng.lat.toFixed(6), waypoint.latLng.lng.toFixed(6)),
    };
  },

  addWaypoint: function() {
    var waypoints = _.clone(this.state.waypoints);
    waypoints.push(this.createWaypoint({ latLng: new L.LatLng(0, 0) }));
    this.setState({ waypoints: waypoints });
  },

  reverseWaypoints: function() {
    var waypoints = _.clone(this.state.waypoints);
    waypoints.reverse();
    this.setState({ waypoints: waypoints });
  },

  changeWaypoint: function(waypointId, waypoint) {
    var waypointIndex = _.findIndex(this.state.waypoints, x => x.id == waypointId);
    if (waypointIndex == -1) {
      return;
    }

    var waypoints = _.clone(this.state.waypoints);
    waypoints[waypointIndex] = waypoint;
    this.setState({ waypoints: waypoints });
  },

  removeWaypoint: function(waypointId) {
    var waypointIndex = _.findIndex(this.state.waypoints, x => x.id == waypointId);
    if (waypointIndex == -1) {
      return;
    }

    var waypoints = _.clone(this.state.waypoints);
    waypoints.splice(waypointIndex, 1);
    this.setState({ waypoints: waypoints });
  },

  changeCenter: function(center) {
    this.setState({ center: center });
  },

  changeZoom: function(zoom) {
    this.setState({ zoom: zoom });
  },

  changeWaypoints: function(waypoints) {
    var waypoints = waypoints.map(this.createWaypoint, this);
    this.setState({ waypoints: waypoints });
  },

  render: function() {
    return (
      <div className="app">
        <Header />

        <div className="main">
          <Sidebar
            waypoints={this.state.waypoints}
            onAddWaypoint={this.addWaypoint}
            onReverseWaypoints={this.reverseWaypoints}
            onChangeWaypoint={this.changeWaypoint}
            onRemoveWaypoint={this.removeWaypoint}
          />

          <Map
            center={this.state.center}
            zoom={this.state.zoom}
            waypoints={this.state.waypoints}
            onChangeCenter={this.changeCenter}
            onChangeZoom={this.changeZoom}
            onChangeWaypoints={this.changeWaypoints}
          />
        </div>
      </div>
    );
  },
});
