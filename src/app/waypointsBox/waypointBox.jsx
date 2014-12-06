'use strict';

var WaypointBox = React.createClass({
  changeWaypoint: function(e) {
    var waypoint = e.target.value.split(/, */);
    this.props.onChangeWaypoint({ latLng: new L.LatLng(parseFloat(waypoint[0]), parseFloat(waypoint[1])) });
  },

  render: function() {
    var value = this.props.name || this.props.waypoint.latLng.lat + ', ' + this.props.waypoint.latLng.lng;

    return (
      <div className="waypoint-box">
        <div className="waypoint-box-head">
          @
        </div>
        <div className="waypoint-box-body">
          <input type="text" className="form-control" value={value} onChange={this.changeWaypoint} />
        </div>
        <div className="waypoint-box-foot">
          <a className="close" onClick={this.props.onRemoveWaypoint}>&times;</a>
        </div>
      </div>
    );
  },
});
