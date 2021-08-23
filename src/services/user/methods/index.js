const register = require('./register');
const login = require('./login');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const changePassword = require('./changePassword');

const Methods = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
};

module.exports = Methods;
