$(function() {
  var map;

  var initMap = function() {
    map = new L.map('map');
    map.setView([45.601944, 24.616944], 13);
  };

  var addLayers = function() {
    var thunderforestLandscapeLayer = new L.tileLayer('http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'tiles &copy; <a target="_blank" href="http://www.thunderforest.com">Thunderforest</a> ' +
        '(<a target="_blank" href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA 2.0</a>)'
    });
    map.addLayer(thunderforestLandscapeLayer);

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
      'OpenCycleMap': openCycleMapLayer
    }, {
      'Waymarked Trails': waymarkedTrailsLayer
    });
    map.addControl(layers);
  };

  var addRouting = function() {
    var router = new L.Routing.OSRM({
      serviceUrl: 'http://router.project-osrm.org/viaroute'
    });
    router = new L.Routing.YOURS({
      serviceUrl: 'http://localhost:3000/route'
    });

    var routing = L.Routing.control({
      router: router,
      waypoints: [
        new L.LatLng(45.652778, 24.355278),
        new L.LatLng(45.599444, 24.736111)
      ]
    });
    map.addControl(routing);

    routing.route({
      geometryOnly: true
    });
  };

  initMap();
  addLayers();
  addRouting();
});
