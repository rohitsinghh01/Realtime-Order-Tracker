const cart = (req, res) => {
  res.render('customer/cart');
};

const updateCart = (req, res) => {
  res.json({ data: 'all ok' });
};

module.exports = { cart, updateCart };
