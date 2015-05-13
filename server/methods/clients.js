Meteor.methods({
  'Clients.insert': function (params) {
    params.company = "AEXNrTCL52oDFcDmi";
    Clients.insert(params);
  }
});
