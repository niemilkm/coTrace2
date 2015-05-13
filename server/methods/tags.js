Meteor.methods({
  'Tags.insert': function (params) {
    params.company = "AEXNrTCL52oDFcDmi"
    Tags.insert(params);
  }
});
