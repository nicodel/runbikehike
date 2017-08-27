/* jshint browser: true */
/* globals _, Backbone, microtemplate, utils, Session,  GPSTrack */
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
    // console.log('model in import form', this.model);
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
          var model_track = result.res.track;
          var calories = utils.Helpers.calculateCalories(
            RBH.UserGender,
            RBH.UserWeight,
            RBH.UserHeight,
            new Date().getFullYear() - RBH.UserBirthYear,
            model_track.distance,
            model_track.time_interval.duration,
            that.model.get('activity_name')
          );
          model_track.calories = calories;
          that.model.set(model_track);
          that.model.set('gps_track', {
            'available' : true,
            'cid'       : that.gps_track.cid
          });
          that.model.trigger('gps-track-imported', that.gps_track);
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
