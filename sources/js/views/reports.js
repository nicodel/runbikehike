/* jshint browser: true */
/* globals Backbone, d3, crossfilter, dc */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.Reports = Backbone.NativeView.extend({
  el: '#reports-view',

  weightChart : dc.lineChart('#reports-weight-graph'),
  caloriesChart : dc.barChart('#reports-calories-graph'),
  // distanceChart : dc.barChart('#reports-distance-graph'),
  // durationChart : dc.barChart('#reports-duration-graph'),


  initialize: function() {
    this.collection = RBH.Collections.Dashboard;

    // this.listenTo(this.collection, 'sync', this.render);
    // this.listenTo(this.collection, 'reset', this.render);

    this.listenTo(RBH.Collections.BodyWeights, 'sync', this.render);

    var that = this;
    document.getElementById('reports-select-date').addEventListener('change', function(el) {
      console.log('select changed', el.target.value);
      var today = new Date();
      // console.log('today', today);
      var first = new Date();
      first.setDate(1);
      // as default it is set to the first day of next month.
      // TODO: find a way to get the last day of current month.
      var last = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      if (el.target.value === 'current-year') {
        first.setMonth(0);
        last.setMonth(11);
        last.setDate(31);
      } else if (el.target.value === 'last-12-months') {
        first.setMonth(today.getMonth() - 12);
      } else if (el.target.value === 'last-6-months') {
        first.setMonth(today.getMonth() - 6);
      } else if (el.target.value === 'last-3-months') {
        first.setMonth(today.getMonth() - 3);
      } else if (el.target.value === 'current-month') {
        first.setMonth(today.getMonth() - 1);
      } else if (el.target.value === 'current-week') {
        first = new Date();
        last = new Date();
        first.setDate(today.getDate() - today.getDay() + 1);
        first.setHours(0);
        last.setDate(today.getDate() + 7 - today.getDay());
        last.setHours(23);
      }
      console.log('first - last', first, last);
      that.weightChart.focus([first, last]);
      that.caloriesChart.focus([first, last]);
      //that.distanceChart.focus([first, last]);
      //that.durationChart.focus([first, last]);
    });
  },

  render: function() {
    var user_unit = RBH.Models.Preferences.get('unit');

    var red   = '#FF0000';
    var blue  = '#0000FF';
    var green = '#008000';

    var dateFormat    = d3.time.format.iso;

    var act_data = [];
    var weight_data = [];
    var item;
    RBH.Collections.BodyWeights.forEach(function(model) {
      item = model.attributes;
      item.formateddate = dateFormat.parse(item.date);
      item.day = d3.time.day(item.formateddate);
      weight_data.push(item);
    });

    /*console.log('this.collection', this.collection);
    this.collection.forEach(function(model) {
      item = model.attributes;
      console.log('item', item);
      item.formateddate = dateFormat.parse(item.date);
      item.month = d3.time.month(item.formateddate);
      if (item.activity === 'weight') {
        weight_data.push(item);
      } else {
        act_data.push(item);
      }
    });*/
    console.log('weight_data', weight_data);
    var ndx_weight      = crossfilter(weight_data);
    var date_weight_dim = ndx_weight.dimension(function(d) {
      return d.day;
    });

    var weightGroup     = date_weight_dim.group().reduceSum(function(d) {
      return parseFloat(d.value, 10);
    });

      this.weightChart
        .x(d3.time.scale().domain([new Date(new Date().getFullYear(), 0, 1), new  Date(new Date().getFullYear(), 11, 31)]))
        .dimension(date_weight_dim)
        .renderHorizontalGridLines(true)
        .renderVerticalGridLines(true)
        .brushOn(false)
        .mouseZoomable(false)
        .yAxisLabel('Weight (kg)')
        .colors(blue)
        .group(weightGroup, 'Weight');

    var ndx_act       = crossfilter(act_data);
    var date_act_dim  = ndx_act.dimension(function(d) {
      return d.month;
    });
    var caloriesGroup = date_act_dim.group().reduceSum(function(d) {
      return parseInt(d.calories, 10);}
    );
    this.caloriesChart
      .x(d3.time.scale().domain([new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)]))
      .round(d3.time.month.round)
      .xUnits(d3.time.days)
      .renderHorizontalGridLines(true)
      .renderVerticalGridLines(true)
      .brushOn(false)
      .mouseZoomable(false)
      .yAxisLabel('Burned calories (kcal)')
      .colors(red)
      .dimension(date_act_dim)
      .group(caloriesGroup);

    /*var dst = utils.Helpers.distanceMeterToChoice(user_unit, 10, false);
    var distanceGroup = date_act_dim.group().reduceSum(function(d) {
      return utils.Helpers.distanceMeterToChoice(
        user_unit,
        d.distance,
        false
      ).value;
    });
    this.distanceChart
      .x(d3.time.scale().domain([new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)]))
      .round(d3.time.month.round)
      .xUnits(d3.time.days)
      .renderHorizontalGridLines(true)
      .renderVerticalGridLines(true)
      .brushOn(false)
      .mouseZoomable(false)
      .yAxisLabel('Distance (' + dst.unit + ')')
      .colors(green)
      .dimension(date_act_dim)
      .group(distanceGroup);

    var durationGroup = date_act_dim.group().reduceSum(function(d) {
      return parseInt(d.duration, 10);
    });
    this.durationChart
      .x(d3.time.scale().domain([new Date(new Date().getFullYear(), 0, 1), new Date(new Date().getFullYear(), 11, 31)]))
      .round(d3.time.month.round)
      .xUnits(d3.time.days)
      .renderHorizontalGridLines(true)
      .renderVerticalGridLines(true)
      .brushOn(false)
      .mouseZoomable(false)
      .yAxisLabel('Duration (min)')
      .colors(red)
      .dimension(date_act_dim)
      .group(durationGroup);*/



    dc.renderAll();
  }
});
