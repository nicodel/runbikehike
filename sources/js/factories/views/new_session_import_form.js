/* jshint browser: true */
/* globals _, Backbone, microtemplate, Preferences, utils, Session,  GPSTrack */
'use strict';

var views = views || {};

views.new_session_import_form = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('new-session-import-form-template').innerHTML),

  session: new Session(),
  gps_track: new GPSTrack(),

  events: {
    'change #import-file'   : 'enableImport',
    'click #import-btn'     : 'importFile',
  },

  initialize: function (params) {

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
          that.gps_track.set(result.res.gps_track);
          console.log('new_1 that.gps_track', that.gps_track);
          that.trigger('gps-track-imported', that.gps_track);

          var track = result.res.track;
          var calories = utils.Helpers.calculateCalories(
              Preferences.get('gender'),
              Preferences.get('weight'),  // TODO retreive latest weight value from the Weight Collection
              Preferences.get('height'),
              new Date().getFullYear() - Preferences.get('birthyear'),
              track.distance,
              track.time_interval.duration,
              that.session.get('activity_name')
          );
          track.calories = calories;
          that.session.set(track);
          console.log('new session imported', that.session);
          that.trigger('session-defined', that.session);
          that.renderImportedData();

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
