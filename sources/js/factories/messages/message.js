'use strict';
var messages  = messages || {};
var models      = models || {};
var views       = views || {};
messages.message = {
  model                   : models.message,
  summary_view_dashboard  : views.dashboard_message,
  detailled_view          : views.detailled_message
};
