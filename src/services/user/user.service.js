// Initializes the `users` service on path `/users`
const createService = require('feathers-sequelize');
const hooks = require('./user.hooks');
const UserModel = require('../../models/user.model');
const UserRoutes = require('./user.routes');

module.exports = function (app) {
  // const paginate = app.get('paginate');

  const options = {
    name: 'users',
    Model: UserModel,
    // paginate,
  };

  // Initialize User Routes
  app.configure(UserRoutes);

  // Initialize our service with any options it requires
  app.use('/users', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);
};