Meteor.methods({
  'Testimonials.insert': function (params) {
    params.companyId = "AEXNrTCL52oDFcDmi"
    Testimonials.insert(params);
  },

  'Testimonials.remove': function(params) {
    Testimonials.remove({_id: {$in: params}});
  }
});
