Template.testimonialNew.created = function() {
  this.advancedTab = new ReactiveVar(false);
};

Template.testimonialNew.rendered = function() {

};

Template.testimonialNew.helpers({

  project: function()
  {
    return Projects.find().fetch();
  },

  author: function()
  {
    return Authors.find().fetch();
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
  },

  'click [data-action="submit"]': function (e) {
    e.preventDefault();
    Errors.remove({});

    var projectName = $('[name=projectName]').val().trim();
    var authorName = $('[name=authorName]').val().trim();
    var testimonial = $('[name=testimonial]').val().trim();

    var allInputsProvided = true;

    if (!projectName)
      {throwError("Project Name is Required"); allInputsProvided=false;}
    if (!authorName)
      {throwError("Author Name is Required"); allInputsProvided=false;}
    if (!testimonial)
      {throwError("Testimonial is Required"); allInputsProvided=false;}

    if (allInputsProvided)
    {

      var addCollectionData = {
                                name: projectName,
                                clientId: clientName,
                                testimonial: testimonial
                            };

      Meteor.call("Testimonials.insert", addCollectionData, function(error) {
        if (!error)
        {
          throwSuccessAlert("Testimoinal Successfully Added");
          $('#projectNew_modal').hide();
          clearProjectModal();
        }
        else
        {
          clearProjectModal();
        }
      });

    }


  }
})
