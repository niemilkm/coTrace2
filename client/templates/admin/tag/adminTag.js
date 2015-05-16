
Template.adminTag.created = function() {

  var instance = this;

  instance.autorun(function () {
    instance.subscribe('tags');
  });

  instance.tags = function() {
    return Tags.find().fetch();
  }
};

Template.adminTag.rendered = function() {

};

Template.adminTag.helpers({
  tag: function()
  {
    return Template.instance().tags();
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

  'click [data-action=delete]': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});
    var name = this.name;
    Meteor.call('Tags.remove', this._id, function(error) {
      if (!error)
        throwSuccessAlert(name + " Successfully Deleted");
      else
        throwError("Error Deleting " + name + " - Please Try Again");
    });
  }
}
