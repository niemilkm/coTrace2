Template.dashboard.created = function() {
  this.filter_type = new ReactiveVar("projects");
};

Template.dashboard.rendered = function() {

};

Template.dashboard.helpers({
  filter_type: function()
  {
    var filter_type = Template.instance().filter_type.get();
    var obj = {
                projects:       filter_type == 'projects',
                testimonials:   filter_type == 'testimonials',
                successStories: filter_type == 'successStories'
    }
    return obj;
  }
});
