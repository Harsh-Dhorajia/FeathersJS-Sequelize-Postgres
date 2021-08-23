// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require("sequelize");
const DataTypes = Sequelize.DataTypes;
const sequelizeClient = require("../sequelize-client");

const User = sequelizeClient.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: DataTypes.STRING,
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.STRING,
  },
  {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      },
    },
  }
);

module.exports = User;
