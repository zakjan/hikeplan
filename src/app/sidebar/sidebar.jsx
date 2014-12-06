'use strict';

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <div className="sidebar-box">
          <div className="sidebar-box-head">
            Waypoints
          </div>
          <div className="sidebar-box-body">
            <WaypointsBox
              waypoints={this.props.waypoints}
              onAddWaypoint={this.props.onAddWaypoint}
              onChangeWaypoint={this.props.onChangeWaypoint}
              onRemoveWaypoint={this.props.onRemoveWaypoint}
            />
          </div>
        </div>
      </div>
    );
  },
});
