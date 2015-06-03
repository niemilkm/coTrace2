Meteor.publish('tags', function() {
  return Tags.find({}, {fields: {company: 0}});
});

Meteor.publish('adminTagDelete', function(tagId) {

  check(tagId, String);

  return [
    Tags.find({_id: tagId}, {fields: {company: 0}}),
    Projects.find({tags: tagId}, {fields: {_id: 1, name: 1}})
  ]
});
