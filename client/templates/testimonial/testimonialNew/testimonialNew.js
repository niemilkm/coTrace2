Template.testimonialNew.created = function() {
  this.advancedTab = new ReactiveVar(false);

  var instance = this;
  //instance.loaded = new ReactiveVar(0);

  instance.autorun(function () {
    instance.subscribe('testimonialNew');
  });

  instance.projects = function() {
    return Projects.find().fetch()
  },

  instance.authorNames = function() {
    return Tags.find().fetch();
  }
};

Template.testimonialNew.rendered = function() {

};

Template.testimonialNew.helpers({

  project: function()
  {
    return Template.instance().projects();
  },

  author: function()
  {
    return Template.instance().authorNames();
  },

  advancedTab: function()
  {
    return Template.instance().advancedTab.get();
  },

});

Template.testimonialNew.events({

  'click .right-arrow': function()
  {
    Template.instance().advancedTab.set(true);
  },

  'click .left-arrow': function()
  {
    Template.instance().advancedTab.set(false);
  },

  'click .closeModal': function()
  {
    clearTestimonialModal();
    clearSideMenu_Testimonial();
    Template.instance().advancedTab.set(false);
  },

  'click [data-action="submit"]': function (e) {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});

    var projectId = $('[name=projectName]').val().trim();
    var authorId = $('[name=authorName]').val().trim();
    var testimonial = $('[name=testimonial]').val().trim();

    var allInputsProvided = true;

    if (!projectId)
      {throwError("Project Name is Required"); allInputsProvided=false;}
    if (!authorId)
      {throwError("Tag Name is Required"); allInputsProvided=false;}
    if (!testimonial)
      {throwError("Testimonial is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {

      var addCollectionData = {
                                projectId: projectId,
                                authorId: authorId,
                                testimonial: testimonial
                            };

      Meteor.call("Testimonials.insert", addCollectionData, function(error) {
        if (!error)
        {
          throwSuccessAlert("Testimoinal Successfully Added");
          clearTestimonialModal();
          clearSideMenu_Testimonial();
          $('#testimonialNew_modal').hide();
        }
        else
        {
          throwError("There was an error submitting your testimonial.")
        }
      });

      Template.instance().advancedTab.set(false);

    }



  }
})

clearTestimonialModal = function()
{
  $('[name=projectName]').val('');
  $('[name=authorName]').val('');
  $('[name=testimonial]').val('');
  Errors.remove({});
  Successes.remove({});
}
