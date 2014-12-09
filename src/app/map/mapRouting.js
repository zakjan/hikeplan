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
      var coordinates = _.flatten(body, true).map(x => [x[1], x[0]]);

      var route = {
        name: 'Route',
        coordinates: coordinates,
        instructions: [],
        inputWaypoints: waypoints,
        summary: {}
      };

      callback.call(context, null, [route]);
    }).fail(function(body) {
      callback.call(context, body);
    });
  },
};
