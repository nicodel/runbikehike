/* jshint browser: true */
/* global Backbone, microtemplate, Preferences, utils */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.sessions_summary_1 = Backbone.NativeView.extend({
  tagName: 'li',

  template: microtemplate(document.getElementById('session-summary-template-1').innerHTML),

  initialize: function() {
    this.listenTo(this.model, 'change', this.render);
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(Preferences, 'change', this.render);
  },

  extend: Backbone.Events,

  render: function() {
    var dist = utils.Helpers.distanceMeterToChoice(
        Preferences.get('unit'),
        this.model.get('distance'), false);
    var speed = utils.Helpers.speedMsToChoice(
        Preferences.get('unit'),
        this.model.get('avg_speed'));
    var duration = utils.Helpers.formatDuration(this.model.get('duration'));
    var activity = this.model.get('activity');
    this.el.innerHTML = this.template({
      'session_cid' : this.model.get('session_cid'),
      'collection'  : this.model.get('collection'),
      'date'        : utils.Helpers.formatDate(this.model.get('date')),
      'calories'    : this.model.get('calories'),
      'distance'    : dist.value + ' ' + dist.unit,
      'duration'    : duration.hour + ':' + duration.min + ':' + duration.sec,
      'avg_speed'   : speed.value + ' ' + speed.unit,
      'activity'    : activity,
      'icon_path'   : 'img/' + this.model.get('type') + '/' + this.model.get('family') + '/' + activity + '.png'
    });
    return this;
  }
});
