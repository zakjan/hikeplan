'use strict';

var WaypointsBox = React.createClass({
  addWaypoint: function(e) {
    this.props.onAddWaypoint();
    e.preventDefault();
  },

  render: function() {
    return (
      <form>
        {this.props.waypoints.map(function(waypoint, i) {
          return (
            <div className="form-group" key={i}>
              <WaypointBox
                waypoint={waypoint}
                onChangeWaypoint={this.props.onChangeWaypoint.bind(null, i)}
                onRemoveWaypoint={this.props.onRemoveWaypoint.bind(null, i)}
              />
            </div>
          );
        }, this)}
        <div className="form-group">
          <button className="btn btn-xs" onClick={this.addWaypoint}>Add waypoint</button>
        </div>
      </form>
    );
  },
});
