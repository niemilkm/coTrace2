Companies = new Mongo.Collection('companies');

Companies.helpers({

});

Companies.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Companies.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200
  }
}));

// Meteor.startup( function() {
//   Companies.insert({
//     name: "E-Tech"
//   });
//   Companies.insert({
//     name: "NKU Inkubator"
//   });
// });
