/* jshint strict: true, node: true */
'use strict';

var express     = require('express');
var debug       = require('debug')('runbikehike:server');
var logger      = require('morgan');
var path        = require('path');
var bodyParser  = require('body-parser');

var Sessions    = require('./server/sessions');

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


var server = app.listen(port, function () {
  console.log('Server listening to %s:%d within %s environment',
      host, port, app.get('env'));
});

module.exports = server;
