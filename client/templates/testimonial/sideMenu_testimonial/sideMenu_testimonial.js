
Template.sideMenu_testimonial.rendered = function() {

};

Template.sideMenu_testimonial.events({

  'click [data-action="submitAuthor"]': function(e)
  {
    e.preventDefault();
    Successes.remove({});
    Errors.remove({});

    var firstName = $('[name=firstName]').val().trim();
    var lastName = $('[name=lastName]').val().trim();
    var authorCompany = $('[name=authorCompany]').val().trim();
    var title = $('[name=title]').val().trim();
    var phone = $('[name=phone]').val().trim();
    var email = $('[name=email]').val().trim();

    if (firstName || lastName)
    {
      var params = {
                      firstName: firstName,
                      lastName: lastName,
                      authorCompany: authorCompany,
                      title: title,
                      phone: phone,
                      email: email
                    }
      Meteor.call("Authors.insert", params, function(error) {
        if (!error)
        {
          throwSuccessAlert("Author Successfully Added");
          clearSideMenu_Testimonial();
        }
        else
          throwError("Error adding Author - Action did not Complete");
      });
    }
    else
      throwError("First Name and/or Last Name is Required")

    $('[name=clientAdd]').val('');
  }

});

clearSideMenu_Testimonial = function()
{
  $('[name=firstName]').val('');
  $('[name=lastName]').val('');
  $('[name=authorCompany]').val('');
  $('[name=title]').val('');
  $('[name=phone]').val('');
  $('[name=email]').val('');
}
