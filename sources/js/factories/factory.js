/* globals views, activities, body_weight, messages */
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
  var getSessionNewView = function (model) {
    // console.log('FACTORY - getSessionNewView model', model);
    var name = model.get('activity_name');
    var subviews = activities[name].new_view;
    console.log('subviews', subviews);
    var ImportFormSubview = false;
    var AltitudeSubview = false;
    var DistanceSubview = false;
    // console.log('views', views);
    if (subviews.includes('import_form')) {
      ImportFormSubview = new views.new_session_import_form({
        'model': model
      });
    }
    if (subviews.includes('altitude')  ) {
      AltitudeSubview = new views.new_session_altitude({
        'model': model
      });
    }
    if (subviews.includes('distance')) {
      DistanceSubview = new views.new_session_distance({
        'model': model
      });
    }
    return {
      'basics' :new views.new_session({'model' : model}),
      'import_form' : ImportFormSubview,
      'altitude'    : AltitudeSubview,
      'distance'    : DistanceSubview
    };
  };
  /*var getNewView = function(type, model) {
    // console.log('FACTORY - getNewView model', model);
    var View;
    var activity_name = model.get('activity_name');
    if (type === 'session') {
      View = activities[activity_name].new_view;
    } else if (type === 'body') {
      View = body_weight[activity_name].new_view;
    } else if (type === 'message') {
      View = messages[activity_name].new_view;
    }
    return new View({
      'model'     : model
    });
  };*/

  var getDashboardSessionViews = function (model) {
    var View;
    var DistanceSubview = false;
    var activity_name = model.get('activity_name');
    var subviews = activities[activity_name].new_view;
    if (subviews.includes('distance')) {
      DistanceSubview = new views.dashboard_session_distance({
        'model': model
      });
    }
    return {
      'basics'    : new views.dashboard_session_basics({'model': model}),
      'distance'  : DistanceSubview
    };
  };

  var getDashboardMessageView = function (model) {
    var View = messages[model.get('activity')].summary_view_dashboard;
    return new View({
      model: model
    });
  };

  var getDashboardSummaryView = function(model) {
    console.log('FACTORY - display dashboard summary view for', model);
    var View;
    var DistanceSubview = false;
    var activity_name = model.get('activity_name');
    var subviews = activities[activity_name].new_view;
    if (subviews.includes('distance')) {
      DistanceSubview = new views.dashboard_session_distance({
        'model': model
      });
    }
    if (model.get('weight')) {
      View = body_weight.summary_view_dashboard;
    } else {
      var type = model.get('docType');
      if (type === 'sessions') {
        View = activities[activity_name].summary_view_dashboard;
      /*} else if (type === 'body_weight') {
        View = body_weight.summary_view_dashboard;*/
      } else if (type === 'messages') {
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

  var getDetailsSessionView = function (model) {
    var name = model.get('activity_name');
    var subviews = activities[name].new_view;
    var AltitudeSubview = false;
    var DistanceSubview = false;
    var MapSubview = false;
    // console.log('views', views);
    if (subviews.includes('altitude')  ) {
      AltitudeSubview = new views.details_session_altitude({
        'model': model
      });
    }
    if (subviews.includes('distance')) {
      DistanceSubview = new views.details_session_distance({
        'model': model
      });
    }
    if (subviews.includes('import_form')) {
      MapSubview = new views.details_session_map({
        'model' : model
      });
    }
    return {
      'altitude'  : AltitudeSubview,
      'distance'  : DistanceSubview,
      'map'       : MapSubview
    };
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
    getSessionNewView       : getSessionNewView,
    // getNewView              : getNewView,
    getDashboardSessionViews  : getDashboardSessionViews,
    getDashboardMessageView   : getDashboardMessageView,
    getDashboardSummaryView : getDashboardSummaryView,
    getSessionsSummaryView  : getSessionsSummaryView,
    getWeightView           : getWeightView,
    //getDetailledView        : getDetailledView,
    getDetailsSessionView   : getDetailsSessionView,
    getActivitiesList       : getActivitiesList,
    getBodiesList           : getBodiesList
  };
})();
