
Template.adminAuthor.created = function() {

  var instance = this;

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
    var name = this.firstName + " " + this.lastName;
    Meteor.call('Authors.remove', this._id, function(error) {
      if (!error)
        throwSuccessAlert(name + " Successfully Deleted");
      else
        throwError("Error Deleting " + name + " - Please Try Again");
    });
  }
}
