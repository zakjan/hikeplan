'use strict';

var RouteStatsBox = React.createClass({
  formatDistanceInKilometers: function(value) {
    return numeral(value).format('0.0') + ' km';
  },

  formatDistanceInMeters: function(value) {
    return numeral(value).format('0,0') + ' m';
  },

  formatTime: function(value) {
    return numeral(value).format('0:00');
  },

  render: function() {
    if (!this.props.route) {
      return <p>No route<br /><br /><br /><br /><br /><br /></p>;
    }

    return (
      <div className="route-stats-box">
        <dl className="dl-horizontal">
          <dt>Distance:</dt><dd>{this.formatDistanceInKilometers(this.props.route.total.distance)}</dd>
          <dt>Ascend:</dt><dd>{this.formatDistanceInMeters(this.props.route.total.ascend)}</dd>
          <dt>Descend:</dt><dd>{this.formatDistanceInMeters(this.props.route.total.descend)}</dd>
          <dt>Time:</dt><dd>{this.formatTime(this.props.route.total.time)}</dd>
        </dl>
        <p>Altitude chart</p>
      </div>
    );
  },
});
