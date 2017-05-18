/* jshint browser: true */
/* globals Backbone, microtemplate, utils */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Indicators = Backbone.NativeView.extend({
  el: '#indicators',

  template: microtemplate(document.getElementById('indicators-template').innerHTML),

  initialize: function() {
    this.collection = RBH.Collections.Dashboard;
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'sync', this.render);

    // this.listenTo(RBH.Collections.Preferences, 'change', this.render);
    this.render();
  },

  render: function() {
    // console.log('indicators view is rendered', this);
    var totals = {
      'sessions'  : 0,
      'calories'  : 0,
      'distance'  : 0,
      'duration'  : 0
    };
    // console.log('INDICATORS - this.collection', this.collection);
    if (this.collection.length !== 0) {
      var sessions = this.collection.where({docType: 'sessions'});
      // var sessions = this.collection;
      sessions.forEach(function(item) {
        // console.log('INDICATORS - item', item);
        totals.sessions += 1;
        totals.calories += item.get('calories');
        if (item.get('distance')) {
          totals.distance += item.get('distance');
        }
        totals.duration += item.get('time_interval').duration;
      });
    }
    // console.log('INDICATORS - totals', totals);
    var dist = utils.Helpers.distanceMeterToChoice(
      RBH.UserUnit,
      totals.distance,
      false
    );
    var duration = utils.Helpers.formatDuration(totals.duration);
    this.el.innerHTML = this.template({
      'sessions'  : totals.sessions,
      'calories'  : totals.calories,
      'distance'  : dist.value + ' ' + dist.unit,
      'duration'  : duration.hour + ':' + duration.min + ':' + duration.sec
    });
    return this;
  },
});
