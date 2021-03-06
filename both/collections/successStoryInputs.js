SuccessStoryInputs = new Mongo.Collection('successStoryInputs');

SuccessStoryInputs.helpers({
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

SuccessStoryInputs.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

var SSInputsSchema = new SimpleSchema({
    num: {
      type: Number
    },
    index: {
      type: Number
    },
    ques: {
      type: String,
      max: 200000
    },
    // ans: {
    //   type: String,
    //   max: 200000,
    //   removeEmptyStrings: false
    // }
});

SuccessStoryInputs.attachSchema(new SimpleSchema({
  company: {
    type: String,
    max: 50
  },
  SSInputs: {
    type: [SSInputsSchema]
  }
}));

// Meteor.startup( function() {
//  SuccessStoryInputs.insert({
//    company: "AEXNrTCL52oDFcDmi",
//    SSInputs: [
//                   {
//                     num: 1,
//                     index: 1,
//                     ques: "This is question #1"
//                   },
//                   {
//                     num: 2,
//                     index: 2,
//                     ques: "This is question #2"
//                   }
//               ]
//   });
// });
