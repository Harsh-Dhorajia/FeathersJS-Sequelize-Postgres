const register = require('./register');
const login = require('./login');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');

const Methods = {
  register,
  login,
  forgotPassword,
  resetPassword,
};

module.exports = Methods;
