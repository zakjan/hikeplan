'use strict';

var WaypointsBox = React.createClass({
  render: function() {
    return (
      <form>
        {this.props.waypoints.map(function(waypoint) {
          return (
            <WaypointBox
              key={waypoint.id}
              waypoint={waypoint}
              onChangeWaypoint={this.props.onChangeWaypoint.bind(null, waypoint.id)}
              onRemoveWaypoint={this.props.onRemoveWaypoint.bind(null, waypoint.id)}
            />
          );
        }, this)}
        <div className="form-group">
          <a className="btn btn-default btn-xs" onClick={this.props.onAddWaypoint}><i className="fa fa-plus fa-fw"></i>&nbsp;Add waypoint</a>
          &nbsp;
          <a className="btn btn-default btn-xs" onClick={this.props.onReverseWaypoints}><i className="fa fa-arrows-v fa-fw"></i>&nbsp;Reverse direction</a>
        </div>
      </form>
    );
  },
});
