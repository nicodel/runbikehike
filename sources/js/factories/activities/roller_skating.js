'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var views       = views || {};
activities.roller_skating = {
  new_view                : ['import_form', 'distance'],
  summary_view_dashboard  : views.dashboard_summary_1,
  summary_view_sessions   : views.sessions_summary_1,
  detailled_view          : views.detailled_1
};
activities.list.push('roller_skating');
