'use strict';
var activities  = activities || {};
activities.list = activities.list || [];
var views       = views || {};
activities.swimming = {
  new_view                : ['import_form', 'distance'],
  summary_view_dashboard  : views.dashboard_summary_1,
  summary_view_sessions   : views.sessions_summary_1,
  detailled_view          : views.detailled_1
};
activities.list.push('swimming');
