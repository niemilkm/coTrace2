
Template.adminCategoryModal.helpers({
  addOrEdit: function()
  {
    if (Session.get("addOrEdit") === "EDIT" && Session.get("adminParams"))
    {
      var adminParams = Session.get("adminParams");
      $('input[name=name]').val(adminParams.name);
    }
    else
    {
      clearAdminCategoryModal();
    }
    return Session.get("addOrEdit");
  },

});

Template.adminCategoryModal.events =
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
        Meteor.call("Categories.insert", params, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Added");
            clearAdminCategoryModal();
            $('#adminCategoryModal').hide();
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
        Meteor.call("Categories.update", params, id, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Updated");
            clearAdminCategoryModal();
            $('#adminCategoryModal').hide();
          }
          else
          {
            throwError(name + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Category Operation Failed");
    }
  },
  'click .closeModal': function()
  {
    if (Session.get("addOrEdit") === "EDIT")
      clearAdminCategoryModal(Session.get("adminParams"));
    else
      clearAdminCategoryModal();
  }
}

clearAdminCategoryModal = function(value)
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
