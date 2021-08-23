const bcrypt = require('bcryptjs');
const User = require("../../../models/user.model");
const { validateRegisterInput } = require('../../../utils/validations/userValidators');

const register = async (req, res, next) => {
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
      return res.send({ message: 'User Already Exist' });
    }
    password = await bcrypt.hash(password, 12);
    const userInstance = await User.create({ email, password, username });
    return res.send(userInstance);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

module.exports = register;
