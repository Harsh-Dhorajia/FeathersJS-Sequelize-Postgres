// Initializes the `guest` service on path `/guest`
const createService = require('feathers-sequelize');
const GuestModel = require('../../models/guest.model');
const hooks = require('./guest.hooks');
const GuestRoutes = require('./guest.routes');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'guests',
    Model: GuestModel,
    paginate,
  };

  // Initialize User Routes
  app.configure(GuestRoutes);
  // Initialize our service with any options it requires
  app.use('/guest', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('guest');

  service.hooks(hooks);
};
