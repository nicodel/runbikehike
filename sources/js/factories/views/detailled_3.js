/* jshint browser: true */
/* globals Sessions, Backbone, microtemplate, Preferences, utils
*/
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.detailled_3  = Backbone.NativeView.extend({
  el: '#session-view',

  session_id: '',

  template: microtemplate(document.getElementById('session-details-template-2').innerHTML),
  events: {
    'click #session-3-delete' : 'deleteSession'
  },

  initialize: function() {
    // console.log('SessionView initialized', this);
    this.render();
  },

  render: function() {
    var user_unit = Preferences.get('unit');
    var dist = utils.Helpers.distanceMeterToChoice(
        user_unit,
        this.model.get('distance'),
        false);
    var speed = utils.Helpers.speedMsToChoice(
        user_unit,
        this.model.get('avg_speed'));
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));

    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'time'        : utils.Helpers.formatTime(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'distance'    : dist.value + ' ' + dist.unit,
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'avg_speed'   : speed.value + ' ' + speed.unit,
      'activity'    : this.model.get('activity')
    });
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
  }
});
