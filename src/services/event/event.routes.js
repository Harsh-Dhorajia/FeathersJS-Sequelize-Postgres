const { authenticate } = require('@feathersjs/express');
const methods = require('./methods');

module.exports = function (app) {
  app.post('/events/create', authenticate('custom'), methods.createEvent);
  app.put('/events/invite/:eventId', authenticate('custom'), methods.invite);
  app.put('/events/update/:eventId', authenticate('custom'), methods.update);
};
