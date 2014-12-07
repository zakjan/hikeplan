'use strict';

var RouteStatsBox = React.createClass({
  render: function() {
    return (
      <div className="route-stats-box">
        <dl className="dl-horizontal">
          <dt>Length:</dt><dd>00 km</dd>
          <dt>Ascend:</dt><dd>0000 m</dd>
          <dt>Descend:</dt><dd>0000 m</dd>
          <dt>Time:</dt><dd>0 h 00 m</dd>
        </dl>
        <p>Altitude chart</p>
      </div>
    );
  },
});
