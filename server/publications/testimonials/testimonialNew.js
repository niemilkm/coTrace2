Meteor.publish('testimonialNew', function() {
  return [
    Projects.find({}, {fields:{
                            firstName: 1,
                            lastName: 1
                          }
    }),
    Authors.find({}, {fields: {company: 0}})
  ]
});
