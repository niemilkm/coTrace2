
Template.adminClientModal.helpers({
  addOrEdit: function()
  {
    if (Session.get("addOrEdit") === "EDIT" && Session.get("adminParams"))
    {
      var adminParams = Session.get("adminParams");
      $('input[name=name]').val(adminParams.name);
    }
    else
    {
      clearAdminClientModal();
    }
    return Session.get("addOrEdit");
  },

});

Template.adminClientModal.events =
{
  'click [data-action=submit]': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});

    var name = $('input[name=name]').val().trim();
    var allInputsProvided = true;

    if (!name)
      {throwError("Name is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var addOrEdit = Session.get("addOrEdit");
      var params = {
                  name: name,
                };
      if (addOrEdit === "ADD")
      {
        Meteor.call("Clients.insert", params, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Added");
            clearAdminClientModal();
            $('#adminClientModal').hide();
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
        Meteor.call("Clients.update", params, id, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Updated");
            clearAdminClientModal();
            $('#adminClientModal').hide();
          }
          else
          {
            throwError(name + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Client Operation Failed");
    }
  },
  'click .closeModal': function()
  {
    if (Session.get("addOrEdit") === "EDIT")
      clearAdminClientModal(Session.get("adminParams"));
    else
      clearAdminClientModal();
  }
}

clearAdminClientModal = function(value)
{
  if (!value)
  {
    $('input[name=name]').val('');
  }
  else
  {
    $('input[name=name]').val(value.name);
  }

}
