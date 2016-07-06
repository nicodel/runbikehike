'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var models      = models || {};
var views       = views || {};
activities.sparring = {
  model                   : models.fighting,
  new_view                : views.new_4,
  summary_view_dashboard  : views.dashboard_summary_3,
  summary_view_sessions   : views.sessions_summary_3,
  detailled_view          : views.detailled_3
};
activities.list.push({
  activity: 'sparring',
  family:   'fighting'
});
