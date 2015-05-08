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
    clearProjectModal();
  },

  'click': function()
  {
    if (!$(event.target).parents().hasClass("dropdown"))
      $(".dropdown dd ul").hide();
  },

  'click [data-action="submit"]': function (e) {
    e.preventDefault();

    var projectName = $('#projectName').val().trim();
    var clientName = $('#clientName').val();
    var categoryName = $('#categoryName').val();
    var startDate = $('#startDatePicker').val();
    var endDate = $('#endDatePicker').val();
    //var tags = set;
    var allInputsProvided = true;

    if (!projectName && allInputsProvided)
      {alert("Project Name is Required"); allInputsProvided=false;}
    if (!clientName && allInputsProvided)
      {alert("Client Name is Required"); allInputsProvided=false;}
    if (!categoryName && allInputsProvided)
      {alert("Category is Required"); allInputsProvided=false;}
    if (!startDate && allInputsProvided)
      {alert("Start Date is Required"); allInputsProvided=false;}
    if (!endDate && allInputsProvided)
      {alert("End Date is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      console.log(set);
      var addProjectData = {
                                projectName: projectName,
                                clientName: clientName,
                                categoryName: categoryName,
                                startDate: startDate,
                                endDate: endDate,
                            };
      Meteor.call("addProject", addProjectData, set);
      console.log(addProjectData);
      $('#projectNew_modal').hide();
      clearProjectModal();

    }


  }
})
