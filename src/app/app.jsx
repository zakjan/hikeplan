'use strict';

var App = React.createClass({
  getInitialState: function() {
    return {
      center: new L.LatLng(45.601944, 24.616944),
      zoom: 11,
      waypoints: [
        new L.LatLng(45.695449, 24.739665),
        new L.LatLng(45.599444, 24.736111),
        new L.LatLng(45.604430, 24.618988),
        new L.LatLng(45.599146, 24.606199),
        new L.LatLng(45.652778, 24.355278),
      ],
    };
  },

  addWaypoint: function() {
    this.state.waypoints.push(new L.LatLng(0, 0));
    this.forceUpdate();
  },

  changeWaypoint: function(i, value) {
    this.state.waypoints[i] = value;
    this.forceUpdate();
  },

  removeWaypoint: function(i) {
    this.state.waypoints.splice(i, 1);
    this.forceUpdate();
  },

  centerChange: function(center) {
    this.setState({ center: center });
  },

  zoomChange: function(zoom) {
    this.setState({ zoom: zoom });
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
            onCenterChange={this.centerChange}
            onZoomChange={this.zoomChange}
          />
        </div>
      </div>
    );
  },
});
