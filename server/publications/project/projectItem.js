Meteor.publish('projects', function(limit) {
  //Meteor._sleepForMs(2000);
  return [
    Projects.find({}, {limit: limit}),
    Clients.find(),
    Categories.find(),
    Tags.find()
  ]
});
