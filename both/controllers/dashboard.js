DashboardController = AppController.extend({
  onAfterAction: function () {
    Meta.setTitle('Dashboard');
  }
});

DashboardController.events({
});
