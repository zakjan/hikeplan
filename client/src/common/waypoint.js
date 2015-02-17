var _ = require('lodash');
var L = require('leaflet')


var lastWaypointId = 0;

class Waypoint {
  constructor(latLng) {
    this.id = lastWaypointId++;
    this.latLng = latLng;
  }

  static fromString(str) {
    var [lat, lng] = str.split(',').map(x => parseFloat(x));

    if (!(_.isFinite(lat) && _.isFinite(lng))) {
      return;
    }

    return new Waypoint(new L.LatLng(lat, lng));
  }

  get latLng() {
    return this._latLng;
  }

  set latLng(latLng) {
    if (latLng) {
      latLng = Waypoint.truncLatLng(latLng);
    }

    this._latLng = latLng;
  }

  toString() {
    if (!this.latLng) {
      return '';
    }
    return this.latLng.lat + ',' + this.latLng.lng;
  }

  // truncate insignificant digits
  static truncLatLng(latLng) {
    latLng.lat = parseFloat(latLng.lat.toFixed(6));
    latLng.lng = parseFloat(latLng.lng.toFixed(6));
    return latLng;
  }
}


module.exports = Waypoint;
