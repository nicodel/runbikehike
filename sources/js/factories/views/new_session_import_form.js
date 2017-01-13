/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session,  GPSTrack */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.new_session_import_form = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-import-form-template').innerHTML),

  gps_track: new RBH.Models.GPSTrack(),

  events: {
    'change #import-file'   : 'enableImport',
    'click #import-btn'     : 'importFile',
  },

  initialize: function (params) {
    this.model = params.model;
  },

  render: function () {
    this.el.innerHTML = this.template({
      'lb_import_file': _('import-gpx-file'),
      'lb_import'     : _('import'),
    });
    return this;
  },

  importFile: function() {
    var reader = new FileReader();
    var that = this;
    reader.onloadend = function() {
      var p = new DOMParser();
      utils.GPX.importFile(p.parseFromString(reader.result, 'text/xml'), function(result) {
        if (result.error) {
          // TODO create a modal view for error or information display
          console.log('error while importing', result.res);
        } else {
          console.log('result.res.gps_track', result.res.gps_track);
          that.gps_track.set(result.res.gps_track);
          console.log('new_1 that.gps_track', that.gps_track);
          that.model.trigger('gps-track-imported', that.gps_track);

          var track = result.res.track;
          var calories = utils.Helpers.calculateCalories(
              Preferences.get('gender'),
              Preferences.get('weight'),  // TODO retreive latest weight value from the Weight Collection
              Preferences.get('height'),
              new Date().getFullYear() - Preferences.get('birthyear'),
              track.distance,
              track.time_interval.duration,
              that.model.get('activity_name')
          );
          track.calories = calories;
          that.model.set(track);
          console.log('new session imported', that.model);
          // that.trigger('session-defined', that.model);
          that.model.trigger('data-imported');
        }
      });
    };
    reader.readAsText(document.getElementById('import-file').files[0]);
  },

  enableImport: function() {
    var file_list = document.getElementById('import-file').files;
    if (file_list.length > 0) {
      document.getElementById('import-btn').removeAttribute('disabled');
    } else {
      document.getElementById('import-btn').setAttribute('disabled', 'disabled');
    }
  }
});
