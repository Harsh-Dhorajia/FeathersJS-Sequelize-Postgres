const users = require("./user/user.service");
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
};
