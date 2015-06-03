Meteor.methods({
  'Projects.insert': function (params) {
    params.companyId = "AEXNrTCL52oDFcDmi"
    Projects.insert(params);
  },

  'Projects.removeTagIds': function(projectIds, tagId) {
    var noErrors = true;
    if (projectIds && tagId)
    {
      _.each(projectIds, function(data) {
        Projects.update({_id: data}, {$pull: {tags: tagId}}, function(error) {
          if (error)
            noErrors = false;
        });
      });
    }
    return noErrors;
  },

  'Projects.removeCategoryIds': function(projectIds, categoryId) {
    var noErrors = true;
    if (projectIds && categoryId)
    {
      _.each(projectIds, function(data) {
        Projects.update({_id: data}, {$unset: {categoryId: ""}}, function(error) {
          if (error)
            noErrors = false;
        });
      });
    }
    return noErrors;
  },

  'Projects.removeClientIds': function(projectIds, clientId) {
    var noErrors = true;
    if (projectIds && clientId)
    {
      _.each(projectIds, function(data) {
        Projects.update({_id: data}, {$unset: {clientId: ""}}, function(error) {
          if (error)
            noErrors = false;
        });
      });
    }
    return noErrors;
  }
});
