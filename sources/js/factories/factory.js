/* globals activities, bodies */
/* exported Factory */
'use strict';

var Factory = (function() {
  var getModel = function(type, activity, options) {
    var Model;
    if (type === 'session') {
      Model = activities[activity].model;
      console.log('FACTORY - get model', Model, options);
    } else if (type === 'body') {
      Model = bodies[activity].model;
    }
    return Model ? new Model(options) : null;
  };
  var getNewView = function(type, model) {
    console.log('FACTORY - display new session view for', model);
    var View;
    if (type === 'session') {
      View = activities[model.get('activity')].new_view;
    } else if (type === 'body') {
      View = bodies[model.get('activity')].new_view;
    }
    return new View({
      model: model
    });
  };
  var getDashboardSummaryView = function(model) {
    // console.log('FACTORY - display dashboard summary view for', model);
    var View = activities[model.get('activity')].summary_view_dashboard;
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
  var getDetailledView = function(type, model) {
    var View;
    if (type === 'session') {
      View = activities[model.get('activity')].detailled_view;
    } else if (type === 'body'){
      View = bodies[model.get('activity')].detailled_view;
    }
    // var View = activities[model.activity].detailled_view;
    // console.log('FACTORY - display detailled view for', model);
    return new View({
      model: model
    });
  };
  var getActivitiesList = function () {
    console.log('activities', activities);
    return activities.list;
  };
  var getBodiesList = function () {
    console.log('bodies', bodies);
    return bodies.list;
  };
  return {
    getModel                : getModel,
    getNewView              : getNewView,
    getDashboardSummaryView : getDashboardSummaryView,
    getSessionsSummaryView  : getSessionsSummaryView,
    getDetailledView        : getDetailledView,
    getActivitiesList       : getActivitiesList,
    getBodiesList           : getBodiesList
  };
})();
