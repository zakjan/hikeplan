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
    var min = Math.min(from, to);
    var max = Math.max(from, to);

    this.waypoints = [].concat(
      this.waypoints.slice(0, min),                                  // head
      from == max ? [this.waypoints[from], this.waypoints[to]] : [], // RTL
      this.waypoints.slice(min + 1, max),                            // body
      from == min ? [this.waypoints[to], this.waypoints[from]] : [], // LTR
      this.waypoints.slice(max + 1)                                  // tail
    );
  }

  removeElementAt(i) {
    this.waypoints = [].concat(
      this.waypoints.slice(0, i),
      this.waypoints.slice(i + 1)
    );
  }
}


module.exports = Waypoints;
