Categories = new Mongo.Collection('categories');

Categories.helpers({
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

Categories.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Categories.attachSchema(new SimpleSchema({
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
//   Categories.insert({
//     name: "Pharmaceutical",
//     company: "companyId1"
//   });
//   Categories.insert({
//     name: "Consumer Goods",
//     company: "companyId1"
//   });
// });
