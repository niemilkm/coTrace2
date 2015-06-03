Meteor.publish('ssInputs', function() {
  return SuccessStoryInputs.find({}, {fields: {SSInputs: 1}}, {limit:1});
});

Meteor.publish('adminSSInputsDelete', function(ssInputId) {

  check(ssInputId, String);

  return [
    // Clients.find({_id: clientId}, {fields: {company: 0}}),
    // Projects.find({clientId: clientId}, {fields: {_id: 1, name: 1}})
  ]
});
