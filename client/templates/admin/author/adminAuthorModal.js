
Template.adminAuthorModal.helpers({
  addOrEdit: function()
  {
    if (Session.get("addOrEdit") === "EDIT" && Session.get("adminParams"))
    {
      var adminParams = Session.get("adminParams");
      $('input[name=firstName]').val(adminParams.firstName);
      $('input[name=lastName]').val(adminParams.lastName);
      $('input[name=authorCompany]').val(adminParams.authorCompany);
      $('input[name=title]').val(adminParams.title);
      $('input[name=phone]').val(adminParams.phone);
      $('input[name=email]').val(adminParams.email);
    }
    else
    {
      clearAdminAuthorModal();
    }
    return Session.get("addOrEdit");
  },

});

Template.adminAuthorModal.events =
{
  'click [data-action=submit]': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});

    var firstName = $('input[name=firstName]').val().trim();
    var lastName = $('input[name=lastName]').val().trim();
    var authorCompany = $('input[name=authorCompany]').val().trim();
    var title = $('input[name=title]').val().trim();
    var phone = $('input[name=phone]').val().trim();
    var email = $('input[name=email]').val().trim();
    var allInputsProvided = true;

    if (!firstName)
      {throwError("First Name is Required"); allInputsProvided=false;}
    if (!lastName)
      {throwError("Last Name is Required"); allInputsProvided=false;}
    if (!authorCompany)
      {throwError("Company is Required"); allInputsProvided=false;}
    if (!title)
      {throwError("Title is Required"); allInputsProvided=false;}
    if (!phone)
      {throwError("Phone is Required"); allInputsProvided=false;}
    if (!email)
      {throwError("Email is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var name = firstName + " " + lastName;
      var addOrEdit = Session.get("addOrEdit");
      var params = {
                  firstName: firstName,
                  lastName: lastName,
                  authorCompany: authorCompany,
                  title: title,
                  phone: phone,
                  email: email
                };
      if (addOrEdit === "ADD")
      {
        Meteor.call("Authors.insert", params, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Added");
            clearAdminAuthorModal();
            $('#adminAuthorModal').hide();
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
        Meteor.call("Authors.update", params, id, function(error) {
          if (!error)
          {
            throwSuccessAlert(name + " Successfully Updated");
            clearAdminAuthorModal();
            $('#adminAuthorModal').hide();
          }
          else
          {
            throwError(name + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Author Operation Failed");
    }
  }
}

clearAdminAuthorModal = function()
{
  $('input[name=firstName]').val('');
  $('input[name=lastName]').val('');
  $('input[name=authorCompany]').val('');
  $('input[name=title]').val('');
  $('input[name=phone]').val('');
  $('input[name=email]').val('');
}
