const methods = require('./methods');

module.exports = function (app) {
  app.post('/users/register', methods.register);
  app.post('/users/login', methods.login);
};
