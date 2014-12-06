'use strict';

var Map = React.createClass({
  initMap: function() {
    this.map = new L.map(this.getDOMNode());
    this.map.setView(this.props.center, this.props.zoom);
  },

  addEventHandlers: function() {
    var that = this;
    this.map.on('moveend', function() {
      that.props.onCenterChange(that.map.getCenter());
    });
    this.map.on('zoomend', function() {
      that.props.onZoomChange(that.map.getZoom());
    });
  },

  addLayers: function() {
    var thunderforestLandscapeLayer = new L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.thunderforest.com">Thunderforest</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>)'
    });
    this.map.addLayer(thunderforestLandscapeLayer);

    var openStreetMapLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var openCycleMapLayer = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var waymarkedTrailsLayer = L.tileLayer('http://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
      maxZoom: 19,
      opacity: 0.5,
      attribution: 'overlay &copy; <a target="_blank" href="http://hiking.waymarkedtrails.org">Waymarked Trails</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/3.0/de/deed.en">CC-BY-SA 3.0 DE</a>)'
    });

    var layers = L.control.layers({
      'Thunderforest Landscape': thunderforestLandscapeLayer,
      'OpenStreetMap': openStreetMapLayer,
      'OpenCycleMap': openCycleMapLayer,
    }, {
      'Waymarked Trails': waymarkedTrailsLayer,
    });
    this.map.addControl(layers);
  },

  addRouting: function() {
    // var router = new L.Routing.OSRM({
    //   serviceUrl: 'http://router.project-osrm.org/viaroute',
    // });
    var router = new L.Routing.YOURS({
      serviceUrl: 'http://localhost:3000/route',
    });

    var routing = L.Routing.control({
      router: router,
      waypoints: this.props.waypoints,
    });
    this.map.addControl(routing);

    routing.route({
      geometryOnly: true,
    });
  },

  componentDidMount: function() {
    this.initMap();
    this.addEventHandlers();
    this.addLayers();
    this.addRouting();
  },

  render: function() {
    return (
      <div className="map" />
    );
  },
});
