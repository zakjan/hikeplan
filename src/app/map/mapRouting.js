'use strict';

var MapRouting = {
  route: function(waypoints, callback, context, options) {
    context = context || callback;

    var reqData = {
      url: '/routing',
      data: {
        waypoints: waypoints.map(x => '' + x.latLng.lat + ',' + x.latLng.lng).join(';'),
      },
    };

    $.ajax(reqData).then(function(body) {
      var coordinates = _.flatten(body.segments.map(x => x.coordinates), true).map(x => [x[1], x[0]]);

      var route = {
        // required by leaflet-routing-machine
        name: 'Route',
        coordinates: coordinates,
        instructions: [],
        inputWaypoints: waypoints,
        summary: {},
        // custom
        segments: body.segments,
        total: body.total,
      };

      callback.call(context, null, [route]);
    }).fail(function(body) {
      callback.call(context, body);
    });
  },
};
