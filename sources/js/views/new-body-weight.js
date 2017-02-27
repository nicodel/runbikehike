/* jshint browser: true */
/* globals _, Backbone, microtemplate, utils */
'use strict';
var RBH = RBH || {};
RBH.Views = RBH.Views || {};

RBH.Views.NewBodyWeight = Backbone.NativeView.extend({
  el: '#new-body-weight-view',

  events: {
    // 'click #select-body'                 : 'bodySelected',
    'click #confirm-add-body-weight-btn' : 'addNewBody',

    'onsubmit #body-form'     : function() {return false;},
    'change #new-body-date'   : '__validateDate',
    'change #new-body-value'  : '__validateValue'
  },

  validated: {
    'date'  : false,
    'value' : false
  },

  dom: {
    activity : document.getElementById('new-activity-details'),
  },

  template : microtemplate(document.getElementById('new-session-template-2').innerHTML),

  initialize: function () {
    console.log('this.model', this.model);
    this.render();
  },

  render: function() {
    this.el.innerHTML = this.template({
      'lb_date'   : _('date-format'),
      'date'      : utils.Helpers.formatDate(this.model.get('date')),
      'lb_weight' : _('weight'),
      'value'     : this.model.get('weight'),
    });
    // console.log('new view rendered');
    return this;
  },


    __validateDate: function() {
      var date = utils.Helpers.checkDate(document.getElementById('new-body-date').value);
      if (date[0]) {
        this.validated.date = true;
        this.trigger('enable-add');
        var d = date[1];
        this.model.set('date', new Date(d[2], d[1] - 1, d[0]));
        // this.model.set('date', date[1]);
      } else {
        this.validated.date = false;
        this.trigger('disable-add');
      }
    },

    __validateValue: function() {
      var v = parseFloat(document.getElementById('new-body-value').value);
      // console.log('validate value', v);
      if (Number.isNaN(v)) {
        this.validated.value = false;
        this.trigger('disable-add');
      } else {
        this.validated.value = true;
        this.trigger('enable-add');
        this.model.set('weight', v);
      }
    },

  addNewBody: function() {
    for (var i = 0; i < this.validated.length; i++) {
      var criteria = this.validated[i];
      if (!criteria) {
        // TODO Manage error messages and invalid values in new-session form
        // console.log('something is not right and session could not be added', this.validated);
        return;
      }
    }
    console.log('addNewSession - this.model', this.model);
    var b = RBH.collections.BodyWeights.add(this.model);
    // console.log('new body to save', b);
    b.save();
    RBH.collections.BodyWeights.trigger('add-new', b);
    // Cleaning Views
    this.remove();
  }

});
