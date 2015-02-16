var Waypoint = require('./waypoint');


class Waypoints {
  constructor(waypoints) {
    if (!waypoints || waypoints.length === 0) {
      this.waypoints = [new Waypoint(), new Waypoint()];
    } else if (waypoints.length === 1) {
      this.waypoints = [waypoints[0], new Waypoint()];
    } else {
      this.waypoints = waypoints;
    }
  }

  static fromString(str) {
    var waypoints = str.split(';').map(x => Waypoint.fromString(x)).filter(x => x);
    return new Waypoints(waypoints);
  }

  toString() {
    return this.waypoints.filter(x => x.latLng).map(x => x.toString()).join(';');
  }

  moveElementAt(from, to) {
    var waypoint = this.waypoints[from];

    this.waypoints[from] = null;
    this.waypoints = [].concat(
      this.waypoints.slice(0, to + 1),
      [waypoint],
      this.waypoints.slice(to + 1)
    ).filter(x => x);
  }

  removeElementAt(i) {
    this.waypoints = [].concat(
      this.waypoints.slice(0, i),
      this.waypoints.slice(i + 1)
    );
  }
}


module.exports = Waypoints;
