
Template.adminAuthor.created = function() {

  var instance = this;
  instance.subscription = new ReactiveVar("");

  instance.autorun(function () {
    instance.subscribe('authors');
  });

  instance.authorNames = function() {
    return Authors.find().fetch();
  }
};

Template.adminAuthor.rendered = function() {

};

Template.adminAuthor.helpers({
  author: function()
  {
    return Template.instance().authorNames();
  }
});

Template.adminAuthor.events =
{
  'click #adminAuthorModal_add': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "ADD");
  },

  'click #adminAuthorModal_edit': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "EDIT");
    Session.set("adminParams", this);
  },

  'click [data-action=delete]': function(e)
  {
    e.preventDefault();

    Errors.remove({});
    Successes.remove({});

    Session.set("adminParams", this._id);
    $('#adminAuthorModal_delete').modal('show');
  }

}
