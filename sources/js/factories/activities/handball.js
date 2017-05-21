'use strict';
var RBH                     = RBH || {};
RBH.Factory                 = RBH.Factory || {};
RBH.Factory.Activities      = RBH.Factory.Activities || {};
RBH.Factory.Activities.list = RBH.Factory.Activities.list || [];
var views                   = views || {};

RBH.Factory.Activities.handball = {
  new_view                : [],
  summary_view_dashboard  : views.dashboard_summary_3,
  summary_view_sessions   : views.sessions_summary_3,
  detailled_view          : views.detailled_3
};
RBH.Factory.Activities.list.push('handball');
