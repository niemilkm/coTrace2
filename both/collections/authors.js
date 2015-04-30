Authors = new Mongo.Collection('authors');

Authors.helpers({
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

Authors.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Authors.attachSchema(new SimpleSchema({
  firstName: {
    type: String,
    max: 200
  },
  lastName: {
    type: String,
    max: 200
  },
  authorCompany: {
    type: String,
    max: 200
  },
  title: {
    type: String,
    max: 200
  },
  phone: {
    type: String,
    max: 200
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    max: 200
  },
  company: {
    type: String,
    max: 50
  }
}));

// Meteor.startup( function() {
//   Authors.insert({
//     firstName: "Tom",
//     lastName: "Smith",
//     authorCompany: "Amylin",
//     title: "Lead Engineer",
//     phone: "555-555-0001",
//     email: "tom.smith@test.test",
//     company: "companyId1"
//   });
//   Authors.insert({
//     firstName: "John",
//     lastName: "Thomas",
//     authorCompany: "P&G",
//     title: "Process Engineer",
//     phone: "555-555-0002",
//     email: "john.thomas@test.test",
//     company: "companyId2"
//   });
// });
