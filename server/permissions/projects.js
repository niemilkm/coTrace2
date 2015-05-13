Projects.allow({
  'insert': function(userId, doc) {
    //return userId;
    return true;
  },
  'update': function(userId, doc, fields, modifier) {
    return userId;
  },
  'remove': function(userId, doc) {
    return userId;
  }
});
