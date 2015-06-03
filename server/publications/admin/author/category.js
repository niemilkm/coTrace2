Meteor.publish('categories', function() {
  return Categories.find({}, {fields: {company: 0}});
});

Meteor.publish('adminCategoryDelete', function(categoryId) {

  check(categoryId, String);

  return [
    Categories.find({_id: categoryId}, {fields: {company: 0}}),
    Projects.find({categoryId: categoryId}, {fields: {_id: 1, name: 1}})
  ]
});
