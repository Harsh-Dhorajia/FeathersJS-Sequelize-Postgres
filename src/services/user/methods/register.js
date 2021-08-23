const bcrypt = require('bcryptjs');
const User = require('../../../models/user.model');
const {
  validateRegisterInput,
} = require('../../../utils/validations/userValidators');
const {
  USER_ALREADY_EXISTS,
  REGISTER_SUCCESS,
} = require('../../../constants/messages');
const { generateToken } = require('../../../utils/generateToken');

const register = async (req, res) => {
  try {
    const { body } = req;
    const { username, email } = body;
    let { password } = body;

    const { isValid, error } = await validateRegisterInput(
      username,
      email,
      password,
    );
    if (error || !isValid) {
      return res.json({ message: error.details.map(e => e.message) });
    }
    const userAlreadyExist = await User.findOne({ where: { email } });

    if (userAlreadyExist) {
      return res.send({ message: USER_ALREADY_EXISTS });
    }
    password = await bcrypt.hash(password, 12);
    const userInstance = await User.create({ email, password, username });
    const token = await generateToken(userInstance);
    return res.send({
      message: REGISTER_SUCCESS,
      data: { user: userInstance, token },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.send(error);
  }
};

module.exports = register;
