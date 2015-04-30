Testimonials = new Mongo.Collection('testimonials');

Testimonials.helpers({
  project: function()
  {
    return Projects.findOne(this.projectId);
  },
  author: function()
  {
    return Authors.findOne(this.authorId);
  },
  company: function()
  {
    return Companies.findOne(this.companyId);
  }

});

Testimonials.before.insert(function (userId, doc) {
  doc.createdAt = moment().toDate();
});

Testimonials.attachSchema(new SimpleSchema({
  testimonial: {
    type: String,
    max: 200000
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
  }
}));
