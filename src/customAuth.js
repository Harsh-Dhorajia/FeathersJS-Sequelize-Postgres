/* eslint-disable promise/valid-params */
const { JWTStrategy } = require('@feathersjs/authentication');
const errors = require('@feathersjs/errors');
const bcrypt = require('bcryptjs');
const UserModel = require('./models/user.model');

class Custom extends JWTStrategy {
  async authenticate(authentication, params) {
    const { accessToken } = authentication;
    if (!accessToken) {
      const { email, password } = authentication;
      const user = await UserModel.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return Promise.reject(
          new errors.NotAuthenticated('InvalidCredentials', {
            errors: { message: 'Invalid Login credentials' },
          }),
          null,
        );
      }
      if (user) {
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
          delete user.password;
          const token = await this.authentication.createAccessToken({
            userId: user.id,
          });
          console.log(`${user.email} user authenticated`);
          return { accessToken: token };
        }
        return Promise.reject(
          new errors.BadRequest('InvalidUserNamePassword', {
            errors: { message: 'Invalid Username and password' },
          }),
          null,
        );
      }
    }
    let user;
    const payload = await this.authentication.verifyAccessToken(
      accessToken,
      params.jwt,
    );
    if (!payload.userId) {
      console.log('Invalid token');
    }
    const userResponse = await UserModel.findAll({
      where: { id: payload.userId },
    });
    if (userResponse.length > 0) {
      user = JSON.parse(JSON.stringify(userResponse[0]));
      console.log(`${user.email} user authenticated`);
      return { user };
    }
    console.log('No user found!');
    return Promise.reject(
      new errors.NotAuthenticated('InvalidCredentials', {
        errors: { message: 'Invalid login credentials' },
      }),
      null,
    );
  }
}

module.exports = Custom;
