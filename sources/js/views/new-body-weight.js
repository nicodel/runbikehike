/* jshint browser: true */
/* globals _, Backbone, microtemplate, utils, BodyWeights, Factory, Tracking */
/* exported NewBodyWeightView */
'use strict';

var NewBodyWeightView = Backbone.NativeView.extend({
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
      'value'     : this.model.get('value'),
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
        this.model.set('date', new Date(d[2], d[1] - 1, d[0]).toISOString());
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
        this.model.set('value', v);
      }
    },


 //
 //  renderIcon: function (body) {
 //    var label = document.createElement('label');
 //    label.setAttribute('for', body.activity);
 //    var input = document.createElement('input');
 //    input.setAttribute('type', 'radio');
 //    input.setAttribute('name', 'select-body');
 //    input.setAttribute('value', body.activity);
 //    input.setAttribute('id', body.activity);
 //    var img = document.createElement('img');
 //    img.setAttribute('src', 'img/body/' + body.activity + '.png');
 //    img.setAttribute('alt', body.activity);
 //    label.appendChild(input);
 //    label.appendChild(img);
 //    document.getElementById('select-body').appendChild(label);
 //  },
 //
 //  bodySelected: function(element) {
 //    // console.log('bodySelected', element);
 //    // cleaning previous view (if any)
 //    if (this.subview) {
 //      this.subview.remove();
 //    }
 //    if (element.target.nodeName === 'INPUT') {
 //      var body = element.target.value;
 //      var session = Factory.getModel(
 //          'body',
 //          body,
 //          {'activity' : body});
 //      this.model.set(session);
 //      this.subview = Factory.getNewView('body', this.model);
 //      // console.log('view to be displayed is', this.subview);
 //      this.el.appendChild(document.createElement('div').innerHTML = this.subview.render().el);
 //      // add listener to subview to enable/disable the Add button
 //      this.listenTo(this.subview, 'enable-add', this.enableAdd);
 //      this.listenTo(this.subview, 'disable-add', this.disableAdd);
 //    }
 //  },
 //
 //  enableAdd: function() {
 //    var btn = document.getElementById('confirm-add-session-btn');
 //    // console.log('enable-add', btn.getAttribute('disabled'));
 //    if (btn.getAttribute('disabled') === 'disabled') {
 //      btn.removeAttribute('disabled');
 //    }
 //  },
 //
 //  disableAdd: function() {
 //    var btn = document.getElementById('confirm-add-session-btn');
 //    // console.log('disable-add', btn.getAttribute('disabled'));
 //    if (btn.getAttribute('disabled') === null) {
 //      btn.setAttribute('disabled', 'disabled');
 //    }
 // },

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
    var b = BodyWeights.add(this.model);
    // console.log('new body to save', b);
    b.save();
    BodyWeights.trigger('add-new', b);
    // Cleaning Views
    this.remove();
  }

});
