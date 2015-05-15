Meteor.methods({
  'Projects.insert': function (params) {
    params.companyId = "AEXNrTCL52oDFcDmi"
    Projects.insert(params);
  }
});
