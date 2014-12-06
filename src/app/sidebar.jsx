'use strict';

var Sidebar = React.createClass({
  render: function() {
    return (
      <aside className="sidebar">
        <p>Enter waypoints:</p>
        <WaypointForm
          waypoints={this.props.waypoints}
          onAddWaypoint={this.props.onAddWaypoint}
          onChangeWaypoint={this.props.onChangeWaypoint}
        />
      </aside>
    );
  },
});
