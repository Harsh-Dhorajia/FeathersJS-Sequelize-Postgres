const users = require('./user/user.service');
const event = require('./event/event.service');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(event);
};
