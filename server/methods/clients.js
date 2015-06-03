Meteor.methods({
  'Clients.insert': function (params) {
    check(params, {name: String});
    params.company = "AEXNrTCL52oDFcDmi";
    Clients.insert(params);
  },

  'Clients.update': function (params, id) {
    check(params, {name: String});
    check(id, String);
    params.company = "AEXNrTCL52oDFcDmi";
    Clients.update({_id: id}, {$set: params});
  },

  'Clients.remove': function(params) {
    if (typeof params === "string")
    {
      check(params, String)
      Clients.remove(params);
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
      Clients.remove({_id: {$in: params}});
    }
  }
});
