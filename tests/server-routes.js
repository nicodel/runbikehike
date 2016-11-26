/* jshint strict: true, node: true */
'use strict';

var should = require('should');
var assert = require('assert');
var request = require('supertest');

describe('Routing', function () {
  var url = 'http://localhost:9550/';
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
  var session_id;

  describe('Sessions', function () {
    it('should return 200 when getting all sessions', function (done) {
      request(url)
        .get('sessions/')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should return 201 when a new session data is posted', function (done) {
      request(url)
        .post('sessions/')
        .send(session)
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          } else {
            session = res.body;
            session_id = res.body.id;
          }
          done();
        });
    });
    it('should return 200 when requesting a specific id', function (done) {
      request(url)
        .get('sessions/' + session_id)
        .send()
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          } else if (session !== res.body) {
            console.log('session', session);
            console.log('res.body', res.body);
            throw ('did not get the right session');
          }
          done();
        });
    });
    it('should return 200 when modyfing a session', function (done) {
      session.calories = 0;
      request(url)
        .put('sessions/' + session_id)
        .send(session)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          } else if (session.calories !== res.body.calories) {
            throw ('the modifyed calories value was not stored');
          }
          done();
        });
    });
  });
});
