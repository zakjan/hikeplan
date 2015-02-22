'use strict';

var _ = require('lodash');
var React = require('react');


class RouteElevationProfile extends React.Component {
  componentDidMount() {
    this.drawChart();
  }

  componentDidUpdate() {
    this.drawChart();
  }

  componentWillUnmount() {
    this.clearChart();
  }

  render() {
    return (
      <div className="route-elevation-profile" />
    );
  }

  getChartData() {
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Distance');
    data.addColumn('number', 'Height');
    data.addRows(this.props.elevationProfile.map(x => [x.distance, x.height]));
    return data;
  }

  getChartOptions() {
    return {
      title: 'Elevation Profile',
      legend: {
        position: 'none',
      },
      chartArea: {
        left: 40,
        top: 20,
        width: '100%',
        height: 80,
      },
      width: 240,
      height: 120,
    };
  }

  drawChart() {
    if (!this.props.elevationProfile) {
      return;
    }

    var data = this.getChartData();
    var options = this.getChartOptions();

    this.clearChart();
    this.chart = new google.visualization.LineChart(React.findDOMNode(this));
    this.chart.draw(data, options);
  }

  clearChart() {
    if (this.chart) {
      this.chart.clearChart();
      this.chart = null;
    }
  }
}


module.exports = RouteElevationProfile;
