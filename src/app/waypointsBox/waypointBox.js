'use strict';

require('./waypointBox.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var Waypoint = require('../../common/waypoint');


var WaypointBox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      value: this.props.waypoint.toString(),
      valid: true,
    };
  },

  changeWaypoint: function() {
    var match = this.state.value.match(/^(\-?\d+\.?\d*),(\-?\d+\.?\d*)$/);
    if (match) {
      this.props.onChangeWaypoint(Waypoint.fromString(this.state.value));
    }
    this.setState({ valid: !!match });
  },

  componentWillReceiveProps: function(nextProps) {
    if (_.isEqual(this.props.waypoint.latLng, nextProps.waypoint.latLng)) {
      return;
    }

    var value = nextProps.waypoint.toString();
    this.setState({ value: value });
  },

  render: function() {
    var className = React.addons.classSet({
      'waypoint-box': true,
      'has-error': !this.state.valid,
    });

    return (
      <div className={className}>
        <div className="waypoint-box-head" title={this.props.waypoint.id}>
          <i className="fa fa-map-marker"></i>
        </div>
        <div className="waypoint-box-body">
          <input type="text" className="form-control" valueLink={this.linkState('value')} onBlur={this.changeWaypoint} />
        </div>
        <div className="waypoint-box-foot">
          <span className="waypoint-box-sort">
            <a className="waypoint-box-icon-link waypoint-box-move-up" onClick={this.props.onMoveUpWaypoint}>
              <i className="fa fa-caret-up"></i>
            </a>
            <a className="waypoint-box-icon-link waypoint-box-move-down" onClick={this.props.onMoveDownWaypoint}>
              <i className="fa fa-caret-down"></i>
            </a>
          </span>
          <a className="waypoint-box-icon-link" onClick={this.props.onRemoveWaypoint}>
            <i className="fa fa-close"></i>
          </a>
        </div>
      </div>
    );
  },
});


module.exports = WaypointBox;
