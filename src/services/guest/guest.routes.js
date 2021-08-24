const { authenticate } = require('@feathersjs/express');
const methods = require('./methods');

module.exports = function (app) {
  app.post('/guests/list', authenticate('custom'), methods.list);
};
