// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const { DataTypes } = Sequelize;
const sequelizeClient = require('../sequelize-client');

const Event = sequelizeClient.define(
  'event',
  {
    eventName: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  },
  {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  },
);

Event.associate = models => {
  Event.belongsTo(models.user, {
    as: 'users',
    foreignKey: 'userId',
    onDelete: 'CASCADE',
  });
};

module.exports = Event;

