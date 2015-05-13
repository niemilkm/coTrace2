Template.sideMenu_project.rendered = function() {

};

Template.sideMenu_project.events({

  'click [data-action="submitClient"]': function(e)
  {
    Successes.remove({});
    e.preventDefault();
    var item = { name: $('[name=clientAdd]').val().trim()};
    if (item)
    {
      Meteor.call("Clients.insert", item);
      throwSuccessAlert(item.name + " Client Added Successfully");
    }

    $('[name=clientAdd]').val('');
  },

  'click [data-action="submitCategory"]': function(e)
  {
    Successes.remove({});
    e.preventDefault();
    var item = { name: $('[name=categoryAdd]').val().trim()};
    if (item)
    {
      Meteor.call("Categories.insert", item);
      throwSuccessAlert(item.name + " Category Added Successfully");
    }
    $('[name=categoryAdd]').val('');
  },

  'click [data-action="submitTag"]': function(e)
  {
    e.preventDefault();
    var item = { name: $('[name=tagAdd]').val().trim()};
    if (item)
    {
      Meteor.call("Tags.insert", item);
      throwSuccessAlert(item.name + " Tag Added Successfully");
    }
    $('[name=tagAdd]').val('');
  },



});
