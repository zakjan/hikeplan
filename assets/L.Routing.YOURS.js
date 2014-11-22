(function() {
  'use strict';

  L.Routing = L.Routing || {};

  L.Routing.YOURS = L.Class.extend({
    options: {
      serviceUrl: 'http://www2.turistforeningen.no/routing.php?url=http://www.yournavigation.org/api/1.0/gosmore.php',
      timeout: 30 * 1000
    },

    initialize: function(options) {
      L.Util.setOptions(this, options);
    },

    route: function(waypoints, callback, context, options) {
      var promises = [];

      context = context || callback;

      for (var i = 0; i <= waypoints.length - 2; i++) {
        var url = this._buildRouteUrl(waypoints[i], waypoints[i + 1], options);

        var promise = $.get(url);

        promises.push(promise);
      }

      $.when.apply(null, promises).then(function() {
        var responses = [].slice.call(arguments, 0, promises.length)
        responses = responses.map(function(res) {
          return res[0] || res;
        });

        var coords = [].concat.apply([], responses.map(function(res) { return res.coordinates; })).map(function(coord) { return [coord[1], coord[0]]; });
        var totalDistance = responses.reduce(function(sum, res) { return sum + res.distance; }, 0);
        var totalTime = responses.reduce(function(sum, res) { return sum + res.traveltime; }, 0);

        var route = {
          name: 'Route',
          coordinates: coords,
          instructions: [],
          inputWaypoints: waypoints,
          waypoints: waypoints,
          summary: {
            totalDistance: totalDistance,
            totalTime: totalTime
          }
        };

        callback.call(context, null, [route]);
      }).fail(function(data) {
				callback.call(context, data);
      });

      return this;
    },

    _buildRouteUrl: function(waypointFrom, waypointTo, options) {
      var params = {
        format: 'geojson',
        v: 'foot',
        fast: 0,
        layer: 'mapnik',
        flat: waypointFrom.latLng.lat,
        flon: waypointFrom.latLng.lng,
        tlat: waypointTo.latLng.lat,
        tlon: waypointTo.latLng.lng
      };

      return this.options.serviceUrl + '?' + $.param(params);
    }
  });

  L.Routing.yours = function(options) {
    return new L.Routing.YOURS(options);
  };
})();
