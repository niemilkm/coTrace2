
Template.adminTagModal.helpers({
  addOrEdit: function()
  {
    if (Session.get("addOrEdit") === "EDIT" && Session.get("adminParams"))
    {
      var adminParams = Session.get("adminParams");
      $('input[name=name]').val(adminParams.name);
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

    var name = $('input[name=name]').val().trim();
    var allInputsProvided = true;

    if (!name)
      {throwError("Tag Name is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var addOrEdit = Session.get("addOrEdit");
      var params = {
                  name: name,
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
            throwError(tagName + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Tag Operation Failed");
    }
  },

  'click .closeModal': function()
  {
    if (Session.get("addOrEdit") === "EDIT")
      clearAdminTagModal(Session.get("adminParams"));
    else
      clearAdminTagModal();
  }
}

clearAdminTagModal = function(value)
{
  if (!value)
    $('input[name=name]').val('');
  else
    $('input[name=name]').val(value.name);
}
