
Template.multiSelect.rendered = function()
{
  set = new Set();
  title = "";
};

Template.multiSelect.helpers({

  tag: function()
  {
    return Tags.find({}).fetch();
  }
});

Template.multiSelect.events({

  'click .dropdown dt a': function()
  {
      $(".dropdown dd ul").slideToggle('fast');
  },

  'click .dropdown dd ul li a': function()
  {
    $(".dropdown dd ul").hide();
  },

  'click .mutliSelect input[type="checkbox"]': function(e)
  {

    //var tag = $(event.target).val();
    var tag = $(event.target).attr('id');

    title = tag + ",";

    if ($(event.target).is(':checked')) {
        var html = '<span title="' + title + '">' + title + '</span>';
        $('.multiSel').append(html);
        $(".hida").hide();
        set.add(tag);
    }



    else {
        $('span[title="' + title + '"]').remove();
        var ret = $(".hida");
        $('.dropdown dt a').append(ret);
        set.delete(tag);
    }
  },

  // 'click': function()
  // {
  //   // console.log("e: ");
  //   // console.log(e);
  //   // console.log("this: ");
  //   // console.log(this);
  //   // console.log("event.target: ");
  //   // console.log(event.target);
  //   // console.log("$(event.target): ");
  //   console.log($(event.target).val());
  //   var $clicked = $(event.target);
  //   //var $clicked = (event.target);
  //   if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
  // }

})
