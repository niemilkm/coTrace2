
Template.adminSSInput.created = function() {

  var instance = this;
  //instance.subscription = new ReactiveVar("");

  instance.autorun(function () {
    instance.subscribe('ssInputs').SSInputs;
  });

  instance.SSInputs = function() {
    return SuccessStoryInputs.findOne().SSInputs;
  }
};

Template.adminSSInput.rendered = function() {

};

Template.adminSSInput.helpers({
  ssInput: function()
  {
    return _.sortBy(Template.instance().SSInputs(), function(data) {return data.num;});
  }
});

Template.adminSSInput.events =
{
  'click #adminSSInputModal_add': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "ADD");
  },

  'click #adminSSInputModal_edit': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "EDIT");
    Session.set("adminParams", this);
  },

  'click #adminSSInputModal_deleteId': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});
    Session.set("adminParams", this);
  }

}
