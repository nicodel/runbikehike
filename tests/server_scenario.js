/* jshint strict: true, node: true */
'use strict';

var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function () {
  var url = 'http://localhost:9550/';

  describe('Scenario', function () {
    var sessions;
    it('Getting all sessions stored', function (done) {
      request(url)
        .get('sessions/')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          } else {
            sessions = res;
            //console.log('Sessions', sessions);
          }
          done();
        });
    });

    it('Adding a new session', function (done) {
      var session = {
        'activity_name' : 'running',
        'altitude'      : {
          'altitude_maximum'  : 68,
          'altitude_minimum'  : 46,
          'negative_climb'    : 951,
          'positive_climb'    : 944
        },
        'calories'      : 2035,
        'date'          : '2015-08-17T07:56:32.446Z',
        'distance'      : 11456.600308163668,
        'gps_track'     : {
          'available' : true
        },
        'speed'         : 2.816954816052769,
        'time_interval' : {
          'duration'    : 4067.016,
          'end_date'    : '2015-08-17T07:55:30.750Z',
          'start_date'  : '2015-08-17T06:47:43.734Z'
        }
      };
      request(url)
        .post('sessions/')
        .send(session)
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          } else {
            console.log('res', res);
          }
          done();
        });
    });

  });
});
