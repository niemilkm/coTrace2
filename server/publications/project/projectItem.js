Meteor.publish('projects', function(limit) {
  //Meteor._sleepForMs(2000);

  //need to figure out how to get the tags ids
  var tagIds = [];

  var projects = Projects.find({}, {limit: limit}).fetch();
  var projectIds = projects.map(function(projects) { return projects._id; });
  var clientIds = projects.map(function(projects) { return projects.clientId; });
  var categoryIds = projects.map(function(projects) { return projects.categoryId; });
  _.each(projects, function(data) {
    if (data.tags.length === 1)
    {
      if (!_.contains(tagIds, data.tags[0]))
      {
        tagIds.push(data.tags[0]);
      }
    }
    else if (data.tags.length > 1)
    {
      _.each(data.tags, function(dataTags) {
        if (!_.contains(tagIds, dataTags))
        {
          tagIds.push(dataTags);
        }
      });
    }
  });

  return [
    Projects.find({}, {limit: limit}),
    Clients.find({_id: {$in: clientIds}}),
    Categories.find({_id: {$in: categoryIds}}),
    Tags.find({_id: {$in: tagIds}}),
    Testimonials.find({projectId: {$in: projectIds}})
  ]
});
