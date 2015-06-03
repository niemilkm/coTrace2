Meteor.methods({
  'Categories.insert': function (params) {
    check(params, {name: String});
    params.company = "AEXNrTCL52oDFcDmi"
    Categories.insert(params);
  },

  'Categories.update': function (params, id) {
    check(params, {name: String});
    check(id, String);
    params.company = "AEXNrTCL52oDFcDmi";
    Categories.update({_id: id}, {$set: params});
  },

  'Categories.remove': function(params) {
    if (typeof params === "string")
    {
      check(params, String);
      Categories.remove(params);
    }
    else
    {
      check(params, Match.Where(function(params){
        _.each(params, function (data) {
          /* do your checks and return false if there is a problem */
          if (typeof data != "String")
            return false;
        });
        // return true if there is no problem
        return true;
      }));
      Categories.remove({_id: {$in: params}});
    }
  }
});
