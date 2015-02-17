'use strict';

require('./routeStatsBox.less');

var Numeral = require('numeral');
var React = require('react');


class RouteStatsBox extends React.Component {
  render() {
    if (!this.props.route) {
      return <p>No route<br /><br /><br /><br /><br /><br /></p>;
    }

    return (
      <div className="route-stats-box">
        <dl className="dl-horizontal">
          <dt>Distance:</dt><dd>{this.formatDistanceInKilometers(this.props.route.distance)}</dd>
          <dt>Ascend:</dt><dd>{this.formatDistanceInMeters(this.props.route.ascend)}</dd>
          <dt>Descend:</dt><dd>{this.formatDistanceInMeters(this.props.route.descend)}</dd>
          <dt>Time:</dt><dd>{this.formatTime(this.props.route.time)}</dd>
        </dl>
        <p>Altitude chart</p>
      </div>
    );
  }

  formatDistanceInKilometers(value) {
    return Numeral(value).format('0.0') + ' km';
  }

  formatDistanceInMeters(value) {
    return Numeral(value).format('0,0') + ' m';
  }

  formatTime(value) {
    return Numeral(value).format('0:00');
  }
}


module.exports = RouteStatsBox;
