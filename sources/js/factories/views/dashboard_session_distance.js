/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.dashboard_session_distance = Backbone.NativeView.extend({
  tagName : 'li',
  template: microtemplate(document.getElementById('dashboard-session-distance-template').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    // this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    // console.log('DASHBOARD SESSION DISTANCE - this.model', this.model);
    var duration = utils.Helpers.formatDuration(this.model.get('time_interval').duration);
    var activity = this.model.get('activity_name');
    var dist = utils.Helpers.distanceMeterToChoice(
        RBH.UserUnit,
        this.model.get('distance'), false);
    var speed = utils.Helpers.speedMsToChoice(
        RBH.UserUnit,
        this.model.get('avg_speed'));
    this.el.innerHTML = this.template({
      'session_cid' : this.model.cid,
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'activity'    : activity,
      'icon_path'   : 'img/activities/' + activity + '.png',
      'distance'    : dist.value + ' ' + dist.unit,
      'avg_speed'   : speed.value + ' ' + speed.unit,
    });
    return this;
  }
});
