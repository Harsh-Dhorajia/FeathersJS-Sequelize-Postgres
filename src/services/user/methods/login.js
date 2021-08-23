/* eslint-disable no-shadow */
const bcrypt = require('bcryptjs');
const User = require('../../../models/user.model');
const {
  validateLoginInput,
} = require('../../../utils/validations/userValidators');
const { generateToken } = require('../../../utils/generateToken');
const {
  LOGIN_SUCCESS,
  PASSWORD_NOT_MATCH,
  USER_NOT_FOUND,
} = require('../../../constants/messages');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { isValid, error } = await validateLoginInput(email, password);
    if (error || !isValid) {
      return res.json({ message: error.details.map(e => e.message) });
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: USER_NOT_FOUND });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: PASSWORD_NOT_MATCH });
    }

    const token = await generateToken(user);
    return res.send({
      message: LOGIN_SUCCESS,
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error', error);
    return res.send(error);
  }
};

module.exports = login;
