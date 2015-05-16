
Template.adminTagModal.helpers({
  addOrEdit: function()
  {
    if (Session.get("addOrEdit") === "EDIT")
    {
      var adminParams = Session.get("adminParams");
      $('input[name=tag]').val(adminParams.tag);
    }
    else
    {
      clearAdminTagModal();
    }
    return Session.get("addOrEdit");
  },

});

Template.adminTagModal.events =
{
  'click [data-action=submit]': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});

    var tag = $('input[name=tag]').val().trim();
    var allInputsProvided = true;

    if (!tag)
      {throwError("Tag is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var name = name;
      var addOrEdit = Session.get("addOrEdit");
      var params = {
                  tag: tag
                };
      if (addOrEdit === "ADD")
      {
        Meteor.call("Tags.insert", params, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Added");
            clearAdminTagModal();
            $('#adminTagModal').hide();
          }
          else
          {
            throwError(name + " Addition Failed - Please Try Again");
          }
        });
      }
      else if (addOrEdit === "EDIT")
      {
        var id = Session.get("adminParams")._id;
        Meteor.call("Tags.update", params, id, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Updated");
            clearAdminTagModal();
            $('#adminTagModal').hide();
          }
          else
          {
            throwError(name + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Tag Operation Failed");
    }
  }
}

clearAdminTagModal = function()
{
  $('input[name=tag]').val('');
}
