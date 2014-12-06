'use strict';

var WaypointForm = React.createClass({
  addWaypoint: function(e) {
    this.props.onAddWaypoint();
    e.preventDefault();
  },

  changeWaypoint: function(i, value) {
    this.props.onChangeWaypoint(value, i)
  },

  render: function() {
    var that = this;

    var waypointInputs = this.props.waypoints.map(function(waypoint, i) {
      return (
        <WaypointInput
          key={i}
          waypoint={waypoint}
          onChange={that.changeWaypoint.bind(that, i)}
        />
      );
    });

    return (
      <form>
        {waypointInputs}
        <button className="btn btn-xs" onClick={this.addWaypoint}>Add waypoint</button>
      </form>
    );
  },
});
