'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var models      = models || {};
var views       = views || {};
activities.roller_skating = {
  model                   : models.sliding,
  new_view                : views.new_1,
  summary_view_dashboard  : views.dashboard_summary_1,
  summary_view_sessions   : views.sessions_summary_1,
  detailled_view          : views.detailled_1
};
activities.list.push({
  activity: 'roller_skating',
  family:   'sliding'
});
