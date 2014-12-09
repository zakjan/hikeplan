'use strict';

var WaypointBox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      value: '0, 0',
      valid: true,
    };
  },

  changeWaypoint: function() {
    var match = this.state.value.match(/^(-?\d+\.?\d*), (-?\d+\.?\d*)$/);
    if (match) {
      var waypoint = _.clone(this.props.waypoint);
      waypoint.latLng = new L.LatLng(parseFloat(match[1]), parseFloat(match[2]));
      this.props.onChangeWaypoint(waypoint);
    }
    this.setState({ valid: !!match });
  },

  componentWillMount: function() {
    var value = this.props.waypoint.latLng.lat + ', ' + this.props.waypoint.latLng.lng;
    this.setState({ value: value });
  },

  componentWillReceiveProps: function(nextProps) {
    if (_.isEqual(this.props.waypoint.latLng, nextProps.waypoint.latLng)) {
      return;
    }

    var value = nextProps.waypoint.latLng.lat + ', ' + nextProps.waypoint.latLng.lng;
    this.setState({ value: value });
  },

  render: function() {
    var className = React.addons.classSet({
      'form-group': true,
      'has-error': !this.state.valid,
    });

    return (
      <div className={className}>
        <div className="waypoint-box">
          <div className="waypoint-box-head" title={this.props.waypoint.id}>
            <i className="fa fa-map-marker"></i>
          </div>
          <div className="waypoint-box-body">
            <input type="text" className="form-control" valueLink={this.linkState('value')} onBlur={this.changeWaypoint} />
          </div>
          <div className="waypoint-box-foot">
            <a className="close" onClick={this.props.onRemoveWaypoint}>&times;</a>
          </div>
        </div>
      </div>
    );
  },
});
