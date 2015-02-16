'use strict';

var React = require('react');

var WaypointBox = require('./waypointBox');


var WaypointsBox = React.createClass({
  render: function() {
    return (
      <form>
        <div className="form-group">
          {
            this.props.waypoints.map(waypoint =>
              <WaypointBox
                key={waypoint.id}
                waypoint={waypoint}
                onChangeWaypoint={this.props.onChangeWaypoint.bind(null, waypoint.id)}
                onRemoveWaypoint={this.props.onRemoveWaypoint.bind(null, waypoint.id)}
                onMoveUpWaypoint={this.props.onMoveUpWaypoint.bind(null, waypoint.id)}
                onMoveDownWaypoint={this.props.onMoveDownWaypoint.bind(null, waypoint.id)}
              />
            )
          }
        </div>
        <div className="form-group">
          <a className="btn btn-default btn-xs" onClick={this.props.onAddWaypoint}><i className="fa fa-plus fa-fw"></i>&nbsp;Add waypoint</a>
          &nbsp;
          <a className="btn btn-default btn-xs" onClick={this.props.onReverseWaypoints}><i className="fa fa-exchange fa-rotate-90 fa-fw"></i>&nbsp;Reverse direction</a>
        </div>
      </form>
    );
  },
});


module.exports = WaypointsBox;
