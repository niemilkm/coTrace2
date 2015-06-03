
Template.adminCategory.created = function() {

  var instance = this;
  instance.subscription = new ReactiveVar("");

  instance.autorun(function () {
    instance.subscribe('categories');
  });

  instance.categoryNames = function() {
    return Categories.find().fetch();
  }
};

Template.adminCategory.rendered = function() {

};

Template.adminCategory.helpers({
  category: function()
  {
    return Template.instance().categoryNames();
  }
});

Template.adminCategory.events =
{
  'click #adminCategoryModal_add': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "ADD");
  },

  'click #adminCategoryModal_edit': function(e)
  {
    e.preventDefault();
    Session.set("addOrEdit", "EDIT");
    Session.set("adminParams", this);
  },

  'click #adminCategoryModal_deleteId': function(e)
  {
    e.preventDefault();
    Errors.remove({});
    Successes.remove({});
    Session.set("adminParams", this._id);
  }

}
