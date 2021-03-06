
Template.adminAuthorModal_delete.onCreated(function() {
  var instance = this;
  instance.authorId = new ReactiveVar(undefined);

  instance.autorun(function() {
    if (typeof Session.get("adminParams") === "string")
    {
      var authorId = Session.get("adminParams");
      var subscription = instance.subscribe("adminAuthorDelete", authorId);

      if (subscription.ready())
        instance.authorId.set(authorId);
    }
  });

  instance.adminAuthorDetail = function() {
    if (instance.authorId.get()) {
      author = Authors.findOne({_id: instance.authorId.get()});
      projectNames = _.map(Projects.find().fetch(), function(data) {return data.name;});
      return {
                authorName: author.firstName + " " + author.lastName,
                testimonialCount: Testimonials.find().count(),
                projectNames: projectNames,
                projectCount: projectNames.length
              }
    }
  }
});

Template.adminAuthorModal_delete.helpers({

  deleteDetails: function()
  {
    return Template.instance().adminAuthorDetail();
  },
});

Template.adminAuthorModal_delete.events = {
  'click [data-action="delete"]': function(e)
  {
    console.log("in delete code");
    e.preventDefault();
    var testimonialIds = Testimonials.find().fetch().map(function(data) { return _id;});
    var authorId = Session.get("adminParams");
    $('#adminAuthorModal_delete').hide();
    Template.instance().authorId.set(undefined);
    Meteor.call("adminAuthorDelete", authorId, testimonialIds);
  }
}
