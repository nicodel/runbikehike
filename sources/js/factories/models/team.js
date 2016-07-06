'use strict';

var models = models || {};

models.team = function(options) {
  this.type       = options.type      || 'session';
  this.family     = options.family    || 'team';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date().toISOString();
  this.name       = options.name      || '';
  this.duration   = options.duration  || 0;
  this.calories   = options.calories  || 0;
};
