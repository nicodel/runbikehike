'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var views       = views || {};
activities.running = {
  // new_view                : views.new_1,
  new_view                : ['import_form', 'altitude', 'distance'],
  summary_view_dashboard  : views.dashboard_summary_1,
  summary_view_sessions   : views.sessions_summary_1,
  detailled_view          : views.detailled_1
};
activities.list.push('running');
