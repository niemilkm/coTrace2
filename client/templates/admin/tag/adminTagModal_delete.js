
Template.adminTagModal_delete.onCreated(function() {
  var instance = this;
  instance.tagId = new ReactiveVar(undefined);

  instance.autorun(function() {
    if (typeof Session.get("adminParams") === "string")
    {
      var tagId = Session.get("adminParams");
      var subscription = instance.subscribe("adminTagDelete", tagId);

      if (subscription.ready())
        instance.tagId.set(tagId);
    }
  });

  instance.adminTagDetail = function() {
    if (instance.tagId.get()) {
      var projectNames = _.map(Projects.find().fetch(), function(data) {return data.name;});
      return {
        name: Tags.findOne({_id: instance.tagId.get()}).name,
        projectNames: projectNames,
        projectCount: projectNames.length
      }
    }
  }
});

Template.adminTagModal_delete.helpers({

  deleteDetails: function()
  {
    return Template.instance().adminTagDetail();
  },
});

Template.adminTagModal_delete.events = {
  'click [data-action="delete"]': function(e)
  {
    e.preventDefault();
    var tagId = Session.get("adminParams");
    var projectIds = _.map(Projects.find().fetch(), function(data) {return data._id;});
    Template.instance().tagId.set(undefined);
    Meteor.call("adminTagDelete", tagId, projectIds, function(error, result) {
      if (!error)
      {
        throwSuccessAlert("Tag Deleted and Removed from Projects Successfully");
        $('#adminTagModal_delete').toggle();
      }
      else
        throwError("Error in Deleting Tag and Removing Tag from Projects");
    });

  }
}
