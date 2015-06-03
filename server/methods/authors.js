Meteor.methods({
  'Authors.insert': function (params) {
    check(params, Match.Where(function(params){
      _.each(params, function (data) {
        /* do your checks and return false if there is a problem */
        if (typeof data === "String")
          return false;
      });
      // return true if there is no problem
      return true;
    }));
    params.company = "AEXNrTCL52oDFcDmi";
    Authors.insert(params);
  },

  'Authors.update': function (params, id) {
    check(params, Match.Where(function(params){
      _.each(params, function (data) {
        /* do your checks and return false if there is a problem */
        if (typeof data === "String")
          return false;
      });
      // return true if there is no problem
      return true;
    }));
    check(id, String);

    params.company = "AEXNrTCL52oDFcDmi";
    Authors.update({_id: id}, {$set: params});
  },

  'Authors.remove': function(id) {
    check(id, String);
    Authors.remove(id);
  }
});
