const user = require('../models/user');

const register = async (req, res) => {
  console.log(req.body);
  const userData = user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  const data = await userData.save();
  console.log(data);
  res.render('auth/register');
};

module.exports = { register };
