'use strict';
var body_weight  = body_weight || {};
// body_weight.list = body_weight.list || [];

var models  = models || {};
models.body_weight = function(options) {
  this.type       = options.type      || 'body_weight';
  this.activity   = options.activity  || '';
  this.date       = options.date      || new Date().toISOString();
  this.value      = options.value     || 0;
};

var views   = views || {};
body_weight = {
  model                   : models.body_weight,
  new_view                : views.new_2,
  summary_view_dashboard  : views.dashboard_summary_2,
  summary_view_sessions   : views.dashboard_summary_2,
  detailled_view          : views.detailled_2
};
// body_weight.list.push({
//   activity: 'weight'
// });
