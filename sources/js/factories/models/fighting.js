'use strict';

var models = models || {};

models.fighting = function(options) {
  this.type       = options.type      || 'fighting';
  this.family     = options.family    || 'net';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date().toISOString();
  this.name       = options.name      || '';
  this.duration   = options.duration  || 0;
  this.calories   = options.calories  || 0;
};
