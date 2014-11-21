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
    // OSM router
    var router = function(point1, point2, cb) {
      var proxy = 'http://www2.turistforeningen.no/routing.php?url=';
      var route = 'http://www.yournavigation.org/api/1.0/gosmore.php&format=geojson&v=foot&fast=1&layer=mapnik';
      var params = '&flat=' + point1.lat + '&flon=' + point1.lng + '&tlat=' + point2.lat + '&tlon=' + point2.lng;
      $.getJSON(proxy + route + params, function(geojson, status) {
        if (!geojson || !geojson.coordinates || geojson.coordinates.length === 0) {
          if (typeof console.log === 'function') {
            console.log('OSM router failed', geojson);
          }
          return cb(new Error());
        }
        return cb(null, L.GeoJSON.geometryToLayer(geojson));
      });
    }
    routing = new L.Routing({
      position: 'topleft',
      routing: {
        router: router
      }
    });
    map.addControl(routing);
    routing.draw();
  };

  initMap();
  addLayers();
  addRouting();
});
