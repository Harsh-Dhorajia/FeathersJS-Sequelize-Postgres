/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const moment = require('moment');
const User = require('../../../models/user.model');
const {
  validateResetPasswordInput,
} = require('../../../utils/validations/userValidators');
const {
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_LINK_EXPIRE,
  TOKEN_REQUIRED,
} = require('../../../constants/messages');

const resetPassword = async (req, res) => {
  const { password } = req.body;
  if (!req.params.token) {
    return res.send({ message: TOKEN_REQUIRED });
  }
  const { isValid, error } = await validateResetPasswordInput(password);
  if (!isValid || error) {
    return res.json({ message: error.details.map(e => e.message) });
  }
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          [Op.gt]: moment().format(),
        },
      },
    });
    if (user) {
      await user.update({
        password: await bcrypt.hash(password, 12),
        resetPasswordToken: null,
        resetPasswordExpires: null,
      });
      return res.json({
        message: RESET_PASSWORD_SUCCESS,
      });
    }
    return res.json({
      message: RESET_PASSWORD_LINK_EXPIRE,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return res.json(error);
  }
};

module.exports = resetPassword;
