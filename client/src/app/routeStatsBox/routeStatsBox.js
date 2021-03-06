'use strict';

require('./routeStatsBox.less');

var Numeral = require('numeral');
var React = require('react');

var RouteElevationProfile = require('app/routeElevationProfile/routeElevationProfile');
var Route = require('common/route');


class RouteStatsBox extends React.Component {
  render() {
    if (!this.props.route) {
      return (
        <p>No route</p>
      );
    }

    return (
      <div className="route-stats-box">
        <dl className="dl-horizontal">
          <dt>Lowest point:</dt><dd>{this.formatDistanceInMeters(this.props.route.stats.minElevation)}</dd>
          <dt>Highest point:</dt><dd>{this.formatDistanceInMeters(this.props.route.stats.maxElevation)}</dd>
        </dl>
        <dl className="dl-horizontal">
          <dt>Distance:</dt><dd>{this.formatDistanceInKilometers(this.props.route.stats.distance)}</dd>
          <dt>Ascent:</dt><dd>{this.formatDistanceInMeters(this.props.route.stats.ascent)}</dd>
          <dt>Descent:</dt><dd>{this.formatDistanceInMeters(this.props.route.stats.descent)}</dd>
          <dt>Distance time:</dt><dd>{this.formatTime(this.props.route.stats.distanceTime)}</dd>
          <dt>Total time:</dt><dd>{this.formatTime(this.props.route.stats.time)}</dd>
        </dl>
        <RouteElevationProfile elevationProfile={this.props.route.elevationProfile} />
      </div>
    );
  }

  formatDistanceInKilometers(value = 0) {
    return Numeral(value).format('0.0') + ' km';
  }

  formatDistanceInMeters(value = 0) {
    return Numeral(value).format('0,0') + ' m';
  }

  formatTime(value = 0) {
    return Numeral(value * 60 * 60).format('00:00:00').replace(/^0?(\d+):0?(\d+):0?(\d+)$/, '$1 h $2 m');
  }
}


module.exports = RouteStatsBox;
