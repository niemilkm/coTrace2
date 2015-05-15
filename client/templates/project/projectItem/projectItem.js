Template.projectItem.created = function() {


  // 1. Initialization

  var instance = this;

  // initialize the reactive variables
  instance.loaded = new ReactiveVar(0);
  instance.limit = new ReactiveVar(15);
  //instance.ready = new ReactiveVar(false);

  //2. Autorun

  //will re-run when the "limit" reactive variables changes
  instance.autorun(function () {

    // get the limit
    var limit = instance.limit.get();

    // subscribe to the projects publication
    var subscription = instance.subscribe('projects', limit);
    //instance.subscribe('projects', limit);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      instance.loaded.set(limit);
    //   instance.ready.set(true);
    // } else {
    //   instance.ready.set(false);
    }
  });

  // 3. Cursor

  instance.projects = function() {
    return Projects.find({}, {limit: instance.loaded.get()});
  }


};

Template.projectItem.helpers({
  // the posts cursor
  projects: function () {
    return Template.instance().projects();
  },

  testimonialCount: function() {
    return Testimonials.find({projectId: this._id}).count();
  }
  // the subscription handle
  // isReady: function () {
  //   return Template.instance().ready.get();
  // },
  // are there more posts to show?
  // hasMoreProjects: function () {
  //   return Template.instance().projects().count() >= Template.instance().limit.get();
  // }
});
