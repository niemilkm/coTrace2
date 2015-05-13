Meteor.methods({
  'Projects.insert': function (params) {
    params.company = "AEXNrTCL52oDFcDmi"
    Projects.insert(params);
  }
});
