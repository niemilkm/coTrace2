
Template.adminClient.created = function() {

  var instance = this;
  instance.subscription = new ReactiveVar("");

  instance.autorun(function () {
    instance.subscribe('clients');
  });

  instance.clientNames = function() {
    return Clients.find().fetch();
  }
};

Template.adminClient.rendered = function() {

};

Template.adminClient.helpers({
  client: function()
  {
    return Template.instance().clientNames();
  }
});

Template.adminClient.events =
{
  'click #adminClientModal_add': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "ADD");
  },

  'click #adminClientModal_edit': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "EDIT");
    Session.set("adminParams", this);
  },

  'click #adminClientModal_deleteId': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});
    Session.set("adminParams", this._id);
  }

}
