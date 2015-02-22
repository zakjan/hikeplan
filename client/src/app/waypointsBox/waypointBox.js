'use strict';

require('./waypointBox.less');

var _ = require('lodash');
var L = require('leaflet');
var React = require('react');

var Waypoint = require('common/waypoint');


class WaypointBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.waypoint.toString(),
      valid: true,
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeWaypoint = this.changeWaypoint.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    var newValue = nextProps.waypoint.toString();

    if (newValue === this.state.value) {
      return;
    }

    this.setState({ value: newValue });
  }

  render() {
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
          <input type="text" className="form-control" value={this.state.value} onChange={this.changeValue} onBlur={this.changeWaypoint} />
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
  }

  changeValue(e) {
    this.setState({ value: e.target.value });
  }

  changeWaypoint() {
    var match = this.state.value.match(/^(\-?\d+\.?\d*),(\-?\d+\.?\d*)$/);
    if (match) {
      this.props.onChangeWaypoint(Waypoint.fromString(this.state.value));
    }
    this.setState({ valid: !!match });
  }
}


module.exports = WaypointBox;
