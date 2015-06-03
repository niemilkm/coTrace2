Meteor.publish('clients', function() {
  return Clients.find({}, {fields: {company: 0}});
});

Meteor.publish('adminClientDelete', function(clientId) {

  check(clientId, String);

  return [
    Clients.find({_id: clientId}, {fields: {company: 0}}),
    Projects.find({clientId: clientId}, {fields: {_id: 1, name: 1}})
  ]
});
