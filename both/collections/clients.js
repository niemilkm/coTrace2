Clients = new Mongo.Collection('clients');

Clients.helpers({
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

// Meteor.startup( function() {
//   Clients.insert({
//     name: "Teva",
//     company: "companyId3"
//   });
//   Clients.insert({
//     name: "P&G",
//     company: "companyId2"
//   });
// });

Clients.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Clients.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200
  },
  company: {
    type: String,
    max: 50
  }
}));
