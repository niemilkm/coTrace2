Template.projectNew.created = function() {
  this.advancedTab = new ReactiveVar(false);
  var today = new Date();
  this.startDate = new ReactiveVar(today);
  this.endDate = new ReactiveVar(today);
};

Template.projectNew.rendered = function() {

  this.$('#startDatePicker').datepicker({
    showAnim: 'fadeIn',
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    backdrop: 'static',
  });

  this.$('#endDatePicker').datepicker({
    showAnim: 'fadeIn',
    changeMonth: true,
    changeYear: true,
    showButtonPanel: true,
    backdrop: 'static',
  });

};

Template.projectNew.helpers({

  client: function()
  {
    return Clients.find().fetch();
  },

  category: function()
  {
    return Categories.find().fetch();
  },

  tag: function()
  {
    return Tags.find().fetch();
  },

  advancedTab: function()
  {
    return Template.instance().advancedTab.get();
  },

});

Template.projectNew.events({
  'change #startDatePicker': function()
  {
    Template.instance().startDate.set($('#startDatePicker').datepicker('getDate'));
  },

  'change #endDatePicker': function()
  {
    Template.instance().endDate.set($('#endDatePicker').datepicker('getDate'));
  },

  'click .right-arrow': function()
  {
    Template.instance().advancedTab.set(true);
  },

  'click .left-arrow': function()
  {
    Template.instance().advancedTab.set(false);
  },

  'click .closeModal': function()
  {
    Template.instance().advancedTab.set(false);
    $('#projectName').val('');
    $('#clientName').val('');
    $('#categoryName').val('');
    $('#startDatePicker').val('');
    $('#endDatePicker').val('');
    $('#tag').val('');
  }
})
