Tags = new Mongo.Collection('tags');

Tags.helpers({
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

Tags.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Tags.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200
  },
  company: {
    type: String,
    max: 50
  }
}));

// Meteor.startup( function() {
//   Tags.insert({
//     name: "FT-Batch",
//     company: "companyId1"
//   });
// });
