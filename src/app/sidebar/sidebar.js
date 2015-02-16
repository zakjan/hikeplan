'use strict';

require('./sidebar.less');

var React = require('react');

var RouteStatsBox = require('../routeStatsBox/routeStatsBox');
var SidebarBox = require('../sidebarBox/sidebarBox');
var WaypointsBox = require('../waypointsBox/waypointsBox');


var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar">
        <div className="sidebar-body">
          <SidebarBox title="Waypoints">
            <WaypointsBox
              waypoints={this.props.waypoints}
              onAddEmptyWaypoint={this.props.onAddEmptyWaypoint}
              onReverseWaypoints={this.props.onReverseWaypoints}
              onChangeWaypoint={this.props.onChangeWaypoint}
              onRemoveWaypoint={this.props.onRemoveWaypoint}
              onMoveUpWaypoint={this.props.onMoveUpWaypoint}
              onMoveDownWaypoint={this.props.onMoveDownWaypoint}
            />
          </SidebarBox>
          <SidebarBox title="Route stats" loading={this.props.routeLoading}>
            <RouteStatsBox route={this.props.route} />
          </SidebarBox>
        </div>
        <div className="sidebar-foot">
          Source code available on <a href="https://github.com/zakjan/hikeplan">GitHub</a>.
          <br />
          With passion for hiking, made by <a href="http://zakjan.cz">zakjan</a>.
        </div>
      </div>
    );
  },
});


module.exports = Sidebar;
