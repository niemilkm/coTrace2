Session.setDefault("addOrEdit", "ADD");
Session.setDefault("params", "");

Template.adminAuthorModal.helpers({
  addOrEdit: function()
  {
    var params = Session.get("params");
    var firstName = params.firstName;
    if (Session.get("addOrEdit") == "EDIT")
    {
      $('[name=firstName]').val(firstName);
    }
    return Session.get("addOrEdit");
  },

  firstName: function()
  {
    var params = Session.get("params");
    if (Session.get("addOrEdit") == "EDIT")
    {
      $('[name=firstName]').val(params.firstName);
      console.log(params.firstName);
    }
    return params.firstName;
  }
});

Template.adminAuthorModal.events =
{

}
