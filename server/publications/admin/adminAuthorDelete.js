Meteor.publish('adminAuthorDelete', function(authorId) {

    check(authorId, String);

    var projectIds = [];

    var author = Projects.findOne({_id: authorId});
    var testimonials = Testimonials.find({authorId: authorId}).fetch();
    projectIds = testimonials.map(function(data) { return data.projectId; });

    return [
      Authors.find({_id: authorId}),
      Projects.find({_id: {$in: projectIds}}),
      Testimonials.find({projectId: {$in: projectIds}})
    ]
});
