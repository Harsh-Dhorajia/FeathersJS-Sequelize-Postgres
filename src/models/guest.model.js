/* eslint-disable no-param-reassign */
// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');

const { DataTypes } = Sequelize;
const sequelizeClient = require('../sequelize-client');

const Guest = sequelizeClient.define(
  'guest',
  {
    userId: DataTypes.INTEGER,
    eventId: DataTypes.INTEGER,
    invitedBy: {
      type: DataTypes.STRING,
    },
  },
  {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  },
);

Guest.associate = models => {
  Guest.belongsTo(models.event, {
    foreignKey: 'eventId',
    onDelete: 'CASCADE',
  });
  Guest.belongsTo(models.user, {
    foreignKey: 'userId',
    as: 'users',
    onDelete: 'CASCADE',
  });
};

module.exports = Guest;
