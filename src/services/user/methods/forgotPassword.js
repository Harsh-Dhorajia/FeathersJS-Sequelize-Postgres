/* eslint-disable no-shadow */
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const User = require('../../../models/user.model');
const {
  validateForgotPasswordInput,
} = require('../../../utils/validations/userValidators');
const {
  USER_NOT_FOUND,
  RESET_PASSWORD_REQUEST_SUCCESS,
} = require('../../../constants/messages');

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { isValid, error } = await validateForgotPasswordInput(email);
    if (!isValid || error) {
      return res.json({ message: error.details.map(e => e.message) });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      const token = uuidv4();
      // save token and expire time
      await user.update({
        resetPasswordToken: token,
        resetPasswordExpires: moment().add(10, 'minutes').format(),
      });
      return res.send({
        message: RESET_PASSWORD_REQUEST_SUCCESS,
      });
    }
    return res.send({ message: USER_NOT_FOUND });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return res.json(error);
  }
};

module.exports = forgotPassword;
