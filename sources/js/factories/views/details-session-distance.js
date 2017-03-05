/* jshint browser: true */
/* globals Sessions, ModalView,
 Backbone, microtemplate, Preferences, utils */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.details_session_distance = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('details-session-distance-template').innerHTML),

  initialize: function () {
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

    this.el.innerHTML = this.template({
      'distance'  : dist.value + ' ' + dist.unit,
      'avg_speed' : speed.value + ' ' + speed.unit,
    });
  }
});
