'use strict';

var _ = require('lodash');

var Request = require('common/request');

var config = require('config');


class Route {
  static _calculateStats(elevationProfile) {
    var prevPoint = elevationProfile[0];
    var distance = elevationProfile[elevationProfile.length - 1].distance;
    var minElevation = prevPoint.height;
    var maxElevation = prevPoint.height;
    var ascent = 0;
    var descent = 0;

    for (var i = 1; i < elevationProfile.length; i++) {
      var point = elevationProfile[i];
      var elevationDelta = point.height - prevPoint.height;
      var distanceDelta = point.distance - prevPoint.distance;

      if (point.height < minElevation) {
        minElevation = point.height;
      } else if (point.height > maxElevation) {
        maxElevation = point.height;
      }

      if (elevationDelta > 0) {
        ascent += elevationDelta;
      } else if (elevationDelta < 0) {
        descent -= elevationDelta;
      }

      /*
      // doesn't work, because of inaccurate elevation data
      var speed = Route._tobblerHikingFunction(elevationDelta, distanceDelta);
      if (speed > 0) {
        time += distanceDelta / speed;
      }
      */

      prevPoint = point;
    }

    var distanceTime = distance / 4;
    var time = Route._calculateTime({ distance, ascent, descent });

    return { distance, minElevation, maxElevation, ascent, descent, distanceTime, time };
  }

  // @see http://en.wikipedia.org/wiki/Tobler%27s_hiking_function
  // @see http://geographianapocensis.acad-cluj.ro/Revista/volume/nr_2_2012/pdf/Magyari_Dombay.pdf
  // @see https://github.com/SrNetoChan/WalkingTime/blob/e245616a7b209c6e4d9a83f1071d87e814fdc1b5/walkingtime.py#L193
  static _tobblerHikingFunction(elevationDelta, distanceDelta) {
    var baseSpeed = 5; // km/h
    var maxSpeed = baseSpeed / Math.pow(Math.E, -3.5 * 0.05);

    if (distanceDelta === 0) {
      return 0;
    }

    elevationDelta /= 1000;
    return maxSpeed * Math.pow(Math.E, -3.5 * Math.abs(elevationDelta / distanceDelta + 0.05));
  }

  // @see http://www.horskasluzba.cz/data/web/download/casopis-horske-sluzby/casopis-hscr-2-leto2009.pdf
  static _calculateTime({ distance, ascent, descent }) {
    var distanceSpeed = 4; // km/h
    var ascentSpeed = 400; // m/h
    var descentSpeed = 600; // m/h

    var distanceTime = distance / distanceSpeed;
    var ascentTime = ascent / ascentSpeed;
    var descentTime = descent / descentSpeed;
    var elevationTime = ascentTime + descentTime;
    var time = Math.max(distanceTime, elevationTime) + Math.min(distanceTime, elevationTime) / 2;

    return time;
  }

  static getStats(routeSessionId) {
    var reqOptions = {
      url: 'https://open.mapquestapi.com/elevation/v1/profile',
      qs: {
        key: config.mapQuestAccessToken,
        sessionId: routeSessionId,
        useFilter: true, // smooth line, fixes missing data
        shapeFormat: 'raw',
      },
      json: true,
    };
    return Request(reqOptions).then((res) => {
      var elevationProfile = res.body.elevationProfile.filter(x => x.height !== -32768); // fixes missing data
      var stats = Route._calculateStats(elevationProfile)

      return { elevationProfile, stats };
    });
  }
}


module.exports = Route;
