const { authenticate } = require('@feathersjs/express');
const methods = require('./methods');

module.exports = function (app) {
  app.post('/create', authenticate('custom'), methods.createEvent);
};
