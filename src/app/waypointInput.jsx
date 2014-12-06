'use strict';

var WaypointInput = React.createClass({
  changeWaypoint: function(e) {
    var waypoint = e.target.value.split(/, */);
    this.props.onChange(new L.LatLng(parseFloat(waypoint[0]), parseFloat(waypoint[1])));
  },

  render: function() {
    var value = this.props.waypoint.lat + ', ' + this.props.waypoint.lng;

    return (
      <div className="form-group">
        <div className="input-group">
          <div className="input-group-addon">@</div>
          <input type="text" className="form-control" value={value} onChange={this.changeWaypoint} />
        </div>
      </div>
    );
  },
});
