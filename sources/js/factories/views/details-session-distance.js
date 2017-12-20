/* jshint browser: true */
/* globals Sessions, ModalView,
 Backbone, microtemplate, Preferences, utils, d3, crossfilter, dc */
'use strict';

var RBH = RBH || {};
RBH.Factory = RBH.Factory || {};
RBH.Factory.Views = RBH.Factory.Views || {};

RBH.Factory.Views.details_session_distance = Backbone.NativeView.extend({
  summary_template: microtemplate(document.getElementById('details-session-distance-template').innerHTML),
  graph_template: microtemplate(document.getElementById('details-session-speed-graph-template').innerHTML),

  initialize: function () {
    this.render();
  },

  renderSummary: function() {
    // var user_unit = Preferences.get('unit');
    var dist = utils.Helpers.distanceMeterToChoice(
        RBH.UserUnit,
        this.model.get('distance'),
        false);
    var speed = utils.Helpers.speedMsToChoice(
        RBH.UserUnit,
        this.model.get('avg_speed'));

    this.el.innerHTML = this.summary_template({
      'distance'  : dist.value + ' ' + dist.unit,
      'avg_speed' : speed.value + ' ' + speed.unit,
    });
    return this;
  },

  renderGraph: function (complete_data, summary_data) {
    console.log('rendering graphs');
    var user_unit = RBH.UserUnit;
    var scale;
    if (user_unit === 'metric') {
      scale = 1000;
    } else {
      scale = 1609;
    }
    // TODO manage small distance unit for Imperial
    var small_unit = utils.Helpers.distanceMeterToChoice('', 0, false).unit;
    var big_unit = utils.Helpers.distanceMeterToChoice(user_unit, 0, false).unit;
    var speed_unit = utils.Helpers.speedMsToChoice(user_unit, 0).unit;

    var geo_table = dc.dataTable('#geo_table');
    var speed_graph = dc.lineChart('#speed_graph');
    var speed_table = dc.dataTable('#speed_table');

    var complete_ndx    = crossfilter(complete_data),
        distDim         = complete_ndx.dimension(function(d) {
          return d.cumulDistance / scale;
        }),
        distMin         = 0,
        distMax         = this.model.get('distance') / scale,
        speedGroup      = distDim.group().reduceSum(function(d) {
          return utils.Helpers.speedMsToChoice(user_unit, d.speed).value;
        });
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
          format  : function(d) {return parseInt(utils.Helpers.distanceMeterToChoice(user_unit, d.distance, false).value, 0);}
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
    speed_graph
      // .width(960).height(200)
      .dimension(distDim)
      .mouseZoomable(false)
      .renderHorizontalGridLines(true)
      .renderVerticalGridLines(true)
      .brushOn(false)
      .group(speedGroup)
      .title(function(d) {
        return 'Distance: ' + d.key.toFixed(2) + ' ' + big_unit + '\n' + 'Speed: ' + d.value + ' ' + speed_unit;
      })
      .x(d3.scale.linear().domain([distMin, distMax]));
    speed_table
      // .width(960)
      .size(summary_data.length)
      .dimension(summary_distDim)
      .group(function() {return '';})
      .columns([
        {
          label   :'Distance (' + big_unit +')',
          format  : function(d) {return parseInt(utils.Helpers.distanceMeterToChoice(user_unit, d.distance, false).value, 0);}
        },
        {
          label   : 'Duration',
          format  : function(d) {
            var duration = utils.Helpers.formatDuration(d.time);
            return duration.hour + ':' + duration.min + ':' + duration.sec;
          }
        },
        {
          label   : 'Speed (' + speed_unit +')',
          format  : function(d) {return d.speed;}
        }
      ]);

    dc.renderAll();
    return this;
  }
});
