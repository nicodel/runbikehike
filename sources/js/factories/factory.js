/* globals views, activities, body_weight, messages */
'use strict';
var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};

RBH.Factory = (function() {

  var getSessionNewView = function (model) {
    var name = model.get('activity_name');
    var subviews = RBH.Factory.Activities[name].new_view;
    var ImportFormSubview = false;
    var AltitudeSubview = false;
    var DistanceSubview = false;

    if (subviews.includes('import_form')) {
      ImportFormSubview = new RBH.Factory.Views.new_session_import_form({
        'model': model
      });
    }
    if (subviews.includes('altitude')  ) {
      AltitudeSubview = new RBH.Factory.Views.new_session_altitude({
        'model': model
      });
    }
    if (subviews.includes('distance')) {
      DistanceSubview = new RBH.Factory.Views.new_session_distance({
        'model': model
      });
    }
    return {
      'basics'      : new RBH.Factory.Views.new_session({'model' : model}),
      'import_form' : ImportFormSubview,
      'altitude'    : AltitudeSubview,
      'distance'    : DistanceSubview
    };
  };

  var getDashboardSessionViews = function (model) {
    var View;
    var DistanceSubview = false;
    var activity_name = model.get('activity_name');
    var subviews = RBH.Factory.Activities[activity_name].new_view;

    if (subviews.includes('distance')) {
      DistanceSubview = new RBH.Factory.Views.dashboard_session_distance({
        'model': model
      });
    }
    return {
      'basics'    : new RBH.Factory.Views.dashboard_session_basics({
                      'model': model
                    }),
      'distance'  : DistanceSubview
    };
  };

  var getDashboardMessageView = function (model) {
    var View = RBH.Factory.Messages[model.get('type')].summary_view_dashboard;
    return new View({
      model: model
    });
  };

  /*var getDashboardSummaryView = function(model) {
    console.log('FACTORY - display dashboard summary view for', model);
    var View;
    var DistanceSubview = false;
    var activity_name = model.get('activity_name');
    var subviews = RBH.Factory.Activities[activity_name].new_view;
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
        View = RBH.Factory.Activities[activity_name].summary_view_dashboard;
      //} else if (type === 'body_weight') {
      //  View = body_weight.summary_view_dashboard;
      } else if (type === 'messages') {
        View = messages[model.get('activity')].summary_view_dashboard;
      }
    }
    // console.log('View', View);
    return new View({
      model: model
    });
  };*/
  var getSessionsSummaryView = function(model) {
    var View = RBH.Factory.Activities[model.get('activity')].summary_view_sessions;
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
    var subviews = RBH.Factory.Activities[name].new_view;
    var AltitudeSubview = false;
    var DistanceSubview = false;
    var MapSubview = false;
    // console.log('views', views);
    if (subviews.includes('altitude')  ) {
      AltitudeSubview = new RBH.Factory.Views.details_session_altitude({
        'model': model
      });
    }
    if (subviews.includes('distance')) {
      DistanceSubview = new RBH.Factory.Views.details_session_distance({
        'model': model
      });
    }
    if (subviews.includes('import_form')) {
      MapSubview = new RBH.Factory.Views.details_session_map({
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
      View = RBH.Factory.Activities[model.get('activity')].detailled_view;
    } else if (type === 'message'){
      View = messages[model.get('activity')].detailled_view;
    }
    return new View({
      model: model
    });
  };
  var getActivitiesList = function () {
    // console.log('activities', activities);
    return RBH.Factory.Activities.list;
  };
  var getBodiesList = function () {
    // console.log('body_weight', body_weight);
    return body_weight.list;
  };
  return {
    // getModel                : getModel,
    getSessionNewView       : getSessionNewView,
    // getNewView              : getNewView,
    getDashboardSessionViews  : getDashboardSessionViews,
    getDashboardMessageView   : getDashboardMessageView,
    // getDashboardSummaryView : getDashboardSummaryView,
    getSessionsSummaryView  : getSessionsSummaryView,
    getWeightView           : getWeightView,
    // getDetailledView        : getDetailledView,
    getDetailsSessionView   : getDetailsSessionView,
    getActivitiesList       : getActivitiesList,
    getBodiesList           : getBodiesList,
    Views                   : RBH.Factory.Views,
    Activities              : RBH.Factory.Activities
  };
})();
