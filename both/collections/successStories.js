SuccessStories = new Mongo.Collection('successStories');

SuccessStories.helpers({
  project: function()
  {
    return Projects.findOne(this.projectId);
  },
  author: function()
  {
    return Categories.findOne(this.authorId);
  },
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

SuccessStories.before.insert(function (userId, doc) {
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
    ans: {
      type: String,
      max: 200000
    }
});

SuccessStories.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200
  },
  project: {
    type: String,
    max: 50
  },
  author: {
    type: String,
    max: 50
  },
  company: {
    type: String,
    max: 50
  },
  SSInputs: {
    type: [SSInputsSchema]
  }
}));
