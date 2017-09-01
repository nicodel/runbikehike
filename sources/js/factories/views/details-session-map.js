/* jshint browser: true */
/* globals Backbone, microtemplate, Preferences, utils, d3, crossfilter, dc */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.details_session_map = Backbone.NativeView.extend({
  template: microtemplate(document.getElementById('details-session-map-template').innerHTML),

  initialize: function () {
    this.render();
  },

  render: function() {
    console.log('render details_session_map', this.model.get('data'));
    var data = this.model.get('data');
    if (data.length !== 0) {
      if (!!window.SharedWorker) {
        var that = this;
        var dataWorker = new SharedWorker('js/workers/data_compute.js');
        console.log('dataWorker', dataWorker);
        dataWorker.port.postMessage([data, RBH.UserUnit]);
        dataWorker.port.onmessage = function(e) {
          console.log('data have been computed', e.data);
          that.renderGraphs(e.data[0], e.data[1]);
          that.renderMap();
        };
        console.log('dataWorker.port', dataWorker.port);
      }
    }
  },

  renderMap: function() {
    console.log('rendering map');
    var map = this.model.get('map');
    var data = this.model.get('data');
    console.log('detail data', data[0][100]);
    if (map !== false) {
      utils.Map.initialize('session-map');
      utils.Map.getMap(data);
    }
  },

  renderGraphs: function(complete_data, summary_data) {
    console.log('rendering map graphs');
    var scale;
    if (RBH.UserUnit === 'metric') {
      scale = 1000;
    } else {
      scale = 1609;
    }
    // TODO manage small distance unit for Imperial
    var big_unit = utils.Helpers.distanceMeterToChoice(RBH.UserUnit, 0, false).unit;

    var geo_table = dc.dataTable('#geo_table');

    var summary_ndx     = crossfilter(summary_data),
        summary_distDim = summary_ndx.dimension(function(d) {
          return d.distance;
        });

    geo_table
      // .width(960)
      .size(summary_data.length)
      .dimension(summary_distDim)
      .group(function() {return '';})
      .columns([
        {
          label   :'Distance (' + big_unit +')',
          format  : function(d) {return parseInt(utils.Helpers.distanceMeterToChoice(RBH.UserUnit, d.distance, false).value, 0);}
        },
        {
          label   : 'Duration',
          format  : function(d) {
            var duration = utils.Helpers.formatDuration(d.time);
            return duration.hour + ':' + duration.min + ':' + duration.sec;
          }
        },
        {
          label   : 'Latitude',
          format  : function(d) {return d.latitude;}
        },
        {
          label   : 'Longitude',
          format  : function(d) {return d.longitude;}
        }
      ]);


    dc.renderAll();
    return this;
  }
});
