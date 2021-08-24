/* eslint-disable no-shadow */
const User = require('../../../models/user.model');
const Event = require('../../../models/event.model');
const Guest = require('../../../models/guest.model');
const { INVITED_USERS, EVENT_NOT_FOUND } = require('../../../constants/messages');

module.exports = {
  async list(req, res) {
    try {
      const { id } = req.user;
      const event = await Event.findOne({
        where: { id: req.params.eventId, userId: id },
      });
      if (!event) {
        return res.json({ message: EVENT_NOT_FOUND });
      }
      const guests = await Guest.findAll({
        where: { eventId: event.id },
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['username', 'email'],
          },
        ],
      });
      return res.json({ message: INVITED_USERS, data: guests });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      return res.json(error);
    }
  },
};
