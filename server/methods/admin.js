
/* This routine will call other Meteor Methods to perform
*   the admin task.
*/

Meteor.methods({
  'adminAuthorDelete': function(authorId, testimonialIds) {
    Meteor.call("Testimonials.remove", testimonialIds, function(error) {
      if (!error)
      {
        Meteor.call("Authors.remove", authorId, function(error) {
          if (!error)
            return 0;
          else
            return "Error Removing Author - Testimonial was Removed Successfully.";
        });
      }
      else
        return "Error Removing Testimonial - uthor was not removed.";
    });
  },

  'adminTagDelete': function(tagId, projectIds) {
    Meteor.call("Projects.removeTagIds", projectIds, tagId);
    Meteor.call("Tags.remove", tagId);
  },

  'adminCategoryDelete': function(categoryId) {
    var projectIds = _.map(Projects.find({categoryId: categoryId}).fetch(), function(data) {return data._id;});
    if (projectIds)
      Meteor.call("Projects.removeCategoryIds", projectIds, categoryId);
    Meteor.call("Categories.remove", categoryId);
  },

  'adminClientDelete': function(clientId) {
    var projectIds = _.map(Projects.find({clientId: clientId}).fetch(), function(data) {return data._id;});
    if (projectIds)
      Meteor.call("Projects.removeClientIds", projectIds, clientId);
    Meteor.call("Clients.remove", clientId);
  }

});
