'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var views       = views || {};
activities.frisbee = {
  new_view                : [],
  summary_view_dashboard  : views.dashboard_summary_3,
  summary_view_sessions   : views.sessions_summary_3,
  detailled_view          : views.detailled_3
};
activities.list.push('frisbee');
