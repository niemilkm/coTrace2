
Template.adminClientModal_delete.onCreated(function() {
  var instance = this;
  instance.clientId = new ReactiveVar(undefined);

  instance.autorun(function() {
    if (typeof Session.get("adminParams") === "string")
    {
      var clientId = Session.get("adminParams");
      var subscription = instance.subscribe("adminClientDelete", clientId);

      if (subscription.ready())
        instance.clientId.set(clientId);
    }
  });

  instance.adminClientDetail = function() {
    if (instance.clientId.get()) {
      var projectNames = _.map(Projects.find().fetch(), function(data) {return data.name;});
      return {
        name: Clients.findOne({_id: instance.clientId.get()}).name,
        projectNames: projectNames,
        projectCount: projectNames.length
      }
    }
  }
});

Template.adminClientModal_delete.helpers({

  deleteDetails: function()
  {
    return Template.instance().adminClientDetail();
  },
});

Template.adminClientModal_delete.events = {
  'click [data-action="delete"]': function(e)
  {
    e.preventDefault();
    var clientId = Session.get("adminParams");
    //var projectIds = _.map(Projects.find().fetch(), function(data) {return data._id;});
    Template.instance().clientId.set(undefined);
    Meteor.call("adminClientDelete", clientId, function(error, result) {
      if (!error)
      {
        throwSuccessAlert("Client Deleted and Removed from Projects Successfully");
        $('#adminClientModal_delete').toggle();
      }
      else
      {
        throwError("Error in Deleting Client and Removing Client from Projects");
      }
    });
  }
}
