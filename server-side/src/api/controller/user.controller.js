const userService = require('../services/user.service');

const UserController = {};

UserController.register = async (req, res) => {
  const { fullName, userName, password } = req.body;
  if (!fullName || !userName || !password) {
    return res
      .status(400)
      .json({ message: 'FullName, UserName and password is required!' });
  }
  const user = await userService
    .create(fullName, userName, password)
    .catch((error) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(500).json({ error: 'Cannot register user at the moment!' });
      }
    });

  if (user) {
    res.status(200).json({ message: 'Thanks for registering! Back to login' });
  }
};

UserController.login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: 'UserName and password is required!' });
  }
  const token = await userService.login(userName, password).catch((error) => {
    res.status(500).json({ error });
  });
  if (token) {
    res.status(200).json({ message: 'Login success', token });
  }
};
module.exports = UserController;
