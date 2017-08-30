/* jshint browser: true */
/* globals Backbone, microtemplate, utils */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Session = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  events: {
    'click #session-1-delete' : 'showModal'
  },

  dom: {
    basics    : document.getElementById('session-details-basics'),
    altitude  : document.getElementById('session-details-altitude'),
    distance  : document.getElementById('session-details-distance'),
    map       : document.getElementById('session-details-map')
  },

  initialize: function(/*params*/) {
    // this.subviews = params.views;
    console.log('SessionView initialized', this);
  },

  render: function () {
    if (this.model.get('gps_track').available) {
      var that = this;
      RBH.Collections.GPSTracks.fetch({
        'id': that.model.get('gps_track').cid,
        'success': function (model, response) {
          console.log('got gps track', model, response);
          that.gps_model = response;
        },
        'error': function (model, response) {
          console.log('error', model, response);
        }
      });
    }
    this.views = RBH.Factory.getDetailsSessionView(this.model, this.gps_model);

    if (this.views.altitude) {
      this.el.appendChild(document.createElement('div').innerHTML = this.views.altitude.render().el);
    }
    if (this.views.distance) {
      this.dom.basics.appendChild(document.createElement('div').innerHTML = this.views.distance.renderSummary().el);
    }

    /*var AltitudeSubview = false;
    var DistanceSubview = false;
    var MapSubview = false;*/


  },

  showModal: function () {
    console.log('showModal');
    new RBH.Views.Modal({model: this.model});
  },

  deleteSession: function (el) {
    var session = el.target.getAttribute('session_id');
    this.model.destroy({
      success: function (model, response) {
        console.log('deleteSession - success', model, response);
        RBH.Collections.Sessions.trigger('removed');
      },
      error: function (model, error) {
        console.log('deleteSession - error', model, error);
      }
    });
  },

  // render: function() {
  //   var user_unit = Preferences.get('unit');
  //
  //   document.getElementById('details-session-date').innerHTML = utils.Helpers.formatDate(this.model.get('date'));
  //
  //   document.getElementById('details-session-start-time').innerHTML = utils.Helpers.formatTime(this.model.get('date'));
  //
  //   var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
  //   document.getElementById('details-session-duration').innerHTML = duration.hour + ':' + duration.min + ':' + duration.sec;
  //
  //   document.getElementById('details-session-calories').innerHTML = this.model.get('calories');
  //
  //   if (this.subviews.distance) {
  //     console.log('this.subviews.distance', this.subviews.distance);
  //     document.getElementById('details-session-distance').appendChild(this.subviews.distance.el);
  //   }
  //   if (this.subviews.altitude){
  //     document.getElementById('details-session-altitude').appendChild(this.subviews.altitude.el);
  //   }
  //   if (this.subviews.map) {
  //     document.getElementById('details-session-map').appendChild(this.subviews.map.el);
  //   }
  //
  //
  // }
});
