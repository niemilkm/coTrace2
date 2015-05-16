Meteor.publish('authors', function() {
  return Authors.find({}, {fields: {company: 0}});
});
