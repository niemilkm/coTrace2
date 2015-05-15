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
  'click #adminAuthorModal_add': function()
  {
    Session.set("addOrEdit", "ADD");
  },
  'click #adminAuthorModal_edit': function()
  {
    console.log(this);
    Session.set("addOrEdit", "EDIT");
    Session.set("params", this);
  }
}
