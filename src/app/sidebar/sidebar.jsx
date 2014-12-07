'use strict';

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <div className="sidebar-body">
          <SidebarBox title="Waypoints">
            <WaypointsBox
              waypoints={this.props.waypoints}
              onAddWaypoint={this.props.onAddWaypoint}
              onReverseWaypoints={this.props.onReverseWaypoints}
              onChangeWaypoint={this.props.onChangeWaypoint}
              onRemoveWaypoint={this.props.onRemoveWaypoint}
            />
          </SidebarBox>
          <SidebarBox title="Route stats" loading={this.props.routeLoading}>
            <RouteStatsBox route={this.props.route} />
          </SidebarBox>
        </div>
        <div className="sidebar-foot">
          With passion for hiking, made by <a href="http://www.zakjan.cz">zakjan</a>
        </div>
      </div>
    );
  },
});
