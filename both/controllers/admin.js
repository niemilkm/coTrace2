
AdminController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Admin');
  }
});

AdminController.events({
});
