/* globals activities, body_weight, messages */
/* exported Factory */
'use strict';

var Factory = (function() {
  var getModel = function(type, activity, options) {
    var Model;
    if (type === 'session') {
      Model = activities[activity].model;
      // console.log('FACTORY - get model', Model, options);
    } else if (type === 'body') {
      Model = body_weight[activity].model;
    } else if (type === 'message') {
      Model = messages[activity].model;
    }
    return Model ? new Model(options) : null;
  };
  var getNewView = function(type, model) {
    // console.log('FACTORY - display new session view for', model);
    var View;
    if (type === 'session') {
      View = activities[model.get('activity')].new_view;
    } else if (type === 'body') {
      View = body_weight[model.get('activity')].new_view;
    } else if (type === 'message') {
      View = messages[model.get('activity')].new_view;
    }
    return new View({
      model: model
    });
  };
  var getDashboardSummaryView = function(model) {
    // console.log('FACTORY - display dashboard summary view for', model);
    var View;
    if (model.get('weight')) {
      View = body_weight.summary_view_dashboard;
    } else {
      var type = model.get('type');
      if (type === 'session') {
        View = activities[model.get('activity')].summary_view_dashboard;
      } else if (type === 'body_weight') {
        View = body_weight.summary_view_dashboard;
      } else if (type === 'message') {
        View = messages[model.get('activity')].summary_view_dashboard;
      }
    }
    // console.log('View', View);
    return new View({
      model: model
    });
  };
  var getSessionsSummaryView = function(model) {
    var View = activities[model.get('activity')].summary_view_sessions;
    // console.log('FACTORY - display sessions summary view for', model);
    return new View({
      model: model
    });
  };
  var getWeightView = function(model) {
    var View = body_weight.detailled_view;
    console.log('body_weight', body_weight);
    return new View ({
      model:  model
    });
  };
  var getDetailledView = function(type, model) {
    var View;
    if (type === 'session') {
      View = activities[model.get('activity')].detailled_view;
    } else if (type === 'message'){
      View = messages[model.get('activity')].detailled_view;
    }
    return new View({
      model: model
    });
  };
  var getActivitiesList = function () {
    // console.log('activities', activities);
    return activities.list;
  };
  var getBodiesList = function () {
    // console.log('body_weight', body_weight);
    return body_weight.list;
  };
  return {
    getModel                : getModel,
    getNewView              : getNewView,
    getDashboardSummaryView : getDashboardSummaryView,
    getSessionsSummaryView  : getSessionsSummaryView,
    getWeightView           : getWeightView,
    getDetailledView        : getDetailledView,
    getActivitiesList       : getActivitiesList,
    getBodiesList           : getBodiesList
  };
})();
