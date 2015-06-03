
Template.adminCategoryModal_delete.onCreated(function() {
  var instance = this;
  instance.categoryId = new ReactiveVar(undefined);

  instance.autorun(function() {
    if (typeof Session.get("adminParams") === "string")
    {
      var categoryId = Session.get("adminParams");
      var subscription = instance.subscribe("adminCategoryDelete", categoryId);

      if (subscription.ready())
        instance.categoryId.set(categoryId);
    }
  });

  instance.adminCategoryDetail = function() {
    if (instance.categoryId.get()) {
      var projectNames = _.map(Projects.find().fetch(), function(data) {return data.name;});
      return {
        name: Categories.findOne({_id: instance.categoryId.get()}).name,
        projectNames: projectNames,
        projectCount: projectNames.length
      }
    }
  }
});

Template.adminCategoryModal_delete.helpers({

  deleteDetails: function()
  {
    return Template.instance().adminCategoryDetail();
  },
});

Template.adminCategoryModal_delete.events = {
  'click [data-action="delete"]': function(e)
  {
    e.preventDefault();
    var categoryId = Session.get("adminParams");
    //var projectIds = _.map(Projects.find().fetch(), function(data) {return data._id;});
    Template.instance().categoryId.set(undefined);
    Meteor.call("adminCategoryDelete", categoryId, function(error, result) {
      if (!error)
      {
        throwSuccessAlert("Category Deleted and Removed from Projects Successfully");
        $('#adminCategoryModal_delete').toggle();
      }
      else
      {
        throwError("Error in Deleting Category and Removing Category from Projects");
      }
    });
  }
}
