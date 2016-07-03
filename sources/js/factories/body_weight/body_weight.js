'use strict';
var body_weight  = body_weight || {};
body_weight.list = body_weight.list || [];
var models  = models || {};
var views   = views || {};
body_weight.weight = {
  model                   : models.body,
  new_view                : views.new_2,
  summary_view_dashboard  : views.dashboard_summary_2,
  summary_view_sessions   : views.dashboard_summary_2,
  detailled_view          : views.detailled_2
};
body_weight.list.push({
  activity: 'weight'
});
