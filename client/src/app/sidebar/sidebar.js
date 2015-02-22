'use strict';

require('./sidebar.less');

var React = require('react');

var RouteStatsBox = require('app/routeStatsBox/routeStatsBox');
var SidebarBox = require('app/sidebarBox/sidebarBox');
var WaypointsBox = require('app/waypointsBox/waypointsBox');


class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar-body">
          <SidebarBox title="Waypoints">
            <WaypointsBox
              waypoints={this.props.waypoints}
              onAddEmptyWaypoint={this.props.onAddEmptyWaypoint}
              onReverseWaypoints={this.props.onReverseWaypoints}
              onClearWaypoints={this.props.onClearWaypoints}
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
          Source code available on <a href="https://github.com/zakjan/hikeplan" target="_blank">GitHub</a>.
          <br />
          With passion for hiking, made by <a href="http://zakjan.cz" target="_blank">zakjan</a>.
        </div>
      </div>
    );
  }
}


module.exports = Sidebar;
