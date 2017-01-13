'use strict';
var body_weight  = body_weight || {};

var models  = models || {};
models.body_weight = function(options) {
  this.date   = options.date    || new Date();
  this.weight = options.weight  || 0;
  this.vendor = options.vendor  || 'RunBikeHike';
};

var views   = views || {};
body_weight = {
  model                   : models.body_weight,
  new_view                : views.new_2,
  summary_view_dashboard  : views.dashboard_summary_2,
  summary_view_sessions   : views.dashboard_summary_2,
  detailled_view          : views.detailled_2
};
