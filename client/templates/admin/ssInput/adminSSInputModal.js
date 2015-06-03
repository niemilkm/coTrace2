Template.adminSSInputModal.helpers({
  addOrEdit: function()
  {
    //console.log(Session.get("adminParams"));
    if (Session.get("addOrEdit") === "EDIT" && Session.get("adminParams"))
    {
      var adminParams = Session.get("adminParams");
      $('input[name=ques]').val(adminParams.ques);
      $('input[name=num]').val(adminParams.num)
    }
    else
    {
      clearAdminTagModal();
    }
    return Session.get("addOrEdit");
  },

});

Template.adminSSInputModal.events =
{
  'click [data-action=submit]': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});

    var ques = $('input[name=ques]').val().trim();
    var num = $('input[name=num]').val();

    var allInputsProvided = true;

    if (!ques)
      {throwError("Question is Required"); allInputsProvided=false;}
    if (!num)
      {throwError("Question Number is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {
      var addOrEdit = Session.get("addOrEdit");
      var params = {
                  ques: ques,
                  num: num
                };
      if (addOrEdit === "ADD")
      {
        Meteor.call("SuccessStoryInputs.insert", params, function(error) {
          if (!error)
          {
            throwSuccessAlert(ques + " Successfully Added");
            clearAdminSSInputModal();
            $('#adminSSInputModal').hide();
          }
          else
          {
            throwError(ques + " Addition Failed - Please Try Again");
          }
        });
      }
      else if (addOrEdit === "EDIT")
      {
        var quesNumChange = Session.get("adminParams").num != num;
        params.index = Session.get("adminParams").index;
        Meteor.call("SuccessStoryInputs.update", params, quesNumChange, function(error, response) {
          if (!error)
          {
            if (response == 1)
            {
              throwSuccessAlert("Question Successfully Updated");
              clearAdminSSInputModal();
              $('#adminSSInputModal').hide();
            }
            else if (response == -2)
              throwError(ques + " Update Failed - Question Number Already In Use");
            else
              throwError(ques + " Update Failed - Please Try Again");
          }
          else
          {
            throwError(ques + " Update Failed - Please Try Again");
          }
        });
      }
      else
        throwError("Question Operation Failed");
    }
  },

  'click .closeModal': function()
  {
    if (Session.get("addOrEdit") === "EDIT")
      clearAdminSSInputModal(Session.get("adminParams"));
    else
      clearAdminSSInputModal();
  }
}

clearAdminSSInputModal = function(value)
{
  if (!value)
  {
    $('input[name=ques]').val('');
    $('input[name=num]').val('')
  }
  else
  {
    $('input[name=ques]').val(value.ques);
    $('input[name=num]').val(value.num);
  }
}
