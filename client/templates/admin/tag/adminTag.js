
Template.adminTag.created = function() {

  var instance = this;
  instance.subscription = new ReactiveVar("");

  instance.autorun(function () {
    instance.subscribe('tags');
  });

  instance.tagNames = function() {
    return Tags.find().fetch();
  }
};

Template.adminTag.rendered = function() {

};

Template.adminTag.helpers({
  tag: function()
  {
    return Template.instance().tagNames();
  }
});

Template.adminTag.events =
{
  'click #adminTagModal_add': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "ADD");
  },

  'click #adminTagModal_edit': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "EDIT");
    Session.set("adminParams", this);
  },

  'click #adminTagModal_deleteId': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});
    Session.set("adminParams", this._id);
  }

}
