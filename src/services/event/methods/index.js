const { createEvent } = require('./create');
const { invite } = require('./invite');
const { update } = require('./update');
const { list } = require('./list');
const { eventDetail } = require('./getDetails');

const methods = {
  createEvent,
  invite,
  update,
  list,
  eventDetail,
};
module.exports = methods;
