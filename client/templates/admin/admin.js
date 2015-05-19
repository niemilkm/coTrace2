
Template.admin.created = function() {
  this.selection = new ReactiveVar('');
  Session.setDefault("addOrEdit", "EDIT");
  Session.setDefault("adminParams", undefined);
}

Template.admin.helpers({
  selection: function()
  {
    var selection = Template.instance().selection.get();
    var obj = {
                ss:       selection === 'ss',
                client:   selection === 'client',
                category: selection === 'category',
                tag:      selection === 'tag',
                author:   selection === 'author'
    }
    return obj;
  }
});

Template.admin.events =
{
  'click [data-action=ss]': function() {
    Template.instance().selection.set('ss');
  },

  'click [data-action=client]': function() {
    Template.instance().selection.set('client');
  },

  'click [data-action=category]': function() {
    Template.instance().selection.set('category');
  },

  'click [data-action=tag]': function() {
    Template.instance().selection.set('tag');
  },

  'click [data-action=author]': function() {
    Template.instance().selection.set('author');
  },
}
