const Menu = require('../models/menu');

const home = async (req, res) => {
  const pizzas = await Menu.find({});
  res.render('home',{pizzas:pizzas});
};

module.exports = { home };
