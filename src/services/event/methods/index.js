const { createEvent } = require('./create');
const { invite } = require('./invite');
const { update } = require('./update');

const methods = {
  createEvent,
  invite,
  update,
};
module.exports = methods;
