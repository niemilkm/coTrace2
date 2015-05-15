Router.route('/', {
  name: 'home'
});

Router.route('/dashboard', {
  name: 'dashboard'
});

Router.route('/admin', {
  name: 'admin'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard', 'admin']
});
