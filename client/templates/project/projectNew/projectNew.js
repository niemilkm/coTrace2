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
    clearSideMenu_Project();
    Template.instance().advancedTab.set(false);
  },

  'click': function()
  {
    if (!$(event.target).parents().hasClass("dropdown"))
      $(".dropdown dd ul").hide();
  },

  'click [data-action="submit"]': function (e) {
    e.preventDefault();
    Errors.remove({});

    var projectName = $('#projectName').val().trim();
    var clientName = $('#clientName').val().trim();
    var categoryName = $('#categoryName').val().trim();
    var startDate = $('#startDatePicker').val().trim();
    var endDate = $('#endDatePicker').val().trim();

    var allInputsProvided = true;

    if (!projectName)
      {throwError("Project Name is Required"); allInputsProvided=false;}
    if (!clientName)
      {throwError("Client Name is Required"); allInputsProvided=false;}
    if (!categoryName)
      {throwError("Category is Required"); allInputsProvided=false;}
    if (!startDate)
      {throwError("Start Date is Required"); allInputsProvided=false;}
    if (!endDate)
      {throwError("End Date is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var arrayPlaceholder = [];
      var array = [];
      if (set.size > 0)
      {
        set.forEach(function(data) {
          array.push(data);
        });
      }

      var addProjectData = {
                                name: projectName,
                                clientId: clientName,
                                categoryId: categoryName,
                                dateStart: startDate,
                                dateEnd: endDate,
                                tags: array
                            };

      Meteor.call("Projects.insert", addProjectData, function(error) {
        if (!error)
        {
          throwSuccessAlert("Project Successfully Added");
          clearProjectModal();
          clearSideMenu_Project();
          $('#projectNew_modal').hide();
        }
        else
        {
          throwError("There was an error submitting your project");
        }
      });

      Template.instance().advancedTab.set(false);

    }


  }
})

clearProjectModal = function()
{
  $('#projectName').val('');
  $('#clientName').val('');
  $('#categoryName').val('');
  $('#startDatePicker').val('');
  $('#endDatePicker').val('');
  $('#tag').val('');
  set.clear();
  title = "";
  var html = '<span title="' + title + '">' + title + '</span>';
  $('dl dd ul input[type="checkbox"]').prop('checked', '');
  $('.multiSel').html(html);
  Errors.remove({});
  Successes.remove({});
}
