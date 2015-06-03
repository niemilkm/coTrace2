Meteor.methods({
  'Tags.insert': function (params) {
    check(params, {name: String});
    params.company = "AEXNrTCL52oDFcDmi"
    Tags.insert(params);
  },

  'Tags.update': function (params, id) {
    check(params, {name: String});
    check(id, String);
    params.company = "AEXNrTCL52oDFcDmi";
    Tags.update({_id: id}, {$set: params});
  },

  'Tags.remove': function(params) {
    if (typeof params === "string")
    {
      check(params, String)
      Tags.remove(params);
    }
    else
    {
      var returnVal = check(params, Match.Where(function(params){
        _.each(params, function (data) {
          /* do your checks and return false if there is a problem */
          if (typeof data != "String")
            return false;
        });
        // return true if there is no problem
        return true;
      }));
      Tags.remove({_id: {$in: params}});
    }
  }
});
