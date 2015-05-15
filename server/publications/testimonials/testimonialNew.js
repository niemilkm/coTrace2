Meteor.publish('testimonialNew', function() {
  return [
    Projects.find({fields:{
                            firstName: true,
                            lastName: true
                          }
    }),
    Authors.find()
  ]
});
