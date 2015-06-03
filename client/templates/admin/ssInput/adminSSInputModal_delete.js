

Template.adminSSInputModal_delete.helpers({

  deleteDetails: function()
  {
    return Session.get("adminParams");
  },
});

Template.adminSSInputModal_delete.events = {
  'click [data-action="delete"]': function(e)
  {

  }
}
