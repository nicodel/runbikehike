/* jshint strict: true, node: true */
'use strict';

var should  = require('should');
var request = require('supertest');
var server = require('../server');

describe('Run, Bike, Hike... Server', function () {
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
  var id = '';

  describe('Server routing', function () {
    it('should return 200 when loading web page', function (done) {
      request(server)
        .get('/')
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });

    it('should return 200 when getting all sessions', function (done) {
      request(server)
        .get('/data/sessions')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          // console.log(Object.keys(res.body.rows));
          if (err) {
            throw err;
          }
          //console.log('nb of sessions', Object.keys(res.body.rows).length);
          done();
        });
    });

    it('should return 201 when adding a new session', function (done) {
      request(server)
        .post('/data/sessions')
        .send(session)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.keys('id');
          id = res.body.id;
          //console.log('new session id:', id);
          done();
        });
    });

    it('should return 200 when getting a specific session', function (done) {
      request(server)
        .get('/data/sessions/' + id)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          session = res.body;
          session.should.keys('_id');
          session._id.should.equal(id);
          done();
        });
    });

    it('should return 200 when upadting a specific session', function (done) {
      session.gps_track.available = false;
      request(server)
        .put('/data/sessions/' + id)
        .send(session)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.ok.should.be.true();
          done();
        });
    });

    it('should return 200 when deleting a specific session', function (done) {
      request(server)
        .delete('/data/sessions/' + id)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.ok.should.be.true();
          done();
        });
    });
  });
  server.close();
});

  /*var url = 'http://localhost:9550/';

  var session_id;*/
