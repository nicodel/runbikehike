/* jshint browser: true */
/* globals Sessions, ModalView,
 Backbone, microtemplate, Preferences, utils, d3, crossfilter, dc
*/
'use strict';

var Session = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  events: {
    'click #session-1-delete' : 'showModal'
  },

  initialize: function(params) {
    this.subviews = params.views;
    console.log('SessionView initialized', this);
  },

  showModal: function () {
    console.log('showModal');
    new ModalView({model: this.model});
  },

  deleteSession: function (el) {
    var session = el.target.getAttribute('session_id');
    this.model.destroy({
      success: function (model, response) {
        console.log('deleteSession - success', model, response);
        Sessions.trigger('removed');
      },
      error: function (model, error) {
        console.log('deleteSession - error', model, error);
      }
    });
  },

  render: function() {
    var user_unit = Preferences.get('unit');

    document.getElementById('details-session-date').innerHTML = utils.Helpers.formatDate(this.model.get('date'));

    document.getElementById('details-session-start-time').innerHTML = utils.Helpers.formatTime(this.model.get('date'));

    var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    document.getElementById('details-session-duration').innerHTML = duration.hour + ':' + duration.min + ':' + duration.sec;

    document.getElementById('details-session-calories').innerHTML = this.model.get('calories');

    if (this.subviews.distance) {
      console.log('this.subviews.distance', this.subviews.distance);
      document.getElementById('details-session-distance').appendChild(this.subviews.distance.el);
    }
    if (this.subviews.altitude){
      document.getElementById('details-session-altitude').appendChild(this.subviews.altitude.el);
    }
    if (this.subviews.map) {
      document.getElementById('details-session-map').appendChild(this.subviews.map.el);
    }


  }
});
