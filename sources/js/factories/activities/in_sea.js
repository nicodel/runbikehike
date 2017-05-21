'use strict';
var RBH                     = RBH || {};
RBH.Factory                 = RBH.Factory || {};
RBH.Factory.Activities      = RBH.Factory.Activities || {};
RBH.Factory.Activities.list = RBH.Factory.Activities.list || [];
var views                   = views || {};

RBH.Factory.Activities.in_sea = {
  new_view                : ['import_form'],
  summary_view_dashboard  : views.dashboard_summary_1,
  summary_view_sessions   : views.sessions_summary_1,
  detailled_view          : views.detailled_1
};
RBH.Factory.Activities.list.push('in_sea');
