Meteor.methods({
  'Categories.insert': function (params) {
    params.company = "AEXNrTCL52oDFcDmi"
    Categories.insert(params);
  }
});
