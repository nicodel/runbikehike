'use strict';
var bodies  = bodies || {};
bodies.list = bodies.list || [];
var models  = models || {};
var views   = views || {};
bodies.weight = {
  model                   : models.body,
  new_view                : views.new_2,
  summary_view_dashboard  : views.dashboard_summary_2,
  summary_view_sessions   : views.dashboard_summary_2,
  detailled_view          : views.detailled_2
};
bodies.list.push({
  activity: 'weight'
});
