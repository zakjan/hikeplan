'use strict';

var App = React.createClass({
  getInitialState: function() {
    return {
      center: new L.LatLng(45.601944, 24.616944),
      zoom: 11,
      waypoints: [
        { latLng: new L.LatLng(45.652778, 24.355278) },
        { latLng: new L.LatLng(45.599146, 24.606199) },
        { latLng: new L.LatLng(45.604430, 24.618988) },
        { latLng: new L.LatLng(45.599444, 24.736111) },
        { latLng: new L.LatLng(45.695449, 24.739665) },
      ],
    };
  },

  addWaypoint: function() {
    var waypoints = _.clone(this.state.waypoints);
    waypoints.push({ latLng: new L.LatLng(0, 0) });
    this.setState({ waypoints: waypoints });
  },

  changeWaypoint: function(i, value) {
    var waypoints = _.clone(this.state.waypoints);
    waypoints[i] = value;
    this.setState({ waypoints: waypoints });
  },

  removeWaypoint: function(i) {
    var waypoints = _.clone(this.state.waypoints);
    waypoints.splice(i, 1);
    this.setState({ waypoints: waypoints });
  },

  changeCenter: function(center) {
    this.setState({ center: center });
  },

  changeZoom: function(zoom) {
    this.setState({ zoom: zoom });
  },

  changeWaypoints: function(waypoints) {
    waypoints.forEach((waypoint) => {
      waypoint.latLng = new L.LatLng(waypoint.latLng.lat.toFixed(6), waypoint.latLng.lng.toFixed(6));
    });
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
            onChangeWaypoint={this.changeWaypoint}
            onRemoveWaypoint={this.removeWaypoint}
          />

          <Map
            center={this.state.center}
            zoom={this.state.zoom}
            waypoints={this.state.waypoints}
            onCenterChange={this.changeCenter}
            onZoomChange={this.changeZoom}
            onWaypointsChange={this.changeWaypoints}
          />
        </div>
      </div>
    );
  },
});
