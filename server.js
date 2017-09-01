/* jshint strict: true, node: true */
'use strict';

var express     = require('express');
var debug       = require('debug')('runbikehike:server');
var logger      = require('morgan');
var path        = require('path');
var bodyParser  = require('body-parser');

var Sessions    = require('./server/sessions');
var BodyWeight  = require('./server/body_weight');
var GpsTracks   = require('./server/gps_tracks');
var RbhMessages = require('./server/rbh_messages');
var Calories    = require('./server/calories');

var env   = process.env.NODE_ENV  || 'production';
var port  = process.env.PORT      || 9250;
var host  = process.env.HOST      || "127.0.0.1";
var dir   = 'public';

var app = express();

if (env === 'development') {
  //app.use(logger('dev'));
  dir = 'sources';
}

app.use(express.static(path.join(__dirname, dir)));
app.use(bodyParser.json({limit: '5mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.sendStatus(200);
});

app.get('/data/sessions', Sessions.getAll);
app.post('/data/sessions', Sessions.add);
app.get('/data/sessions/:id', Sessions.getOne);
app.put('/data/sessions/:id', Sessions.update);
app.delete('/data/sessions/:id', Sessions.remove);

app.get('/data/body_weight', BodyWeight.getAll);
app.post('/data/body_weight', BodyWeight.add);
app.get('/data/body_weight/:id', BodyWeight.getOne);
app.put('/data/body_weight/:id', BodyWeight.update);
app.delete('/data/body_weight/:id', BodyWeight.remove);

app.get('/data/gps_tracks', GpsTracks.getAll);
app.post('/data/gps_tracks', GpsTracks.add);
app.get('/data/gps_tracks/:id', GpsTracks.getOne);
app.put('/data/gps_tracks/:id', GpsTracks.update);
app.delete('/data/gps_tracks/:id', GpsTracks.remove);

app.get('/data/rbh_messages', RbhMessages.getAll);
app.post('/data/rbh_messages', RbhMessages.add);
app.get('/data/rbh_messages/:id', RbhMessages.getOne);
app.put('/data/rbh_messages/:id', RbhMessages.update);
app.delete('/data/rbh_messages/:id', RbhMessages.remove);

app.get('/data/calories', Calories.getAll);
app.post('/data/calories', Calories.add);
app.get('/data/calories/:id', Calories.getOne);
app.put('/data/calories/:id', Calories.update);
app.delete('/data/calories/:id', Calories.remove);

var server = app.listen(port, function () {
  console.log('Server listening to %s:%d within %s environment',
      host, port, app.get('env'));
});

module.exports = server;
