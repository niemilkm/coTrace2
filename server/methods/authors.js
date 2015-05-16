Meteor.methods({
  'Authors.insert': function (params) {
    params.company = "AEXNrTCL52oDFcDmi";
    Authors.insert(params);
  },

  'Authors.update': function (params, id) {
    params.company = "AEXNrTCL52oDFcDmi";
    Authors.update({_id: id}, {$set: params});
  },

  'Authors.remove': function(id) {
    Authors.remove(id);
  }
});
