// Initializes the `event` service on path `/event`
const createService = require('feathers-sequelize');
const hooks = require('./event.hooks');
const EventModel = require('../../models/event.model');
const EventRoutes = require('./event.routes');

module.exports = function (app) {
  const paginate = app.get('paginate');

  const options = {
    name: 'events',
    Model: EventModel,
    paginate,
  };

  // Initialize User Routes
  app.configure(EventRoutes);

  // Initialize our service with any options it requires
  app.use('/events', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('events');

  service.hooks(hooks);
};
