var _ = require('lodash');
var L = require('leaflet')


class Waypoint {
  constructor(latLng) {
    this.id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    this.latLng = latLng;
  }

  static fromString(str) {
    var [lat, lng] = str.split(',').map(x => parseFloat(x));

    if (!(_.isFinite(lat) && _.isFinite(lng))) {
      return;
    }

    return new Waypoint(new L.LatLng(lat, lng));
  }

  toString() {
    if (!this.latLng) {
      return '';
    }
    return this.latLng.lat + ',' + this.latLng.lng;
  }
}


module.exports = Waypoint;
