/* eslint-disable no-throw-literal */
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const UserService = {};

UserService.getById = async (id) => {
  return await UserService.getUser(id);
};

UserService.getUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
};

UserService.create = async (fullName, userName, password) => {
  const alreadyExistsUser = await User.findOne({
    where: { userName },
  });

  if (alreadyExistsUser) {
    throw `Username ${userName} is already registered`;
  }

  return await new User({ fullName, userName, password }).save();
};

UserService.login = async (userName, password) => {
  const user = await User.findOne({
    where: { userName },
  });

  if (!user) {
    throw 'Email or password does not match!';
  }
  const isMatching = await user.validPassword(password);
  if (!isMatching) {
    throw 'Email or password does not match!';
  }

  return jwt.sign(
    { id: user.id, fullName: user.fullName, userName: user.userName },
    process.env.JWT_SECRET
  );
};

module.exports = UserService;
