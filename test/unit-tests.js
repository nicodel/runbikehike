/* jshint strict: true, node: true */
'use strict';

var should  = require('should');
var request = require('supertest');
var server = require('../server');

describe('Run, Bike, Hike... Server', function () {
  // TODO check for data constitency
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








  describe('Server session routing', function () {
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
      },
      'vendor'        : 'RunBikeHike'
    };
    var id = '';
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








  describe('Server body_weight routing', function () {
    var body_weight = {
      'date'    : '2015-08-18T07:56:32.446Z',
      'weight'  : 92.3,
      'vendor'  : 'RunBikeHike'
    };
    var id = '';
    it('should return 200 when getting all body_weight', function (done) {
      request(server)
        .get('/data/body_weight')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should return 201 when adding a new body_weight', function (done) {
      request(server)
        .post('/data/body_weight')
        .send(body_weight)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.keys('id');
          id = res.body.id;
          done();
        });
    });
    it('should return 200 when getting a specific body_weight', function (done) {
      request(server)
        .get('/data/body_weight/' + id)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          body_weight = res.body;
          body_weight.should.keys('_id');
          body_weight._id.should.equal(id);
          done();
        });
    });
    it('should return 200 when upadting a specific body_weight', function (done) {
      body_weight.weight = 56;
      request(server)
        .put('/data/body_weight/' + id)
        .send(body_weight)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.ok.should.be.true();
          done();
        });
    });
    it('should return 200 when deleting a specific body_weight', function (done) {
      request(server)
        .delete('/data/body_weight/' + id)
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








  describe('Server gps_tracks routing', function () {
    var gps_track = {
      'metadata'  : {
        'time' : '2015-08-12T18:18:15.009Z',
        'name' : 'testing track',
      },
      'trk' : {
        'segs' : [
          {
            'date' : '2015-08-12T17:15:23.995Z',
            'latitude' : 48.754516,
            'longitude' : 2.316078,
            'distance' : 0,
            'altitude' : 114,
            'speed' : 1.3382078409194946,
            'accuracy' : 4,
            'vertAccuracy' : 4,
          },
          {
            'date' : '2015-08-12T17:15:23.995Z',
            'latitude' : 48.754529,
            'longitude' : 2.316082,
            'distance' : 2,
            'altitude' : 113,
            'speed' : 1.2319902181625366,
            'accuracy' : 5,
            'vertAccuracy' : 5,
          },
          {
            'date' : '2015-08-12T17:15:25.997Z',
            'latitude' : 48.754540,
            'longitude' : 2.316083,
            'distance' : 4,
            'altitude' : 114,
            'speed' : 1.2432618141174316,
            'accuracy' : 5,
            'vertAccuracy' : 5,
          },
        ]
      },
      'vendor' : 'RunBikeHike'
    };
    var id = '';
    it('should return 201 when adding a new gps_track', function (done) {
      request(server)
        .post('/data/gps_tracks')
        .send(gps_track)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.keys('id');
          id = res.body.id;
          done();
        });
    });
    it('should return 200 when getting a specific gps_track', function (done) {
    request(server)
      .get('/data/gps_tracks/' + id)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        gps_track = res.body;
        res.body.should.keys('_id');
        res.body._id.should.equal(id);
        done();
      });
    });
    it('should return 200 when upadting a specific gps_track', function (done) {
      gps_track.metadata.name = 'new testing track mane';
      request(server)
        .put('/data/gps_tracks/' + id)
        .send(gps_track)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.ok.should.be.true();
          done();
        });
    });
    it('should return 200 when deleting a specific gps_track', function (done) {
      request(server)
        .delete('/data/gps_tracks/' + id)
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








  describe('Server rbh_messages routing', function () {
    var message = {
    'date' : '2015-08-12T17:55:25.997Z',
    'message' : 'Bienvenue dans RBH',
    'vendor' : 'RunBikeHike'
   };
  var id = '';
    it('should return 200 when getting all rbh_messages', function (done) {
      request(server)
        .get('/data/rbh_messages')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should return 201 when adding a new message', function (done) {
      request(server)
        .post('/data/rbh_messages')
        .send(message)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.keys('id');
          id = res.body.id;
          done();
        });
    });
    it('should return 200 when getting a specific message', function (done) {
    request(server)
      .get('/data/rbh_messages/' + id)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        message = res.body;
        res.body.should.keys('_id');
        res.body._id.should.equal(id);
        done();
      });
    });
    it('should return 200 when upadting a specific message', function (done) {
      message.message = 'nouveau';
      request(server)
        .put('/data/rbh_messages/' + id)
        .send(message)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.ok.should.be.true();
          done();
        });
    });
    it('should return 200 when deleting a specific message', function (done) {
      request(server)
        .delete('/data/rbh_messages/' + id)
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








  describe('Server calories routing', function () {
    var calories = {
      'date'          : '2015-08-12T17:15:25.997Z',
      'time_interval' : {
          'start_date' : '2015-08-12T17:15:25.997Z',
          'end_date'   : '2015-08-12T17:55:25.997Z',
       },
      'calories'      : 1345,
      'activity_name' : 'running',
      'session_id'    : '5E346157-91C1-398F-856E-83758F79AC7E',
      'vendor'        : 'RunBikeHike'
    };
    var id = '';
    it('should return 200 when getting all calories', function (done) {
      request(server)
        .get('/data/calories')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          done();
        });
    });
    it('should return 201 when adding a new calories value', function (done) {
      request(server)
        .post('/data/calories')
        .send(calories)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(201)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.body.should.keys('id');
          id = res.body.id;
          done();
        });
    });
    it('should return 200 when getting a specific calories value', function (done) {
    request(server)
      .get('/data/calories/' + id)
      .expect(200)
      .end(function (err, res) {
        if (err) {
          throw err;
        }
        calories = res.body;
        res.body.should.keys('_id');
        res.body._id.should.equal(id);
        done();
      });
    });
    it('should return 200 when upadting a specific calories value', function (done) {
      calories.calories = 9876;
      request(server)
        .put('/data/calories/' + id)
        .send(calories)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            throw err;
          }
          res.ok.should.be.true();
          done();
        });
    });
    it('should return 200 when deleting a calories value', function (done) {
      request(server)
        .delete('/data/calories/' + id)
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
