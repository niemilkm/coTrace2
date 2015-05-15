Meteor.methods({
  'Testimonials.insert': function (params) {
    params.companyId = "AEXNrTCL52oDFcDmi"
    Testimonials.insert(params);
  }
});
